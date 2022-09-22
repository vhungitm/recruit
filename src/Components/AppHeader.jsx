import { selectCurrentUser } from 'app/authSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'SCSS/_appHeader.scss';
import { AppHeaderUser } from './AppHeaderUser';
import { AppNotification } from './Notification/index';

export const AppHeader = ({ connection }) => {
  // Auth
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="admin-header">
      <Link to="/home">
        <img src="/logo192.png" alt="TMA Recruitment" className="header-logo" />
      </Link>
      <div className="header-items">
        <div className="header-item">
          <AppNotification connection={connection} />
        </div>
        <div className="header-item">
          <AppHeaderUser currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};
