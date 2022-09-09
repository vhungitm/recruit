import { yupResolver } from '@hookform/resolvers/yup';
import authAPI from 'API/authAPI.js';
import { authActions, selectCurrentUser } from 'app/authSlice.js';
import { InputField } from 'Components/FormFields';
import { useEffect, useState } from 'react';
import { Button, FormCheck } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Check is logged
	const currentUser = useSelector(selectCurrentUser);
	// Is blocked
	const [isBlocked, setIsBlocked] = useState(false);

	useEffect(() => {
		if (currentUser) navigate('/');
	}, [currentUser, navigate]);

	// Show/Hide password
	const [showPassword, setShowPassword] = useState(false);

	// Common error
	const [error, setError] = useState();

	const handleLogin = async formValues => {
		const res = await authAPI.login(formValues);

		if (res.succeeded) {
			const { data } = res;

			dispatch(authActions.setCurrentUser(data));
			navigate('/home');
		} else {
			if (res.Message === 'Tài khoản bị khóa') setIsBlocked(true);
			else setError(res.Message);
		}
	};

	// Handle go back
	const handleGoBack = () => {
		setIsBlocked(false);
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Email không hợp lệ')
			.required('Xin vui lòng nhập email!'),
		password: Yup.string()
			.required('Xin vui lòng nhập mật khẩu!')
			.min(9, 'Mật khẩu ít nhất 9 kí tự.')
	});

	const {
		control,
		register,
		formState: { isSubmitting },
		handleSubmit
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			isRemember: false
		},
		resolver: yupResolver(validationSchema)
	});

	const blockedJSX = (
		<>
			<div className="auth-header">
				<div className="auth-logo">
					<img src="/Assets/images/login/blocked.png" alt="blocked" />
				</div>
				<div className="auth-title error">Tài khoản của bạn đã bị khóa</div>
			</div>
			<div className="auth-body">
				<div className="auth-message">
					Bạn không thể đăng nhập vào trang recruit.tma.vn do{' '}
					<b className="primary">admin đã vô hiệu hóa tài khoản của bạn.</b>
					<br />
					Nếu bạn cho rằng chúng tôi vô hiệu hóa tài khoản của bạn do nhầm lẫn,
					vui lòng liên hệ qua email:{' '}
					<b className="primary">training@tma.com.vn</b>
				</div>
				<div className="auth-button">
					<Button onClick={handleGoBack}>Quay lại</Button>
				</div>
			</div>
		</>
	);

	// Return JSX
	return !isBlocked ? (
		<div className="form">
			<form onSubmit={handleSubmit(handleLogin)}>
				<div className="auth-header">
					<div className="auth-logo">
						<img src="/Assets/images/login/icon-login.png" alt="login" />
					</div>
					<div className="auth-title">ĐĂNG NHẬP</div>
					<div className="common-error">{error}</div>
				</div>

				<div className="auth-body">
					<InputField
						control={control}
						name="email"
						label={
							<>
								Email <span className="text-danger">*</span>
							</>
						}
						iconStart={<img src="/Assets/images/login/email.png" alt="email" />}
					/>
					<InputField
						control={control}
						name="password"
						type={showPassword ? 'text' : 'password'}
						label={
							<>
								Mật khẩu <span className="text-danger">*</span>
							</>
						}
						iconStart={
							<img src="/Assets/images/login/password.png" alt="password" />
						}
						iconEnd={
							<img
								className="eye-icon"
								title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
								src={
									showPassword
										? `/Assets/images/login/hidePwdImg.png`
										: `/Assets/images/login/showPwdImg.png`
								}
								onClick={() => setShowPassword(prevState => !prevState)}
								alt="show-password"
							/>
						}
					/>
					<div className="d-flex justify-content-between">
						<div className="remember-me">
							<FormCheck
								id="is-remember-me"
								{...register('isRemember')}
								label="Ghi nhớ đăng nhập"
							/>
						</div>
						<div className="forgot-password">
							<a href="/forgotPassword">Quên mật khẩu?</a>
						</div>
					</div>
					<div className="auth-button">
						<Button type="submit" disabled={isSubmitting}>
							Đăng nhập
						</Button>
					</div>
				</div>
			</form>
			<div className="auth-footer">
				Chưa có tài khoản?
				<a href="/register">Đăng ký</a>
			</div>
		</div>
	) : (
		blockedJSX
	);
};

export default Login;
