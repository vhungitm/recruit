import React from 'react';
import { CCol, CContainer, CRow } from '@coreui/react';
import { Spinner } from 'react-bootstrap';

const ManageCandidateCVProfile = props => {
  const { loading, candidateAccountDetail, education, workExp, skills, popup } =
    props;

  return !loading ? (
    <div className="information" id="information">
      <div className="information-row" id="information-row">
        <div className="candidate-info" id="candidate-info">
          <div id="candidate-info-img">
            <img
              src="/Assets/images/candidate/avatar-candidate.png"
              alt="candidate avatar"
              id="img-candidate-avatar"
            ></img>
          </div>
          <div className="candidate-title" id="candidate-title">
            <CContainer id="candidate-container">
              <CRow className="candidate-rows">
                <p className="candidate-name" id="candidate-name">
                  {candidateAccountDetail.hoten}
                </p>
              </CRow>
              <CRow className="candidate-rows">
                <p className="candidate-position" id="candidate-position">
                  {candidateAccountDetail.vitrilamviec}
                </p>
              </CRow>
              {popup ? (
                ''
              ) : (
                <CRow className="candidate-rows">
                  <p
                    className="candidate-status"
                    dangerouslySetInnerHTML={{
                      __html: candidateAccountDetail.trangthai
                    }}
                  ></p>
                </CRow>
              )}
            </CContainer>
          </div>
        </div>

        <CContainer id="candidate-container">
          <CRow className="candidate-rows">
            <CCol xs={4} className="candidate-cols">
              <p className="item-title" id="item-title">
                Email
              </p>
              <p className="item-infor" id="item-infor">
                {candidateAccountDetail.email}
              </p>
            </CCol>
            <CCol xs={2} className="candidate-cols">
              <p className="item-title" id="item-title">
                Số điện thoại
              </p>
              <p className="item-infor" id="item-infor">
                {candidateAccountDetail.sodienthoai}
              </p>
            </CCol>
            <CCol xs={2} className="candidate-cols">
              <p className="item-title" id="item-title">
                Ngày sinh
              </p>
              <p className="item-infor" id="item-infor">
                {candidateAccountDetail.ngaysinh}
              </p>
            </CCol>
            <CCol xs={4} className="candidate-cols">
              <p className="item-title" id="item-title">
                Địa chỉ
              </p>
              <p className="item-infor" id="item-infor">
                {candidateAccountDetail.diachi}
              </p>
            </CCol>
          </CRow>
          <CRow className="candidate-rows">
            <CCol xs={4} className="candidate-cols">
              <p className="item-title" id="item-title">
                Hình thức làm việc
              </p>
              <p className="item-infor" id="item-infor">
                {candidateAccountDetail.hinhthuclamviec}
              </p>
            </CCol>
            <CCol xs={2} className="candidate-cols">
              <p className="item-title" id="item-title">
                Cấp bậc
              </p>
              <p className="item-infor" id="item-infor">
                {candidateAccountDetail.capbac}
              </p>
            </CCol>
            <CCol xs={2} className="candidate-cols">
              <p className="item-title" id="item-title">
                Mức lương
              </p>
              <p className="item-infor" id="item-infor">
                {candidateAccountDetail.mucluong}
              </p>
            </CCol>
          </CRow>
        </CContainer>

        <div className="row-edit" id="row-edit">
          <div className="left-timeline" id="left-timeline">
            <div className="content-sub-title" id="content-sub-title">
              <div className="img-sub-title" id="img-sub-title"></div>
              <p className="sub-title" id="sub-title">
                HỌC VẤN
              </p>
            </div>

            {education.map((item, index) => {
              return (
                <div className="timelineBody" id="timelineBody" key={index}>
                  <ul className="timeline" id="timeline">
                    <li>
                      <div className="timelineDot" id="timelineDot">
                        <img
                          className="timelineDot-img"
                          src={
                            process.env.PUBLIC_URL +
                            `/Assets/images/candidate/Circle.png`
                          }
                          alt=""
                        />
                      </div>
                      <div className="timelineDate" id="timelineDate">
                        {item.thoigianhoc}
                      </div>
                      <div className="timelineWork" id="timelineWork">
                        <div
                          className="timelineWork-schoolName"
                          id="timelineWork-schoolName"
                        >
                          {item.tentruonghoc}
                        </div>
                        <div>
                          <div
                            className="timelineDescription"
                            id="timelineDescription"
                          >
                            <small className="description-left">
                              Trình độ:
                            </small>
                            <small
                              className="description-right"
                              id="timelineDescriptionInfLeft"
                            >
                              {item.trinhdo}
                            </small>
                          </div>
                          <div
                            className="timelineDescription"
                            id="timelineDescription"
                          >
                            <small className="description-left">
                              Ngành học:
                            </small>
                            <small
                              className="description-right"
                              id="timelineDescriptionInf"
                            >
                              {item.nganhhoc}
                            </small>
                          </div>
                          <div
                            className="timelineDescription"
                            id="timelineDescription"
                          >
                            <small className="description-left">GPA:</small>
                            <small
                              className="description-right"
                              id="timelineDescriptionInfLeft"
                            >
                              {item.gpa}
                            </small>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="right-timeline" id="right-timeline">
            <div className="content-sub-title" id="content-sub-title">
              <div className="img-sub-title" id="img-sub-title"></div>
              <p className="sub-title" id="sub-title">
                KINH NGHIỆM LÀM VIỆC
              </p>
            </div>
            {workExp.map((item, index) => {
              return (
                <div className="timelineBody" id="timelineBody" key={index}>
                  <ul className="timeline" id="timeline">
                    <li>
                      <div className="timelineDot" id="timelineDot">
                        <img
                          className="timelineDot-img"
                          src={
                            process.env.PUBLIC_URL +
                            `/Assets/images/candidate/Circle.png`
                          }
                          alt=""
                        />
                      </div>
                      <div className="timelineDate" id="timelineDate">
                        {item.thoigianlam}
                      </div>
                      <div className="timelineWork" id="timelineWork">
                        <div
                          className="timelineWork-schoolName"
                          id="timelineWork-schoolName"
                        >
                          {item.tencongty}
                        </div>
                        <div>
                          <div
                            className="timelineDescription"
                            id="timelineDescription"
                          >
                            <small className="timelineWork-description-left">
                              Vị trí:
                            </small>
                            <small
                              className="timelineWork-description-right"
                              id="timelineDescriptionInfRight"
                            >
                              {item.vitri}
                            </small>
                          </div>
                          <div
                            className="timelineDescription"
                            id="timelineDescription"
                          >
                            <small className="timelineWork-description-left">
                              Tóm tắt:
                            </small>
                            <small
                              className="timelineWork-description-right"
                              id="timelineDescriptionInfR"
                            >
                              {item.tomtat}
                            </small>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="datatable" id="datatable">
          <div className="content-sub-title">
            <div className="img-sub-title"></div>
            <p className="sub-title">KỸ NĂNG</p>
          </div>
          <table className="table-detail" id="table-detail">
            <thead>
              <tr className="table-detail-tr">
                <td className="table-detail-td">Loại kỹ năng</td>
                <td className="table-detail-td">Số tháng kinh nghiệm</td>
              </tr>
              {skills.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray'}
                >
                  <td className="table-detail-td" id="table-detail-tdd">
                    {item.loaikynang}
                  </td>
                  <td className="table-detail-td" id="table-detail-tdd">
                    {item.sothangkinhnghiem}
                  </td>
                </tr>
              ))}
            </thead>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className="information" id="information">
      <div className="loading">
        <Spinner animation="border" />
      </div>
    </div>
  );
};

export default ManageCandidateCVProfile;
