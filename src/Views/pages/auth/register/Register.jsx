import { yupResolver } from '@hookform/resolvers/yup';
import authAPI from 'API/authAPI';
import recruiterAccountAPI from 'API/recruiterAccountAPI';
import { InputField } from 'Components/FormFields';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { convertToSingleText } from 'utils';
import * as yup from 'yup';
import RegisterVerifyAccount from './RegisterVerifyAccount';

const Register = () => {
	const [isRegisterForm, setIsRegisterForm] = useState(true);

	const defaultValues = {
		email: '',
		companyName: '',
		fullName: '',
		mobile: '',
		password: '',
		confirmPassword: ''
	};

	// Validate input
	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.email('Email không hợp lệ')
			.required('Vui lòng nhập email'),
		companyName: yup
			.string()
			.trim()
			.required('Vui lòng nhập tên công ty')
			.min(10, 'Tên công ty phải dài hơn 10 ký tự'),
		fullName: yup.string().trim().required('Vui lòng nhập tên người đại diện'),
		mobile: yup
			.string()
			.required('Vui lòng nhập số điện thoại')
			.matches(
				/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
				'Số điện thoại không hợp lệ'
			),
		password: yup
			.string()
			.required('Vui lòng nhập mật khẩu')
			.test('check password', ' ', value => {
				return handleChangePassword({ target: { value } });
			}),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Mât khẩu không khớp')
	});
	const {
		control,
		formState: { isSubmitting },
		watch,

		setError,
		clearErrors,
		setValue,
		handleSubmit
	} = useForm({
		defaultValues,
		resolver: yupResolver(validationSchema)
	});

	// Watch input
	const watchEmail = watch('email', '');
	const watchFullName = watch('fullName', '');
	const watchPassword = watch('password', '');

	// Show password regulation
	const [passwordRegulation, setPasswordRegulation] = useState({
		show: false,
		valid: true,
		validations: {
			minLength: {
				valid: true, // -1 -> normal; 0 -> false; 1 -> true
				message: 'Mật khẩu phải dài ít nhất 9 ký tự'
			},
			name: {
				valid: true,
				message: (
					<>
						Mật khẩu mới <b>không bao gồm</b> Tên, Tên đệm, Họ của bạn
					</>
				)
			},
			regex: {
				valid: true,
				message: 'Mật khẩu chứa ít nhất các ký tự sau đây',

				validations: {
					lowerCase: {
						valid: true,
						message: '- Một (1) chữ cái: a-z'
					},
					upperCase: {
						valid: true,
						message: '- Một (1) chữ cái viết hoa: A-Z'
					},
					special: {
						valid: true,
						message: '- Một (1) ký tự đặc biệt: ! @% ^ * () _ ~ + - = [] {} <>'
					},
					number: {
						valid: true,
						message: '- Một (1) chữ số (0-9)'
					}
				}
			}
		}
	});

	const handleShowPasswordRegulation = () => {
		setPasswordRegulation({
			...passwordRegulation,
			show: true
		});
	};

	const handleHidePasswordRegulation = () => {
		setPasswordRegulation({
			...passwordRegulation,
			show: false
		});
	};

	// Handle change password
	const handleChangePassword = e => {
		const { value } = e.target;
		setValue('password', value);

		if (value.trim() === '') {
			clearErrors('password');
			setPasswordRegulation({
				...passwordRegulation,
				valid: true
			});
			return;
		}

		// Check length
		let newPasswordRegulation = { ...passwordRegulation };
		newPasswordRegulation.validations.minLength.valid = value.length >= 9;

		// Check name
		if (watchFullName.trim()) {
			const fullNameArr = convertToSingleText(watchFullName).split('-');
			let checkName = 0;
			fullNameArr.forEach(name => {
				if (convertToSingleText(value).search(name) >= 0) checkName++;
			});

			newPasswordRegulation.validations.name.valid = checkName <= 0;
		}

		// Check regex
		newPasswordRegulation.validations.regex.validations.lowerCase.valid =
			value.match(/[a-z]/, 'g');
		newPasswordRegulation.validations.regex.validations.upperCase.valid =
			value.match(/[A-Z]/, 'g');
		newPasswordRegulation.validations.regex.validations.special.valid =
			value.match(/[!@#$%^*]/, 'g');
		newPasswordRegulation.validations.regex.validations.number.valid =
			value.match(/[0-9]/, 'g');

		let countRegexError = 0;
		Object.values(newPasswordRegulation.validations.regex.validations).forEach(
			item => {
				if (!item.valid) countRegexError++;
			}
		);
		newPasswordRegulation.validations.regex.valid = !(countRegexError > 0);

		// Check password regulation valid
		let countError = 0;
		Object.values(newPasswordRegulation.validations).forEach(item => {
			if (!item.valid) countError++;
		});
		newPasswordRegulation.valid = countError <= 0;

		// Set new password regulation and new password value
		if (!newPasswordRegulation.valid) setError('password');
		else clearErrors('password');
		setPasswordRegulation(newPasswordRegulation);

		return newPasswordRegulation.valid;
	};

	// Handle register
	const handleRegister = async formValues => {
		try {
			const { email, companyName, mobile } = formValues;

			const resValidate = await recruiterAccountAPI.validateRegister({
				email,
				company: companyName,
				mobile
			});

			if (resValidate.succeeded) {
				const res = await authAPI.register(formValues);

				if (res.succeeded) {
					setIsRegisterForm(false);
				}
			} else {
				const {
					data: {
						validateEmailMessage,
						validateMobileMessage,
						validateCompanyMessage
					}
				} = resValidate;

				if (
					validateEmailMessage ===
					'Email đã tồn tại trên hệ thống. Vui lòng nhập email khác'
				) {
					setError('email', { message: validateEmailMessage });
				}
				if (validateCompanyMessage === 'Tên công ty đã được đăng ký') {
					setError('companyName', { message: validateCompanyMessage });
				}
				if (validateMobileMessage === 'Số điện thoại đã được đăng ký') {
					setError('mobile', { message: validateMobileMessage });
				}
			}
		} catch (error) {}
	};

	// Return
	return isRegisterForm ? (
		<form onSubmit={handleSubmit(handleRegister)}>
			<div className="auth-header">
				<div className="auth-logo">
					<img
						src={process.env.PUBLIC_URL + `/Assets/images/login/icon-login.png`}
						alt="register"
					/>
				</div>
				<div className="auth-title">ĐĂNG KÝ</div>
			</div>

			<div className="auth-body">
				<InputField
					control={control}
					name="email"
					label="Email"
					labelRequired={true}
					placeholder="Nhập email"
				/>
				<InputField
					control={control}
					name="companyName"
					label="Tên công ty"
					labelRequired={true}
					placeholder="Nhập tên công ty"
				/>
				<InputField
					control={control}
					name="fullName"
					label="Người đại diện"
					labelRequired={true}
					placeholder="Nhập tên người đại diện"
				/>
				<InputField
					control={control}
					name="mobile"
					label="Số điện thoại"
					labelRequired={true}
					placeholder="Nhập số điện thoại"
				/>
				<InputField
					control={control}
					name="password"
					type="password"
					label="Mật khẩu"
					labelRequired={true}
					placeholder="Nhập mật khẩu"
					iconStart={
						passwordRegulation.show ? (
							<img src="/Assets/images/login/password.png" alt="password" />
						) : undefined
					}
					onFocus={handleShowPasswordRegulation}
					onBlur={handleHidePasswordRegulation}
					onChange={handleChangePassword}
				/>
				{(passwordRegulation.show || !passwordRegulation.valid) && (
					<div
						className={
							passwordRegulation.valid
								? 'password-regulation valid'
								: 'password-regulation invalid'
						}
					>
						<div className="title">Quy định mật khẩu:</div>
						<div className="body">
							<div className="items">
								{Object.values(passwordRegulation.validations).map(item => {
									const itemClassName = watchPassword
										? item.valid
											? 'item valid-feedback'
											: 'item invalid-feedback'
										: 'item';

									return (
										<div className={itemClassName} key={item.message}>
											<div>
												{watchPassword && <span className="flag" />}
												<span className="message">{item.message}</span>
											</div>
											{item.validations && (
												<div className="items">
													{Object.values(item.validations).map(itemChild => {
														const itemChildClassName = watchPassword
															? itemChild.valid
																? 'item valid-feedback'
																: 'item invalid-feedback'
															: 'item';

														return (
															<div
																className={itemChildClassName}
																key={itemChild.message}
															>
																<div>
																	<span className="message">
																		{itemChild.message}
																	</span>
																</div>
															</div>
														);
													})}
												</div>
											)}
										</div>
									);
								})}
							</div>
							<div className="note">
								Nếu có thắc mắc, vui lòng liên hệ hotline: 0332376334
							</div>
						</div>
					</div>
				)}
				<InputField
					control={control}
					name="confirmPassword"
					type="password"
					label="Nhập lại mật khẩu"
					labelRequired={true}
					placeholder="Nhập lại mật khẩu"
				/>

				<div className="auth-button">
					<Button variant="primary" type="submit" disabled={isSubmitting}>
						Đăng ký
					</Button>
				</div>
			</div>
			<div className="auth-footer">
				Bạn đã có tài khoản?
				<a href="/login">Đăng nhập</a>
			</div>
		</form>
	) : (
		<RegisterVerifyAccount type="waitingVerifyAccount" email={watchEmail} />
	);
};

export default Register;
