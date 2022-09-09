// Id tab for Admin
export const tabAdmin = [
	{ id: 1, title: 'Tin đã duyệt' },
	{ id: 0, title: 'Tin chờ duyệt' },
	{ id: 2, title: 'Tin hết hạn' },
	{ id: 3, title: 'Tin đã xóa' }
];

// Id tab for Recruiter
export const tabRecruiter = [
	{ id: 1, title: 'Tin đã duyệt' },
	{ id: 0, title: 'Tin chờ duyệt' },
	{ id: 2, title: 'Tin hết hạn' },
	{ id: 4, title: 'Tin không được duyệt' },
	{ id: 5, title: 'Tin đang soạn thảo' } 
]

// Filter
export const defaultFilter = {
	tencongty: '',
	vitrituyendung: '',
	mucluong: '',
	cankinhnghiem: '',
	hinhthuclamviec: '',
	khoangthoigiandangtin: '',
	phongvannhanh: '',
	trangthaitin: ''
};

const allFilterFields = {
	tencongty: {
		name: 'tencongty',
		label: 'Tên công ty',
		type: 'select',
		options: [{ value: '', label: 'Tất cả' }]
	},
	vitrituyendung: {
		name: 'vitrituyendung',
		label: 'Vị trí tuyển dụng',
		type: 'select',
		options: [{ value: '', label: 'Tất cả' }]
	},
	mucluong: {
		name: 'mucluong',
		label: 'Mức lương',
		type: 'select',
		options: [{ value: '', label: 'Tất cả' }]
	},
	cankinhnghiem: {
		name: 'cankinhnghiem',
		label: 'Cần kinh nghiệm',
		type: 'select',
		options: [
			{ value: '', label: 'Tất cả' },
			{ value: true, label: 'Có' },
			{ value: false, label: 'Không' }
		]
	},
	hinhthuclamviec: {
		name: 'hinhthuclamviec',
		label: 'Hình thức làm việc',
		type: 'select',
		options: [{ value: '', label: 'Tất cả' }]
	},
	khoangthoigiandangtin: {
		name: 'khoangthoigiandangtin',
		label: 'Khoảng thời gian đăng tin',
		type: 'date-range'
	},
	phongvannhanh: {
		name: 'phongvannhanh',
		label: 'Phỏng vấn nhanh',
		type: 'select',
		options: [
			{ value: '', label: 'Tất cả' },
			{ value: 'Đã lên lịch', label: 'Đã lên lịch' },
			{ value: 'Đã nhận yêu cầu', label: 'Đã nhận yêu cầu' },
			{ value: 'Đang diễn ra', label: 'Đang diễn ra' },
			{ value: 'Không áp dụng', label: 'Không áp dụng' }
		]
	},
	trangthaitin: {
		name: 'trangthaitin',
		label: 'Trạng thái tin',
		type: 'select',
		options: [
			{ value: '', label: 'Tất cả' },
			{ value: true, label: 'Hiện' },
			{ value: false, label: 'Ẩn' }
		]
	}
};

export const allFilters = {
	approved: [
		allFilterFields.tencongty,
		allFilterFields.vitrituyendung,
		allFilterFields.mucluong,
		allFilterFields.cankinhnghiem,
		allFilterFields.hinhthuclamviec,
		allFilterFields.khoangthoigiandangtin,
		allFilterFields.phongvannhanh,
		allFilterFields.trangthaitin
	],
	waiting: [
		allFilterFields.tencongty,
		allFilterFields.vitrituyendung,
		allFilterFields.mucluong,
		allFilterFields.cankinhnghiem,
		allFilterFields.hinhthuclamviec
	],
	expired: [
		allFilterFields.tencongty,
		allFilterFields.vitrituyendung,
		allFilterFields.mucluong,
		allFilterFields.cankinhnghiem,
		allFilterFields.hinhthuclamviec,
		allFilterFields.khoangthoigiandangtin
	],
	deleted: [
		allFilterFields.tencongty,
		allFilterFields.vitrituyendung,
		allFilterFields.mucluong,
		allFilterFields.cankinhnghiem,
		allFilterFields.hinhthuclamviec,
		allFilterFields.khoangthoigiandangtin
	]
};

