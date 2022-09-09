import { CBreadcrumb, CBreadcrumbItem, CCol, CRow } from '@coreui/react';
import recruiterAccountAPI from 'API/recruiterAccountAPI.js';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'SCSS/_manageRecruiterDetail.scss';
import {
	ManageRecruiterExtendModal,
	ManageRecruiterRejectModal
} from './components';

const ManagementRecruiterDetail = () => {
	const navigate = useNavigate();
	const params = useParams();

	// Job details
	const [recruiterAccountDetail, setRecruiterAccountDetail] = useState({});
	const [status, setStatus] = useState(-1);
	const [load, setLoad] = useState(false);

	// Effect load detail data
	useEffect(() => {
		const fetchDetailData = async () => {
			try {
				const res = await recruiterAccountAPI.fetch(params.id);
				if (res.succeeded) {
					const { data } = res;
					const { trangthaiduyet } = data;

					setRecruiterAccountDetail(data);
					if (trangthaiduyet.search('Bị khóa') >= 0) {
						setStatus(0);
					} else if (trangthaiduyet.search('Chờ duyệt') >= 0) {
						setStatus(1);
					} else if (trangthaiduyet.search('Đã duyệt') >= 0) {
						setStatus(2);
					} else if (trangthaiduyet.search('Hết hạn') >= 0) {
						setStatus(3);
					}
				}
			} catch (error) { }
		};

		fetchDetailData();
	}, [params.id, load]);

	// Reject
	const [showRejectModal, setShowRejectModal] = useState(false);

	const handleShowRejectModal = () => {
		setShowRejectModal(true);
	};
	const handleCloseRejectModal = () => setShowRejectModal(false);

	// Handle reject
	const handleReject = async rejectFormValues => {
		try {
			const { reason, otherReason } = rejectFormValues;

			const response = await recruiterAccountAPI.reject({
				recruiterId: recruiterAccountDetail.recruiterId,
				reason: reason === 'Khác' ? otherReason : reason
			});

			if (response.succeeded) {
				navigate('/manageRecruiter?id=1');
				toast(`Đã không duyệt tài khoản số ${recruiterAccountDetail.id}`);
			} else {
				toast(`Không duyệt tài khoản không thành công`);
			}
		} catch (error) {
			toast(`Không duyệt tài khoản không thành công`);
		} finally {
			setShowRejectModal(false);
		}
	};

	// Approve/extend
	const [showExtendModal, setShowExtendModal] = useState(false);

	// Handle show and close approve/extend modal
	const handleShowExtendModal = () => {
		setShowExtendModal(true);
	};

	const handleCloseExtendModal = () => setShowExtendModal(false);

	// Handle approve/extend
	const handleExtend = async formValues => {
		// Status = 1 => waiting account => approve
		// Status = 3 => expired account => extend
		try {
			const { durationInMonth } = formValues;

			const response =
				status === 1
					? await recruiterAccountAPI.approve({
						recruiterIdList: [recruiterAccountDetail.recruiterId.toString()],
						durationInMonth: parseInt(durationInMonth)
					})
					: await recruiterAccountAPI.extend({
						recruiterIdList: [recruiterAccountDetail.recruiterId.toString()],
						durationInMonth: parseInt(durationInMonth)
					});

			if (response.succeeded) {
				toast(
					status === 1
						? 'Đã duyệt thành công tài khoản'
						: 'Đã gia hạn thành công tài khoản'

				);
			} else {
				toast(
					status === 1
						? 'Duyệt tài khoản không thành công'
						: 'Gia hạn tài khoản không thành công'
				);
			}
			setLoad(true);
		} catch (error) {
			toast(
				status === 1
					? 'Duyệt tài khoản không thành công'
					: 'Gia hạn tài khoản không thành công'
			);
		} finally {
			setShowExtendModal(false);
		}
	};

	// Return JSX
	return (
		<div className="wrap-recruiter-detail">
			<div className="header-detail">
				<div className="bread-crumb">
					<CBreadcrumb>
						<CBreadcrumbItem
							href="/manageRecruiter"
							target="_self"
							className="first-breadcrumb"
						>
							Quản lý tài khoản nhà tuyển dụng
						</CBreadcrumbItem>
						<CBreadcrumbItem className="second-breadcrumb">
							Chi tiết tài khoản
						</CBreadcrumbItem>
					</CBreadcrumb>
				</div>
				<div className="title">
					<div className="title-page">CHI TIẾT TÀI KHOẢN</div>
					{status === 1 && (
						<div className="title-action">
							<button className={`reject-btn`} onClick={handleShowRejectModal}>
								Không duyệt
							</button>
							<button className={`approve-btn`} onClick={handleShowExtendModal}>
								Duyệt
							</button>
						</div>
					)}
					{status === 3 && (
						<div className="title-action">
							<button className={`extend-btn`} onClick={handleShowExtendModal}>
								Gia hạn
							</button>
						</div>
					)}
				</div>
			</div>
			<div className="body-detail">
				<div className="information">
					<div className="gray-bg">
						<CRow className="">
							<CCol>
								<p className="item-title">ID:</p>
								<p className="item-infor">{recruiterAccountDetail.id}</p>
							</CCol>
							<CCol>
								<p className="item-title">Trạng thái duyệt: </p>
								<p
									className="item-infor"
									dangerouslySetInnerHTML={{
										__html: recruiterAccountDetail.trangthaiduyet
									}}
								></p>
							</CCol>

							{(status === 0 || status === 2) && (
								<CCol>
									<p className="item-title ">Số tin đăng:</p>
									<p className="item-infor">
										{recruiterAccountDetail.sotindang}
									</p>
								</CCol>
							)}
							<CCol>
								<p className="item-title">Ngày tạo tài khoản:</p>
								<p className="item-infor">
									{recruiterAccountDetail.ngaytaotaikhoan}
								</p>
							</CCol>
							{(status === 0 || status === 2) && (
								<CCol>
									<p className="item-title">Ngày hết hạn:</p>
									<p className="item-infor">
										{recruiterAccountDetail.ngayhethan}
									</p>
								</CCol>
							)}
						</CRow>
					</div>
					<div className="px-4">
						<CRow>
							<CCol>
								<div className="item-title">Công ty</div>
								<div className="item-infor">
									{recruiterAccountDetail.tencongty}
								</div>
							</CCol>
							<CCol>
								<div className="item-title">Họ và tên</div>
								<div className="item-infor">
									{recruiterAccountDetail.nguoidaidien}
								</div>
							</CCol>
							<CCol>
								<div className="item-title">Số điện thoại</div>
								<div className="item-infor">
									{recruiterAccountDetail.sodienthoai}
								</div>
							</CCol>
						</CRow>
					</div>
					<div className="px-4">
						<CRow>
							<CCol>
								<div className="item-title">Email</div>
								<div className="item-infor">{recruiterAccountDetail.email}</div>
							</CCol>
							<CCol>
								<div className="item-title">Địa chỉ</div>
								<div className="item-infor">
									{recruiterAccountDetail.diachi}
								</div>
							</CCol>
						</CRow>
					</div>
				</div>
			</div>

			{/* MODAL */}
			{/* Reject Modal */}
			<ManageRecruiterRejectModal
				show={showRejectModal}
				onClose={handleCloseRejectModal}
				onSubmit={handleReject}
			/>

			{/* Approve/Extend Modal */}
			<ManageRecruiterExtendModal
				isExtend={status === 3}
				isDetail={true}
				show={showExtendModal}
				onClose={handleCloseExtendModal}
				onSubmit={handleExtend}
			/>
		</div>
	);
};

export default ManagementRecruiterDetail;
