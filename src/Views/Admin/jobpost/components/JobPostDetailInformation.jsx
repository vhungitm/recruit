import { CheckBoxField, InputField, SelectField } from 'Components/FormFields';
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Editor from 'Views/pages/editor/Editor';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const JobPostDetailInformation = props => {
  const {
    pageType,
    isAdmin,
    loading,
    jobDetail,
    status,

    // Use form
    control,
    register,
    setValue,
    errors,

    // Read more
    readMore,
    setReadMore,

    // Description
    description,
    setDescription,

    // Select data
    ngayhethan,
    workingStatusData,
    salaryDealData,
    rankData,
    degreeData,
    locationData,

    // Candiate list
    handleShowCandidateModal
  } = props;

  return (
    <div
      className={
        isAdmin ? 'col-lg-8 information' : 'col-lg-8 information w-100'
      }
    >
      <div className="information-header">
        <div className="information-header-tab"></div>
        <div className="information-header-title">NỘI DUNG TIN ĐĂNG TUYỂN</div>
      </div>

      {/* Information body */}
      {!loading && (
        <div className="information-body">
          {(isAdmin || (!isAdmin && pageType === 0)) && (
            <div className="information-items bg-gray">
              <div className="content-information-item">
                <div className="information-item-header">
                  <p className="item-title">ID:</p>
                  <p className="item-infor">{jobDetail.id}</p>
                </div>
              </div>
              {status === 1 && (
                <div className="content-information-item">
                  <div className="img-sub-title"></div>
                  <div className="information-item-header">
                    <p className="item-title">Trạng thái tin:</p>
                    <p
                      className={`item-infor ${
                        jobDetail.trangthaitin === 'Hiện' ? 'show' : 'hide'
                      }`}
                    >
                      {jobDetail.trangthaitin}
                    </p>
                  </div>
                </div>
              )}
              <div className="content-information-item">
                <div className="img-sub-title"></div>
                <div className="information-item-header">
                  <p className="item-title">Trạng thái duyệt: </p>
                  <p
                    className="item-infor"
                    style={{ marginTop: 0 }}
                    dangerouslySetInnerHTML={{
                      __html: jobDetail.trangthaiduyet
                    }}
                  ></p>
                </div>
              </div>
              {(status === 1 || status === 2 || status === 3) && (
                <div className="content-information-item">
                  <div className="img-sub-title"></div>
                  <div className="information-item-header">
                    <p className="item-title ">Đã ứng tuyển:</p>
                    <p className="item-infor">
                      <img
                        className="img-16"
                        onClick={handleShowCandidateModal}
                        src="/Assets/images/jobpost/view-detail.png"
                        alt="Show candidate modal"
                      />
                      {jobDetail.sohosoungtuyen}
                    </p>
                  </div>
                </div>
              )}

              {(status === 1 || status === 2 || status === 3) && (
                <>
                  <div className="content-information-item">
                    <div className="img-sub-title"></div>
                    <div className="information-item-header">
                      <p className="item-title">Lượt xem:</p>
                      <p className="item-infor">{jobDetail.soluotxem}</p>
                    </div>
                  </div>

                  <div className="content-information-item">
                    <div className="img-sub-title"></div>
                    <div className="information-item-header">
                      <p className="item-title">Ngày hết hạn:</p>
                      {pageType === 2 ? (
                        <>
                          <DatePicker
                            className={
                              !ngayhethan && errors.ngayhethan
                                ? 'datepicker form-control is-invalid'
                                : 'datepicker form-control'
                            }
                            closeOnScroll={true}
                            isClearable
                            name="ngayhethan"
                            placeholderText="Chọn ngày hết hạn"
                            selected={ngayhethan}
                            {...register('ngayhethan')}
                            onChange={date => setValue('ngayhethan', date)}
                          />
                          {!ngayhethan && errors?.ngayhethan && (
                            <div className="invalid-feedback">
                              {errors.ngayhethan.message}
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="item-infor">{jobDetail.ngayhethan}</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="information-items">
            <div className="information-item">
              <p className="item-title">Vị trí tuyển dụng</p>
              {pageType === 1 || pageType === 2 ? (
                <InputField
                  control={control}
                  name="vitrituyendung"
                  className="item-infor"
                  placeholder="Nhập vị trí tuyển dụng"
                />
              ) : (
                <p className="item-infor">{jobDetail.vitrituyendung}</p>
              )}
            </div>
            <div className="information-item">
              <p className="item-title">Hình thức làm việc</p>
              {pageType === 1 || pageType === 2 ? (
                workingStatusData.length > 0 && (
                  <SelectField
                    control={control}
                    name="hinhthuclamviec"
                    placeholder="Chọn hình thức làm việc"
                    options={workingStatusData.map(item => ({
                      value: item.name,
                      label: item.name
                    }))}
                  />
                )
              ) : (
                <p className="item-infor">{jobDetail.hinhthuclamviec}</p>
              )}
            </div>
            <div className="information-item">
              <p className="item-title">Mức lương</p>
              {pageType === 1 || pageType === 2 ? (
                salaryDealData.length > 0 && (
                  <SelectField
                    control={control}
                    name="mucluong"
                    size="small"
                    placeholder="Chọn mức lương"
                    options={salaryDealData.map(item => ({
                      value: item.name,
                      label: item.name
                    }))}
                  />
                )
              ) : (
                <p className="item-infor">{jobDetail.mucluong}</p>
              )}
            </div>
            <div className="information-item">
              <p className="item-title">Cấp bậc</p>
              {pageType === 1 || pageType === 2 ? (
                rankData.length > 0 && (
                  <SelectField
                    name="capbac"
                    size="small"
                    placeholder="Chọn cấp bậc"
                    control={control}
                    options={rankData.map(item => ({
                      value: item.name,
                      label: item.name
                    }))}
                  />
                )
              ) : (
                <p className="item-infor">{jobDetail.capbac}</p>
              )}
            </div>
            <div className="information-item">
              <p className="item-title">Học vấn</p>
              {pageType === 1 || pageType === 2 ? (
                degreeData.length > 0 && (
                  <SelectField
                    name="hocvan"
                    size="small"
                    placeholder="Chọn học vấn"
                    control={control}
                    options={degreeData.map(item => ({
                      value: item.name,
                      label: item.name
                    }))}
                  />
                )
              ) : (
                <p className="item-infor">{jobDetail.hocvan}</p>
              )}
            </div>
            <div className="information-item"></div>
            <div className="information-item">
              <p className="item-title">Cần kinh nghiệm</p>
              {pageType === 1 || pageType === 2 ? (
                <CheckBoxField
                  className="form-check"
                  control={control}
                  name="cankinhnghiem"
                />
              ) : (
                <p
                  className="item-infor"
                  dangerouslySetInnerHTML={{
                    __html: jobDetail.cankinhnghiem
                  }}
                ></p>
              )}
            </div>
            <div className="information-item">
              <p className="item-title">Số lượng</p>
              {pageType === 1 || pageType === 2 ? (
                <InputField
                  control={control}
                  name="soluong"
                  placeholder="Nhập số lượng"
                  type="number"
                  min="0"
                  max="1000"
                />
              ) : (
                <p className="item-infor">{jobDetail.soluong}</p>
              )}
            </div>
            <div className="information-item">
              <p className="item-title">Hot Job</p>
              {pageType === 1 || pageType === 2 ? (
                <CheckBoxField control={control} name="hotjob" value={true} />
              ) : (
                <p
                  className="item-infor"
                  dangerouslySetInnerHTML={{ __html: jobDetail.hotjob }}
                ></p>
              )}
            </div>
            <div className="information-item">
              <p className="item-title">Địa điểm </p>
              {pageType === 1 || pageType === 2 ? (
                locationData.length > 0 && (
                  <SelectField
                    name="diadiem"
                    placeholder="Chọn địa điểm"
                    control={control}
                    options={locationData.map(item => ({
                      value: item.name,
                      label: item.name
                    }))}
                  />
                )
              ) : (
                <p className="item-infor">{jobDetail.diadiem}</p>
              )}
            </div>
            {isAdmin && (
              <>
                <div className="information-item">
                  <p className="item-title">Công ty</p>
                  <p className="item-infor">{jobDetail.tencongty}</p>
                </div>
                <div className="information-item"></div>
              </>
            )}

            <div className="information-item">
              <p className="item-title">Nơi nhận</p>
              {pageType === 1 || pageType === 2 ? (
                <InputField
                  control={control}
                  name="noinhan"
                  className="item-infor"
                  placeholder="Nhập nơi nhận"
                />
              ) : (
                <p className="item-infor">{jobDetail.noinhan}</p>
              )}
            </div>

            {isAdmin && (
              <div className="information-item">
                <p className="item-title">Địa chỉ</p>
                <p className="item-infor">{jobDetail.diachi}</p>
              </div>
            )}
          </div>
          <div
            className={
              pageType === 1 || pageType === 2 || readMore
                ? 'descrip'
                : 'descrip hide'
            }
          >
            <p>Mô tả chi tiết</p>
            {pageType === 1 || pageType === 2 ? (
              <Editor value={description} onChange={c => setDescription(c)} />
            ) : (
              <>
                <div className={readMore ? 'desc-button' : 'desc-button hide'}>
                  <Button
                    variant="secondary"
                    className="read-more-btn"
                    onClick={() => {
                      setReadMore(!readMore);
                    }}
                  >
                    <span>{readMore ? 'Rút gọn' : 'Xem thêm'}</span>
                    <img
                      className="read-more"
                      src={
                        readMore
                          ? '/Assets/images/jobpost/angle-small-up.png'
                          : '/Assets/images/jobpost/angle-small-down.png'
                      }
                      alt="more"
                    />
                  </Button>
                </div>
                <div
                  className="desc-detail"
                  dangerouslySetInnerHTML={{
                    __html: jobDetail.motachitiet
                  }}
                ></div>
              </>
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="information-body">
          <div className="loading">
            <Spinner animation="border" />
          </div>
        </div>
      )}
    </div>
  );
};
