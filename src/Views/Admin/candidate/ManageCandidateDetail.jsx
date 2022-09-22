import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import candidateAPI from 'API/candidateAPI';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import { ManageCandidateModal } from './components/ManageCandidateModal';
import ManageCandidateCVProfile from './components/ManageCandidateCVProfile';
import ManageCandidatePopupCVProfile from './components/ManageCandidatePopupCVProfile';
import ManageCandidatePopupCVOfUser from './components/ManageCandidatePopupCVOfUser';
import { delay, handleDownloadCv } from 'utils';
import 'SCSS/_candidateDetail.scss';
import { Spinner } from 'react-bootstrap';

const CandidateDetail = () => {
  const [showViewDetails, setShowViewDetails] = useState(false);

  const params = useParams();
  const [showHandleModal, setShowHandleModal] = useState(false);
  const handleShowModal = () => setShowHandleModal(true);

  const handleCloseModal = () => setShowHandleModal(false);
  const handleShowViewDetailCV = () => {
    setShowViewDetails(true);
  };
  const handleCloseViewDetailCV = () => {
    setShowViewDetails(false);
  };
  // Candidate details
  const [candidateAccountDetail, setCandidateAccountDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(-1);
  const [applyPosition, setApplyPosition] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [workExp, setWorkExp] = useState([]);
  const [candidateDetails, setCandidateDetails] = useState([]);

  const candidateDetailListHeader = [
    { name: 'STT', field: 'ID' },
    { name: 'Công ty', field: 'company' },
    { name: 'Vị trí tuyển dụng', field: 'position' },
    { name: 'Ngày gửi', field: 'datesend' }
  ];

  // Effect load detail data
  useEffect(() => {
    const candidateDetailData = async () => {
      try {
        setLoading(true);
        const response = await candidateAPI.fetch(params.id);
        if (response.succeeded) {
          const { data } = response;
          setCandidateAccountDetail(data.thongtinungvien);
          setApplyPosition(data.vitridaungtuyen);
          setSkills(data.kynang);
          setEducation(data.hocvan);
          setWorkExp(data.kinhnghiemlamviec);
          setCandidateDetails(data.chitietungtuyen);
          if (data.thongtinungvien.trangthai.search('Hoạt động') >= 0) {
            setStatus(1);
          } else if (data.thongtinungvien.trangthai.search('Bị Khóa') >= 0) {
            setStatus(0);
          }
        }
      } catch (error) {
        if (error.response) {
          console.log('error', error.response);
        }
      } finally {
        setLoading(false);
      }
    };

    candidateDetailData();
  }, [params.id, status]);

  // Update status candidate
  const handleUpdateStatusCandidate = async () => {
    const response = await candidateAPI.updateStatus(
      candidateAccountDetail.candidateId
    );
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
      setStatus(response.data.isActive ? 1 : 0);
    }
  };

  //Show uploaded CV
  const [showCv, setShowCv] = useState(false);
  const handleShowCv = () => {
    setShowCv(true);
  };
  const handleCloseCv = () => {
    setShowCv(false);
  };

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);

  /*To Prevent right click on screen*/
  document.addEventListener('contextmenu', event => {
    event.preventDefault();
  });

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const hosodinhkem = candidateAccountDetail.hosodinhkem;

  return (
    <div className="wrap-detail">
      <div className="header-detail">
        <div className="bread-crumb">
          <CBreadcrumb>
            <CBreadcrumbItem
              href="/ManageCandidate"
              target="_self"
              className="first-breadcrumb"
            >
              Quản lý tài khoản ứng viên
            </CBreadcrumbItem>
            <CBreadcrumbItem className="second-breadcrumb">
              Chi tiết tài khoản ứng viên
            </CBreadcrumbItem>
          </CBreadcrumb>
        </div>
        <div className="title">
          <div className="title-page">CHI TIẾT TÀI KHOẢN ỨNG VIÊN</div>
          <div className="title-action">
            <button
              className={`${status === 1 ? 'btn-block' : 'btn-unblock'}`}
              onClick={handleShowModal}
            >
              {status === 1 ? 'Khóa tài khoản' : 'Mở khóa'}
            </button>
            <button className="edit" onClick={handleShowViewDetailCV}>
              Xuất hồ sơ
            </button>
          </div>
        </div>

        {/* Delete */}
        <ManageCandidateModal
          isApprove={status === 1}
          show={showHandleModal}
          onClose={handleCloseModal}
          onSubmit={handleUpdateStatusCandidate}
        />

        <ManageCandidatePopupCVProfile
          show={showViewDetails}
          onClose={handleCloseViewDetailCV}
          candidateAccountDetail={candidateAccountDetail}
          education={education}
          workExp={workExp}
          skills={skills}
          isCV={candidateDetails.map(item => item.isCV)}
          eye={true}
        />

        <ManageCandidatePopupCVOfUser
          show={showCv}
          onClose={handleCloseCv}
          candidateAccountDetail={candidateAccountDetail}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
          numPages={numPages}
          download={() => handleDownloadCv(candidateAccountDetail)}
        />
      </div>
      <div className="body-detail">
        {/* CV profile */}
        <div className="row">
          {/* Profile */}
          <div className="col left-detail">
            <ManageCandidateCVProfile
              loading={loading}
              showViewDetails={showViewDetails}
              candidateAccountDetail={candidateAccountDetail}
              education={education}
              workExp={workExp}
              skills={skills}
              status={false}
            />
          </div>

          {/* Wrap end */}
          <div className="col right-detail">
            <div className="body-right-detail">
              <div className="card-recruit">
                <div className="content-sub-title">
                  <div className="img-sub-title"></div>
                  <p className="sub-title">DANH SÁCH CÁC VỊ TRÍ ĐÃ ỨNG TUYỂN</p>
                </div>
                <div className="datatable">
                  {!loading && (
                    <table>
                      <thead>
                        <tr>
                          {candidateDetailListHeader.map((header, index) => (
                            <th key={index}>
                              <div className="item">{header.name}</div>
                            </th>
                          ))}
                          <th align="center">
                            <div className="controls">Thao tác</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {applyPosition.map(item => (
                          <tr key={item.stt}>
                            <td>{item.stt}</td>
                            <td>{item.tencongty}</td>
                            <td>{item.vitrituyendung}</td>
                            <td>{item.ngaygui}</td>
                            <td>
                              <Link to={`/jobPost/detail/${item.jobPostId}`}>
                                <Tooltip arrow title="Chi tiết">
                                  <img
                                    className="action"
                                    src={
                                      process.env.PUBLIC_URL +
                                      `/Assets/images/jobpost/view-detail.png`
                                    }
                                    alt=""
                                  />
                                </Tooltip>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* Position Register Loading */}
                  {loading && (
                    <div className="loading">
                      <Spinner animation="border" />
                    </div>
                  )}
                </div>
              </div>

              {/* Apply Profile */}
              <div className="card-recruit">
                <div className="content-sub-title">
                  <div className="img-sub-title"></div>
                  <p className="sub-title">HỒ SƠ ỨNG TUYỂN</p>
                </div>

                {/* Apply Profile Loading */}
                {!loading && candidateAccountDetail.hosodinhkem !== '' && (
                  <div className="export-url">
                    <div className="recruit-filename">
                      <p>
                        <a
                          className="recruit-link"
                          href={candidateAccountDetail.hosodinhkem}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {hosodinhkem && hosodinhkem.slice(34)}
                        </a>
                      </p>
                    </div>

                    <div className="recruit-action">
                      <Tooltip arrow title="Chi tiết">
                        <Link to="">
                          <img
                            className="file-detail"
                            onClick={handleShowCv}
                            src={
                              process.env.PUBLIC_URL +
                              `/Assets/images/candidate/Detail.png`
                            }
                            alt=""
                          />
                        </Link>
                      </Tooltip>
                      <Link to="">
                        <Tooltip arrow title="Tải file">
                          <img
                            onClick={() =>
                              handleDownloadCv(candidateAccountDetail)
                            }
                            className="file-export"
                            src={
                              process.env.PUBLIC_URL +
                              `/Assets/images/candidate/export_csv.png`
                            }
                            alt=""
                          />
                        </Tooltip>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Apply profile loading */}
                {loading && (
                  <div className="export-url">
                    <div className="loading">
                      <Spinner animation="border" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;
