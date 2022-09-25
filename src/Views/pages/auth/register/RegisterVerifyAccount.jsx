import React from 'react';
import { Button } from 'react-bootstrap';
import 'SCSS/_registerVerifyAccount.scss';

const RegisterVerifyAccount = () => {
  return (
    <div className="register-verify-account is-success">
      <div className="register-verify-account-header">
        <img
          src="/Assets/images/register/logo-verify-account-success.png"
          alt="Verify Account Success"
          className="register-verify-account-header-logo"
        />
        <div className="register-verify-account-header-title">
          Tài khoản đã được kích hoạt và đang chờ duyệt
        </div>
      </div>
      <div className="register-verify-account-body">
        <div className="register-verify-account-body-message">
          Tài khoản của bạn đã được kích hoạt và đang trong trạng thái chờ
          duyệt. Vui lòng chờ admin xem xét và phản hồi về thông tin đăng ký tài
          khoản.
        </div>
        <Button>Quay lại trang chủ</Button>
      </div>
    </div>
  );
};

export default RegisterVerifyAccount;
