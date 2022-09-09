import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from 'react-bootstrap';

export const ProfileCancelUpdateModal = props => {
	const { show, onClose, onSubmit } = props;

	return (
		<Modal show={show} onHide={onClose} className="delete-modal">
			<ModalHeader closeButton={true}></ModalHeader>
			<ModalBody>
				<img
					className="img-88"
					src="/Assets/images/profile/cancel-update.png"
					alt="cancel update"
				/>
				<p className="modal-title text-primary">
					Xác nhận hủy cập nhật thông tin
				</p>
				<span className="modal-inform">
					Lưu ý: Mọi chỉnh sửa sẽ không được cập nhật nếu bấm hủy
				</span>
			</ModalBody>
			<ModalFooter className="d-flex">
				<Button className="cancel-btn" onClick={onClose}>
					Thoát
				</Button>
				<Button variant="danger" className="confirm-btn" onClick={onSubmit}>
					Hủy
				</Button>
			</ModalFooter>
		</Modal>
	);
};
