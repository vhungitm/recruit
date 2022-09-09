import authAPI from 'API/authAPI';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import 'SCSS/_auth.scss';

const RegisterVerifyAccount = props => {
	const { type, email } = props;
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [verified, setVerified] = useState(false);

	useEffect(() => {
		const confirmEmail = async () => {
			const res = await authAPI.confirmEmail({
				userId: params.get('userId'),
				code: params.get('code')
			});

			if (res.succeeded) {
				setShow(true);
			} else {
				if (res.message === '400: Tài khoản đã được kích hoạt') {
					setShow(true);
					setVerified(true);
				} else navigate('/register');
			}
		};

		if (type === 'verifyAccount') confirmEmail();
		if (type === 'waitingVerifyAccount') setShow(true);
	}, [type, navigate, params]);

	return show ? (
		<div
			className={type === 'verifyAccount' ? 'verify-account' : 'text-center'}>
			<div className="auth-header">
				<div className="auth-logo">
					<img
						src={`/Assets/images/register/${
							type === 'waitingVerifyAccount'
								? 'confirm-email'
								: verified
								? 'error'
								: 'success'
						}.png`}
						alt="register"
					/>
				</div>

				{type === 'waitingVerifyAccount' ? (
					<div className="auth-title success">ĐÃ GỬI THƯ XÁC THỰC</div>
				) : verified ? (
					<div className="auth-title error">TÀI KHOẢN ĐÃ ĐƯỢC KÍCH HOẠT</div>
				) : (
					<div className="auth-title success">
						TÀI KHOẢN ĐÃ ĐƯỢC KÍCH HOẠT VÀ ĐANG CHỜ DUYỆT
					</div>
				)}
			</div>
			<div className="auth-body">
				{type === 'waitingVerifyAccount' ? (
					<>
						<div className="auth-message">
							Thư xác thực đã được gửi đến: <b>{email}</b>
							<br />
							Hãy vào đường liên kết trong email để xác thực tài khoản
							<br />
							Nếu bạn không tìm thấy thư xác thực, xin hãy kiểm tra hòm thư rác.
						</div>
					</>
				) : verified ? (
					<>
						<div className="auth-message">
							Vui lòng chờ admin xem xét và phản hồi về thông tin đăng ký tài
							khoản của bạn.
						</div>
						<Link to="/">
							<Button>Quay lại trang chủ</Button>
						</Link>
					</>
				) : (
					<>
						<div className="auth-message">
							Tài khoản của bạn đã được kích hoạt và đang trong trạng thái chờ
							duyệt. Vui lòng chờ admin xem xét và phản hồi về thông tin đăng ký
							tài khoản của bạn.
						</div>
						<Link to="/">
							<Button>Quay lại trang chủ</Button>
						</Link>
					</>
				)}
			</div>
		</div>
	) : null;
};

export default RegisterVerifyAccount;
