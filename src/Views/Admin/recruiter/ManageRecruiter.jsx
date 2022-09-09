import recruiterAccountAPI from 'API/recruiterAccountAPI.js';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'SCSS/_management.scss';
import { excelFunction } from 'utils';
import { DataTableFilter, DataTablePagination } from 'Views/datatable/index';
import { ManageRecruiterExtendModal, ManageRecruiterList } from './components';
import { allFilters, allTableHeaders, defaultFilter, tabs } from './datas';

const ManageRecruiter = () => {
	// Search
	const [search, setSearch] = useState('');
	const [notFound, setNotFound] = useState(false);

	// Handle search
	const handleSearch = e => setSearch(e.target.value);

	// Filter
	const filters = [...allFilters];
	const [filter, setFilter] = useState(defaultFilter);
	const [filterQuantity, setFilterQuantity] = useState(0);
	const [filterControlsCol] = useState(10);

	// Handle filter, reset filter
	const handleFilter = e => setFilter(e);
	const handleResetFilter = () => setFilter(defaultFilter);

	// Sort
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
	const [params] = useSearchParams('id');
	const [tabId, settabId] = useState(parseInt(params.get('id') || 2));
	const [load, setLoad] = useState(true);
	const [allData, setAllData] = useState([]);
	const [recruiters, setData] = useState([]);

	// Effect update all data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await recruiterAccountAPI.fetchList(tabId);

				if (res.succeeded) setAllData(res.data.recruiterlist);
				else setAllData([]);
			} catch (error) {
				setAllData([]);
			} finally {
				setLoad(false);
			}
		};

		if (load) fetchData();
	}, [tabId, load]);

	// Effect update data
	useEffect(() => {
		let newData = [...allData];

		// Search
		newData = newData.filter(
			item =>
				item.id.toLowerCase().includes(search.toLowerCase()) ||
				item.tencongty.toLowerCase().includes(search.toLowerCase()) ||
				item.ngaytaotaikhoan.toLowerCase().includes(search.toLowerCase()) ||
				item.ngayhethan.toLowerCase().includes(search.toLowerCase()) ||
				item.sodienthoai.toLowerCase().includes(search.toLowerCase()) ||
				item.email.toLowerCase().includes(search.toLowerCase())
		);

		// Count filter
		let newFilterQuantity = 0;

		Object.values(filter).forEach(item => {
			if (item !== '') newFilterQuantity++;
		});
		setFilterQuantity(newFilterQuantity);

		// Filter
		if (newFilterQuantity) {
			newData = newData.filter(item => item.yeucaugiahan === false);
		}

		// Update show not found
		if ((search || newFilterQuantity) && newData.length === 0) {
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
	}, [allData, currentPage, search, filter, sorting, itemsPerPage]);

	// Handle change tab
	const handleChangeTab = tab => {
		if (tab.id === tabId) return;

		settabId(tab.id);
		setSearch('');
		setFilter(defaultFilter);
		setcurrentPage(1);
		setLoad(true);

		// update link
		let link = `/manageRecruiter`;
		link += tab.id !== 2 ? `?id=${tab.id}` : '';

		window.history.pushState({}, '', link);
	};

	// Checked item
	const [checkedAll, setCheckedAll] = useState(false);
	const [checkedIdList, setCheckedIdList] = React.useState([]);

	// Handle check item
	const handleCheckItem = event => {
		const { value, checked } = event.target;

		if (checked) {
			if (checkedIdList.findIndex(recruiterId => recruiterId === value) === -1)
				setCheckedIdList([...checkedIdList, value]);
		} else {
			setCheckedIdList(
				checkedIdList.filter(recruiterId => recruiterId !== value)
			);
		}
	};

	// Effect update checked items
	useEffect(() => {
		if (checkedAll) {
			let newCheckedId = [];

			for (let item of recruiters) {
				newCheckedId.push(item.recruiterId.toString());
			}

			setCheckedIdList(newCheckedId);
		} else {
			setCheckedIdList([]);
		}
	}, [checkedAll, recruiters]);

	// Approve
	const [showExtendModal, setShowExtendModal] = useState(false);
	const [extendedAccount, setExtendedAccount] = useState(null);

	// Handle show, close approve/extend modal
	const handleShowExtendModal = account => {
		setExtendedAccount(account);
		setShowExtendModal(true);
	};

	const handleCloseExtendModal = () => setShowExtendModal(false);

	// Handle approve/extend
	const handleExtend = async formValues => {
		const approveAccountQuantity = checkedIdList.length;

		try {
			const { durationInMonth } = formValues;
			const response =
				tabId === 1
					? await recruiterAccountAPI.approve({
							recruiterIdList:
								extendedAccount !== null
									? [extendedAccount.recruiterId.toString()]
									: checkedIdList
					  })
					: await recruiterAccountAPI.extend({
							recruiterIdList: [extendedAccount.recruiterId.toString()],
							durationInMonth: durationInMonth
					  });

			if (response.succeeded) {
				toast(
					tabId === 3 ? (
						`Đã gia hạn thành công tài khoản số ${extendedAccount.id}`
					) : extendedAccount ? (
						`Đã duyệt thành công tài khoản số ${extendedAccount.id}`
					) : (
						<>Đã duyệt thành công {approveAccountQuantity} tài khoản</>
					)
				);
				setLoad(true);
			} else {
				toast(
					tabId === 3 ? (
						`Gia hạn không thành công tài khoản số ${extendedAccount.id}`
					) : extendedAccount ? (
						`Duyệt không thành công tài khoản số ${extendedAccount.id}`
					) : (
						<>Duyệt không thành công {approveAccountQuantity} tài khoản</>
					)
				);
			}
		} catch (error) {
			toast(
				tabId === 3 ? (
					`Gia hạn không thành công tài khoản số ${extendedAccount.id}`
				) : extendedAccount ? (
					`Duyệt không thành công tài khoản số ${extendedAccount.id}`
				) : (
					<>Duyệt không thành công {approveAccountQuantity} tài khoản</>
				)
			);
		} finally {
			setShowExtendModal(false);
			setShowExtendModal(false);
			setCheckedIdList([]);
			setExtendedAccount(null);
			settabId(tabId);
		}
	};

	// Handle export to excel file
	const handleExportToExcel = async () => {
		let header =
			tabId === 2
				? allTableHeaders.approved
				: tabId === 1
				? allTableHeaders.waiting
				: tabId === 3
				? allTableHeaders.expired
				: allTableHeaders.deleted;

		excelFunction.export(
			'Danh sách tài khoản nhà tuyển dụng',
			'Danh sách tài khoản nhà tuyển dụng',
			header,
			recruiters.map(item => ({
				...item
			}))
		);
	};

	// Return JSX
	return (
		<div className="wrap-management">
			<p className="title-tab">QUẢN LÝ TÀI KHOẢN NHÀ TUYỂN DỤNG</p>
			<div className="react-tabs">
				<ul className="react-tabs__tab-list">
					{tabs.map(tab => (
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
					{/* <div className="feature"> */}
					<DataTableFilter
						// search
						search={search}
						handleSearch={handleSearch}
						// filter
						filters={filters}
						filterQuantity={filterQuantity}
						filterControlsCol={filterControlsCol}
						filter={filter}
						showFilter={tabId === 3}
						handleFilter={handleFilter}
						handleResetFilter={handleResetFilter}
						// Export
						handleExportToExcel={handleExportToExcel}
						// approve
						showApproveAll={tabId === 1 && checkedIdList.length}
						numberChecked={checkedIdList.length}
						handleApprove={handleExtend}
					/>
					{/* </div> */}

					<ManageRecruiterList
						tabId={tabId}
						headers={allTableHeaders}
						recruiterAccountsData={recruiters}
						// Checked item
						checkedAll={checkedAll}
						checkedIdList={checkedIdList}
						setCheckedAll={setCheckedAll}
						handleCheckItem={handleCheckItem}
						// Sort
						handleSort={handleSort}
						// Handle approve/extend
						handleShowExtendModal={handleShowExtendModal}
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
			{/* Extend/Approve modal */}
			<ManageRecruiterExtendModal
				isExtend={tabId === 3}
				show={showExtendModal}
				onClose={handleCloseExtendModal}
				onSubmit={handleExtend}
			/>
		</div>
	);
};

export default ManageRecruiter;