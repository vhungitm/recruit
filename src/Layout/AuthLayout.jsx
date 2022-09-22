import { CImage } from '@coreui/react';
import 'SCSS/_auth.scss';

const AuthLayout = ({ element }) => {
  return (
    <div className="wrap-auth d-flex">
      <div className="wrap-auth-content">
        <div className="auth-content">{element}</div>
      </div>
      <div className="wrap-auth-photo">
        <CImage
          fluid
          className="img-610"
          src={process.env.PUBLIC_URL + `/Assets/images/login/decor-login.png`}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
