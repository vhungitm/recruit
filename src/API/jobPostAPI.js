import axiosClient from './axiosClient';

const apiUrl = '/JobPost';
const jobPostAPI = {
	// Fetch
	fetchList: id => {
		const url = `${apiUrl}/get-list-job/${id}`;
		return axiosClient.get(url);
	},

	fetchAllIndex: () => {
		const url = `${apiUrl}/get-all-index`;
		return axiosClient.get(url);
	},

	fetch: id => {
		const url = `${apiUrl}/get-detail-job/${id}`;
		return axiosClient.get(url);
	},

	fetchCandidateApplyList: id => {
		const url = `${apiUrl}/get-candidate-apply-list/${id}`;
		return axiosClient.get(url);
	},

	fetchChart: (jobPostId, fromTime, toTime, calendarType) => {
		let url = `${apiUrl}/get-chart-view-and-apply-jobpost`;
		url += `?jobpostid=${jobPostId}`;
		url += `&fromTime=${fromTime}`;
		url += `&toTime=${toTime}`;
		url += `&calendarType=${calendarType}`;

		return axiosClient.get(url);
	},

	// Update
	update: params => {
		const url = `${apiUrl}/update-job-post`;
		return axiosClient.post(url, params);
	},

	approve: idList => {
		const url = `${apiUrl}/approve`;

		return axiosClient.post(url, {
			jobIdList: idList
		});
	},

	restore: id => {
		const url = `${apiUrl}/restore/${id}`;
		return axiosClient.put(url);
	},

	updateStatus: id => {
		const url = `${apiUrl}/toggle-status/${id}`;
		return axiosClient.put(url);
	},

	// Create Job Post
	create: params => {
		const url = `${apiUrl}/create-job-post`;
		return axiosClient.post(url, params);
	},

	// Reject
	reject: params => {
		const url = `${apiUrl}/reject`;
		return axiosClient.post(url, params);
	},

	// Delete
	delete: id => {
		const url = `${apiUrl}/delete/${id}`;
		return axiosClient.put(url);
	}
};

export default jobPostAPI;
