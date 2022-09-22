import { CBreadcrumb, CBreadcrumbItem, CCol, CRow } from '@coreui/react';
import recruiterAccountAPI from 'API/recruiterAccountAPI.js';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { timeOutToast } from 'utils';
import 'SCSS/_manageRecruiterDetail.scss';
import {
  ManageRecruiterExtendModal,
  ManageRecruiterRejectModal
} from './components';

const ManagementRecruiterDetail = () => {
  const navigate = useNavigate();
  const params = useParams();

  // Job details
  const [recruiterAccountDetail, setRecruiterAccountDetail] = useState({});
  const [status, setStatus] = useState(-1);
  const [loading, setLoading] = useState(true);

  // Effect loading detail data
  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const res = await recruiterAccountAPI.fetch(params.id);
        if (res.succeeded) {
          const { data } = res;
          const { trangthaiduyet } = data;

          setRecruiterAccountDetail(data);
          if (trangthaiduyet.search('Bị khóa') >= 0) {
            setStatus(0);
          } else if (trangthaiduyet.search('Chờ duyệt') >= 0) {
            setStatus(1);
          } else if (trangthaiduyet.search('Đã duyệt') >= 0) {
            setStatus(2);
          } else if (trangthaiduyet.search('Hết hạn') >= 0) {
            setStatus(3);
          }
        }
      } catch (error) {
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    if (loading) fetchDetailData();
  }, [params.id, loading, navigate]);

  // Reject
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleShowRejectModal = () => {
    setShowRejectModal(true);
  };
  const handleCloseRejectModal = () => setShowRejectModal(false);

  // Handle reject
  const handleReject = async rejectFormValues => {
    try {
      const { reason, otherReason } = rejectFormValues;

      const response = await recruiterAccountAPI.reject({
        recruiterId: recruiterAccountDetail.recruiterId,
        reason: reason === 'Khác' ? otherReason : reason
      });

      if (response.succeeded) {
        navigate('/manageRecruiter?id=1');
        toast(`Đã không duyệt tài khoản số ${recruiterAccountDetail.id}`, {
          autoClose: timeOutToast
        });
      } else {
        toast(`Không duyệt tài khoản không thành công`, {
          autoClose: timeOutToast
        });
      }
    } catch (error) {
      toast(`Không duyệt tài khoản không thành công`, {
        autoClose: timeOutToast
      });
    } finally {
      setShowRejectModal(false);
    }
  };

  // Approve/extend
  const [showExtendModal, setShowExtendModal] = useState(false);

  // Handle show and close approve/extend modal
  const handleShowExtendModal = () => {
    setShowExtendModal(true);
  };

  const handleCloseExtendModal = () => setShowExtendModal(false);

  // Handle approve/extend
  const handleExtend = async formValues => {
    // Status = 1 => waiting account => approve
    // Status = 3 => expired account => extend
    try {
      const { durationInMonth } = formValues;

      const response =
        status === 1
          ? await recruiterAccountAPI.approve({
              recruiterIdList: [recruiterAccountDetail.recruiterId.toString()],
              durationInMonth: parseInt(durationInMonth)
            })
          : await recruiterAccountAPI.extend({
              recruiterIdList: [recruiterAccountDetail.recruiterId.toString()],
              durationInMonth: parseInt(durationInMonth)
            });

      if (response.succeeded) {
        toast(
          status === 1
            ? 'Đã duyệt thành công tài khoản'
            : 'Đã gia hạn thành công tài khoản',
          {
            autoClose: timeOutToast
          }
        );
      } else {
        toast(
          status === 1
            ? 'Duyệt tài khoản không thành công'
            : 'Gia hạn tài khoản không thành công',
          {
            autoClose: timeOutToast
          }
        );
      }
      setLoading(true);
    } catch (error) {
      toast(
        status === 1
          ? 'Duyệt tài khoản không thành công'
          : 'Gia hạn tài khoản không thành công',
        {
          autoClose: timeOutToast
        }
      );
    } finally {
      setShowExtendModal(false);
    }
  };

  // Return JSX
  return (
    <div className="wrap-recruiter-detail">
      <div className="header-detail">
        <div className="bread-crumb">
          <CBreadcrumb>
            <CBreadcrumbItem
              href="/manageRecruiter"
              target="_self"
              className="first-breadcrumb"
            >
              Quản lý tài khoản nhà tuyển dụng
            </CBreadcrumbItem>
            <CBreadcrumbItem className="second-breadcrumb">
              Chi tiết tài khoản
            </CBreadcrumbItem>
          </CBreadcrumb>
        </div>
        <div className="title">
          <div className="title-page">CHI TIẾT TÀI KHOẢN</div>
          {status === 1 && (
            <div className="title-action">
              <button className={`reject-btn`} onClick={handleShowRejectModal}>
                Không duyệt
              </button>
              <button className={`approve-btn`} onClick={handleShowExtendModal}>
                Duyệt
              </button>
            </div>
          )}
          {status === 3 && (
            <div className="title-action">
              <button className={`extend-btn`} onClick={handleShowExtendModal}>
                Gia hạn
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detail */}
      {!loading && (
        <div className="body-detail">
          <div className="information">
            <div className="gray-bg">
              <CRow className="">
                <CCol>
                  <div className="content-information-item">
                    <div className="information-item-header">
                      <p className="item-title">ID:</p>
                      <p className="item-infor">{recruiterAccountDetail.id}</p>
                    </div>
                  </div>
                </CCol>
                <CCol>
                  <div className="content-information-item">
                    <div className="img-sub-title"></div>
                    <div className="information-item-header">
                      <p className="item-title">Trạng thái duyệt: </p>
                      <p
                        className="item-infor"
                        dangerouslySetInnerHTML={{
                          __html: recruiterAccountDetail.trangthaiduyet
                        }}
                      ></p>
                    </div>
                  </div>
                </CCol>

                {(status === 0 || status === 2) && (
                  <CCol>
                    <div className="content-information-item">
                      <div className="img-sub-title"></div>
                      <div className="information-item-header">
                        <p className="item-title ">Số tin đăng:</p>
                        <p className="item-infor">
                          {recruiterAccountDetail.sotindang}
                        </p>
                      </div>
                    </div>
                  </CCol>
                )}
                <CCol>
                  <div className="content-information-item">
                    <div className="img-sub-title"></div>
                    <div className="information-item-header">
                      <p className="item-title">Ngày tạo tài khoản:</p>
                      <p className="item-infor">
                        {recruiterAccountDetail.ngaytaotaikhoan}
                      </p>
                    </div>
                  </div>
                </CCol>
                {(status === 0 || status === 2) && (
                  <CCol>
                    <div className="content-information-item">
                      <div className="img-sub-title"></div>
                      <div className="information-item-header">
                        <p className="item-title">Ngày hết hạn:</p>
                        <p className="item-infor">
                          {recruiterAccountDetail.ngayhethan}
                        </p>
                      </div>
                    </div>
                  </CCol>
                )}
              </CRow>
            </div>
            <div className="px-4">
              <CRow>
                <CCol>
                  <div className="item-title">Công ty</div>
                  <div className="item-infor">
                    {recruiterAccountDetail.tencongty}
                  </div>
                </CCol>
                <CCol>
                  <div className="item-title">Người đại diện</div>
                  <div className="item-infor">
                    {recruiterAccountDetail.nguoidaidien}
                  </div>
                </CCol>
                <CCol>
                  <div className="item-title">Số điện thoại</div>
                  <div className="item-infor">
                    {recruiterAccountDetail.sodienthoai}
                  </div>
                </CCol>
              </CRow>
            </div>
            <div className="px-4">
              <CRow>
                <CCol>
                  <div className="item-title">Email</div>
                  <div className="item-infor">
                    {recruiterAccountDetail.email}
                  </div>
                </CCol>
                <CCol>
                  <div className="item-title">Địa chỉ</div>
                  <div className="item-infor">
                    {recruiterAccountDetail.diachi}
                  </div>
                </CCol>
              </CRow>
            </div>
          </div>

          {/* MODAL */}
          {/* Reject Modal */}
          <ManageRecruiterRejectModal
            show={showRejectModal}
            onClose={handleCloseRejectModal}
            onSubmit={handleReject}
          />

          {/* Approve/Extend Modal */}
          <ManageRecruiterExtendModal
            isExtend={status === 3}
            isDetail={true}
            show={showExtendModal}
            onClose={handleCloseExtendModal}
            onSubmit={handleExtend}
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="body-detail">
          <div className="information">
            <div className="loading">
              <Spinner animation="border" />
            </div>
            <div className="loading-shadow"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementRecruiterDetail;
