import { useEffect, useState } from 'react';
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react';
import { CCol, CRow } from '@coreui/react';
import candidateAPI from 'API/candidateAPI';
import { useParams } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { pdfjs } from 'react-pdf';
import ManageCandidatePopupCVProfile from './components/ManageCandidatePopupCVProfile';
import ManageCandidatePopupCVOfUser from './components/ManageCandidatePopupCVOfUser';
import { delay, handleDownloadCv, PrintToPdf } from 'utils';
import 'SCSS/_candidateDetail.scss';

const CandidateDetails = () => {
  const params = useParams();
  // Candidate details
  const [candidateDetails, setCandidateDetails] = useState([]);
  const [candidateInfor, setCandidateInfor] = useState([]);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [eye, setEye] = useState(true);
  const [showCv, setShowCv] = useState(false);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [workExp, setWorkExp] = useState([]);

  // Effect load detail data
  useEffect(() => {
    const candidateDetailData = async () => {
      try {
        const response = await candidateAPI.fetch(params.id);
        if (response.succeeded) {
          const { data } = response;
          setSkills(data.kynang);
          setEducation(data.hocvan);
          setWorkExp(data.kinhnghiemlamviec);
          setCandidateDetails(data.chitietungtuyen);
          setCandidateInfor(data.thongtinungvien);
        }
      } catch (error) {
        if (error.response) {
          console.log('error', error.response);
        }
      }
    };
    candidateDetailData();
  }, [params.id]);

  const handleDownloadCvOfUser = async () => {
    setShowViewDetails(true);
    setEye(false);
    await delay(500);
    PrintToPdf(candidateInfor);
    setShowViewDetails(false);
    await delay(500);
    setEye(true);
  };

  const handleShowViewDetailCV = () => {
    setShowViewDetails(true);
  };
  const handleCloseViewDetailCV = () => {
    setShowViewDetails(false);
  };

  const handleShowCv = () => {
    setShowCv(true);
  };
  const handleCloseCv = () => {
    setShowCv(false);
  };

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="wrap-detail">
      <div className="header-detail">
        <div className="bread-crumb">
          <CBreadcrumb>
            <CBreadcrumbItem
              href="/ManageCV"
              target="_self"
              className="first-breadcrumb"
            >
              Quản lý CV
            </CBreadcrumbItem>
            <CBreadcrumbItem className="second-breadcrumb">
              Chi tiết ứng viên
            </CBreadcrumbItem>
          </CBreadcrumb>
        </div>
        <div className="title-detail-candidate">
          CHI TIẾT TÀI KHOẢN ỨNG VIÊN
        </div>
        <div className="card-detail">
          <CRow className="candidate-rows">
            <CCol xs={3} className="candidate-cols">
              <p className="item-title" id="item-title">
                Họ và tên
              </p>
              <p className="item-infor" id="item-infor">
                {candidateInfor.hoten}
              </p>
            </CCol>
            <CCol xs={3} className="candidate-cols">
              <p className="item-title" id="item-title">
                Email
              </p>
              <p className="item-infor" id="item-infor">
                {candidateInfor.email}
              </p>
            </CCol>
            <CCol xs={3} className="candidate-cols">
              <p className="item-title" id="item-title">
                Số điện thoại
              </p>
              <p className="item-infor" id="item-infor">
                {candidateInfor.sodienthoai}
              </p>
            </CCol>
          </CRow>
        </div>
      </div>
      <div className="title-detail-candidate" style={{ marginTop: '8px' }}>
        CHI TIẾT TỨNG TUYẾN
      </div>

      {candidateDetails.map(item => (
        <div className="card-detail" key={item.stt}>
          <div className="content-sub-title" id="content-sub-title">
            <div className="img-sub-title" id="img-sub-title"></div>
            <p className="sub-title" id="sub-title">
              ID TIN TUYỂN: {item.jobPostRefID}
            </p>
          </div>
          <CRow className="candidate-rows">
            <CCol xs={3} className="candidate-cols">
              <p className="item-title" id="item-title">
                Vị trí tuyển dụng
              </p>
              <p className="item-infor" id="item-infor">
                {item.vitrituyendung}
              </p>
            </CCol>
            <CCol xs={3} className="candidate-cols">
              <p className="item-title" id="item-title">
                Ngày gửi
              </p>
              <p className="item-infor" id="item-infor">
                {item.ngaygui}
              </p>
            </CCol>
          </CRow>
          <CRow className="candidate-rows">
            <CCol className="candidate-cols">
              <p className="item-title" id="item-title">
                Nội dung
              </p>
              <p className="item-infor" id="item-infor">
                {item.noidung}
              </p>
            </CCol>
          </CRow>
          <CRow className="candidate-rows">
            <CCol className="candidate-cols">
              <p className="item-title" id="item-title">
                Hồ sơ ứng tuyển
              </p>
              <div className="recruit-action">
                <p className="item-infor" id="item-infor">
                  {item.isCV ? 'CV' : 'Hồ sơ trực tuyến'}
                </p>
                <div className="view-detail">
                  <Tooltip arrow title="Chi tiết">
                    <img
                      className="file-detail"
                      src={
                        process.env.PUBLIC_URL +
                        `/Assets/images/candidate/Detail.png`
                      }
                      alt=""
                      onClick={
                        item.isCV ? handleShowCv : handleShowViewDetailCV
                      }
                    />
                  </Tooltip>
                  <Tooltip arrow title="Tải file">
                    <img
                      onClick={
                        item.isCV
                          ? () => handleDownloadCv(candidateInfor)
                          : handleDownloadCvOfUser
                      }
                      className="file-export"
                      src={
                        process.env.PUBLIC_URL +
                        `/Assets/images/candidate/export_csv.png`
                      }
                      alt=""
                    />
                  </Tooltip>
                </div>
              </div>
            </CCol>
          </CRow>
        </div>
      ))}

      <ManageCandidatePopupCVProfile
        show={showViewDetails}
        onClose={handleCloseViewDetailCV}
        candidateAccountDetail={candidateInfor}
        education={education}
        workExp={workExp}
        skills={skills}
        isCV={candidateDetails.map(item => item.isCV)}
        eye={eye}
      />

      <ManageCandidatePopupCVOfUser
        show={showCv}
        onClose={handleCloseCv}
        candidateAccountDetail={candidateInfor}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
        numPages={numPages}
        download={() => handleDownloadCv(candidateInfor)}
      />
    </div>
  );
};
export default CandidateDetails;
