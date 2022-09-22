import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import bellNotificationsAPI from 'API/bellNotificationsAPI';
import { useEffect, useState } from 'react';
import 'SCSS/_appNotification.scss';
import MenuNotification from './MenuNotification';

const AppNotification = ({ connection }) => {
  // Notifications
  const [notificationQuantity, setNotificationQuantity] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // Effect update notifications
  useEffect(() => {
    const getListNotify = async () => {
      const res = await bellNotificationsAPI.fetchAllNoti();
      const newData = res.data?.notifyMessageItem || [];
      const newQuantity = newData.filter(item => !item.isRead).length;

      setNotifications(newData);
      setNotificationQuantity(newQuantity);
    };

    getListNotify();
  }, []);

  // Effect update notifications by signalr
  useEffect(() => {
    const listenNotification = async () => {
      connection.on('SendAsyncNotificationMessage', res => {
        const newData = res.notifyMessageItem;

        setNotifications(newData);
        setNotificationQuantity(newData.filter(item => !item.isRead).length);
      });
    };

    if (connection) listenNotification();
  }, [connection]);

  // Open notifications
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle show, close notifications
  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Return JSX
  return (
    <div>
      <Tooltip
        title={
          notificationQuantity
            ? `Bạn có ${notificationQuantity} thông báo mới!`
            : 'Không có thông báo mới'
        }
      >
        <IconButton
          className="notifications-btn"
          onClick={notifications.length > 0 ? handleOpen : null}
        >
          <img
            src="/Assets/images/admin/notifications.png"
            alt="Notification"
          />
          <Badge badgeContent={notificationQuantity} color="error"></Badge>
        </IconButton>
      </Tooltip>

      <MenuNotification
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        menuItems={notifications}
      />
    </div>
  );
};

export default AppNotification;
