import {
	CBreadcrumb,
	CBreadcrumbItem,
	CFormCheck,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader
} from '@coreui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Switch } from '@material-ui/core';
import jobPostAPI from 'API/jobPostAPI.js';
import { selectCurrentUser } from 'app/authSlice';
import { BarChart } from 'Components/Chart';
import { CheckBoxField, InputField, SelectField } from 'Components/FormFields';
import { format, subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { Button, FormCheck } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'SCSS/_jobPostDetail.scss';
import Editor from 'Views/pages/editor/Editor';
import * as yup from 'yup';
import {
	JobPostApproveModal,
	JobPostCandidateModal,
	JobPostDeleteModal,
	JobPostRejectModal
} from './components';
import { timeOptions } from './datas';

const JobPostDetail = () => {
	const isAdmin = useSelector(selectCurrentUser).roles.includes('SuperAdmin');
	const navigate = useNavigate();

	// Data
	const params = useParams();
	const id = params.id;
	const [jobDetail, setJobDetail] = useState('');
	const [load, setLoad] = useState(true);
	const [status, setStatus] = useState(-1);

	// Candidate
	const [candidateList, setCandidateList] = useState([]);
	const [showCandidateModal, setShowCandidateModal] = useState(false);

	const handleShowCandidateModal = () => {
		if (candidateList.length > 0) setShowCandidateModal(true);
	};
	const handleCloseCandidateModal = () => setShowCandidateModal(false);

	// Form
	const validationSchema = yup.object().shape({
		ngayhethan: isAdmin
			? yup.date().required('Vui lòng nhập ngày hết hạn')
			: yup.date(),
		vitrituyendung: yup.string().required('Vui lòng nhập vị trí tuyển dụng'),
		hinhthuclamviec: yup.string().required('Vui lòng chọn hình thức làm việc'),
		mucluong: yup.string().required('Vui lòng chọn mức lương'),
		capbac: yup.string().required('Vui lòng chọn cấp bậc'),
		hocvan: yup.string().required('Vui lòng chọn học vấn'),
		soluong: yup
			.number('')
			.required('Vui lòng nhập số lượng')
			.typeError('Vui lòng nhập số lượng')
			.min(1, 'Số lượng phải lớn hơn 0'),
		diadiem: yup.string().required('Vui lòng chọn học địa điểm'),
		noinhan: yup
			.string()
			.email('Nơi nhận không hợp lệ')
			.required('Vui lòng nhập nơi nhận')
	});

	const [workingStatusData, setWorkingStatusData] = useState([]);
	const [salaryDealData, setSalaryDealData] = useState([]);
	const [rankData, setRankData] = useState([]);
	const [degreeData, setDegreeData] = useState([]);
	const [locationData, setLocationData] = useState([]);

	const { control, register, reset, getValues, setValue, handleSubmit } =
		useForm({
			defaultValues: {
				jobPostId: 0,
				ngayhethan: new Date(),
				vitrituyendung: '',
				hinhthuclamviec: '',
				mucluong: '',
				capbac: '',
				hocvan: '',
				cankinhnghiem: false,
				soluong: 0,
				hotjob: false,
				diadiem: '',
				noinhan: '',
				phongvanngay: false,
				phongvansang: false,
				buoisang_Tugio: '--:--',
				buoisang_Dengio: '--:--',
				phongvanchieu: false,
				buoichieu_Tugio: '--:--',
				buoichieu_Dengio: '--:--'
			},
			resolver: yupResolver(validationSchema)
		});

	// Description
	const [description, setDescription] = useState();
	useEffect(() => {
		setDescription(jobDetail.motachitiet);
	}, [jobDetail]);

	// Handle update
	const handleUpdate = async formValues => {
		try {
			let {
				jobPostId,
				ngayhethan,
				vitrituyendung,
				hinhthuclamviec,
				mucluong,
				capbac,
				hocvan,
				cankinhnghiem,
				soluong,
				hotjob,
				diadiem,
				noinhan,
				phongvanngay,
				phongvansang,
				thoiluongphongvansang,
				buoisang_Tugio,
				buoisang_Dengio,
				phongvanchieu,
				thoiluongphongvanchieu,
				buoichieu_Tugio,
				buoichieu_Dengio
			} = formValues;

			// Get id
			hinhthuclamviec = workingStatusData.filter(
				item => item.name === hinhthuclamviec
			)[0].id;
			mucluong = salaryDealData.filter(
				item => item.name === formValues.mucluong
			)[0].id;
			capbac = rankData.filter(item => item.name === formValues.capbac)[0].id;
			hocvan = degreeData.filter(item => item.name === formValues.hocvan)[0].id;
			diadiem = locationData.filter(item => item.name === formValues.diadiem)[0]
				.id;

			if (isAdmin) {
				// Check interview time
				if (phongvanngay && !phongvansang && !phongvanchieu) {
					toast('Vui lòng chọn thời gian phỏng vấn nhanh');
					return;
				}

				// Fix inter view time
				if (!phongvansang) {
					thoiluongphongvansang = undefined;
					phongvansang = undefined;
					buoisang_Tugio = undefined;
					buoisang_Dengio = undefined;
				}

				if (!phongvanchieu) {
					thoiluongphongvanchieu = undefined;
					phongvanchieu = undefined;
					buoichieu_Tugio = undefined;
					buoichieu_Dengio = undefined;
				}

				// Expiration date
				let expirationDate = ngayhethan;
				ngayhethan = expirationDate.getFullYear();
				ngayhethan += `-${expirationDate.getMonth() + 1}-`;
				ngayhethan += expirationDate.getDate();

				// New data
				const newJobPost = {
					jobPostId,
					ngayhethan,
					vitrituyendung,
					hinhthuclamviec,
					mucluong,
					capbac,
					hocvan,
					cankinhnghiem,
					soluong: soluong.toString(),
					hotjob,
					diadiem,
					noinhan,
					motachitiet: description,
					phongvanngay,
					buoisang_Tugio,
					buoisang_Dengio,
					buoichieu_Tugio,
					buoichieu_Dengio,
					thoiluongphongvansang,
					thoiluongphongvanchieu
				};

				const res = await jobPostAPI.update(newJobPost);

				if (res.succeeded) {
					toast('Cập nhật thành công');
					navigate('/jobPost/detail/' + jobDetail.jobPostId);
				} else {
					toast('Cập nhật không thành công');
				}
			} else {
				// New data
				const newJobPost = {
					jobPostId,
					vitrituyendung,
					hinhthuclamviec,
					mucluong,
					capbac,
					hocvan,
					cankinhnghiem,
					soluong: soluong.toString(),
					hotjob,
					diadiem,
					noinhan,
					motachitiet: description,
					isSoanThao: false
				};

				const res = await jobPostAPI.create(newJobPost);

				if (res.succeeded) {
					toast('Cập nhật thành công');
					navigate('/jobPost/detail/' + jobDetail.jobPostId);
				} else {
					toast('Cập nhật không thành công');
				}
			}
		} catch (error) {
			toast('Cập nhật không thành công');
		} finally {
			setLoad(true);
		}
	};

	const [cancelVisible, setCancelVisible] = useState(false);
	const [sendVisible, setSendVisible] = useState(false);

	const handleCancelButtonClick = (cancelVisible, setCancelVisible) => {
		setCancelVisible(!cancelVisible);
	};

	const handleSendButtonClick = (sendVisible, setSendVisible) => {
		setSendVisible(!sendVisible);
	};

	const handleCancelSendButtonClick = () => {
		setSendVisible(false);
	};

	const handleLeaveButtonClick = () => {
		setCancelVisible(false);
		navigate('/jobPost');
	};

	const handleSaveDraffButtonClick = async formValues => {
		let {
			vitrituyendung,
			hinhthuclamviec,
			mucluong,
			capbac,
			hocvan,
			cankinhnghiem,
			hotjob,
			soluong,
			noinhan,
			diadiem
		} = formValues;

		// setCancelVisible(false);

		// Get id
		hinhthuclamviec = workingStatusData.filter(
			item => item.name === hinhthuclamviec
		)[0].id;
		mucluong = salaryDealData.filter(
			item => item.name === formValues.mucluong
		)[0].id;
		capbac = rankData.filter(item => item.name === formValues.capbac)[0].id;
		hocvan = degreeData.filter(item => item.name === formValues.hocvan)[0].id;
		diadiem = locationData.filter(item => item.name === formValues.diadiem)[0]
			.id;

		// New data
		const newJobDraffPost = {
			vitrituyendung,
			hinhthuclamviec,
			mucluong,
			capbac,
			hocvan,
			cankinhnghiem,
			hotjob,
			soluong: soluong.toString(),
			noinhan,
			diadiem,
			motachitiet: description,
			isSoanThao: true
		};

		// Create Job Post
		const resp = await jobPostAPI.create(newJobDraffPost);
		if (resp.succeeded) {
			navigate('/jobPost?id=5');
			toast(`Đã lưu nháp tin số ${resp.data.jobPostId}`);
		} else {
			// toast(`Không gửi được tin ${resp.data.jobPostId} để duyệt`);
			toast(`Tin đăng tuyển không thể lưu nháp`);
		}
	};

	// Time interview now
	const ngayhethan = useWatch({ control, name: 'ngayhethan' });
	const phongvanngay = useWatch({ control, name: 'phongvanngay' });
	const phongvansang = useWatch({ control, name: 'phongvansang' });
	const phongvanchieu = useWatch({ control, name: 'phongvanchieu' });

	const [morningTimeFromOptions, setMorningTimeFromOptions] = useState(
		timeOptions.morning
	);
	const [morningTimeToOptions, setMorningTimeToOptions] = useState(
		timeOptions.morning
	);
	const [afternoonTimeFromOptions, setAfternoonTimeFromOptions] = useState(
		timeOptions.afternoon
	);
	const [afternoonTimeToOptions, setAfternoonTimeToOptions] = useState(
		timeOptions.afternoon
	);

	const handleChangeInterviewTime = e => {
		const { name, value } = e.target;

		setValue(name, value);
		handleTimeOptions();
	};

	const handleTimeOptions = () => {
		handleMorningTimeOptions();
		handleAfternoonTimeOptions();
	};

	const handleMorningTimeOptions = () => {
		// Check session
		const morningInterview = getValues('phongvansang');
		if (!morningInterview) {
			setMorningTimeFromOptions([{ value: '--:--', label: '--:--' }]);
			setMorningTimeToOptions([{ value: '--:--', label: '--:--' }]);
			return;
		}

		const morningTimeOptions = timeOptions.morning;
		const morningTimeOptionsLength = morningTimeOptions.length;
		const morningInterviewTime = getValues('thoiluongphongvansang');
		const morningTimeFrom = getValues('buoisang_Tugio');
		const morningTimeFromIndex = morningTimeOptions.findIndex(
			item => item.value === morningTimeFrom
		);

		// Get morning time from options
		setMorningTimeFromOptions(
			morningTimeOptions.filter(
				(item, id) =>
					id >= 1 &&
					id <=
						morningTimeOptionsLength -
							(morningInterviewTime === '15'
								? 2
								: morningInterviewTime === '30'
								? 3
								: morningInterviewTime === '45'
								? 4
								: 5)
			)
		);

		// Get morning time to options
		let morningTimeFromStartIndex = morningTimeFromIndex;
		morningTimeFromStartIndex +=
			morningInterviewTime === '15'
				? 1
				: morningInterviewTime === '30'
				? 2
				: morningInterviewTime === '45'
				? 3
				: 4;
		const morningTimeToStep =
			morningInterviewTime === '15'
				? 1
				: morningInterviewTime === '30'
				? 2
				: morningInterviewTime === '45'
				? 3
				: 4;
		let newMorningTimeToOptions = [];

		for (
			let i = morningTimeFromStartIndex;
			i < morningTimeOptionsLength;
			i += morningTimeToStep
		) {
			newMorningTimeToOptions = [
				...newMorningTimeToOptions,
				morningTimeOptions[i]
			];
		}
		setMorningTimeToOptions(newMorningTimeToOptions);

		// Fix out options
		const morningTimeTo = getValues('buoisang_Dengio');
		const morningTimeToIndex = newMorningTimeToOptions.findIndex(
			item => item.value === morningTimeTo
		);

		if (morningTimeToIndex < 0) {
			setValue('buoisang_Dengio', newMorningTimeToOptions[0].value);
		}
	};

	const handleAfternoonTimeOptions = () => {
		// Check session
		const afternoonInterview = getValues('phongvanchieu');
		if (!afternoonInterview) {
			setAfternoonTimeFromOptions([{ value: '--:--', label: '--:--' }]);
			setAfternoonTimeToOptions([{ value: '--:--', label: '--:--' }]);
			return;
		}

		// Handle time options
		const afternoonTimeOptions = timeOptions.afternoon;
		const afternoonTimeOptionsLength = afternoonTimeOptions.length;
		const afternoonInterviewTime = getValues('thoiluongphongvanchieu');
		const afternoonTimeFrom = getValues('buoichieu_Tugio');
		const afternoonTimeFromIndex = afternoonTimeOptions.findIndex(
			item => item.value === afternoonTimeFrom
		);

		// Get afternoon time from options
		setAfternoonTimeFromOptions(
			afternoonTimeOptions.filter(
				(item, id) =>
					id >= 1 &&
					id <=
						afternoonTimeOptionsLength -
							(afternoonInterviewTime === '15'
								? 2
								: afternoonInterviewTime === '30'
								? 3
								: afternoonInterviewTime === '45'
								? 4
								: 5)
			)
		);

		// Get afternoon time to options
		let afternoonTimeFromStartIndex = afternoonTimeFromIndex;
		afternoonTimeFromStartIndex +=
			afternoonInterviewTime === '15'
				? 1
				: afternoonInterviewTime === '30'
				? 2
				: afternoonInterviewTime === '45'
				? 3
				: 4;
		const afternoonTimeToStep =
			afternoonInterviewTime === '15'
				? 1
				: afternoonInterviewTime === '30'
				? 2
				: afternoonInterviewTime === '45'
				? 3
				: 4;
		let newAfternoonTimeToOptions = [];

		for (
			let i = afternoonTimeFromStartIndex;
			i < afternoonTimeOptionsLength;
			i += afternoonTimeToStep
		) {
			newAfternoonTimeToOptions = [
				...newAfternoonTimeToOptions,
				afternoonTimeOptions[i]
			];
		}

		setAfternoonTimeToOptions(newAfternoonTimeToOptions);

		// Fix time out options
		const afternoonTimeTo = getValues('buoichieu_Dengio');
		const afternoonTimeToIndex = newAfternoonTimeToOptions.findIndex(
			item => item.value === afternoonTimeTo
		);

		if (afternoonTimeToIndex < 0) {
			setValue('buoichieu_Dengio', newAfternoonTimeToOptions[0].value);
		}
	};

	const handleChangeSession = e => {
		const { name, checked } = e.target;

		if (name === 'phongvansang') {
			reset({
				...getValues(),
				phongvansang: checked,
				buoisang_Tugio: checked ? '09:00' : '--:--',
				buoisang_Dengio: checked ? '09:15' : '--:--',
				thoiluongphongvansang: checked ? '15' : ''
			});
		} else {
			reset({
				...getValues(),
				phongvanchieu: checked,
				buoichieu_Tugio: checked ? '13:30' : '--:--',
				buoichieu_Dengio: checked ? '13:45' : '--:--',
				thoiluongphongvanchieu: checked ? '15' : ''
			});
		}

		handleTimeOptions();
	};

	const handleChangeTimeFrom = e => {
		const { name, value } = e.target;

		setValue(name, value);
		handleTimeOptions();
	};

	const handleChangeTimeTo = e => {
		const { name, value } = e.target;

		setValue(name, value);
		handleTimeOptions();
	};

	// Page type
	const pageType = window.location.pathname.includes('/detail/')
		? 0
		: window.location.pathname.includes('/CreateNew')
		? 1
		: window.location.pathname.includes('/update')
		? 2
		: -1; // Sai kiểu

	// Effect update data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await jobPostAPI.fetch(params.id);
				const { data } = response;
				let {
					trangthaiduyet,
					cankinhnghiem,
					ngayhethan,
					hotjob,
					thoiluongphongvansang,
					buoisang_Tugio,
					buoisang_Dengio,
					thoiluongphongvanchieu,
					buoichieu_Tugio,
					buoichieu_Dengio
				} = data;

				if (trangthaiduyet.search('Đã duyệt') >= 0) {
					setStatus(1);
				} else if (trangthaiduyet.includes('Chờ duyệt')) {
					setStatus(0);
				} else if (trangthaiduyet.includes('Hết hạn')) {
					setStatus(2);
				} else if (trangthaiduyet.includes('Đã xóa')) {
					setStatus(3);
				} else if (trangthaiduyet.includes('Không được duyệt')) {
					setStatus(4);
				} else if (trangthaiduyet.includes('Đang soạn thảo')) {
					setStatus(5);
				}

				// Set expiration date
				const expirationDateArr = ngayhethan.split('/');
				let expirationDate = expirationDateArr[2];
				expirationDate += `-${expirationDateArr[1]}-`;
				expirationDate += expirationDateArr[0];
				expirationDate = new Date(expirationDate);

				setJobDetail(data);
				reset({
					...data,
					ngayhethan: expirationDate,
					cankinhnghiem: cankinhnghiem !== '',
					hotjob: hotjob !== '',

					phongvansang: thoiluongphongvansang ? true : false,
					buoisang_Tugio: !buoisang_Tugio ? '--:--' : buoisang_Tugio,
					buoisang_Dengio: !buoisang_Dengio ? '--:--' : buoisang_Dengio,

					phongvanchieu: thoiluongphongvanchieu ? true : false,
					buoichieu_Tugio: !buoichieu_Tugio ? '--:--' : buoichieu_Tugio,
					buoichieu_Dengio: !buoichieu_Dengio ? '--:--' : buoichieu_Dengio
				});
			} catch (error) {
			} finally {
				setLoad(false);
			}
		};

		const fetchCandidates = async () => {
			const res = await jobPostAPI.fetchCandidateApplyList(id);

			if (res.succeeded) {
				setCandidateList(res.data.list);
			}
		};

		const fetchAllIndex = async () => {
			const res = await jobPostAPI.fetchAllIndex(params.id);

			if (res.succeeded) {
				setWorkingStatusData(res.data.hinhthuclamviec);
				setSalaryDealData(res.data.mucluong);
				setRankData(res.data.capbac);
				setDegreeData(res.data.hocvan);
				setLocationData(res.data.diadiem);
			}
		};

		if (load) {
			if (pageType === 0 || pageType === 2) fetchData();
		}
		if (pageType === 1 || pageType === 2) fetchAllIndex();
		if (pageType === 0 || pageType === 2) fetchCandidates();
	}, [id, load, pageType, params.id, reset, isAdmin]);

	// Chart
	const [chart, setChart] = useState();
	const [chartType, setChartType] = useState(0);
	const [chartDate, setChartDate] = useState({
		startDate: subDays(new Date(), 31),
		endDate: new Date()
	});

	// Effect udpate chart
	useEffect(() => {
		const fetchChart = async () => {
			let { startDate, endDate } = chartDate;
			startDate = format(startDate, 'yyyy-MM-dd');
			endDate = format(endDate, 'yyyy-MM-dd');

			const res = await jobPostAPI.fetchChart(
				jobDetail.jobPostId,
				startDate,
				endDate,
				chartType
			);

			if (res.succeeded) {
				const chartItem = res.data.chartItem;
				const labels = chartItem.map(item => item.timeLine);
				const totalViews = chartItem.map(item => item.totalView);
				const totalApplies = chartItem.map(item => item.totalApply);

				const newData = {
					labels,
					datasets: [
						{
							label: 'Số lượt xem',
							data: totalViews,
							backgroundColor: ['#108FCF'],
							stack: '1',
							barThickness: 16
						},
						{
							label: 'Số lượng ứng tuyển',
							data: totalApplies,
							backgroundColor: ['#27AE60'],
							stack: '2',
							barThickness: 16
						}
					]
				};

				setChart(newData);
			} else {
				setChart(null);
			}
		};

		if (isAdmin && jobDetail) fetchChart();
	}, [chartType, chartDate, jobDetail, isAdmin]);

	// Delete
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleShowDeleteModal = () => setShowDeleteModal(true);
	const handleCloseDeleteModal = () => setShowDeleteModal(false);

	const handleDelete = async () => {
		try {
			const response = await jobPostAPI.delete(jobDetail.jobPostId);

			if (response.succeeded) {
				toast(
					<>
						Đã xóa tin số {jobDetail.id}
						<span className="undo-btn" onClick={handleUndoDelete}>
							Hoàn tác
						</span>
					</>
				);
				navigate(`/jobPost?id=${status}`);
			} else {
				toast('Xóa tin không thành công');
			}
		} catch (error) {
			toast('Xóa tin không thành công');
		}
	};

	const handleUndoDelete = async () => {
		try {
			const res = await jobPostAPI.restore(jobDetail.jobPostId);

			if (res.succeeded === true) {
				toast(`Đã hoàn tác thành công tin số ${jobDetail.id}`);
			} else {
				toast(`Hoàn tác không thành công tin số ${jobDetail.id}`);
			}
		} catch (error) {
			toast(`Hoàn tác thành công tin số ${jobDetail.id}`);
		}
	};

	// Reject
	const [showRejectModal, setShowRejectModal] = useState(false);

	const handleShowRejectModal = () => setShowRejectModal(true);
	const handleCloseRejectModal = () => setShowRejectModal(false);

	const handleReject = async formValues => {
		try {
			let { reason, otherNormalReason, otherCriticalReason, isCriticalError } =
				formValues;
			reason =
				reason === 'Khác'
					? otherNormalReason
					: reason === 'Khác2'
					? otherCriticalReason
					: reason;

			const response = await jobPostAPI.reject({
				jobPostId: jobDetail.jobPostId,
				reason: reason,
				isCriticalError: isCriticalError
			});

			if (response.succeeded) {
				toast(`Đã không duyệt tin số ${jobDetail.id}`);
				navigate('/jobPost?id=0');
			} else {
				toast('Không duyệt tin không thành công');
			}
		} catch (error) {
			toast('Không duyệt tin không thành công');
		}
	};

	// read more
	const [readMore, setReadMore] = useState(false);

	// Update status (hide/show)
	const handleUpdateStatus = async () => {
		try {
			const response = await jobPostAPI.updateStatus(jobDetail.jobPostId);

			if (response.succeeded === true) {
				toast(`Đã ${jobDetail.trangthaitin === 'Hiện' ? 'ẩn' : 'hiện'} tin`);
				setLoad(true);
			}
		} catch (error) {}
	};

	// Approve
	const [showApproveModal, setShowApproveModal] = useState(false);

	const handleShowApproveModal = () => setShowApproveModal(true);
	const handleCloseApproveModal = () => setShowApproveModal(false);

	const handleApprove = async () => {
		try {
			const response = await jobPostAPI.approve([
				jobDetail.jobPostId.toString()
			]);

			if (response.succeeded) {
				toast(`Đã duyệt thành công tin số ${jobDetail.id}`);
				setLoad(true);
			} else {
				toast(`Duyệt tin không thành công`);
			}
		} catch (error) {
			toast(`Duyệt tin không thành công`);
		} finally {
			setShowApproveModal(false);
		}
	};

	// Restore
	const handleRestore = async () => {
		try {
			const response = await jobPostAPI.restore(jobDetail.jobPostId);

			if (response.succeeded) {
				toast(`Đã khôi phục thành công tin số ${jobDetail.id}`);
				navigate('/jobPost?id=3');
			} else {
				toast('Khôi phục tin không thành công');
			}
		} catch (error) {
			toast('Khôi phục tin không thành công');
		}
	};

	// Return
	return (
		<form onSubmit={handleSubmit(handleUpdate)}>
			<div className="wrap-jobPost-detail">
				{/* Job Detail Header */}
				<div className="header-detail">
					<div className="bread-crumb">
						<CBreadcrumb>
							<CBreadcrumbItem className="first-breadcrumb">
								<Link to="/jobPost">Quản lý tin đăng tuyển</Link>
							</CBreadcrumbItem>
							<CBreadcrumbItem className="first-breadcrumb">
								{pageType === 2 ? (
									<Link to={`/jobPost/detail/${jobDetail.jobPostId}`}>
										Chi tiết tin đăng tuyển
									</Link>
								) : (
									'Chi tiết tin đăng tuyển'
								)}
							</CBreadcrumbItem>
							{pageType === 2 && (
								<CBreadcrumbItem className="second-breadcrumb">
									Chỉnh sửa tin đăng tuyển
								</CBreadcrumbItem>
							)}
						</CBreadcrumb>
					</div>
					<div className="title">
						<div className="title-page">
							{pageType === 2
								? 'CHỈNH SỬA TIN ĐĂNG TUYỂN'
								: 'CHI TIẾT TIN ĐĂNG TUYỂN'}
						</div>

						{/* Header buttons */}
						{!pageType ? (
							<div className="title-action">
								{isAdmin && status !== 0 && (
									<Button
										variant="danger-outline"
										onClick={handleShowDeleteModal}
									>
										{status === 3 ? 'Xóa vĩnh viễn' : 'Xóa tin'}
									</Button>
								)}
								{isAdmin && status === 0 && (
									<>
										<Button
											variant="danger-outline"
											onClick={handleShowRejectModal}
										>
											Không duyệt
										</Button>
										<Button
											variant="secondary"
											onClick={handleShowApproveModal}
										>
											Duyệt
										</Button>
									</>
								)}
								{status === 1 && (
									<Button
										variant={isAdmin ? 'secondary' : 'primary'}
										onClick={handleUpdateStatus}
									>
										{jobDetail.trangthaitin === 'Ẩn' ? 'Hiện tin' : 'Ẩn tin'}
									</Button>
								)}
								{((isAdmin && status !== 3) ||
									status === 4 ||
									status === 5) && (
									<Link to={`/jobPost/update/${jobDetail.jobPostId}`}>
										<Button>Chỉnh sửa</Button>
									</Link>
								)}
								{status === 3 && (
									<button className="edit" onClick={handleShowApproveModal}>
										Khôi phục
									</button>
								)}
							</div>
						) : (
							<div className="title-action">
								<Button
									variant="secondary"
									onClick={() =>
										isAdmin
											? pageType === 1
												? navigate(`/jobPost`)
												: navigate(`/jobPost/detail/${jobDetail.jobPostId}`)
											: handleCancelButtonClick(cancelVisible, setCancelVisible)
									}
								>
									Hủy
								</Button>

								{pageType === 1 && (
									<Button onClick={handleSubmit(handleSaveDraffButtonClick)}>
										Lưu nháp
									</Button>
								)}

								<Button
									onClick={() =>
										isAdmin
											? handleSubmit(handleUpdate)
											: handleSendButtonClick(sendVisible, setSendVisible)
									}
								>
									{pageType === 1 ? 'Gửi tin' : 'Lưu'}
								</Button>
							</div>
						)}
					</div>
				</div>

				{/* Job Detail Body */}
				<div className="body-detail">
					{/* Wrap Left */}
					<div className="information">
						<p className="sub-title">NỘI DUNG TIN ĐĂNG TUYỂN</p>
						{(isAdmin || (!isAdmin && pageType === 0)) && (
							<div className="information-items bg-gray">
								<div className="information-item">
									<p className="item-title">ID:</p>
									<p className="item-infor">{jobDetail.id}</p>
								</div>
								{status === 1 && (
									<div className="information-item">
										<p className="item-title">Trạng thái tin:</p>
										<p
											className={`item-infor ${
												jobDetail.trangthaitin === 'Hiện' ? 'show' : 'hide'
											}`}
										>
											{jobDetail.trangthaitin}
										</p>
									</div>
								)}
								<div className="information-item">
									<p className="item-title">Trạng thái duyệt: </p>
									<p
										className="item-infor"
										dangerouslySetInnerHTML={{
											__html: jobDetail.trangthaiduyet
										}}
									></p>
								</div>

								{(status === 1 || status === 2 || status === 3) && (
									<div className="information-item">
										<p className="item-title ">Đã ứng tuyển:</p>
										<p className="item-infor">
											<img
												className="img-16"
												onClick={handleShowCandidateModal}
												src="/Assets/images/jobpost/view-detail.png"
												alt="Show candidate modal"
											/>
											{jobDetail.sohosoungtuyen}
										</p>
									</div>
								)}

								{(status === 1 || status === 2 || status === 3) && (
									<>
										<div className="information-item">
											<p className="item-title">Lượt xem:</p>
											<p className="item-infor">{jobDetail.soluotxem}</p>
										</div>
										<div className="information-item">
											<p className="item-title">Ngày hết hạn:</p>
											{pageType === 2 ? (
												<DatePicker
													className="datepicker"
													closeOnScroll={true}
													isClearable
													name="ngayhethan"
													placeholderText="&#xf073; "
													selected={ngayhethan}
													{...register('ngayhethan')}
													onChange={date => setValue('ngayhethan', date)}
												/>
											) : (
												<p className="item-infor">{jobDetail.ngayhethan}</p>
											)}
										</div>
									</>
								)}
							</div>
						)}
						<div className="information-items">
							<div className="information-item">
								<p className="item-title">Vị trí tuyển dụng</p>
								{pageType === 1 || pageType === 2 ? (
									<InputField
										control={control}
										name="vitrituyendung"
										className="item-infor"
									/>
								) : (
									<p className="item-infor">{jobDetail.vitrituyendung}</p>
								)}
							</div>
							<div className="information-item">
								<p className="item-title">Hình thức làm việc</p>
								{pageType === 1 || pageType === 2 ? (
									workingStatusData.length > 0 && (
										<SelectField
											control={control}
											name="hinhthuclamviec"
											options={workingStatusData.map(item => ({
												value: item.name,
												label: item.name
											}))}
										/>
									)
								) : (
									<p className="item-infor">{jobDetail.hinhthuclamviec}</p>
								)}
							</div>
							<div className="information-item">
								<p className="item-title">Mức lương</p>
								{pageType === 1 || pageType === 2 ? (
									salaryDealData.length > 0 && (
										<SelectField
											control={control}
											name="mucluong"
											size="small"
											options={salaryDealData.map(item => ({
												value: item.name,
												label: item.name
											}))}
										/>
									)
								) : (
									<p className="item-infor">{jobDetail.mucluong}</p>
								)}
							</div>
							<div className="information-item">
								<p className="item-title">Cấp bậc</p>
								{pageType === 1 || pageType === 2 ? (
									rankData.length > 0 && (
										<SelectField
											name="capbac"
											size="small"
											control={control}
											options={rankData.map(item => ({
												value: item.name,
												label: item.name
											}))}
										/>
									)
								) : (
									<p className="item-infor">{jobDetail.capbac}</p>
								)}
							</div>
							<div className="information-item">
								<p className="item-title">Học vấn</p>
								{pageType === 1 || pageType === 2 ? (
									degreeData.length > 0 && (
										<SelectField
											name="hocvan"
											size="small"
											control={control}
											options={degreeData.map(item => ({
												value: item.name,
												label: item.name
											}))}
										/>
									)
								) : (
									<p className="item-infor">{jobDetail.hocvan}</p>
								)}
							</div>
							<div className="information-item"></div>
							<div className="information-item">
								<p className="item-title">Cần kinh nghiệm</p>
								{pageType === 1 || pageType === 2 ? (
									<CheckBoxField
										className="form-check"
										control={control}
										name="cankinhnghiem"
									/>
								) : (
									<p
										className="item-infor"
										dangerouslySetInnerHTML={{
											__html: jobDetail.cankinhnghiem
										}}
									></p>
								)}
							</div>
							<div className="information-item">
								<p className="item-title">Số lượng</p>
								{pageType === 1 || pageType === 2 ? (
									<InputField control={control} name="soluong" type="number" />
								) : (
									<p className="item-infor">{jobDetail.soluong}</p>
								)}
							</div>
							<div className="information-item">
								<p className="item-title">Hot Job</p>
								{pageType === 1 || pageType === 2 ? (
									<CheckBoxField control={control} name="hotjob" value={true} />
								) : (
									<p
										className="item-infor"
										dangerouslySetInnerHTML={{ __html: jobDetail.hotjob }}
									></p>
								)}
							</div>
							<div className="information-item">
								<p className="item-title">Địa điểm </p>
								{pageType === 1 || pageType === 2 ? (
									locationData.length > 0 && (
										<SelectField
											name="diadiem"
											control={control}
											options={locationData.map(item => ({
												value: item.name,
												label: item.name
											}))}
										/>
									)
								) : (
									<p className="item-infor">{jobDetail.diadiem}</p>
								)}
							</div>
							{isAdmin && (
								<>
									<div className="information-item">
										<p className="item-title">Công ty</p>
										<p className="item-infor">{jobDetail.tencongty}</p>
									</div>
									<div className="information-item"></div>
								</>
							)}

							<div className="information-item">
								<p className="item-title">Nơi nhận</p>
								{pageType === 1 || pageType === 2 ? (
									<InputField
										control={control}
										name="noinhan"
										className="item-infor"
									/>
								) : (
									<p className="item-infor">{jobDetail.noinhan}</p>
								)}
							</div>

							{isAdmin && (
								<div className="information-item">
									<p className="item-title">Địa chỉ</p>
									<p className="item-infor">{jobDetail.diachi}</p>
								</div>
							)}
						</div>
						<div
							className={
								pageType === 1 || pageType === 2 || readMore
									? 'descrip'
									: 'descrip hide'
							}
						>
							<p>Mô tả chi tiết</p>
							{pageType === 1 || pageType === 2 ? (
								<Editor value={description} onChange={c => setDescription(c)} />
							) : (
								<>
									<div
										className={readMore ? 'desc-button' : 'desc-button hide'}
									>
										<Button
											variant="secondary"
											className="read-more-btn"
											onClick={() => {
												setReadMore(!readMore);
											}}
										>
											<span>{readMore ? 'Rút gọn' : 'Xem thêm'}</span>
											<img
												className="read-more"
												src={
													readMore
														? '/Assets/images/jobpost/angle-small-up.png'
														: '/Assets/images/jobpost/angle-small-down.png'
												}
												alt="more"
											/>
										</Button>
									</div>
									<div
										className="desc-detail"
										dangerouslySetInnerHTML={{
											__html: jobDetail.motachitiet
										}}
									></div>
								</>
							)}
						</div>
					</div>

					{/* Wrap right */}
					{isAdmin && (
						<div>
							{/* Interview */}
							<div className="interview">
								<div className="head-interview">
									<p className="sub-title">PHỎNG VẤN NHANH</p>
									{pageType === 2 ? (
										<Switch
											id="phongvanngay"
											name="phongvanngay"
											className="switch-interviewNow"
											color="primary"
											checked={phongvanngay}
											{...register('phongvanngay')}
										/>
									) : (
										<Switch
											id="phongvanngay"
											name="phongvanngay"
											className="switch-interviewNow"
											color="primary"
											checked={phongvanngay}
										/>
									)}
								</div>
								<div className="interview-infor">
									<p className="item-title">Trạng thái:</p>
									<div
										className={`item-infor ${phongvanngay ? 'green' : 'gray'}`}
									>
										{phongvanngay ? 'Đã lên lịch' : 'Không áp dụng'}
									</div>
								</div>
								{pageType === 2 ? (
									<div
										className="interview-infor"
										onMouseOver={handleTimeOptions}
									>
										<div className="item-title">Khung thời gian phỏng vấn</div>
										{phongvanngay ? (
											<>
												<div className="morning-interview-info">
													<div className="morning-time-range">
														<FormCheck
															id="phongvansang"
															{...register('phongvansang')}
															onChange={handleChangeSession}
														/>
														<div>Sáng:</div>
														<SelectField
															control={control}
															name="buoisang_Tugio"
															isDisabled={!phongvansang}
															onChange={handleChangeTimeFrom}
															options={morningTimeFromOptions}
														/>
														<div className="time-to">-</div>
														<SelectField
															control={control}
															name="buoisang_Dengio"
															isDisabled={!phongvansang}
															onChange={handleChangeTimeTo}
															options={morningTimeToOptions}
														/>
													</div>
													<div className="morning-interview-time-range">
														<div className="item-title">
															Thời lượng phỏng vấn
														</div>
														<div className={`radio-check`}>
															<CFormCheck
																type="radio"
																name="thoiluongphongvansang"
																id="thoiluongphongvansang-15"
																label="15 Phút"
																value="15"
																disabled={!phongvansang}
																{...register('thoiluongphongvansang')}
																onChange={handleChangeInterviewTime}
															/>
															<CFormCheck
																type="radio"
																name="thoiluongphongvansang"
																id="thoiluongphongvansang-30"
																label="30 Phút"
																value="30"
																disabled={!phongvansang}
																{...register('thoiluongphongvansang')}
																onChange={handleChangeInterviewTime}
															/>
															<CFormCheck
																type="radio"
																name="thoiluongphongvansang"
																id="thoiluongphongvansang-45"
																label="45 Phút"
																value="45"
																disabled={!phongvansang}
																{...register('thoiluongphongvansang')}
																onChange={handleChangeInterviewTime}
															/>
															<CFormCheck
																type="radio"
																id="thoiluongphongvansang-60"
																label="60 Phút"
																value="60"
																name="thoiluongphongvansang"
																disabled={!phongvansang}
																{...register('thoiluongphongvansang')}
																onChange={handleChangeInterviewTime}
															/>
														</div>
													</div>
												</div>
												<div className="afternoon-interview-info">
													<div className="afternoon-time-range">
														<CFormCheck
															checked={phongvanchieu}
															{...register('phongvanchieu')}
															onChange={handleChangeSession}
														/>
														<span>Chiều:</span>
														<SelectField
															control={control}
															name="buoichieu_Tugio"
															isDisabled={!phongvanchieu}
															onChange={handleChangeTimeFrom}
															options={afternoonTimeFromOptions}
														/>
														<span className="time-to">-</span>
														<SelectField
															control={control}
															name="buoichieu_Dengio"
															isDisabled={!phongvanchieu}
															onChange={handleChangeTimeTo}
															options={afternoonTimeToOptions}
														/>
													</div>
													<div className="afternoon-interview-time-range">
														<div className="item-title">
															Thời lượng phỏng vấn
														</div>
														<span className={`radio-check`}>
															<CFormCheck
																type="radio"
																label="15 Phút"
																value="15"
																id="thoiluongphongvanchieu-15"
																name="thoiluongphongvanchieu"
																disabled={!phongvanchieu}
																{...register('thoiluongphongvanchieu')}
																onChange={handleChangeInterviewTime}
															/>
															<CFormCheck
																type="radio"
																label="30 Phút"
																value="30"
																name="thoiluongphongvanchieu"
																id="thoiluongphongvanchieu-30"
																disabled={!phongvanchieu}
																{...register('thoiluongphongvanchieu')}
																onChange={handleChangeInterviewTime}
															/>
															<CFormCheck
																type="radio"
																label="45 Phút"
																value="45"
																name="thoiluongphongvanchieu"
																id="thoiluongphongvanchieu-45"
																disabled={!phongvanchieu}
																{...register('thoiluongphongvanchieu')}
																onChange={handleChangeInterviewTime}
															/>
															<CFormCheck
																type="radio"
																label="60 Phút"
																value="60"
																name="thoiluongphongvanchieu"
																id="thoiluongphongvanchieu-60"
																disabled={!phongvanchieu}
																{...register('thoiluongphongvanchieu')}
																onChange={handleChangeInterviewTime}
															/>
														</span>
													</div>
												</div>
											</>
										) : (
											<div className="text-gray">--</div>
										)}
									</div>
								) : (
									<div className="interview-infor">
										<p className="item-title">Khung thời gian phỏng vấn</p>
										{jobDetail.phongvanngay ? (
											<p
												className="item-infor"
												dangerouslySetInnerHTML={{
													__html: jobDetail.khungthoigianphongvanngay
												}}
											></p>
										) : (
											<div className="text-gray">--</div>
										)}
									</div>
								)}
							</div>

							{/* Note */}
							{status !== 1 && (
								<div className="note">
									*Tính năng Phỏng vấn ngay chỉ áp dụng cho tin đăng tuyển đã
									được duyệt!
								</div>
							)}

							{/* Chart */}
							{!pageType && chart && (
								<BarChart
									title="BIỂU ĐỒ CỘT THỂ HIỆN SỐ LƯỢNG NGƯỜI XEM TIN VÀ ỨNG TUYỂN"
									data={chart}
									date={chartDate}
									setDate={setChartDate}
									type={chartType}
									setType={setChartType}
								/>
							)}
						</div>
					)}
				</div>

				{/* MODAL */}
				{/* Candidate List Modal */}
				<JobPostCandidateModal
					show={showCandidateModal}
					candidateList={candidateList}
					onClose={handleCloseCandidateModal}
				/>

				{/* Reject Modal */}
				<JobPostRejectModal
					showRejectModal={showRejectModal}
					handleCloseRejectModal={handleCloseRejectModal}
					handleReject={handleReject}
				/>
				{/* Approve/Restore Modal */}
				<JobPostApproveModal
					isApprove={status === 0}
					show={showApproveModal}
					onClose={handleCloseApproveModal}
					onSubmit={status === 0 ? handleApprove : handleRestore}
				/>
				{/* Delete Modal */}
				<JobPostDeleteModal
					isDeleted={status === 3}
					show={showDeleteModal}
					onClose={handleCloseDeleteModal}
					onSubmit={handleDelete}
				/>

				<CModal
					className="modal-cancel"
					visible={cancelVisible}
					onClose={() => setCancelVisible(false)}
					centered="true"
					fade
				>
					<CModalHeader onClose={() => setCancelVisible(false)}></CModalHeader>
					<CModalBody>
						<img
							className="img-88"
							src={
								process.env.PUBLIC_URL + `/Assets/images/recruiter/leave.png`
							}
							alt="cancel-icon"
						/>

						<p className="modal-title">Xác nhận rời khỏi?</p>
						<span className="modal-inform">
							Lưu ý: Tin đăng tuyển chưa hoàn thiện có thể lưu ở mục lưu nháp
						</span>
					</CModalBody>
					<CModalFooter className="d-flex">
						<Button
							className="cancel-btn"
							onClick={handleLeaveButtonClick}
							variant="danger"
						>
							Rời khỏi
						</Button>

						<Button
							className="saveDraff-btn"
							onClick={handleSubmit(handleSaveDraffButtonClick)}
						>
							Lưu nháp
						</Button>
					</CModalFooter>
				</CModal>

				<CModal
					className="modal-send"
					visible={sendVisible}
					onClose={() => setSendVisible(false)}
					centered="true"
					fade
				>
					<CModalHeader onClose={() => setSendVisible(false)}></CModalHeader>
					<CModalBody>
						<img
							className="img-88"
							src={
								process.env.PUBLIC_URL + `/Assets/images/recruiter/confirm.png`
							}
							alt="send-icon"
						/>

						<p className="modal-title">Xác nhận gửi tin để duyệt?</p>
						<span className="modal-inform">
							Lưu ý: Tin tuyển dụng sau khi gửi sẽ không được chỉnh sửa
						</span>
					</CModalBody>
					<CModalFooter className="d-flex">
						<Button
							className="cancel-btn"
							onClick={handleCancelSendButtonClick}
							variant="danger"
						>
							Hủy
						</Button>

						<Button
							className="sendPost-btn"
							onClick={handleSubmit(handleUpdate)}
						>
							Xác nhận
						</Button>
					</CModalFooter>
				</CModal>
			</div>
		</form>
	);
};

export default JobPostDetail;
