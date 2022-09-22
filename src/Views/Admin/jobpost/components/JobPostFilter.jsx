import { Input } from 'Components/Fields/Input';
import { DateRangeField, SelectField } from 'Components/FormFields';
import { useEffect, useState } from 'react';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export const JobPostFilter = props => {
  const {
    tabId,

    // Search
    search,
    handleSearch,

    // Filter
    filterList,
    filterQuantity,
    filter,
    handleFilter,
    handleResetFilter
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
  const [cityOptions, setCityOptions] = useState();
  const [vacancyOptions, setVacancyOptions] = useState([]);
  const [salaryDealOptions, setSalaryDealOptions] = useState([]);
  const experienceOptions = [
    { value: '', label: 'Tất cả' },
    { value: true, label: 'Có' },
    { value: false, label: 'Không' }
  ];
  const [workingStatusOptions, setWorkingStatusOptions] = useState([]);
  const quickInterviewOptions = [
    { value: '', label: 'Tất cả' },
    { value: 'Đã lên lịch', label: 'Đã lên lịch' },
    { value: 'Đã nhận yêu cầu', label: 'Đã nhận yêu cầu' },
    { value: 'Đang diễn ra', label: 'Đang diễn ra' },
    { value: 'Không áp dụng', label: 'Không áp dụng' }
  ];
  const statusOptions = [
    { value: '', label: 'Tất cả' },
    { value: true, label: 'Hiện' },
    { value: false, label: 'Ẩn' }
  ];

  // Update filter options
  useEffect(() => {
    if (filterList) {
      const { danhsachcongty, hinhthuclamviec, mucluong, vitrituyendung } =
        filterList;

      const newCityOptions = [
        { value: '', label: 'Tất cả' },
        ...danhsachcongty.map(item => ({ value: item, label: item }))
      ];
      const newWorkingStatusOptions = [
        { value: '', label: 'Tất cả' },
        ...hinhthuclamviec.map(item => ({ value: item.name, label: item.name }))
      ];
      const newSalaryDealOptions = [
        { value: '', label: 'Tất cả' },
        ...mucluong.map(item => ({ value: item.name, label: item.name }))
      ];
      const newVacancyOptions = [
        { value: '', label: 'Tất cả' },
        ...vitrituyendung.map(item => ({ value: item, label: item }))
      ];

      setCityOptions(newCityOptions);
      setWorkingStatusOptions(newWorkingStatusOptions);
      setSalaryDealOptions(newSalaryDealOptions);
      setVacancyOptions(newVacancyOptions);
    }
  }, [filterList]);

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
          <Button
            className={showFilter ? 'filter-btn show' : 'filter-btn'}
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
      {showFilter && (
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
                  <Col xl={2}>
                    <SelectField
                      control={control}
                      name="tencongty"
                      label="Tên công ty"
                      options={cityOptions}
                      placeholder="Tất cả"
                    />
                  </Col>
                  <Col xl={2}>
                    <SelectField
                      control={control}
                      name="vitrituyendung"
                      label="Vị trí tuyển dụng"
                      placeholder="Tất cả"
                      options={vacancyOptions}
                    />
                  </Col>
                  <Col xl={2}>
                    <SelectField
                      control={control}
                      name="mucluong"
                      label="Mức lương"
                      placeholder="Tất cả"
                      options={salaryDealOptions}
                    />
                  </Col>
                  <Col xl={2}>
                    <SelectField
                      control={control}
                      name="cankinhnghiem"
                      label="Cần kinh nghiệm"
                      placeholder="Tất cả"
                      options={experienceOptions}
                    />
                  </Col>
                  <Col xl={2}>
                    <SelectField
                      control={control}
                      name="hinhthuclamviec"
                      label="Hình thức làm việc"
                      placeholder="Tất cả"
                      options={workingStatusOptions}
                    />
                  </Col>
                  {tabId !== 0 && (
                    <Col xl={2}>
                      <DateRangeField
                        control={control}
                        name="khoangthoigiandangtin"
                        label="Khoảng thời gian đăng tin"
                        wrapperAlign="right"
                        placeholder="Từ ngày đến ngày"
                      />
                    </Col>
                  )}
                  {tabId === 1 && (
                    <>
                      <Col xl={2}>
                        <SelectField
                          control={control}
                          name="phongvannhanh"
                          label="Phỏng vấn nhanh"
                          placeholder="Tất cả"
                          options={quickInterviewOptions}
                        />
                      </Col>
                      <Col xl={2}>
                        <SelectField
                          control={control}
                          name="trangthaitin"
                          label="Trạng thái tin"
                          placeholder="Tất cả"
                          options={statusOptions}
                        />
                      </Col>
                    </>
                  )}
                  {tabId === 1 ? (
                    <Col xl={6} />
                  ) : tabId === 0 ? null : tabId === 2 ? (
                    <Col xl={10} />
                  ) : (
                    <Col xl={10} />
                  )}
                  <Col xl={2}>
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
