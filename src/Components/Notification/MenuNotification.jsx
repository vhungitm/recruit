import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import bellNotificationsAPI from 'API/bellNotificationsAPI';
import { useNavigate } from 'react-router-dom';
import 'SCSS/_appNotification.scss';

const MenuNotification = ({ anchorEl, handleClose, open, menuItems }) => {
  const navigate = useNavigate();

  // Handle read notification
  const handleReadNotification = async id => {
    await bellNotificationsAPI.MarkNotifications(id);
    handleClose();

    if (id === 0) return;
    else if (id === 1) navigate('/JobPost?id=0');
    else if (id === 2) navigate('/ManageInterview');
    else if (id === 3) navigate('/manageRecruiter?id=3');
    else if (id === 4) navigate('/manageRecruiter?id=1');
    else if (id === 5) navigate('/');
    else navigate('/JobPost');
  };

  // Return JSX
  return (
    <Menu
      className="notifications"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <div className="notification-header">
        <div>Thông báo</div>
        <div className="check_all_read">
          <img src="/Assets/images/admin/checkall.png" alt="check-all" />
          <span onClick={() => handleReadNotification(0)}>
            Đánh dấu đã đọc tất cả
          </span>
        </div>
      </div>
      <div className="notification-items">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            className={
              item.isRead ? 'notification-item is-readed' : 'notification-item'
            }
            onClick={() => handleReadNotification(item.id)}
          >
            <div className="notification-title">
              <img
                src={`/Assets/images/admin/notice-${item.id}.png`}
                alt="Notification icon"
              />
              <div dangerouslySetInnerHTML={{ __html: item.message }} />
            </div>
            <div className="notification-date">
              {item.lastUpdated.split(' ')[0]}
            </div>
          </MenuItem>
        ))}
      </div>
    </Menu>
  );
};

export default MenuNotification;
