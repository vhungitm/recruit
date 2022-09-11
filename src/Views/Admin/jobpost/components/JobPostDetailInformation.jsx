import { CheckBoxField, InputField, SelectField } from 'Components/FormFields';
import React from 'react';
import { Button } from 'react-bootstrap';
import Editor from 'Views/pages/editor/Editor';
import DatePicker from 'react-datepicker';

export const JobPostDetailInformation = props => {
	const {
		pageType,
		isAdmin,
		jobDetail,
		status,

		// Use form
		control,
		register,
		setValue,

		// Read more
		readMore,
		setReadMore,

		// Description
		description,
		setDescription,

		// Select data
		ngayhethan,
		workingStatusData,
		salaryDealData,
		rankData,
		degreeData,
		locationData,

		// Candiate list
		handleShowCandidateModal
	} = props;

	return (
		<div className={isAdmin ? 'information' : 'information w-100'}>
			<div className="information-header">
				<div className="information-header-tab"></div>
				<div className="information-header-title">NỘI DUNG TIN ĐĂNG TUYỂN</div>
			</div>
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
						<div className={readMore ? 'desc-button' : 'desc-button hide'}>
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
	);
};
