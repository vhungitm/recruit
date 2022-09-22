import { CButton } from '@coreui/react';
import { selectCurrentUser } from 'app/authSlice';
import { Input } from 'Components/Fields/Input';
import { DateRangeField, SelectField } from 'Components/FormFields';
import { useEffect, useState } from 'react';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export const DataTableFilter = props => {
  const {
    // search
    search,
    handleSearch,

    // filter
    filters,
    filterQuantity,
    filter,
    showFilter = true,

    handleFilter,
    handleResetFilter,
    // Checked item
    showApproveAll,
    numberChecked,
    handleShowApproveModal
  } = props;

  // Is admin role
  const isAdmin = useSelector(selectCurrentUser).roles.includes('SuperAdmin');

  // Use form
  const { control, reset, handleSubmit } = useForm({
    defaultValues: filter
  });

  useEffect(() => {
    reset(filter);
  }, [filter, reset]);

  // filter
  const [showFilterContent, setShowFilterContent] = useState(false);

  const handleShowFitler = () => {
    setShowFilterContent(!showFilterContent);
  };
  const handleCloseFilter = () => setShowFilterContent(false);

  // return
  return (
    <div className="feature">
      <div className="feature-header">
        <Input
          name="search"
          placeholder="Nhập từ khóa"
          groupClassName="search"
          iconEnd={
            <img src="/Assets/images/jobpost/search-icon.png" alt="search" />
          }
          value={search}
          onChange={handleSearch}
        />
        <div className="controls responsive">
          {showFilter && (
            <Button
              className={showFilterContent ? 'filter-btn show' : 'filter-btn'}
              onClick={handleShowFitler}
              variant={isAdmin ? 'primary' : 'secondary'}
            >
              <img
                src={
                  isAdmin
                    ? '/Assets/images/jobpost/filter.png'
                    : showFilterContent
                    ? '/Assets/images/jobpost/filter.png'
                    : '/Assets/images/jobpost/filter-primary.png'
                }
                className="img"
                alt="filter-btn"
              />
              Bộ lọc
              <div className="filter-arrow-down" />
              <div className="filter-triangle" />
              {filterQuantity > 0 && (
                <Badge pill bg="danger" className="filter-quantity">
                  {filterQuantity}
                </Badge>
              )}
            </Button>
          )}
          {isAdmin && (
            <Button
              className="export-btn"
              onClick={() => props.handleExportToExcel()}
            >
              <img
                className="img"
                src="/Assets/images/jobpost/download.png"
                alt="export to excel file"
              />
              Xuất file Excel
            </Button>
          )}
        </div>
      </div>

      {showFilter && showFilterContent && (
        <div className="feature-body">
          <div className="filter">
            <div className="filter-header">
              <div className="filter-arrow"></div>
              <div
                className="filter-close-btn"
                onClick={handleCloseFilter}
              ></div>
            </div>
            <div className="filter-body">
              <form onSubmit={handleSubmit(handleFilter)}>
                <Row className="g-2">
                  <div
                    className={
                      filters.length <= 5 ? 'col-10 row m-0 p-0' : 'row m-0 p-0'
                    }
                  >
                    {filters.map(item => (
                      <Col key={item.name} className="col-lg-3 col-md-4">
                        {item.type === 'date-range' ? (
                          <DateRangeField
                            control={control}
                            {...item}
                            wrapperAlign="right"
                            placeholder="Từ ngày đến ngày"
                          />
                        ) : (
                          <SelectField control={control} {...item} />
                        )}
                      </Col>
                    ))}
                  </div>
                  <div className={filters.length <= 5 ? 'col-2' : 'btn-apply'}>
                    <div className="filter-controls">
                      <div>
                        {filterQuantity > 0 && (
                          <Button
                            type="button"
                            className="unselect-btn"
                            variant="danger"
                            onClick={handleResetFilter}
                          >
                            Bỏ chọn
                          </Button>
                        )}
                      </div>
                      <div>
                        <Button type="submit" className="apply">
                          Áp dụng
                        </Button>
                      </div>
                    </div>
                  </div>
                </Row>
              </form>
            </div>
          </div>
        </div>
      )}

      {showApproveAll > 0 && (
        <div className={'approveButton'}>
          <span> {numberChecked} trường đã chọn</span>
          <CButton onClick={handleShowApproveModal}>Duyệt tất cả</CButton>
        </div>
      )}
    </div>
  );
};
