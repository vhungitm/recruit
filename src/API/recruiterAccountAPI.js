import axiosClient from './axiosClient';

const apiUrl = '/Recruiter';

const recruiterAccountAPI = {
  // Fetch
  fetchList: id => {
    const url = `${apiUrl}/get-list/${id}`;
    return axiosClient.get(url);
  },

  fetch: id => {
    const url = `${apiUrl}/get-detail/${id}`;
    return axiosClient.get(url);
  },

  fetchProfile: () => {
    const url = `${apiUrl}/get-profile`;
    return axiosClient.get(url);
  },

  // Update
  updateProfile: params => {
    const url = `${apiUrl}/update-profile`;
    return axiosClient.post(url, params);
  },

  requestExtension: () => {
    const url = `${apiUrl}/request-recruiter-account-extend`;
    return axiosClient.put(url);
  },

  approve: params => {
    const url = `${apiUrl}/approve`;
    return axiosClient.post(url, params);
  },

  extend: params => {
    const url = `${apiUrl}/extend`;
    return axiosClient.post(url, params);
  },

  reject: params => {
    const url = `${apiUrl}/reject`;
    return axiosClient.post(url, params);
  },

  // Validate
  validateRegister: params => {
    const url = `${apiUrl}/validate-register-account`;
    return axiosClient.post(url, params);
  },
  validateCompany: companyName => {
    const url = `${apiUrl}/validate-company?CompanyName=${companyName}`;
    return axiosClient.post(url);
  },
  validateMobile: mobile => {
    const url = `${apiUrl}/validate-mobile?Mobile=${mobile}`;
    return axiosClient.post(url);
  }
};

export default recruiterAccountAPI;
