import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'react-bootstrap';

export const JobPostApproveOrRestoreModal = props => {
  const { isApprove, show, onClose, onSubmit } = props;

  return (
    <Modal className="approve-modal" show={show} onHide={onClose}>
      <ModalHeader closeButton={true}></ModalHeader>
      <ModalBody>
        <img
          className="img-88"
          src={
            process.env.PUBLIC_URL + `/Assets/images/jobpost/success-icon.png`
          }
          alt="success-icon"
        />
        <p className="modal-title">
          {isApprove ? 'Xác nhận duyệt tin' : 'Xác nhận khôi phục'}
        </p>
        <span className="modal-inform">
          {isApprove
            ? 'Tin tuyển dụng sau khi duyệt sẽ được đăng lên trang tma.vn'
            : 'Tin sau khi được khôi phục sẽ  chuyển đến danh sách tin chờ duyệt'}
        </span>
      </ModalBody>
      <ModalFooter>
        <Button className="cancel-btn" onClick={onClose}>
          Hủy
        </Button>

        <Button className="confirm-btn" onClick={onSubmit}>
          Xác nhận
        </Button>
      </ModalFooter>
    </Modal>
  );
};
