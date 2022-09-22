import candidateAPI from 'API/candidateAPI';
import { selectCurrentUser } from 'app/authSlice';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'SCSS/_management.scss';
import { delay, excelFunction } from 'utils';
import { DataTableFilter, DataTablePagination } from 'Views/datatable/index';
import { ManageCandidateList } from './components';
import { ManageCandidateModal } from './components/ManageCandidateModal';
import {
  allFilters,
  allRecruiterFilters,
  allTableCandidateHeaders,
  allTableRecruiterHeaders,
  defaultFilter,
  defaultRecruiterFilter,
  tabs
} from './datas';

const ManageCandidate = ({ connection }) => {
  const isAdmin = useSelector(selectCurrentUser).roles.includes('SuperAdmin');

  //Check data to export to Excel
  const [dataExport, setDataExport] = useState([]);

  // Search
  const [search, setSearch] = useState('');
  const [notFound, setNotFound] = useState(false);

  // Handle search
  const handleSearch = e => setSearch(e.target.value);

  // Filter
  const [filters, setFilters] = useState(
    isAdmin ? [...allFilters] : [...allRecruiterFilters]
  );
  const [filter, setFilter] = useState(
    isAdmin ? defaultFilter : defaultRecruiterFilter
  );
  const [filterQuantity, setFilterQuantity] = useState(0);
  const [filterControlsCol] = useState(isAdmin ? 6 : 4);

  // Handle filter, reset filter
  const handleFilter = e => setFilter(e);
  const handleResetFilter = () => setFilter(defaultFilter);

  // Sorting
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const handleSort = (field, order) => setSorting({ field, order });

  // Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Handle change page
  const handleChangePage = (itemPerPage, currentPage) => {
    setItemsPerPage(itemPerPage);
    setcurrentPage(currentPage);
  };

  // Data
  const [params] = useSearchParams();
  const [tabId, setTabId] = useState(parseInt(params.get('id') || 1));
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);

  //Block Account
  const [candidateData, setCandidateData] = useState(null);
  const [showHandleModal, setShowHandleModal] = useState(false);
  const handleShowModal = candidate => {
    setShowHandleModal(true);
    setCandidateData(candidate);
  };
  const handleCloseModal = () => setShowHandleModal(false);

  const handleUpdateStatusCandidate = async () => {
    const response = await candidateAPI.updateStatus(candidateData.candidateId);
    try {
      if (response.succeeded) {
        if (response.data.isActive) {
          toast('Đã mở tài khoản thành công', { autoClose: 1200 });
        } else {
          toast('Đã khóa tài khoản', { autoClose: 1200 });
        }
      }
    } catch (error) {
    } finally {
      setShowHandleModal(false);
      await delay(750);
      setTabId(response.data.isActive ? 1 : 0);
    }
  };

  // Effect update all data
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      let res;

      try {
        if (isAdmin) {
          res = await candidateAPI.fetchList(tabId);
        } else {
          res = await candidateAPI.fetchListCandidateForRecruiter();
        }

        if (res.succeeded) {
          setAllData(res.data.candidatelist);
        } else setAllData([]);
      } catch (error) {
        setAllData([]);
      } finally {
        setLoading(false);
      }
    };
    if (loading || tabId === 0 || tabId === 1) fetchData();
  }, [tabId, loading, isAdmin]);

  // Effect update all data by signalr
  useEffect(() => {
    const listenJobPostList = async () => {
      connection.on('ReloadingCandidateMessage', async res => {
        if (res.isAdmin === isAdmin)
          if (res.catalogId === 1 && res.tabId.includes(tabId))
            setLoading(true);
      });
    };

    if (connection) listenJobPostList();
  }, [connection, tabId, isAdmin]);

  // Update all data -> Udpate filters
  useEffect(() => {
    let newFilters = isAdmin ? [...allFilters] : [...allRecruiterFilters];

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
      if (isAdmin) {
        setFiltersOptions('vitrilamviec', item.vitrilamviec);
        setFiltersOptions('hinhthuclamviec', item.hinhthuclamviec);
        setFiltersOptions('capbac', item.capbac);
      } else {
        setFiltersOptions('vitriungtuyen', item.vitriungtuyen);
        setFiltersOptions('hinhthuclamviec', item.hinhthuclamviec);
        setFiltersOptions('hocvan', item.hocvan);
      }
    });

    // Update new filters, all data

    setFilters(newFilters);
  }, [allData, tabId, isAdmin]);

  // Effect update data
  useEffect(() => {
    let newData = [...allData];
    if (isAdmin) {
      //search
      if (search) {
        newData = newData.filter(
          item =>
            item.hoten.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase()) ||
            item.sodienthoai.toLowerCase().includes(search.toLowerCase()) ||
            item.vitrilamviec.toLowerCase().includes(search.toLowerCase()) ||
            item.hinhthuclamviec.toLowerCase().includes(search.toLowerCase()) ||
            item.capbac.toLowerCase().includes(search.toLowerCase()) ||
            item.ngaytaotaikhoan.toLowerCase().includes(search.toLowerCase())
        );
      }
      // Filter
      newData = newData.filter(
        item =>
          (filter.vitrilamviec
            ? item.vitrilamviec === filter.vitrilamviec
            : true) &&
          (filter.hinhthuclamviec
            ? item.hinhthuclamviec === filter.hinhthuclamviec
            : true) &&
          (filter.capbac ? item.capbac === filter.capbac : true)
      );
    } else {
      //search
      if (search) {
        newData = newData.filter(
          item =>
            item.hoten.toLowerCase().includes(search.toLowerCase()) ||
            item.vitriungtuyen.toLowerCase().includes(search.toLowerCase()) ||
            item.hinhthuclamviec.toLowerCase().includes(search.toLowerCase()) ||
            item.capbac.toLowerCase().includes(search.toLowerCase()) ||
            item.mucluongmongmuon
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item.hocvan.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Filter
      newData = newData.filter(
        item =>
          (filter.vitriungtuyen
            ? item.vitriungtuyen === filter.vitriungtuyen
            : true) &&
          (filter.hinhthuclamviec
            ? item.hinhthuclamviec === filter.hinhthuclamviec
            : true) &&
          (filter.hocvan ? item.hocvan === filter.hocvan : true)
      );
    }

    setDataExport(newData);

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
      if (sorting.field === 'ngaytaotaikhoan') {
        newData = [...newData].sort(
          (a, b) =>
            reversed *
            (new Date(...a[sorting.field].split('/').reverse()) -
              new Date(...b[sorting.field].split('/').reverse()))
        );
      } else {
        newData = [...newData].sort(
          (a, b) =>
            reversed *
            a[sorting.field]
              .toString()
              .trim()
              .localeCompare(b[sorting.field].toString().trim())
        );
      }
    }

    // Pagination
    setTotalItems(newData.length);
    newData = newData.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage
    );

    // Update new data
    setData(newData);
  }, [allData, currentPage, search, sorting, filter, itemsPerPage, isAdmin]);

  // Handle change tab
  const handleChangeTab = tab => {
    if (tab.id === tabId) return;

    setTabId(tab.id);
    setLoading(true);
    setSearch('');
    setFilter(defaultFilter);
    setcurrentPage(1);

    // Update link
    let link = `/manageCandidate`;
    link += tab.id !== 1 ? `?id=${tab.id}` : '';

    window.history.pushState({}, '', link);
  };

  // Handle export to excel file
  const handleExportToExcel = async () => {
    let header = allTableCandidateHeaders;

    if (dataExport === null) {
      setDataExport(allData);
    }

    excelFunction.export(
      'Danh sách ứng viên',
      'Danh sách ứng viên',
      header,
      dataExport.map(item => ({
        ...item
      }))
    );
  };

  const handleChangeHeaderByRoles = () => {
    if (isAdmin) return allTableCandidateHeaders;
    else return allTableRecruiterHeaders;
  };

  // Return JSX
  return (
    <div className="wrap-management">
      {isAdmin ? (
        <p className="title-tab">QUẢN LÝ TÀI KHOẢN ỨNG VIÊN</p>
      ) : (
        <p className="title-tab">DANH SÁCH ỨNG VIÊN</p>
      )}
      <div className="react-tabs">
        <ul className="react-tabs__tab-list">
          {isAdmin &&
            tabs.map(tab => (
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

        {/* Management body */}
        {!loading && (
          <div className="wrap-management-body">
            {/* Search and filter */}
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
            />

            {/* List */}
            <ManageCandidateList
              tabId={tabId}
              headers={handleChangeHeaderByRoles()}
              data={data}
              // Sort
              handleSort={handleSort}
              //Handle
              handleShowModal={handleShowModal}
            />

            {/* Not found */}
            {notFound && (
              <div className={`notFound`}>
                <img src="Assets/images/jobpost/notFound.png" alt="notFound" />
                <p>Không có kết quả trùng khớp</p>
              </div>
            )}

            {/* Pagination */}
            {!notFound && (
              <DataTablePagination
                className="pagination"
                // pagination
                totalItems={totalItems}
                currentPage={currentPage}
                handleChangePage={handleChangePage}
              />
            )}

            {/* MODAL */}
            <ManageCandidateModal
              isApprove={tabId === 1}
              show={showHandleModal}
              onClose={handleCloseModal}
              onSubmit={handleUpdateStatusCandidate}
            />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="wrap-management-body">
            <div className="loading">
              <Spinner animation="border" />
            </div>
            <div className="loading-shadow"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCandidate;
