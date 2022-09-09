// tabs
export const tabs = [
	{ id: 2, title: 'Tài khoản đã duyệt' },
	{ id: 1, title: 'Tài khoản chờ duyệt' },
	{ id: 3, title: 'Tài khoản hết hạn' },
	{ id: 0, title: 'Tài khoản bị khóa' }
];

// filters
export const defaultFilter = {
	yeucaugiahan: ''
};

export const allFilters = [
	{
		name: 'yeucaugiahan',
		label: 'Yêu cầu gia hạn',
		type: 'select',
		options: [
			{ value: '', label: 'Tất cả' },
			{ value: true, label: 'Có' },
			{ value: false, label: 'Không' }
		]
	}
];

// table headers
const allTableHeaderFields = {
	id: {
		name: 'ID',
		field: 'id',
		sortable: true,
		width: 9.29
	},
	tencongty: {
		name: 'Công ty',
		field: 'tencongty',
		sortable: true,
		width: 43.14
	},
	email: {
		name: 'Email',
		field: 'email',
		sortable: true,
		width: 21.43
	},
	sodienthoai: {
		name: 'Số điện thoại',
		field: 'sodienthoai',
		sortable: true,
		width: 21.43
	},
	sotindang: {
		name: 'Số tin đăng',
		field: 'sotindang',
		sortable: true,
		width: 10.14
	},
	ngaytaotaikhoan: {
		name: 'Ngày tạo tài khoản',
		field: 'ngaytaotaikhoan',
		sortable: true,
		width: 16.86
	},
	ngayhethan: {
		name: 'Ngày hết hạn',
		field: 'ngayhethan',
		sortable: true,
		width: 21.43
	},
	solangiahan: {
		name: 'Số lần gia hạn',
		field: 'solangiahan',
		sortable: true,
		width: 21.43
	},
	yeucaugiahan: {
		name: 'Yêu cầu gia hạn',
		field: 'yeucaugiahan',
		sortable: true,
		width: 21.43
	},
	lancuoitruycap: {
		name: 'Lần cuối truy cập',
		field: 'lancuoitruycap',
		sortable: true,
		width: 11.86
	}
};

// Table Headers
export const allTableHeaders = {
	approved: [
		allTableHeaderFields.id,
		allTableHeaderFields.tencongty,
		allTableHeaderFields.email,
		allTableHeaderFields.sodienthoai,
		allTableHeaderFields.sotindang,
		allTableHeaderFields.ngaytaotaikhoan,
		allTableHeaderFields.ngayhethan
	],
	waiting: [
		allTableHeaderFields.id,
		allTableHeaderFields.tencongty,
		allTableHeaderFields.email,
		allTableHeaderFields.sodienthoai,
		allTableHeaderFields.ngaytaotaikhoan
	],
	expired: [
		allTableHeaderFields.id,
		allTableHeaderFields.tencongty,
		allTableHeaderFields.email,
		allTableHeaderFields.sodienthoai,
		allTableHeaderFields.sotindang,
		allTableHeaderFields.ngaytaotaikhoan,
		allTableHeaderFields.ngayhethan,
		allTableHeaderFields.solangiahan,
		allTableHeaderFields.yeucaugiahan
	],
	blocked: [
		allTableHeaderFields.id,
		allTableHeaderFields.tencongty,
		allTableHeaderFields.email,
		allTableHeaderFields.sodienthoai,
		allTableHeaderFields.sotindang,
		allTableHeaderFields.ngaytaotaikhoan,
		allTableHeaderFields.lancuoitruycap
	]
};