// table header
const allTableHeaderFiels = {
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
		width: 21.43
	},
	vitrituyendung: {
		name: 'Vị trí tuyển dụng',
		field: 'vitrituyendung',
		sortable: true,
		width: 18.29
	},
	mucluong: {
		name: 'Mức Lương',
		field: 'mucluong',
		sortable: true,
		width: 10.43
	},
	daungtuyen: {
		name: 'Đã ứng tuyển',
		field: 'daungtuyen',
		sortable: true,
		width: 12.43
	},
	soluong: {
		name: 'Số lượng',
		field: 'soluong',
		sortable: true,
		width: 8.43
	},
	phongvanngay: {
		name: 'Phỏng vấn ngay',
		field: 'phongvanngay',
		sortable: true,
		width: 15.57
	},
	cankinhnghiem: {
		name: 'Cần kinh nghiệm',
		field: 'cankinhnghiem',
		sortable: true,
		width: 15.14
	},
	hinhthuclamviec: {
		name: 'Hình thức làm việc',
		field: 'hinhthuclamviec',
		sortable: true,
		width: 17
	},
	diadiem: {
		name: 'Địa điểm',
		field: 'diadiem',
		sortable: true,
		width: 11.29
	},
	ngayhethan: {
		name: 'Ngày hết hạn',
		field: 'ngayhethan',
		sortable: true,
		width: 11.86
	},
	noinhan: {
		name: 'Nơi nhận',
		field: 'noinhan',
		sortable: true,
		width: 18.71
	}
};

export const allRecruiterTableHeaders = {
	approved: [
		allTableHeaderFiels.id,
		allTableHeaderFiels.vitrituyendung,
		allTableHeaderFiels.mucluong,
		allTableHeaderFiels.daungtuyen,
		allTableHeaderFiels.soluong,
		allTableHeaderFiels.cankinhnghiem,
		allTableHeaderFiels.hinhthuclamviec,
		allTableHeaderFiels.diadiem,
		allTableHeaderFiels.ngayhethan,
		allTableHeaderFiels.noinhan
	],

	waiting: [
		allTableHeaderFiels.id,
		allTableHeaderFiels.vitrituyendung,
		allTableHeaderFiels.mucluong,
		allTableHeaderFiels.soluong,
		allTableHeaderFiels.cankinhnghiem,
		allTableHeaderFiels.hinhthuclamviec,
		allTableHeaderFiels.diadiem,
		allTableHeaderFiels.noinhan
	],

	expried: [
		allTableHeaderFiels.id,
		allTableHeaderFiels.vitrituyendung,
		allTableHeaderFiels.mucluong,
		allTableHeaderFiels.daungtuyen,
		allTableHeaderFiels.soluong,
		allTableHeaderFiels.cankinhnghiem,
		allTableHeaderFiels.hinhthuclamviec,
		allTableHeaderFiels.diadiem,
		allTableHeaderFiels.ngayhethan,
		allTableHeaderFiels.noinhan
	],

	rejected: [
		allTableHeaderFiels.id,
		allTableHeaderFiels.vitrituyendung,
		allTableHeaderFiels.mucluong,
		allTableHeaderFiels.soluong,
		allTableHeaderFiels.cankinhnghiem,
		allTableHeaderFiels.hinhthuclamviec,
		allTableHeaderFiels.diadiem,
		allTableHeaderFiels.noinhan
	],

	draffing: [
		allTableHeaderFiels.id,
		allTableHeaderFiels.vitrituyendung,
		allTableHeaderFiels.mucluong,
		allTableHeaderFiels.soluong,
		allTableHeaderFiels.cankinhnghiem,
		allTableHeaderFiels.hinhthuclamviec,
		allTableHeaderFiels.diadiem,
		allTableHeaderFiels.noinhan
	]
}

