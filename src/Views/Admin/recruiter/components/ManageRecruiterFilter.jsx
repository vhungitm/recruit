import { CButton } from '@coreui/react';
import { Input } from 'Components/Fields';
import { SelectField } from 'Components/FormFields';
import { useEffect, useState } from 'react';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export const ManageRecruiterFilter = props => {
  const {
    tabId,

    // search
    search,
    handleSearch,

    // filter
    filter,
    filterQuantity,
    handleResetFilter,
    handleFilter
  } = props;

  const { control, reset, handleSubmit } = useForm({
    defaultValues: filter
  });

  useEffect(() => {
    reset(filter);
  }, [filter, reset]);

  // Filter
  const [showFilter, setShowFilter] = useState(false);

  const handleShowFitler = () => {
    setShowFilter(!showFilter);
  };
  const handleCloseFilter = () => setShowFilter(false);

  // Filter options
  const requestExtensionOptions = [
    { value: '', label: 'Tất cả' },
    { value: true, label: 'Có' },
    { value: false, label: 'Không' }
  ];

  // Return
  return (
    <>
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
        <div className="controls">
          {tabId === 3 && (
            <Button
              className={`filter-btn${showFilter ? ' show' : ''}`}
              onClick={handleShowFitler}
            >
              <img
                src="/Assets/images/jobpost/filter.png"
                className="img"
                alt="filter-btn"
              />
              Bộ lọc
              <div className="filter-arrow" />
              <div className="filter-triangle" />
              {filterQuantity > 0 && (
                <Badge pill bg="danger" className="filter-quantity">
                  {filterQuantity}
                </Badge>
              )}
            </Button>
          )}
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
        </div>
      </div>
      {showFilter && tabId === 3 && (
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
                <Row>
                  <Col xl={2}>
                    <SelectField
                      control={control}
                      name="yeucaugiahan"
                      label="Yêu cầu gia hạn"
                      options={requestExtensionOptions}
                    />
                  </Col>
                  <Col xl={8} />
                  <Col>
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
                        <CButton type="submit" className="filter-btn">
                          Áp dụng
                        </CButton>
                      </div>
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
