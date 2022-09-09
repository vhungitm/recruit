import {
	CBreadcrumb,
	CBreadcrumbItem,
	CCol,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader,
	CRow
} from '@coreui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import jobPostAPI from 'API/jobPostAPI.js';
import { CheckBoxField, InputField, SelectField } from 'Components/FormFields';
import { useEffect, useState } from 'react';
import { Button, FormLabel } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'SCSS/_jobPostCreateNew.scss';
import Editor from 'Views/pages/editor/Editor';
import * as yup from 'yup';

const JobPostCreateNew = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [workingStatusData, setWorkingStatusData] = useState([]);
	const [salaryDealData, setSalaryDealData] = useState([]);
	const [rankData, setRankData] = useState([]);
	const [degreeData, setDegreeData] = useState([]);
	const [locationData, setLocationData] = useState([]);

	const [cancelVisible, setCancelVisible] = useState(false);
	const [sendVisible, setSendVisible] = useState(false);

	// Form
	const validationSchema = yup.object().shape({
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
		diadiem: yup.string().required('Vui lòng chọn địa điểm'),
		noinhan: yup.string().required('Xin vui lòng điền đầy đủ thông tin')
	});

	// Use form
	const { control, reset, handleSubmit } = useForm({
		defaultValues: {
			vitrituyendung: '',
			hinhthuclamviec: '',
			mucluong: '',
			capbac: '',
			hocvan: '',
			cankinhnghiem: false,
			soluong: 0,
			hotjob: false,
			diadiem: '',
			noinhan: ''
		},
		resolver: yupResolver(validationSchema)
	});

	// Effect fetch data
	useEffect(() => {
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

		// fetchData();
		fetchAllIndex();
		//fetchCandidates();
	}, [params.id, reset]);

	// Description
	const [description, setDescription] = useState();

	// Handle submit
	const handleSubmitJobPost = async formValues => {
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

		setSendVisible(false);
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
		const newJobPost = {
			vitrituyendung,
			hinhthuclamviec,
			mucluong,
			capbac,
			hocvan,
			cankinhnghiem,
			hotjob,
			soluong,
			noinhan,
			diadiem,
			motachitiet: description
		};

		// Create Job Post
		const resp = await jobPostAPI.createJobPost(newJobPost);
		if (resp.succeeded) {
			navigate('/jobPost/detail/' + resp.data.jobPostId);
			toast(`Đã gửi tin số ${resp.data.jobPostId} để duyệt`);
		} else {
			// toast(`Không gửi được tin ${resp.data.jobPostId} để duyệt`);
			toast(`Tin đăng tuyển không tạo được`);
		}
	};

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

		setCancelVisible(false);

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
			soluong,
			noinhan,
			diadiem,
			motachitiet: description,
			isSoanThao: true
		};

		// Create Job Post
		const resp = await jobPostAPI.createJobPost(newJobDraffPost);
		if (resp.succeeded) {
			navigate('/jobPost?id=5');
			toast(`Đã lưu nháp tin số ${resp.data.jobPostId}`);
		} else {
			// toast(`Không gửi được tin ${resp.data.jobPostId} để duyệt`);
			toast(`Tin đăng tuyển không thể lưu nháp`);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleSaveDraffButtonClick)}>
			<div className="wrap-jobPost-CreateNew">
				<div className="header-create-new">
					<div className="bread-crumb">
						<CBreadcrumb>
							<CBreadcrumbItem
								href="/jobPost"
								target="_self"
								className="first-breadcrumb"
							>
								Quản lý tin đăng tuyển
							</CBreadcrumbItem>
							<CBreadcrumbItem className="third-breadcrumb">
								Tạo tin mới
							</CBreadcrumbItem>
						</CBreadcrumb>
					</div>
					<div className="title">
						<div className="title-page">TẠO TIN ĐĂNG TUYỂN</div>
						<div className="title-action">
							<button
								type="button"
								className="cancel-action"
								onClick={() => {
									handleCancelButtonClick(cancelVisible, setCancelVisible);
								}}
							>
								Hủy
							</button>
							<CModal
								className="modal-cancel"
								visible={cancelVisible}
								onClose={() => setCancelVisible(false)}
								centered="true"
								fade
							>
								<CModalHeader
									onClose={() => setCancelVisible(false)}
								></CModalHeader>
								<CModalBody>
									<img
										className="img-88"
										src={
											process.env.PUBLIC_URL +
											`/Assets/images/recruiter/leave.png`
										}
										alt="cancel-icon"
									/>

									<p className="modal-title">Xác nhận rời khỏi?</p>
									<span className="modal-inform">
										Lưu ý: Tin đăng tuyển chưa hoàn thiện có thể lưu ở mục lưu
										nháp
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
							<button
								type="submit"
								className="save"
								onClick={handleSubmit(handleSaveDraffButtonClick)}
							>
								Lưu nháp
							</button>
							<button
								type="button"
								className="send-action"
								onClick={() => {
									handleSendButtonClick(sendVisible, setSendVisible);
								}}
							>
								Gửi tin
							</button>
							<CModal
								className="modal-send"
								visible={sendVisible}
								onClose={() => setSendVisible(false)}
								centered="true"
								fade
							>
								<CModalHeader
									onClose={() => setSendVisible(false)}
								></CModalHeader>
								<CModalBody>
									<img
										className="img-88"
										src={
											process.env.PUBLIC_URL +
											`/Assets/images/recruiter/confirm.png`
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
										onClick={handleSubmit(handleSubmitJobPost)}
									>
										Xác nhận
									</Button>
								</CModalFooter>
							</CModal>
						</div>
					</div>
				</div>
				<div className="body-CreateNew">
					<div className="information">
						<p className="sub-title">NỘI DUNG TIN ĐĂNG TUYỂN</p>
						<div>
							<CRow>
								<CCol lg={2} md={2} sm={2}>
									<InputField
										control={control}
										name="vitrituyendung"
										label="Vị trí tuyển dụng"
										labelClassName="item-title"
										className="item-infor"
										placeholder="Nhập vị trí tuyển dụng"
									/>
								</CCol>
								<CCol lg={2} md={2} sm={2}>
									{workingStatusData.length && (
										<SelectField
											control={control}
											name="hinhthuclamviec"
											label="Hình thức làm việc"
											labelClassName="item-title"
											placeholder="Chọn hình thức làm việc"
											options={workingStatusData.map(item => ({
												value: item.name,
												label: item.name
											}))}
										/>
									)}
								</CCol>
								<CCol lg={2} md={2} sm={2}>
									{salaryDealData.length && (
										<SelectField
											control={control}
											name="mucluong"
											label="Mức lương"
											labelClassName="item-title"
											size="small"
											options={salaryDealData.map(item => ({
												value: item.name,
												label: item.name
											}))}
											placeholder="Chọn mức lương"
										/>
									)}
								</CCol>
								<CCol lg={2} md={2} sm={2}>
									{rankData.length && (
										<SelectField
											name="capbac"
											label="Cấp bậc"
											labelClassName="item-title"
											size="small"
											control={control}
											options={rankData.map(item => ({
												value: item.name,
												label: item.name
											}))}
											placeholder="Chọn cấp bậc"
										/>
									)}
								</CCol>
								<CCol lg={2} md={2} sm={2}>
									{degreeData.length && (
										<SelectField
											name="hocvan"
											label="Học vấn"
											labelClassName="item-title"
											size="small"
											control={control}
											options={degreeData.map(item => ({
												value: item.name,
												label: item.name
											}))}
											placeholder="Chọn học vấn"
										/>
									)}
								</CCol>
							</CRow>
						</div>
						<div>
							<CRow>
								<CCol lg={2} md={2} sm={2}>
									<FormLabel as="div" className="item-title">
										Cần kinh nghiệm
									</FormLabel>
									<CheckBoxField
										control={control}
										name="cankinhnghiem"
										labelClassName="item-title"
									/>
								</CCol>
								<CCol lg={2} md={2} sm={2}>
									<FormLabel as="div" className="item-title">
										Hot Job
									</FormLabel>
									<CheckBoxField
										control={control}
										name="hotjob"
										value={true}
										labelClassName="item-title"
									/>
								</CCol>
								<CCol lg={2} md={2} sm={2}>
									<InputField
										control={control}
										name="soluong"
										label="Số lượng"
										labelClassName="item-title"
										type="number"
										placeholder="Nhập số lượng"
									/>
								</CCol>
								<CCol lg={2} md={2} sm={2}>
									<InputField
										control={control}
										name="noinhan"
										label="Nơi nhận"
										labelClassName="item-title"
										className="item-infor"
										placeholder="Nhập nơi nhận"
									/>
								</CCol>
								<CCol lg={2} md={2} sm={2}>
									{locationData.length && (
										<SelectField
											name="diadiem"
											label="Địa điểm"
											labelClassName="item-title"
											control={control}
											options={locationData.map(item => ({
												value: item.name,
												label: item.name
											}))}
											placeholder="Chọn địa điểm"
										/>
									)}
								</CCol>
							</CRow>
						</div>

						<div className="summerNote">
							<p className="title">Mô tả chi tiết</p>
							<div className="description-note">
								<Editor
									value={description}
									onChange={des => {
										setDescription(des);
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default JobPostCreateNew;
