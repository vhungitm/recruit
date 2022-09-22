import { yupResolver } from '@hookform/resolvers/yup';
import authAPI from 'API/authAPI';
import { selectCurrentUser } from 'app/authSlice';
import { InputField } from 'Components/FormFields';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { convertToSingleText } from 'utils';
import * as yup from 'yup';

const ChangePassword = () => {
  // Check is logged
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!currentUser) navigate('/login');
  });

  const [success, setSuccess] = useState(false);

  const defaultValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  const validationSchema = yup.object().shape({
    currentPassword: yup.string().required('Vui lòng nhập mật khẩu hiện tại'),
    newPassword: yup.string().required('Vui lòng nhập mật khẩu mới'),
    confirmPassword: yup
      .string()
      .required('Vui lòng nhập mật khẩu mới')
      .oneOf([yup.ref('newPassword '), null], 'Mât khẩu nhập lại  không khớp')
  });

  const { control, setError, clearErrors, setValue, watch, handleSubmit } =
    useForm({
      defaultValues,
      resolver: yupResolver(validationSchema)
    });

  const watchPassword = watch('newPassword', '');

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

    // Check length
    let newPasswordRegulation = { ...passwordRegulation };
    newPasswordRegulation.validations.minLength.valid = value.length >= 9;

    // Check name
    if (currentUser.fullName.trim()) {
      const fullNameArr = convertToSingleText(currentUser.fullName).split('-');
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
    if (!newPasswordRegulation.valid) setError('newPassword');
    else clearErrors('newPassword');
    setPasswordRegulation(newPasswordRegulation);
    setValue('newPassword', value);

    return newPasswordRegulation.valid;
  };

  // handle change password
  const handleUpdatePassword = async data => {
    const { currentPassword, newPassword, confirmPassword } = data;

    const res = await authAPI.changePassword({
      currentPassword,
      newPassword,
      confirmPassword
    });

    if (res.succeeded) {
      setSuccess(true);
    }
  };

  // Return
  return (
    <form onSubmit={handleSubmit(handleUpdatePassword)}>
      <div className="auth-header">
        <div className="auth-logo">
          <img
            src={`/Assets/images/password/${
              success ? 'green-success' : 'icon-forgotpass'
            }.png`}
            alt="change password"
          />
        </div>
        {success ? (
          <div className="auth-title success">ĐỔI MẬT KHẨU THÀNH CÔNG</div>
        ) : (
          <div className="auth-title">ĐỔI MẬT KHẨU</div>
        )}
      </div>

      {!success ? (
        <div className="auth-body">
          <InputField
            control={control}
            name="currentPassword"
            type="password"
            label="Mật khẩu hiện tại"
            labelRequired={true}
            placeholder="Nhập mật khẩu hiện tại"
            iconStart={
              <img src="/Assets/images/login/password.png" alt="password" />
            }
          />
          <InputField
            control={control}
            name="newPassword"
            type="password"
            label="Mật khẩu mới"
            labelRequired={true}
            placeholder="Nhập mật khẩu"
            iconStart={
              <img src="/Assets/images/login/password.png" alt="password" />
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
            label="Nhập lại mật khẩu mới"
            labelRequired={true}
            placeholder="Nhập lại mật khẩu mới"
            iconStart={
              <img src="/Assets/images/login/password.png" alt="password" />
            }
          />

          <div className="btn-group">
            <Button className="btn-cancel">
              <Link to="/">Quay lại</Link>
            </Button>

            <Button type="submit">Xác nhận</Button>
          </div>
        </div>
      ) : (
        <div className="auth-body">
          <Link to="/login">
            <Button>Quay lại trang đăng nhập</Button>
          </Link>
        </div>
      )}
    </form>
  );
};

export default ChangePassword;
