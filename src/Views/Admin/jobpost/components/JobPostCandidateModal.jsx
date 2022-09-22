import { Modal, ModalBody, ModalHeader, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const JobPostCandidateModal = props => {
  const { loading, show, candidateList, onClose } = props;

  return (
    <Modal className="jobpost-candidate-modal" show={show} onHide={onClose}>
      <ModalHeader closeButton>
        <p className="modal-title">SỐ ỨNG VIÊN: {candidateList.length}</p>
      </ModalHeader>
      <ModalBody>
        <div className="table-responsive">
          {!loading && (
            <table>
              <thead>
                <tr>
                  <th>Họ và tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {candidateList.map(item => (
                  <tr key={item.candidateId}>
                    <td>{item.hoten}</td>
                    <td>{item.email}</td>
                    <td>{item.dienthoai}</td>
                    <td>
                      <Link to={`/ManageCandidateDetail/${item.candidateId}`}>
                        <img
                          className="img-20"
                          src={
                            process.env.PUBLIC_URL +
                            `/Assets/images/jobpost/view-detail.png`
                          }
                          alt="view-detail-icon"
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {loading && (
            <div className="loading">
              <Spinner animation="border" />
              <div className="loading-shadow"></div>
            </div>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};
