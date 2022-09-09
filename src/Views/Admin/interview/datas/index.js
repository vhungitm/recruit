// Filter
export const defaultFilter = {
	id: '',
	vitriphongvan: ''
};

export const allFilters = [
	{
		name: 'id',
		label: 'Id tin đăng tuyển',
		type: 'select',
		options: [{ value: '', label: 'Tất cả' }]
	},
	{
		name: 'vitriphongvan',
		label: 'Vị trí phỏng vấn',
		type: 'select',
		options: [{ value: '', label: 'Tất cả' }]
	}
];

// Table headers
export const allTableHeaders = [
	{
		name: 'ID',
		field: 'id',
		sortable: true,
		width: 10
	},
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
		width: 15
	},
	{
		name: 'Thời gian',
		field: 'thoigian',
		sortable: true,
		width: 15
	},
	{
		name: 'Vị trí phỏng vấn',
		field: 'vitriphongvan',
		sortable: true,
		width: 25
	},
	{
		name: 'Hình thức làm việc',
		field: 'hinhthuclamviec',
		sortable: true,
		width: 20
	},
	{
		name: 'Kênh phỏng vấn',
		field: 'kenhphongvan',
		sortable: true,
		width: 20
	},
	{
		name: 'Trạng thái',
		field: 'trangthai',
		sortable: true,
		width: 10
	},
	{
		name: 'Tài khoản',
		field: 'taikhoan',
		sortable: true,
		width: 30
	}
];
