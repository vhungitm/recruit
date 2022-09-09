import interviewAPI from 'API/interviewAPI';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'SCSS/_management.scss';
import { excelFunction } from 'utils';
import { DataTableFilter, DataTablePagination } from 'Views/datatable';
import {
	ManageInterviewApproveModal,
	ManageInterviewList,
	ManageInterviewRejectModal
} from './components';
import { allFilters, allTableHeaders, defaultFilter } from './datas';

const ManageInterview = () => {
	// Search
	const [search, setSearch] = useState('');
	const [notFound, setNotFound] = useState(false);

	// Handle search
	const handleSearch = e => setSearch(e.target.value);

	// Filter
	const [filters, setFilters] = useState([]);
	const [filter, setFilter] = useState(defaultFilter);
	const [filterQuantity, setFilterQuantity] = useState(0);
	const [filterControlsCol, setFilterControlsCol] = useState(12);

	// Handle filter, reset filter
	const handleFilter = e => setFilter(e);
	const handleResetFilter = () => setFilter(defaultFilter);

	// Sorting
	const [sorting, setSorting] = useState({ field: '', order: '' });
	const handleSort = (field, order) => setSorting({ field, order });

	// Pagination
	const [totalItems, setTotalItems] = useState(0);
	const [currentPage, setcurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	// Handle change page
	const handleChangePage = (itemPerPage, currentPage) => {
		setItemsPerPage(itemPerPage);
		setcurrentPage(currentPage);
	};

	// Data
	const [load, setLoad] = useState(true);
	const [allData, setAllData] = useState([]);
	const [data, setData] = useState([]);

	// Effect update all data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await interviewAPI.fetchList();

				if (res.succeeded) setAllData(res.data.interviewlist);
				else setAllData([]);
			} catch (error) {
				setAllData([]);
			} finally {
				setLoad(false);
			}
		};

		if (load) fetchData();
	}, [load]);

	// Update all data -> update filters
	useEffect(() => {
		const newFilters = [...allFilters];

		// Handle update filter options
		const setFiltersOptions = (name, value) => {
			const index = newFilters.findIndex(item => item.name === name);

			if (index >= 0) {
				const optionIndex = newFilters[index].options.findIndex(
					item => item.value === value
				);

				if (optionIndex < 0)
					newFilters[index] = {
						...newFilters[index],
						options: [
							...newFilters[index].options,
							{ value: value, label: value }
						]
					};
			}
		};

		// Update filter options
		allData.forEach(item => {
			setFiltersOptions('id', item.id);
			setFiltersOptions('vitriphongvan', item.vitriphongvan);
		});

		// Update filter controls col
		setFilterControlsCol(8);

		// Update new filters
		setFilters(newFilters);
	}, [allData]);

	// Effect update data
	useEffect(() => {
		let newData = [...allData];

		// Search
		newData = newData.filter(
			item =>
				item.id.toString().toLowerCase().includes(search.toLowerCase()) ||
				item.hoten.toLowerCase().includes(search.toLowerCase()) ||
				item.email.toLowerCase().includes(search.toLowerCase()) ||
				item.sodienthoai.toLowerCase().includes(search.toLowerCase()) ||
				item.thoigian.toLowerCase().includes(search.toLowerCase()) ||
				item.hinhthuclamviec.toLowerCase().includes(search.toLowerCase()) ||
				item.kenhphongvan.toLowerCase().includes(search.toLowerCase()) ||
				item.trangthai.toLowerCase().includes(search.toLowerCase()) ||
				item.taikhoan.toLowerCase().includes(search.toLowerCase())
		);

		// Update filter quantity
		let newFilterQuantity = 0;

		Object.values(filter).forEach(item => {
			if (item !== '') newFilterQuantity++;
		});
		setFilterQuantity(newFilterQuantity);

		// Filter
		if (newFilterQuantity) {
			newData = newData.filter(
				item =>
					(filter.interviewId
						? item.interviewId === filter.interviewId
						: true) &&
					(filter.vitriphongvan
						? item.vitriphongvan === filter.vitriphongvan
						: true)
			);
		}

		// Update show not found
		if ((search || newFilterQuantity > 0) && newData.length === 0) {
			setNotFound(true);
		} else setNotFound(false);

		// Sorting
		if (sorting.field) {
			const reversed = sorting.order === 'asc' ? 1 : -1;
			newData = [...newData].sort(
				(a, b) =>
					reversed *
					a[sorting.field].toString().localeCompare(b[sorting.field].toString())
			);
		}

		// Pagination
		setTotalItems(newData.length);
		newData = newData.slice(
			(currentPage - 1) * itemsPerPage,
			(currentPage - 1) * itemsPerPage + itemsPerPage
		);

		// Update new data
		setData(newData);
	}, [allData, search, filter, sorting, currentPage, itemsPerPage]);

	// Approve
	const [showApproveModal, setShowApproveModal] = useState(false);
	const [approvedInterview, setApprovedInterview] = useState({});

	// Handle show, close approve modal
	const handleShowApproveModal = interview => {
		setApprovedInterview(interview);
		setShowApproveModal(true);
	};
	const handleCloseApproveModal = () => {
		setShowApproveModal(false);
		setApprovedInterview({});
	};

	// Handle approve
	const handleApprove = async ({ interviewLinkURL }) => {
		try {
			const res = await interviewAPI.approve({
				interviewId: approvedInterview.interviewId,
				interviewLinkURL
			});

			if (res.succeeded) {
				toast('Đã duyệt thành công lịch phỏng vấn nhanh');
			} else {
				toast('Không duyệt thành công lịch phỏng vấn nhanh');
			}
		} catch (error) {
			toast('Không duyệt thành công lịch phỏng vấn nhanh');
		}
	};

	// Reject
	const [showRejectModal, setShowRejectModal] = useState(false);
	const [rejectedInterview, setRejectedInterview] = useState({});

	// handle show, close reject modal
	const handleShowRejectModal = interview => {
		setRejectedInterview(interview);
		setShowRejectModal(true);
	};
	const handleCloseRejectModal = () => {
		setShowRejectModal(false);
		setRejectedInterview({});
	};

	// Handle reject
	const handleReject = async () => {
		try {
			const res = await interviewAPI.reject(rejectedInterview.interviewId);

			if (res.succeeded) {
				toast('Đã từ chối lịch phỏng vấn nhanh');
			} else {
				toast('Từ chối lịch phỏng vấn nhanh không thành công');
			}
		} catch (error) {
			toast('Từ chối lịch phỏng vấn nhanh không thành công');
		}
	};

	// Handle export to excel file
	const handleExportToExcel = () => {
		excelFunction.export(
			'Danh sách đặt lịch phỏng vấn ngay',
			'Danh sách đặt lịch phỏng vấn ngay',
			allTableHeaders,
			data.map(item => ({
				...item,
				trangthai:
					item.trangthai === '<span class="green">Đã duyệt</span>'
						? 'Đã duyệt'
						: item.trangthai === '<span class="red">Từ chối</span>'
						? 'Từ chối'
						: 'chờ duyệt'
			}))
		);
	};

	// Return JSX
	return (
		<div className="wrap-management">
			<div className="management-title">DANH SÁCH ĐẶT LỊCH PHỎNG VẤN NGAY</div>

			<div className="react-tabs">
				<div className="tab-content react-tabs__tab-panel--selected">
					<DataTableFilter
						// Search
						search={search}
						handleSearch={handleSearch}
						// Filter
						filters={filters}
						filterQuantity={filterQuantity}
						filterControlsCol={filterControlsCol}
						filter={filter}
						handleFilter={handleFilter}
						handleResetFilter={handleResetFilter}
						// Export to excel file
						handleExportToExcel={handleExportToExcel}
					/>
					<ManageInterviewList
						headers={allTableHeaders}
						data={data}
						// Sort
						setSorting={setSorting}
						handleSort={handleSort}
						// Handle approve and reject
						handleShowApproveModal={handleShowApproveModal}
						handleShowRejectModal={handleShowRejectModal}
					/>

					{notFound && (
						<div className={`notFound`}>
							<img src="Assets/images/jobpost/notFound.png" alt="notFound" />
							<p>Không có kết quả trùng khớp</p>
						</div>
					)}

					{!notFound && (
						<DataTablePagination
							className="pagination"
							// pagination
							totalItems={totalItems}
							currentPage={currentPage}
							handleChangePage={handleChangePage}
						/>
					)}
				</div>
			</div>

			{/* MODAL */}
			<ManageInterviewApproveModal
				show={showApproveModal}
				interview={approvedInterview}
				onClose={handleCloseApproveModal}
				onSubmit={handleApprove}
			/>
			<ManageInterviewRejectModal
				show={showRejectModal}
				interview={rejectedInterview}
				onClose={handleCloseRejectModal}
				onSubmit={handleReject}
			/>
		</div>
	);
};

export default ManageInterview;
