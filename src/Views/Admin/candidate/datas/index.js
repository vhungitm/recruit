// Tabs
export const tabs = [
  { id: 1, title: 'Tài khoản hoạt động' },
  { id: 0, title: 'Tài khoản bị khóa' }
];

// Filter
export const defaultFilter = {
  vitrilamviec: '',
  hinhthuclamviec: '',
  capbac: ''
};

export const defaultRecruiterFilter = {
  vitriungtuyen: '',
  hinhthuclamviec: '',
  hocvan: ''
};

// All Admin Filters
export const allFilters = [
  {
    name: 'vitrilamviec',
    label: 'Vị trí làm việc',
    type: 'select',
    options: [{ value: '', label: 'Tất cả' }]
  },
  {
    name: 'hinhthuclamviec',
    label: 'Hình thức làm việc',
    type: 'select',
    options: [
      { value: '', label: 'Tất cả' },
      { value: 'Toàn thời gian', label: 'Toàn thời gian' },
      { value: 'Bán thời gian', label: 'Bán thời gian' },
      { value: 'Thực tập sinh', label: 'Thực tập sinh' }
    ]
  },
  {
    name: 'capbac',
    label: 'Cấp bậc',
    type: 'select',
    options: [
      { value: '', label: 'Tất cả' },
      { value: 'Đại học', label: 'Đại học' },
      { value: 'Cao đẳng', label: 'Cao đẳng' },
      { value: 'Trung cấp', label: 'Trung cấp' }
    ]
  }
];

// All Recruiter Filters
export const allRecruiterFilters = [
  {
    name: 'vitriungtuyen',
    label: 'Vị trí ứng tuyển',
    type: 'select',
    options: [{ value: '', label: 'Tất cả' }]
  },
  {
    name: 'hinhthuclamviec',
    label: 'Hình thức làm việc',
    type: 'select',
    options: [
      { value: '', label: 'Tất cả' },
      { value: 'Toàn thời gian', label: 'Toàn thời gian' },
      { value: 'Bán thời gian', label: 'Bán thời gian' },
      { value: 'Thực tập sinh', label: 'Thực tập sinh' }
    ]
  },
  {
    name: 'hocvan',
    label: 'Học vấn',
    type: 'select',
    options: [
      { value: '', label: 'Tất cả' },
      { value: 'Đại học', label: 'Đại học' },
      { value: 'Cao đẳng', label: 'Cao đẳng' },
      { value: 'Trung cấp', label: 'Trung cấp' }
    ]
  },
  {
    name: 'thoigianungtuyen',
    label: 'Thời gian ứng tuyển',
    type: 'date-range'
  }
];

// All table Candidate headers
export const allTableCandidateHeaders = [
  {
    name: 'Họ và tên',
    field: 'hoten',
    sortable: true,
    width: 25
  },
  {
    name: 'Email',
    field: 'email',
    sortable: true,
    width: 35
  },
  {
    name: 'Số điện thoại',
    field: 'sodienthoai',
    sortable: true,
    width: 16
  },
  {
    name: 'Vị trí làm việc',
    field: 'vitrilamviec',
    sortable: true,
    width: 30
  },
  {
    name: 'Hình thức làm việc',
    field: 'hinhthuclamviec',
    sortable: true,
    width: 20
  },
  {
    name: 'Cấp bậc',
    field: 'capbac',
    sortable: true,
    width: 25
  },
  {
    name: 'Ngày tạo tài khoản',
    field: 'ngaytaotaikhoan',
    sortable: true,
    width: 20
  }
];

//All Table Recruiter CV Header
export const allTableRecruiterHeaders = [
  {
    name: 'Họ và tên',
    field: 'hoten',
    sortable: true,
    width: 40
  },
  {
    name: 'Vị trí ứng tuyển',
    field: 'vitriungtuyen',
    sortable: true,
    width: 30
  },
  {
    name: 'Hình thức làm việc',
    field: 'hinhthuclamviec',
    sortable: true,
    width: 20
  },
  {
    name: 'Cấp bậc',
    field: 'capbac',
    sortable: true,
    width: 25
  },
  {
    name: 'Mức lương mong muốn',
    field: 'mucluongmongmuon',
    sortable: true,
    width: 40
  },
  {
    name: 'Học vấn',
    field: 'hocvan',
    sortable: true,
    width: 30
  }
];
