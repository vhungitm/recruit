import { CImage } from '@coreui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import authAPI from 'API/authAPI';
import { InputField } from 'Components/FormFields';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const ForgotPassword = () => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email không hợp lệ')
      .required('Xin vui lòng nhập đủ thông tin')
  });

  const { control, setValue, handleSubmit } = useForm({
    initialValues: {
      email: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const [success, setSuccess] = useState(false);
  const [timmer, setTimmer] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const watchTimmer = () => {
      if (timmer > 0) {
        setTimeout(() => {
          setTimmer(timmer - 1);
        }, 1000);
      }
    };

    watchTimmer();

    return () => {
      clearTimeout(watchTimmer);
    };
  });

  const handleForgotPassword = async ({ email }) => {
    await authAPI.forgotPassword({
      email
    });

    setEmail(email);
    setSuccess(true);
    setTimmer(60);
    setValue('email', '');
  };

  return (
    <form onSubmit={handleSubmit(handleForgotPassword)}>
      <div className="auth-header">
        <div className="auth-logo">
          <CImage
            src={
              success
                ? '/Assets/images/password/green-forgot-icon.png'
                : '/Assets/images/password/icon-forgotpass.png'
            }
            alt="forgot password"
          />
        </div>
        <div className={`auth-title ${success ? 'success' : ''}`}>
          {success ? 'Đã gửi thư xác thực' : 'Quên mật khẩu'}
        </div>
        <div className="auth-message">
          {success ? (
            <>
              Thư xác thực đã được gửi đến: <b>{email}</b>
              <br /> Hãy vào đường liên kết trong email để xác nhận yêu cầu
            </>
          ) : (
            'Vui lòng nhập địa chỉ email đã đăng ký để nhận thư xác thực'
          )}
        </div>
      </div>
      <div className="auth-body">
        <InputField
          control={control}
          name="email"
          label="Email"
          labelRequired={true}
          placeholder="Nhập email"
          iconStart={<img src="/Assets/images/login/email.png" alt="email" />}
        />

        <div className="auth-button">
          <Button
            type="submit"
            variant={timmer > 0 ? 'dark' : 'primary'}
            disabled={timmer > 0}
          >
            {success ? 'Gửi lại thư xác thực' : 'Gửi thư xác thực'}
          </Button>
        </div>
      </div>
      {timmer > 0 && (
        <div className="auth-footer">
          Bạn có thể nhấn nút <b>gửi lại thư xác thực</b> sau <b>{timmer}</b>{' '}
          giây
        </div>
      )}
    </form>
  );
};

export default ForgotPassword;
