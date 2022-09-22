import { authActions } from 'app/authSlice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import authAPI from 'API/authAPI';

export const AppHeaderUser = props => {
  const ref = useRef();
  const [showUserMenu, setShowUserMenu] = useState(false);
  useEffect(() => {
    const handleCloseUserMenu = e => {
      if (!ref.current.contains(e.target)) setShowUserMenu(false);
    };

    window.addEventListener('click', handleCloseUserMenu);
    return () => window.removeEventListener('click', handleCloseUserMenu);
  }, []);
  const handleShowUserMenu = () => setShowUserMenu(!showUserMenu);

  const dispatch = useDispatch();
  const handleLogout = async () => {
    await authAPI.logout();
    dispatch(authActions.setCurrentUser(null));
  };

  return (
    <div
      ref={ref}
      className={
        showUserMenu ? 'header-user-container show' : 'header-user-container'
      }
      onClick={handleShowUserMenu}
    >
      <div className="header-user">
        <div className="header-user-content">
          <div className="header-username">{props.currentUser?.userName}</div>
          <div className="header-user-role">
            {props.currentUser?.roles?.[0] === 'SuperAdmin'
              ? 'Admin'
              : 'Recruiter'}
          </div>
        </div>
      </div>
      <div className="header-user-menu">
        <Link to="/changePassword" className="header-user-menu-item">
          Đổi mật khẩu
        </Link>
        <div className="header-user-menu-item" onClick={handleLogout}>
          Đăng xuất
        </div>
      </div>
    </div>
  );
};
