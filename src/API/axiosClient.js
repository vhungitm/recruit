import axios from 'axios';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import queryString from 'query-string';
import CONFIG from '../Environment/appsetting.js';
import authAPI from './authAPI.js';

const axiosClient = axios.create({
	baseURL: CONFIG.API_URL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'content-type': 'application/json',
		withCredentials: 'include'
	},
	paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async config => {
	const token = await getToken();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

axiosClient.interceptors.response.use(
	response => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	error => {
		if (error && error.response && error.response.data) {
			return error.response.data;
		}
		return error;
	}
);

export const getToken = async () => {
	let token = JSON.parse(sessionStorage.getItem('token'));

	if (token) {
		const { exp } = jwtDecode(token);
		const isExpired = dayjs.unix(exp).diff(dayjs()) < 1;

		// Token is expired -> call refreshToken API
		if (isExpired) {
			try {
				const res = await authAPI.refreshToken();

				// Succeeded -> Set new token and user information
				if (res.succeeded) {
					const { data } = res;
					const { jwToken } = data;

					token = jwToken;
					sessionStorage.setItem('token', JSON.stringify(jwToken));
					sessionStorage.setItem('user', JSON.stringify(data));
				} else {
					// Error -> Naviagte to login page
					sessionStorage.removeItem('user');
					window.location = '/login';
				}
			} catch (error) {
				// Error -> Naviagte to login page
				sessionStorage.removeItem('user');
				window.location = '/login';
			}
		}
	}

	return token;
};

export default axiosClient;
