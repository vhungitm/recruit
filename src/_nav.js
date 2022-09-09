import { CImage, CNavItem } from '@coreui/react';

const allNavigation = {
	home: {
		component: CNavItem,
		name: 'home',
		title: 'Trang chủ',
		to: '/home',
		icon: (
			<CImage
				fluid
				className="icon-sidebar"
				src="/Assets/images/admin/home.png"
			/>
		)
	},
	jobPost: {
		component: CNavItem,
		name: 'jobPost',
		title: 'Quản lý tin đăng tuyển',
		to: '/jobPost',
		icon: (
			<CImage
				fluid
				className="icon-sidebar"
				src="/Assets/images/admin/jobpost.png"
			/>
		)
	},
	recruiter: {
		component: CNavItem,
		name: 'recruiter',
		title: 'Quản lý tài khoản nhà tuyển dụng',
		to: '/manageRecruiter',
		icon: (
			<CImage
				fluid
				className="icon-sidebar"
				src="/Assets/images/admin/recruiter.png"
			/>
		)
	},
	candidate: {
		component: CNavItem,
		name: 'candidate',
		title: 'Quản lý tài khoản ứng viên',
		to: '/manageCandidate',
		icon: (
			<CImage
				fluid
				className="icon-sidebar"
				src="/Assets/images/admin/candidate.png"
			/>
		)
	},
	cv: {
		component: CNavItem,
		name: 'cv',
		title: 'Quản lý CV',
		to: '/manageCV',
		icon: (
			<CImage
				fluid
				className="icon-sidebar"
				src="/Assets/images/admin/cv.png"
			/>
		)
	},
	interview: {
		component: CNavItem,
		name: 'interview',
		title: 'Quản lý book phỏng vấn ngay',
		to: '/manageInterview',
		icon: (
			<CImage
				fluid
				className="icon-sidebar"
				src="/Assets/images/admin/interview.png"
			/>
		)
	},
	profile: {
		component: CNavItem,
		name: 'profile',
		title: 'Hồ sơ cá nhân',
		to: '/profile',
		icon: (
			<CImage
				fluid
				className="icon-sidebar"
				src="/Assets/images/admin/profile.png"
			/>
		)
	}
};

const navigation = {
	SuperAdmin: [
		allNavigation.home,
		allNavigation.jobPost,
		allNavigation.recruiter,
		allNavigation.candidate,
		allNavigation.interview
	],
	Basic: [
		allNavigation.home,
		allNavigation.jobPost,
		allNavigation.cv,
		allNavigation.profile
	]
};

export default navigation;
