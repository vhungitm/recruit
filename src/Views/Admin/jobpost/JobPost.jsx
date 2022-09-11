import jobPostAPI from 'API/jobPostAPI.js';
import { selectCurrentUser } from 'app/authSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import { toast } from 'react-toastify';
import 'SCSS/_management.scss';
import { formatStringToDate } from 'utils/common.js';
import { excelFunction } from 'utils/excel.js';
import { DataTableFilter, DataTablePagination } from 'Views/datatable';
import { JobPostDeleteModal, JobPostList } from './components';
import {
	allAdminTableHeaders,
	allFilters,
	allRecruiterTableHeaders,
	defaultFilter,
	tabAdmin,
	tabRecruiter
} from './datas';

const JobPost = ({ connection }) => {
	// Is admin role
	const isAdmin = useSelector(selectCurrentUser).roles.includes('SuperAdmin');

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
	const [params] = useSearchParams();
	const [tabId, settabId] = useState(parseInt(params.get('id') || 1));
	const [allData, setAllData] = useState([]);
	const [data, setData] = useState([]);

	// Effect update all data
	const [load, setLoad] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await jobPostAPI.fetchList(tabId);

				if (res.succeeded) setAllData(res.data.list);
				else setAllData([]);
			} catch (error) {
				setAllData([]);
			} finally {
				setLoad(false);
			}
		};

		if (load) fetchData();
	}, [tabId, load]);

	// Effect update all data by signalr
	useEffect(() => {
		const listenJobPostList = async () => {
			connection.on('SendAsyncReloadReponseMessage', async res => {
				if (res.isAdmin === isAdmin)
					if (res.catalogId === 1 && res.tabId.includes(tabId)) setLoad(true);
			});
		};

		if (connection) listenJobPostList();
	}, [connection, tabId, isAdmin]);

	// Update all data -> Udpate filters
	useEffect(() => {
		let newFilters = [
			...(tabId === 1
				? allFilters.approved
				: tabId === 0
				? allFilters.waiting
				: tabId === 2
				? allFilters.expired
				: allFilters.deleted)
		];

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

		// For each -> Update filter options
		allData.forEach(item => {
			setFiltersOptions('tencongty', item.tencongty);
			setFiltersOptions('vitrituyendung', item.vitrituyendung);
			setFiltersOptions('mucluong', item.mucluong);
			setFiltersOptions('hinhthuclamviec', item.hinhthuclamviec);
		});

		// Update filter controls col
		setFilterControlsCol(tabId === 1 ? 8 : tabId === 0 ? 2 : 12);

		// Update new filters, all data
		setFilters(newFilters);
	}, [allData, tabId]);

	// Effect update data
	useEffect(() => {
		let newData = [...allData];

		// Search
		newData = newData.filter(
			item =>
				item.id.toLowerCase().includes(search.toLowerCase()) ||
				item.tencongty.toLowerCase().includes(search.toLowerCase()) ||
				item.diadiem.toLowerCase().includes(search.toLowerCase()) ||
				item.vitrituyendung.toLowerCase().includes(search.toLowerCase()) ||
				item.hinhthuclamviec.toLowerCase().includes(search.toLowerCase()) ||
				item.ngayhethan.toLowerCase().includes(search.toLowerCase()) ||
				item.mucluong.toLowerCase().includes(search.toLowerCase()) ||
				item.phongvanngay.toLowerCase().includes(search.toLowerCase())
		);

		// Filter
		newData = newData.filter(item => {
			let postedDate = formatStringToDate(item.ngaydangtin, 'dd/MM/yyyy');
			let startDate, endDate;

			if (filter.khoangthoigiandangtin) {
				let dateArr = filter.khoangthoigiandangtin.split(' - ');
				startDate = formatStringToDate(dateArr[0], 'dd/MM/yyyy');
				endDate = formatStringToDate(dateArr[1], 'dd/MM/yyyy');
			}

			return (
				(filter.tencongty ? item.tencongty === filter.tencongty : true) &&
				(filter.vitrituyendung
					? item.vitrituyendung === filter.vitrituyendung
					: true) &&
				(filter.mucluong ? item.mucluong === filter.mucluong : true) &&
				(filter.cankinhnghiem !== ''
					? item.cankinhnghiem === filter.cankinhnghiem
					: true) &&
				(filter.hinhthuclamviec
					? item.hinhthuclamviec === filter.hinhthuclamviec
					: true) &&
				(filter.phongvannhanh
					? item.phongvanngay === filter.phongvannhanh
					: true) &&
				(filter.trangthaitin !== ''
					? item.trangthaitin === filter.trangthaitin
					: true) &&
				(filter.khoangthoigiandangtin
					? startDate <= postedDate && postedDate <= endDate
					: true)
			);
		});

		// Update filter quantity
		let newFilterQuantity = 0;

		Object.values(filter).forEach(item => {
			if (item !== '') newFilterQuantity++;
		});
		setFilterQuantity(newFilterQuantity);

		// Update show not found
		if ((search !== '' || newFilterQuantity > 0) && newData.length === 0) {
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
	}, [allData, currentPage, search, sorting, filter, itemsPerPage]);

	// Handle change tab
	const handleChangeTab = tab => {
		if (tab.id === tabId) return;

		settabId(tab.id);
		setLoad(true);
		setSearch('');
		setFilter(defaultFilter);
		setcurrentPage(1);

		// Update link
		let link = `/jobPost`;
		link += tab.id !== 1 ? `?id=${tab.id}` : '';

		window.history.pushState({}, '', link);
	};

	// Checked item
	const [checkedAll, setCheckedAll] = useState(false);
	const [checkedIdList, setCheckedIdList] = useState(['2']);

	// Effect update checked items
	useEffect(() => {
		if (checkedAll) {
			let newCheckedId = [];

			for (let item of data) {
				newCheckedId.push(item.jobPostId.toString());
			}

			setCheckedIdList(newCheckedId);
		} else {
			setCheckedIdList([]);
		}
	}, [checkedAll, data]);

	// Handle check item
	const handleCheckItem = event => {
		const { value, checked } = event.target;

		if (checked) {
			if (checkedIdList.findIndex(item => item === value) === -1)
				setCheckedIdList([...checkedIdList, value]);
		} else {
			setCheckedIdList(checkedIdList.filter(item => item !== value));
		}
	};

	// Delete
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deletedJobPost, setDeletedJobPost] = useState(null);

	// Handle show, close delete modal
	const handleShowDeleteModal = jobPost => {
		setShowDeleteModal(true);
		setDeletedJobPost(jobPost);
	};
	const handleCloseDeleteModal = () => setShowDeleteModal(false);

	// Handle delete
	const handleDelete = async () => {
		try {
			const response = await jobPostAPI.delete(deletedJobPost.jobPostId);

			if (response.succeeded) {
				if (tabId === 3)
					toast(
						<>
							Đã xóa vĩnh viễn tin số {deletedJobPost.id}
							<span className="undo-btn" onClick={handleUndoDelete}>
								Hoàn tác
							</span>
						</>
					);
				else toast(`Đã xóa thành công tin số ${deletedJobPost.id}`);

				setLoad(true);
			} else {
				toast(`Xóa không thành công tin số ${deletedJobPost.id}`);
			}
		} catch (error) {
			toast(`Xóa không thành công tin số ${deletedJobPost.id}`);
		} finally {
			setShowDeleteModal(false);
		}
	};

	// Handle undo delete
	const handleUndoDelete = async () => {
		try {
			const res = await jobPostAPI.restore(deletedJobPost.jobPostId);

			if (res.succeeded === true) {
				toast(`Đã hoàn tác thành công tin số ${deletedJobPost.id}`);
				setLoad(true);
			} else {
				toast(`Hoàn tác không thành công tin số ${deletedJobPost.id}`);
			}
		} catch (error) {
			toast(`Hoàn tác thành công tin số ${deletedJobPost.id}`);
		}
	};

	// Handle update status
	const handleUpdateStatus = async jobPost => {
		try {
			const res = await jobPostAPI.updateStatus(jobPost.jobPostId);

			if (res.succeeded) {
				toast(
					`Đã ${jobPost.trangthaitin ? 'ẩn' : 'hiện'} thành công tin số ${
						jobPost.id
					}`
				);
				setLoad(true);
			} else {
				toast(
					`${jobPost.trangthaitin ? 'Ẩn' : 'Hiện'} không thành công tin số ${
						jobPost.id
					}`
				);
			}
		} catch (error) {
			toast(
				`${jobPost.trangthaitin ? 'Ẩn' : 'Hiện'} không thành công tin số ${
					jobPost.id
				}`
			);
		}
	};

	// Handle approve
	const handleApprove = async jobPost => {
		try {
			const res = await jobPostAPI.approve(
				jobPost ? [jobPost.jobPostId.toString()] : checkedIdList
			);

			if (res.succeeded) {
				toast(
					jobPost ? (
						`Đã duyệt thành công tin số ${jobPost.id}`
					) : (
						<>
							Đã duyệt thành công <b>{checkedIdList.length}</b> tin
						</>
					)
				);
				setLoad(true);
			} else {
				toast(
					jobPost ? (
						`Duyệt không thành công tin số ${jobPost.id}`
					) : (
						<>
							Duyệt không thành công <b>{checkedIdList.length}</b> tin
						</>
					)
				);
			}
		} catch (error) {
			toast(
				jobPost ? (
					`Duyệt không thành công tin số ${jobPost.id}`
				) : (
					<>
						Duyệt không thành công <b>{checkedIdList.length}</b> tin
					</>
				)
			);
		}
	};

	// Handle restore
	const handleRestore = async jobPost => {
		try {
			const res = await jobPostAPI.restore(jobPost.jobPostId);

			if (res.succeeded === true) {
				toast(`Đã khôi phục thành công tin số ${jobPost.id}`);
				setLoad(true);
			} else {
				toast(`Khôi phục không thành công tin số ${jobPost.id}`);
			}
		} catch (error) {
			toast(`Khôi phục không thành công tin số ${jobPost.id}`);
		}
	};

	// Handle export to excel file
	const handleExportToExcel = async () => {
		let header =
			tabId === 1
				? allAdminTableHeaders.approved
				: tabId === 0
				? allAdminTableHeaders.waiting
				: tabId === 2
				? allAdminTableHeaders.expried
				: allAdminTableHeaders.deleted;

		excelFunction.export(
			'Danh sách tin đăng tuyển',
			'Danh sách tin đăng tuyển',
			header,
			data.map(item => ({
				...item,
				cankinhnghiem: item.cankinhnghiem ? 'Có' : 'Không'
			}))
		);
	};

	// Return JSX
	return (
		<div className="wrap-management">
			<div className="wrap-management-header">
				<div className="wrap-management-header-title">
					QUẢN LÝ TIN ĐĂNG TUYỂN
				</div>
				<div className="wrap-management-header-buttons">
					{!isAdmin && (
						<Link to={`/jobPost/CreateNew`}>
							<Button className="add-new-jobpost">
								<img
									className="img"
									src="/Assets/images/jobpost/CreateNewJobPost.png"
									alt="Create new job post"
								/>
								Tạo tin mới
							</Button>
						</Link>
					)}
				</div>
			</div>

			<div className="react-tabs">
				<ul className="react-tabs__tab-list">
					{(isAdmin ? tabAdmin : tabRecruiter).map(tab => (
						<li
							key={tab.id}
							className={
								tabId === tab.id
									? 'react-tabs__tab react-tabs__tab--selected'
									: 'react-tabs__tab'
							}
							onClick={() => handleChangeTab(tab)}
						>
							{tab.title}
						</li>
					))}
				</ul>
				<div className="tab-content react-tabs__tab-panel--selected">
					{/* search and filter */}
					<DataTableFilter
						// Search
						search={search}
						handleSearch={handleSearch}
						// filter
						filters={filters}
						filterQuantity={filterQuantity}
						filterControlsCol={filterControlsCol}
						filter={filter}
						handleFilter={handleFilter}
						handleResetFilter={handleResetFilter}
						// export to excel file
						handleExportToExcel={handleExportToExcel}
						// approve
						showApproveAll={checkedIdList.length && tabId === 0}
						numberChecked={checkedIdList.length}
						handleApprove={() => handleApprove()}
					/>
					<JobPostList
						tabId={tabId}
						headers={isAdmin ? allAdminTableHeaders : allRecruiterTableHeaders}
						data={data}
						// checked item
						checkedAll={checkedAll}
						setCheckedAll={setCheckedAll}
						checkedIdList={checkedIdList}
						handleCheckItem={handleCheckItem}
						// sort
						handleSort={handleSort}
						// handle item
						handleApprove={handleApprove}
						handleUpdateStatus={handleUpdateStatus}
						handleRestore={handleRestore}
						handleShowDeleteModal={handleShowDeleteModal}
					/>

					{notFound && (
						<div className={`notFound`}>
							<img src="Assets/images/jobpost/notFound.png" alt="not found" />
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
			<JobPostDeleteModal
				isDeleted={tabId === 3}
				show={showDeleteModal}
				onClose={handleCloseDeleteModal}
				onSubmit={handleDelete}
			/>
		</div>
	);
};
export default JobPost;
