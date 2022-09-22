import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'react-bootstrap';

export const ManageCandidateModal = props => {
  const { isApprove, show, onClose, onSubmit } = props;
  return (
    <Modal
      className="approve-modal un-block-modal"
      show={show}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader closeButton={true}></ModalHeader>
      <ModalBody>
        <img
          className="img-88"
          src={
            process.env.PUBLIC_URL +
            `/Assets/images/candidate/${
              isApprove ? 'big_block.png' : 'big_unblock.png'
            }`
          }
          alt="block-icon"
        />
        <p className={isApprove ? 'modal-title' : 'modal-title color-green'}>
          {isApprove ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
        </p>
        <span className="modal-inform">
          {isApprove
            ? 'Bạn có muốn khóa tài khoản?'
            : 'Bạn có muốn mở khóa tài khoản?'}
        </span>
      </ModalBody>
      <ModalFooter>
        <Button className="cancel-btn" onClick={onClose} style={{}}>
          Thoát
        </Button>

        <Button id={isApprove ? 'btn-block' : ''} onClick={onSubmit}>
          {isApprove ? 'Khóa' : 'Mở khóa'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
