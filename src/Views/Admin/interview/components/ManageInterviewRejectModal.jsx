import { Button, Modal } from 'react-bootstrap';

export const ManageInterviewRejectModal = props => {
  const { show, interview, onClose, onSubmit } = props;

  // Return
  return (
    <Modal className="interview-reject-modal" show={show} onHide={onClose}>
      <Modal.Header closeButton={true}></Modal.Header>
      <Modal.Body>
        <img
          className="img-88"
          src="/Assets/images/jobpost/reject-icon.png"
          alt="success-icon"
        />
        <div className="modal-title">Từ chối lịch phỏng vấn nhanh</div>
        <div className="interview-info">
          <div className="interview-item">
            <span className="interview-item-title">Ứng viên:</span>
            <span> {interview.hoten}</span>
          </div>
          <div className="interview-item">
            <span className="interview-item-title">Email:</span>
            <span> {interview.email}</span>
          </div>
          <div className="interview-item">
            <span className="interview-item-title">Thời gian phỏng vấn:</span>
            <span> {interview.thoigian}</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="cancel-btn" onClick={onClose}>
          Hủy
        </Button>
        <Button
          type="submit"
          className="confirm-btn"
          variant="danger"
          onClick={onSubmit}
        >
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
