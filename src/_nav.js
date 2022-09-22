const allNavigation = {
  home: {
    name: 'home',
    title: 'Trang chủ',
    path: '/home'
  },
  jobPost: {
    name: 'jobPost',
    title: 'Quản lý tin đăng tuyển',
    path: '/jobPost'
  },
  recruiter: {
    name: 'recruiter',
    title: 'Quản lý tài khoản nhà tuyển dụng',
    path: '/manageRecruiter'
  },
  candidate: {
    name: 'candidate',
    title: 'Quản lý tài khoản ứng viên',
    path: '/manageCandidate'
  },
  cv: {
    name: 'cv',
    title: 'Quản lý CV',
    path: '/manageCV'
  },
  interview: {
    name: 'interview',
    title: 'Quản lý book phỏng vấn ngay',
    path: '/manageInterview'
  },
  profile: {
    name: 'profile',
    title: 'Hồ sơ cá nhân',
    path: '/profile'
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
