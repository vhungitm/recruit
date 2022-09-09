import {
	CButton,
	CFormCheck,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader
} from '@coreui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from 'Components/FormFields';
import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';

export const JobPostRejectModal = props => {
	const { showRejectModal, handleCloseRejectModal, handleReject } = props;

	const validationSchema = yup.object().shape({
		reason: yup
			.string()
			.required('vui lòng chọn lý do')
			.max(1024, 'Lý do không được vượt quá 1024 ký tự'),
		otherNormalReason: yup.string().when('reason', {
			is: 'Khác',
			then: yup
				.string()
				.required('Vui lòng nhập lý do khác')
				.max(1024, 'Lý do không được vượt quá 1024 ký tự')
		}),
		otherCriticalReason: yup.string().when('reason', {
			is: 'Khác2',
			then: yup
				.string()
				.required('Vui lòng nhập lý do khác')
				.max(1024, 'Lý do không được vượt quá 1024 ký tự')
		})
	});

	const { control, register, setValue, handleSubmit } = useForm({
		defaultValues: {
			reason: 'Nội dung không rõ ràng',
			otherNomalReason: '',
			otherCriticalReason: '',
			isCriticalError: false
		},
		resolver: yupResolver(validationSchema)
	});

	const handleChangeNormalError = e => {
		const { name, value } = e.target;

		setValue(name, value);
		setValue('isCriticalError', false);
	};

	const handleChangeCriticalError = e => {
		const { name, value } = e.target;

		setValue(name, value);
		setValue('isCriticalError', true);
	};

	const reason = useWatch({ control, name: 'reason' });

	return (
		<CModal
			className="jobpost-reject-modal"
			visible={showRejectModal}
			onClose={handleCloseRejectModal}
			centered="true"
		>
			<CModalHeader></CModalHeader>
			<form onSubmit={handleSubmit(handleReject)}>
				<CModalBody>
					<img
						className="img-88"
						src={
							process.env.PUBLIC_URL + `/Assets/images/jobpost/reject-icon.png`
						}
						alt="reject-icon"
					/>
					<p className="modal-title">Tin không được duyệt</p>
					<span className="modal-inform-reject">Chọn lý do không duyệt</span>
					<div className="error-list">
						<div className="normal-error">
							<p className="title">Lỗi thường</p>
							<ul>
								<li>
									<CFormCheck
										id="reason1"
										type="radio"
										value="Nội dung không rõ ràng"
										label="Nội dung không rõ ràng"
										{...register('reason')}
										onChange={handleChangeNormalError}
									/>
								</li>
								<li>
									<CFormCheck
										id="reason2"
										type="radio"
										value="Nội dung có chứa từ ngữ không phù hợp"
										label="Nội dung có chứa từ ngữ không phù hợp"
										{...register('reason')}
										onChange={handleChangeNormalError}
									/>
								</li>
								<li>
									<CFormCheck
										id="reason3"
										type="radio"
										value="Tin tuyển dụng bị trùng lặp"
										label="Tin tuyển dụng bị trùng lặp"
										{...register('reason')}
										onChange={handleChangeNormalError}
									/>
								</li>
								<li>
									<CFormCheck
										control={control}
										type="radio"
										id="reason4"
										value="Khác"
										label="Khác"
										{...register('reason')}
										onChange={handleChangeNormalError}
									/>
								</li>
								{reason === 'Khác' && (
									<li>
										<InputField
											control={control}
											as="textarea"
											name="otherNormalReason"
											placeholder="Nhập lý do"
										/>
									</li>
								)}
							</ul>
						</div>
						<div className="serious-error">
							<p className="title">Lỗi nghiêm trọng</p>
							<ul>
								<li>
									<CFormCheck
										id="reason5"
										type="radio"
										value="Nội dung vi phạm bản quyền"
										label=" Nội dung vi phạm bản quyền "
										{...register('reason')}
										onChange={handleChangeCriticalError}
									/>
								</li>
								<li>
									<CFormCheck
										id="reason6"
										type="radio"
										value=" Nội dung vi phạm pháp luật"
										label=" Nội dung vi phạm pháp luật"
										{...register('reason')}
										onChange={handleChangeCriticalError}
									/>
								</li>
								<li>
									<CFormCheck
										id="reason7"
										type="radio"
										value="Nội dung không phù hợp văn hóa"
										label="Nội dung không phù hợp văn hóa"
										{...register('reason')}
										onChange={handleChangeCriticalError}
									/>
								</li>
								<li>
									<CFormCheck
										type="radio"
										id="reason8"
										value="Khác2"
										label="Khác"
										{...register('reason')}
										onChange={handleChangeCriticalError}
									/>
								</li>
								{reason === 'Khác2' && (
									<li>
										<InputField
											control={control}
											name="otherCriticalReason"
											as="textarea"
											placeholder="Nhập lý do"
										/>
									</li>
								)}
							</ul>
						</div>
					</div>
					<div className="note">* Thông báo sẽ được gửi đến nhà tuyển dụng</div>
				</CModalBody>
				<CModalFooter>
					<CButton className="cancel-btn" onClick={handleCloseRejectModal}>
						Hủy
					</CButton>
					<CButton color="danger" className="confirm-btn" type="submit">
						Xác nhận
					</CButton>
				</CModalFooter>
			</form>
		</CModal>
	);
};
