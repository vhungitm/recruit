import axiosClient from './axiosClient';

const apiUrl = '/Home';
const homePageAPI = {
  // Get list total
  getListTotal: () => {
    const url = `${apiUrl}/get-list-total`;
    return axiosClient.get(url);
  },

  // Get list job applied
  getListJobApplied: () => {
    const url = `${apiUrl}/get-list-job-applied`;
    return axiosClient.get(url);
  },

  // Get list job recruited
  getListJobRecruited: () => {
    const url = `${apiUrl}/get-list-job-recruited`;
    return axiosClient.get(url);
  },

  // Get list job latest
  getListJobLatest: (quantity = 9) => {
    const url = `${apiUrl}/get-list-job-latest?quantity=${quantity}`;
    return axiosClient.get(url);
  },

  // Get chart for jobposting
  getChartJobposting: (fromTime, toTime, calendarType = 3) => {
    const url = `${apiUrl}/get-chart-jobposting?fromTime=${fromTime}&toTime=${toTime}&calendarType=${calendarType}`;
    return axiosClient.get(url);
  },

  // Get chart recruiter account
  getChartRecruiterAccount: (fromTime, toTime, calendarType = 3) => {
    const url = `${apiUrl}/get-chart-recruiter-account?fromTime=${fromTime}&toTime=${toTime}&calendarType=${calendarType}`;
    return axiosClient.get(url);
  },

  // Get chart for candidate register
  getChartCandidateRegister: (fromTime, toTime, calendarType = 3) => {
    const url = `${apiUrl}/get-chart-candidate-register?fromTime=${fromTime}&toTime=${toTime}&calendarType=${calendarType}`;
    return axiosClient.get(url);
  }
};

export default homePageAPI;
