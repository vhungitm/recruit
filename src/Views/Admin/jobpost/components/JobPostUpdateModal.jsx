import { Button, Modal } from 'react-bootstrap';

export const JobPostUpdateModal = props => {
	const { show, onClose, onSubmit } = props;

	return (
		<Modal show={show} onHide={onClose}>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<img
					className="img-88"
					src="/Assets/images/recruiter/confirm.png"
					alt="Update"
				/>

				<div className="modal-title">Xác nhận gửi tin để duyệt?</div>
				<div className="modal-inform">
					Lưu ý: Tin tuyển dụng sau khi gửi sẽ không được chỉnh sửa
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onClose} variant="danger-outline">
					Hủy
				</Button>
				<Button className="sendPost-btn" onClick={onSubmit}>
					Xác nhận
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
