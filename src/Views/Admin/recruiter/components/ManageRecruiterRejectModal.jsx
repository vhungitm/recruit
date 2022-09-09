import { CFormCheck } from '@coreui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from 'Components/FormFields';
import { useEffect } from 'react';
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';

export const ManageRecruiterRejectModal = props => {
	const { show, onClose, onSubmit } = props;

	// Form
	const validationSchema = yup.object().shape({
		reason: yup
			.string()
			.required('Vui lòng chọn lý do')
			.max(1024, 'Lý do không được vượt quá 1024 ký tự'),
		otherReason: yup.string().when('reason', {
			is: 'Khác',
			then: yup
				.string()
				.required('Vui lòng nhập lý do khác')
				.max(1024, 'Lý do không được vượt quá 1024 ký tự')
		})
	});

	const { control, register, reset, handleSubmit } = useForm({
		defaultValues: {
			reason: 'Thông tin tài khoản đăng ký có chứa từ ngữ không phù hợp',
			otherReason: ''
		},
		resolver: yupResolver(validationSchema)
	});

	useEffect(() => {
		if (show) {
			reset({
				reason: 'Thông tin tài khoản đăng ký có chứa từ ngữ không phù hợp',
				otherReason: ''
			});
		}
	}, [show, reset]);

	const reason = useWatch({ control, name: 'reason' });

	// Return
	return (
		<Modal className="account-reject-modal" show={show} onHide={onClose}>
			<ModalHeader closeButton></ModalHeader>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ModalBody>
					<img
						className="img-88"
						src={
							process.env.PUBLIC_URL + `/Assets/images/jobpost/reject-icon.png`
						}
						alt="reject-icon"
					/>
					<p className="modal-title">Xác nhận không duyệt tài khoản</p>
					<div className="modal-inform">
						Chọn lý do không duyệt tài khoản nhà tuyển dụng
					</div>
					<ul role="group">
						<li>
							<CFormCheck
								id="reason1"
								type="radio"
								value="Thông tin tài khoản đăng ký có chứa từ ngữ không phù hợp"
								label="Thông tin tài khoản đăng ký có chứa từ ngữ không phù hợp"
								{...register('reason')}
							/>
						</li>
						<li>
							<CFormCheck
								id="reason2"
								type="radio"
								value="Số điện thoại không phù hợp (Ví dụ: 1234567890)"
								label="Số điện thoại không phù hợp (Ví dụ: 1234567890)"
								{...register('reason')}
							/>
						</li>
						<li>
							<CFormCheck
								id="reason3"
								type="radio"
								value="Khác"
								label="Khác"
								{...register('reason')}
							/>
							{reason === 'Khác' && (
								<InputField
									control={control}
									name="otherReason"
									as="textarea"
								/>
							)}
						</li>
					</ul>
					<div className="note">* Thông báo sẽ được gửi đến nhà tuyển dụng</div>
				</ModalBody>
				<ModalFooter className="d-flex">
					<Button className="cancel-btn" onClick={onClose}>
						Hủy
					</Button>

					<Button type="submit" variant="danger" className="confirm-btn">
						Xác nhận
					</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
};
