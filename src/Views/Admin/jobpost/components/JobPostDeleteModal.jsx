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
		<Modal show={show} onHide={onClose} className="delete-modal">
			<ModalHeader closeButton={true}></ModalHeader>
			<ModalBody>
				<img
					className="img-88"
					src={process.env.PUBLIC_URL + `/Assets/images/jobpost/big-delete.png`}
					alt="delete-icon"
				/>
				<p className="modal-title">
					{isDeleted ? 'Xác nhận xóa vĩnh viễn' : 'Xóa tin'}
				</p>
				<span className="modal-inform">
					{isDeleted
						? 'Tin sau khi xóa vĩnh viễn sẽ mất hoàn toàn trên hệ thống và không thể khôi phục'
						: 'Tin sau khi xóa vẫn được lưu trữ ở danh sách tin đã xóa'}
				</span>
			</ModalBody>
			<ModalFooter className="d-flex">
				<Button className="cancel-btn" onClick={onClose}>
					Hủy
				</Button>
				<Button variant="danger" className="confirm-btn" onClick={onSubmit}>
					Xóa
				</Button>
			</ModalFooter>
		</Modal>
	);
};
