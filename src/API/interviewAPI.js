import axiosClient from './axiosClient';
const apiUrl = '/Interview';

const interviewAPI = {
  // Fetch
  fetchList: () => {
    const url = `${apiUrl}/get-list`;
    return axiosClient.get(url);
  },

  // Update
  approve: params => {
    const { interviewId, interviewLinkURL } = params;
    const url = `${apiUrl}/approve?InterviewId=${interviewId}&InterviewLinkURL=${interviewLinkURL}`;

    return axiosClient.post(url);
  },
  reject: interviewId => {
    const url = `${apiUrl}/reject?InterviewId=${interviewId}`;

    return axiosClient.post(url);
  }
};

export default interviewAPI;
