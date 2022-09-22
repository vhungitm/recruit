import { selectCurrentUser } from 'app/authSlice';
import { selectSystemSidebar, systemActions } from 'app/systemSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'SCSS/_appSidebar.scss';
import navigation from '_nav';

export const AppSidebar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const userRole = currentUser.roles[0];

  const dispatch = useDispatch();
  const sidebar = useSelector(selectSystemSidebar);
  const handleShowSidebar = () => dispatch(systemActions.setShowSidebar());

  return (
    <div className={sidebar.show ? 'admin-sidebar show' : 'admin-sidebar'}>
      <div className="sidebar-button" onClick={handleShowSidebar}>
        <div className="sidebar-button-line line-1"></div>
        <div className="sidebar-button-line line-2"></div>
        <div className="sidebar-button-line line-3"></div>
      </div>

      <div className="sidebar-menu">
        {navigation[userRole].map(item => (
          <NavLink key={item.name} className="sidebar-menu-item" to={item.path}>
            <img
              src={`/Assets/images/admin/menu-${item.name}.png`}
              className="sidebar-menu-icon"
              alt={item.name}
            />
            <div className="sidebar-menu-title">{item.title}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
