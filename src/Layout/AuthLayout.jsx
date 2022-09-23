import 'SCSS/_auth.scss';

const AuthLayout = ({ element }) => {
  return (
    <div className="auth">
      <div className="auth-content">{element}</div>
      <div className="auth-photo">
        <img src="/Assets/images/login/auth-background.png" alt="Auth" />
      </div>
    </div>
  );
};

export default AuthLayout;
