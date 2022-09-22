import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

export const DataTablePagination = ({
  // Pagination
  totalItems = 0,
  currentPage = 1,
  handleChangePage
}) => {
  // Items per page
  const itemsPerPageOptions = [
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 30, label: 30 },
    { value: 40, label: 40 },
    { value: 50, label: 50 }
  ];

  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState({
    value: 10,
    label: 10
  });

  const handleChangeItemsPerPage = value => {
    setSelectedItemsPerPage(value);
    handleChangePage(value.value, currentPage);
  };

  useEffect(() => {
    const newTotalPages = Math.ceil(totalItems / selectedItemsPerPage.value);

    if (currentPage > newTotalPages)
      handleChangePage(selectedItemsPerPage.value, newTotalPages);
    setTotalPages(newTotalPages);
  }, [totalItems, selectedItemsPerPage.value, handleChangePage, currentPage]);

  // page
  const paginationItems = [];
  const [totalPages, setTotalPages] = useState(0);

  const onPageChange = event => {
    handleChangePage(selectedItemsPerPage.value, event.selected + 1);
  };

  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  // Return
  return (
    <>
      <div className={'wrap-pagination'}>
        <div className="d-flex">
          {
            <div className="itemPerPage">
              <span className="item"> Số lượng hiển thị</span>
              <div className="select-item-per-page">
                <Select
                  id="demo-simple-select"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  value={selectedItemsPerPage}
                  options={itemsPerPageOptions}
                  onChange={handleChangeItemsPerPage}
                />
              </div>

              <span className="totalItem">
                trong tổng số {totalItems} dữ liệu
              </span>
            </div>
          }
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <img alt="next" src={'/Assets/images/jobpost/next.png'}></img>
          }
          onPageChange={onPageChange}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={totalPages}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          previousLabel={
            <img alt="prev" src={'/Assets/images/jobpost/prev.png'}></img>
          }
          renderOnZeroPageCount={null}
        ></ReactPaginate>
      </div>
    </>
  );
};