export const allAdminTableHeaders = {
	approved: [
		allTableHeaderFiels.id,
		allTableHeaderFiels.tencongty,
		allTableHeaderFiels.vitrituyendung,
		allTableHeaderFiels.mucluong,
		allTableHeaderFiels.daungtuyen,
		allTableHeaderFiels.soluong,
		allTableHeaderFiels.phongvanngay,
		allTableHeaderFiels.cankinhnghiem,
		allTableHeaderFiels.hinhthuclamviec,
		allTableHeaderFiels.diadiem,
		allTableHeaderFiels.ngayhethan,
		allTableHeaderFiels.noinhan
	],

	waiting: [
		allTableHeaderFiels.id,
		allTableHeaderFiels.tencongty,
		allTableHeaderFiels.vitrituyendung,
		allTableHeaderFiels.mucluong,
		allTableHeaderFiels.soluong,
		allTableHeaderFiels.cankinhnghiem,
		allTableHeaderFiels.hinhthuclamviec,
		allTableHeaderFiels.diadiem,
		allTableHeaderFiels.noinhan
	],

	expried: [
		allTableHeaderFiels.id,
		allTableHeaderFiels.tencongty,
		allTableHeaderFiels.vitrituyendung,
		allTableHeaderFiels.mucluong,
		allTableHeaderFiels.daungtuyen,
		allTableHeaderFiels.soluong,
		allTableHeaderFiels.cankinhnghiem,
		allTableHeaderFiels.hinhthuclamviec,
		allTableHeaderFiels.diadiem,
		allTableHeaderFiels.ngayhethan,
		allTableHeaderFiels.noinhan
	],

	deleted: [
		allTableHeaderFiels.id,
		allTableHeaderFiels.tencongty,
		allTableHeaderFiels.vitrituyendung,
		allTableHeaderFiels.mucluong,
		allTableHeaderFiels.daungtuyen,
		allTableHeaderFiels.soluong,
		allTableHeaderFiels.cankinhnghiem,
		allTableHeaderFiels.hinhthuclamviec,
		allTableHeaderFiels.diadiem,
		allTableHeaderFiels.ngayhethan,
		allTableHeaderFiels.noinhan
	]
};

// Interview time options
export const timeOptions = {
	morning: [
		{ value: '--:--', label: '--:--' },
		{ value: '09:00', label: '09:00' },
		{ value: '09:15', label: '09:15' },
		{ value: '09:30', label: '09:30' },
		{ value: '09:45', label: '09:45' },
		{ value: '10:00', label: '10:00' },
		{ value: '10:15', label: '10:15' },
		{ value: '10:30', label: '10:30' },
		{ value: '10:45', label: '10:45' },
		{ value: '11:00', label: '11:00' },
		{ value: '11:15', label: '11:15' },
		{ value: '11:30', label: '11:30' },
		{ value: '11:45', label: '11:45' },
		{ value: '12:00', label: '12:00' }
	],
	afternoon: [
		{ value: '--:--', label: '--:--' },
		{ value: '13:30', label: '13:30' },
		{ value: '13:45', label: '13:45' },
		{ value: '14:00', label: '14:00' },
		{ value: '14:15', label: '14:15' },
		{ value: '14:30', label: '14:30' },
		{ value: '14:45', label: '14:45' },
		{ value: '15:00', label: '15:00' },
		{ value: '15:15', label: '15:15' },
		{ value: '15:30', label: '15:30' },
		{ value: '15:45', label: '15:45' },
		{ value: '16:00', label: '16:00' },
		{ value: '16:15', label: '16:15' },
		{ value: '16:30', label: '16:30' },
		{ value: '16:45', label: '16:45' },
		{ value: '17:00', label: '17:00' },
		{ value: '17:15', label: '17:15' },
		{ value: '17:30', label: '17:30' },
		{ value: '17:45', label: '17:45' }
	]
};
