import CandidateDetails from 'Views/Admin/candidate/CandidateDetails';
import ManageCandidate from 'Views/Admin/candidate/ManageCandidate';
import CandidateDetail from 'Views/Admin/candidate/ManageCandidateDetail';
import Home from 'Views/Admin/home/Home';
import ManageInterview from 'Views/Admin/interview/ManageInterview';
import JobPost from 'Views/Admin/jobpost/JobPost';
import JobPostDetail from 'Views/Admin/jobpost/JobPostDetail';
import Profile from 'Views/Admin/profile/Profile';
import ManageRecruiter from 'Views/Admin/recruiter/ManageRecruiter';
import ManagementRecruiterDetail from 'Views/Admin/recruiter/ManageRecruiterDetail';
import ChangePassword from 'Views/pages/auth/changePassword/ChangePassword';
import ForgotPassword from 'Views/pages/auth/forgotPassword/ForgotPassword';
import Login from 'Views/pages/auth/login/Login';
import Register from 'Views/pages/auth/register/Register';
import RegisterVerifyAccount from 'Views/pages/auth/register/RegisterVerifyAccount';
import Page404 from 'Views/pages/page404/Page404';
import Page500 from 'Views/pages/page500/Page500';

const routes = [
	{
		path: '/login',
		exact: true,
		name: 'Đăng nhập',
		element: Login,
		layout: 'auth'
	},
	{
		path: '/register',
		exact: true,
		name: 'Đăng ký',
		element: Register,
		layout: 'auth'
	},
	{
		path: '/verifyAccount',
		exact: true,
		name: 'Xác thực tài khoản',
		element: RegisterVerifyAccount,
		layout: 'auth'
	},
	{
		path: '/forgotPassword',
		exact: true,
		name: 'Quên mật khẩu',
		element: ForgotPassword,
		layout: 'auth'
	},
	{
		path: '/changePassword',
		exact: true,
		name: 'Đổi mật khẩu',
		element: ChangePassword,
		layout: 'auth'
	},
	{
		path: '/',
		exact: true,
		name: 'Trang chủ',
		element: Home,
		layout: 'default'
	},
	{
		path: '/home',
		exact: true,
		name: 'Trang chủ',
		element: Home,
		layout: 'default'
	},
	{
		path: '/jobPost',
		exact: true,
		name: 'Quản lý tin đăng tuyển',
		element: JobPost,
		layout: 'default'
	},
	{
		path: '/jobPost/detail/:id',
		exact: true,
		name: 'Chi tiết tin',
		element: JobPostDetail,
		layout: 'default'
	},
	{
		path: '/jobPost/update/:id',
		exact: true,
		name: 'Chỉnh sửa tin',
		element: JobPostDetail,
		layout: 'default'
	},
	{
		path: '/JobPost/CreateNew',
		exact: true,
		name: 'Tạo tin mới',
		element: JobPostDetail,
		layout: 'default'
	},
	{
		path: '/manageRecruiter',
		exact: true,
		name: 'Quản lý tài khoản nhà tuyển dụng',
		element: ManageRecruiter,
		layout: 'default'
	},
	{
		path: '/manageRecruiter/detail/:id',
		exact: true,
		name: 'Chi tiết tài khoản nhà tuyển dụng',
		element: ManagementRecruiterDetail,
		layout: 'default'
	},
	{
		path: '/manageCandidate',
		exact: true,
		name: 'Quản lý tài khoản ứng viên',
		element: ManageCandidate,
		layout: 'default'
	},
	{
		path: '/ManageCandidateDetail/:id',
		exact: true,
		name: 'Chi tiết tin',
		element: CandidateDetail,
		layout: 'default'
	},
	{
		path: '/CandidateDetails/:id',
		exact: true,
		name: 'Chi tiết tin',
		element: CandidateDetails,
		layout: 'default'
	},
	{
		path: '/ManageCV',
		exact: true,
		name: 'Danh sách ứng viên',
		element: ManageCandidate,
		layout: 'default'
	},
	{
		path: '/manageInterview',
		exact: true,
		name: 'Quản lý book phỏng vấn ngay',
		element: ManageInterview,
		layout: 'default'
	},
	{
		path: '/profile',
		exact: true,
		name: 'Hồ sơ cá nhân',
		element: Profile,
		layout: 'default'
	},
	{
		path: '/profile/update',
		exact: true,
		name: 'Cập nhật hồ sơ cá nhân',
		element: Profile,
		layout: 'default'
	},
	{
		path: '/404',
		exact: true,
		name: 'Page 404',
		element: Page404
	},
	{
		path: '/500',
		exact: true,
		name: 'Page 500',
		element: Page500
	},
	{
		path: '*',
		exact: false,
		name: 'Page 404',
		element: Page404
	}
];

export default routes;
