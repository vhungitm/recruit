import axiosClient from './axiosClient';

const apiUrl = '/Account';

const authAPI = {
	refreshToken: () => {
		const url = `${apiUrl}/refresh-token`;
		sessionStorage.removeItem('token');

		return axiosClient.get(url);
	},
	login: params => {
		const url = `${apiUrl}/authenticate`;
		sessionStorage.removeItem('token');

		return axiosClient.post(url, params);
	},
	register: params => {
		const url = `${apiUrl}/register`;
		return axiosClient.post(url, params);
	},
	confirmEmail: params => {
		const { userId, code } = params;
		const url = `${apiUrl}/confirm-email?userId=${userId}&code=${code}`;

		return axiosClient.get(url);
	},
	changePassword: params => {
		const url = `${apiUrl}/changepassword`;
		return axiosClient.post(url, params);
	},
	forgotPassword: params => {
		const url = `${apiUrl}/forgot-password`;
		return axiosClient.post(url, params);
	},
	logout: () => {
		const url = `${apiUrl}/logout`;
		return axiosClient.post(url);
	}
};

export default authAPI;
