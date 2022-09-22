import { selectCurrentUser } from 'app/authSlice';
import { AppContent, AppHeader, AppSidebar } from 'Components/index';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'SCSS/_layout.scss';

const DefaultLayout = ({ element, connection }) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  return (
    currentUser && (
      <div className="admin">
        <AppSidebar />
        <div className="admin-content-container">
          <AppHeader connection={connection} />
          <AppContent element={element} connection={connection} />
          {/* <AppFooter /> */}
        </div>
      </div>
    )
  );
};

export default DefaultLayout;
