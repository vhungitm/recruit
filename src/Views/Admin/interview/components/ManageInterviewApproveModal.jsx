import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from 'Components/FormFields';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export const ManageInterviewApproveModal = props => {
	const { show, interview, onClose, onSubmit } = props;

	// Form validation
	const validationSchema = yup.object().shape({
		interviewLinkURL: yup.string().required('Vui lòng nhập link phỏng vấn')
	});

	// Form
	const { control, handleSubmit } = useForm({
		defaultValues: {
			interviewLinkURL: ''
		},
		resolver: yupResolver(validationSchema)
	});

	// Return
	return (
		<Modal className="interview-approve-modal" show={show} onHide={onClose}>
			<Modal.Header closeButton={true}></Modal.Header>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<img
						className="img-88"
						src="/Assets/images/jobpost/success-icon.png"
						alt="success-icon"
					/>
					<p className="modal-title">Xác nhận lịch phỏng vấn nhanh</p>
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
						<div className="interview-item flex">
							<span className="interview-item-title">
								Link phỏng vấn
								<span className="text-danger"> * </span>:
							</span>
							<InputField
								control={control}
								name="interviewLinkURL"
								groupClassName="interview-item-content"
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className="cancel-btn" onClick={onClose}>
						Hủy
					</Button>
					<Button type="submit" className="confirm-btn">
						Xác nhận
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
};
