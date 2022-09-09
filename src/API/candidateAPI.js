import axiosClient from './axiosClient';

const apiUrl = '/Candidate';
const candidateAPI = {
	// Fetch
	fetchList: id => {
		const url = `${apiUrl}/get-list/${id}`;
		return axiosClient.get(url);
	},

	fetchListCandidateForRecruiter: () => {
		const url = `${apiUrl}/get-list-candidate-for-recruiter`;
		return axiosClient.get(url);
	},

	fetch: id => {
		const url = `${apiUrl}/get-detail/${id}`;
		return axiosClient.get(url);
	},
	

	updateStatus: id => {
		const url = `${apiUrl}/toggle-status/${id}`;
		return axiosClient.put(url);
	}

};
export default candidateAPI;
