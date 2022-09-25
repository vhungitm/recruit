import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'react-bootstrap';

export const JobPostApproveOrRestoreModal = props => {
  const { isApprove, show, onClose, onSubmit } = props;

  // Approve Modal JSX
  const approveModal = (
    <Modal show={show} onHide={onClose} centered>
      <ModalHeader closeButton={true}></ModalHeader>
      <ModalBody>
        <img
          className="modal-logo"
          src="/Assets/images/jobpost/logo-success.png"
          alt="Approve JobPost"
        />
        <div className="modal-title">Xác nhận duyệt tin</div>
        <div className="modal-message">
          Tin tuyển dụng sau khi duyệt sẽ được đăng lên trang tma.vn
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button onClick={onSubmit}>Xác nhận</Button>
      </ModalFooter>
    </Modal>
  );

  // Restore Modal JSX
  const restoreModal = (
    <Modal show={show} onHide={onClose} centered>
      <ModalHeader closeButton={true}></ModalHeader>
      <ModalBody>
        <img
          className="modal-logo"
          src="/Assets/images/jobpost/logo-success.png"
          alt="Restore JobPost"
        />
        <p className="modal-title">Xác nhận khôi phục</p>
        <div className="modal-message">
          Tin sau khi được khôi phục sẽ chuyển đến danh sách tin chờ duyệt
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button onClick={onSubmit}>Xác nhận</Button>
      </ModalFooter>
    </Modal>
  );

  return isApprove ? approveModal : restoreModal;
};
