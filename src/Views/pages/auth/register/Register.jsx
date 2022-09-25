import { yupResolver } from '@hookform/resolvers/yup';
import authAPI from 'API/authAPI';
import recruiterAccountAPI from 'API/recruiterAccountAPI';
import { PasswordRegulation } from 'Components';
import { InputField } from 'Components/FormFields';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import 'SCSS/_register.scss';
import { convertToSingleText } from 'utils';
import * as yup from 'yup';

const Register = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  // Form default value
  const defaultValues = {
    email: '',
    companyName: '',
    fullName: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  };

  // Form validation
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
      .matches(/^[0-9-+]{9,15}$/, 'Số điện thoại không hợp lệ'),
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

  // Watch value
  const watchEmail = watch('email', '');
  const watchFullName = watch('fullName', '');
  const watchPassword = watch('password', '');

  // Show password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Show password regulation
  const [passwordRegulation, setPasswordRegulation] = useState({
    show: false,
    valid: true,
    validations: {
      minLength: {
        valid: true,
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

  // Handle show and hide password regulation
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
  const handleRegister = async value => {
    if (isSubmitting) return;

    const resValidate = await recruiterAccountAPI.validateRegister({
      email: value.email,
      company: value.companyName,
      mobile: value.mobile
    });

    if (resValidate.succeeded) {
      const res = await authAPI.register(value);
      if (res.succeeded) setIsSuccess(true);
    } else {
      const { data } = resValidate;

      if (
        data.validateEmailMessage ===
        'Email đã tồn tại trên hệ thống. Vui lòng nhập email khác'
      )
        setError('email', { message: data.validateEmailMessage });

      if (data.validateCompanyMessage === 'Tên công ty đã được đăng ký')
        setError('companyName', { message: data.validateCompanyMessage });

      if (data.validateMobileMessage === 'Số điện thoại đã được đăng ký')
        setError('mobile', { message: data.validateMobileMessage });
    }
  };

  // Register JSX
  const registerJSX = (
    <form className="register" onSubmit={handleSubmit(handleRegister)}>
      <div className="register-header">
        <img
          src="/Assets/images/register/logo.png"
          alt="Register"
          className="register-header-logo"
        />
        <div className="register-header-title">Đăng ký</div>
      </div>
      <div className="register-body">
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
          type={showPassword ? 'text' : 'password'}
          label="Mật khẩu"
          labelRequired={true}
          placeholder="Nhập mật khẩu"
          iconEnd={
            <img
              alt="Show password"
              title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              src={
                showPassword
                  ? `/Assets/images/register/hide-password.png`
                  : `/Assets/images/register/show-password.png`
              }
              onClick={handleShowPassword}
            />
          }
          onFocus={handleShowPasswordRegulation}
          onBlur={handleHidePasswordRegulation}
          onChange={handleChangePassword}
        />
        <PasswordRegulation
          show={passwordRegulation.show || !passwordRegulation.valid}
          passwordRegulation={passwordRegulation}
          password={watchPassword}
        />
        <InputField
          control={control}
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          label="Nhập lại mật khẩu"
          labelRequired={true}
          placeholder="Nhập lại mật khẩu"
          iconEnd={
            <img
              alt="Show password"
              title={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              src={
                showConfirmPassword
                  ? `/Assets/images/register/hide-password.png`
                  : `/Assets/images/register/show-password.png`
              }
              onClick={handleShowConfirmPassword}
            />
          }
        />
        <Button type="submit" disabled={isSubmitting}>
          Đăng ký
        </Button>
      </div>
      <div className="register-footer">
        Bạn đã có tài khoản. <Link to="/login">Đăng nhập</Link>
      </div>
    </form>
  );

  // Register Success JSX
  const registerSuccessJSX = (
    <div className="register is-success">
      <div className="register-header">
        <img
          src="/Assets/images/register/logo-confirm-email.png"
          alt="Confirm email"
          className="register-header-logo"
        />
        <div className="register-header-title">Đã gửi thư xác thực</div>
      </div>
      <div className="register-body">
        <div className="register-body-message">
          <div>
            Thư xác thực đã được gửi đến: <b>{watchEmail}</b>
          </div>
          <div>Hãy vào đường liên kết trong email để xác thực tài khoản.</div>
          <div>
            Nếu bạn không tìm thấy thư xác thực, xin hãy kiểm tra hòm thư rác.
          </div>
        </div>
      </div>
    </div>
  );

  // Return JSX
  return !isSuccess ? registerJSX : registerSuccessJSX;
};

export default Register;
