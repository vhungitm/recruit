import { yupResolver } from '@hookform/resolvers/yup';
import authAPI from 'API/authAPI.js';
import { authActions, selectCurrentUser } from 'app/authSlice.js';
import { InputField } from 'Components/FormFields';
import { useEffect, useState } from 'react';
import { Button, FormCheck } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import 'SCSS/_login.scss';
import * as yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [isBlocked, setIsBlocked] = useState(false);
  const [commonError, setCommonError] = useState(null);

  // Effect check login -> navigate to Home page
  useEffect(() => {
    if (currentUser) navigate('/home');
  }, [currentUser, navigate]);

  // Validate login form
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email không hợp lệ')
      .required('Xin vui lòng nhập email!'),
    password: yup
      .string()
      .required('Xin vui lòng nhập mật khẩu!')
      .min(9, 'Mật khẩu ít nhất 9 kí tự.')
  });

  // Use Form
  const { control, register, formState, reset, setError, handleSubmit } =
    useForm({
      defaultValues: { email: '', password: '', isRemember: false },
      resolver: yupResolver(validationSchema)
    });

  // Show password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  // Handle login
  const handleLogin = async value => {
    if (formState.isSubmitting) return;

    const res = await authAPI.login(value);
    if (res.succeeded) {
      dispatch(authActions.setCurrentUser(res.data));
      navigate('/home');
    } else {
      if (res.Message === 'Tài khoản bị khóa') setIsBlocked(true);
      else if (res.Message === 'Email hoặc mật khẩu không đúng') {
        setError('email', { message: 'Email không đúng' });
        setError('password', { message: 'Mật khẩu không đúng' });
      } else {
        setCommonError(res.Message);
      }
    }
  };

  // Handle go back
  const handleGoBack = () => {
    reset({ email: '', password: '', isRemember: false });
    setIsBlocked(false);
  };

  // Login JSX
  const loginJSX = (
    <form className="login" onSubmit={handleSubmit(handleLogin)}>
      <div className="login-header">
        <img
          src="/Assets/images/login/logo.png"
          alt="Login"
          className="login-header-logo"
        />
        <div className="login-header-title">Đăng nhập</div>
        {commonError && <div className="login-header-error">{commonError}</div>}
      </div>

      <div className="login-body">
        <InputField
          groupClassName="email-group"
          label="Email"
          labelRequired={true}
          control={control}
          name="email"
          placeholder="Nhập email"
          iconStart={<img src="/Assets/images/login/email.png" alt="email" />}
        />
        <InputField
          groupClassName="password-group"
          label="Mật khẩu"
          labelRequired={true}
          control={control}
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Nhập mật khẩu"
          iconStart={
            <img src="/Assets/images/login/password.png" alt="password" />
          }
          iconEnd={
            <img
              className="eye-icon"
              alt="Show password"
              title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              src={
                showPassword
                  ? `/Assets/images/login/hide-password.png`
                  : `/Assets/images/login/show-password.png`
              }
              onClick={handleShowPassword}
            />
          }
        />
        <div className="login-flex">
          <FormCheck
            id="is-remember-me"
            label="Ghi nhớ đăng nhập"
            className="remember-me"
            {...register('isRemember')}
          />
          <Link to="/forgotPassword" className="forgot-password">
            Quên mật khẩu?
          </Link>
        </div>
        <Button type="submit" disabled={formState.isSubmitting}>
          Đăng nhập
        </Button>
      </div>
      <div className="login-footer">
        Chưa có tài khoản. <Link to="/register">Đăng ký</Link>
      </div>
    </form>
  );

  // Login Is Blocked JSX
  const loginBlockedJSX = (
    <div className="login is-blocked">
      <div className="login-header">
        <img
          src="/Assets/images/login/blocked-logo.png"
          alt="Account is blocked"
          className="login-header-logo"
        />
        <div className="login-header-title">Tài khoản của bạn đã bị khóa</div>
      </div>
      <div className="login-body">
        <div className="login-message">
          <div>
            Bạn không thể đăng nhập vào trang recruit.tma.vn do{' '}
            <span className="login-message-bold">
              admin đã vô hiệu hóa tài khoản của bạn.
            </span>
          </div>
          <div>
            Nếu bạn cho rằng chúng tôi vô hiệu hóa tài khoản của bạn do nhầm
            lẫn, vui lòng liên hệ qua email:{' '}
            <span className="login-message-bold">training@tma.com.vn</span>
          </div>
        </div>
        <Button onClick={handleGoBack}>Quay lại</Button>
      </div>
    </div>
  );

  // Return JSX
  return !isBlocked ? loginJSX : loginBlockedJSX;
};

export default Login;
