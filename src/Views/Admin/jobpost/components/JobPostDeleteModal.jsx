import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'react-bootstrap';

export const JobPostDeleteModal = props => {
  const { isDeleted, show, onClose, onSubmit } = props;

  return (
    <Modal show={show} onHide={onClose} centered>
      <ModalHeader closeButton={true}></ModalHeader>
      <ModalBody>
        <img
          className="modal-logo"
          src="/Assets/images/jobpost/logo-delete.png"
          alt="Delete JobPost"
        />

        {isDeleted ? (
          <div>
            <div className="modal-title text-danger">
              <div>Xác nhận</div>
              <div>xóa vĩnh viễn</div>
            </div>
            <div className="modal-message">
              Tin sau khi xóa vĩnh viễn sẽ biến mất hoàn toàn trên hệ thống và
              không thể khôi phục
            </div>
          </div>
        ) : (
          <div>
            <div className="modal-title text-danger">Xác nhận xóa tin</div>
            <div className="modal-message">
              <div>Tin sau khi xóa vẫn được lưu trữ ở danh</div>
              <div>sách tin đã xóa'</div>
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={onSubmit}>
          Xác nhận
        </Button>
      </ModalFooter>
    </Modal>
  );
};
