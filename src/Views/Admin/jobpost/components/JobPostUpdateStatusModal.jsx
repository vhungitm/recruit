import { Button, Modal } from 'react-bootstrap';

export const JobPostUpdateStatusModal = props => {
  const { show, onClose, onSubmit } = props;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <img
          className="img-88"
          src="/Assets/images/jobpost/unpublish-big.png"
          alt="Update status"
          style={{ marginBottom: 8 }}
        />

        <div className="modal-title">Xác nhận ẩn tin</div>
        <div className="modal-inform" style={{ marginBottom: 0 }}>
          Tin tuyển dụng sau khi ẩn sẽ được ẩn khỏi trang tma.vn
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button onClick={onSubmit}>Xác nhận</Button>
      </Modal.Footer>
    </Modal>
  );
};
