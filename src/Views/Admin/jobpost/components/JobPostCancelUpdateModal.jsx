import { Button, Modal } from 'react-bootstrap';

export const JobPostCancelUpdateModal = props => {
	const { show, onClose, onCancel, onSubmit } = props;

	return (
		<Modal show={show} onHide={onClose}>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<img
					className="img-88"
					src="/Assets/images/recruiter/leave.png"
					alt="Cancel Update"
				/>

				<div className="modal-title">Xác nhận rời khỏi?</div>
				<div className="modal-inform">
					Lưu ý: Tin đăng tuyển chưa hoàn thiện có thể lưu ở mục lưu nháp
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger-outline" onClick={onCancel}>
					Rời khỏi
				</Button>
				<Button onClick={onSubmit}>Lưu nháp</Button>
			</Modal.Footer>
		</Modal>
	);
};
