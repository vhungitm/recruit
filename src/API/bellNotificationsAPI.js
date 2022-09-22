import axiosClient from './axiosClient';

const apiUrl = '/BellNotification';
const bellNotificationsAPI = {
  //Get List Notify
  fetchAllNoti: () => {
    const url = `${apiUrl}/get-list-notification-message`;
    return axiosClient.get(url);
  },

  //Read notifications
  MarkNotifications: id => {
    const url = `${apiUrl}/set-read-message/${id}`;
    return axiosClient.post(url);
  }
};

export default bellNotificationsAPI;
