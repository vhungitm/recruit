import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react';
import { selectCurrentUser } from 'app/authSlice';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const JobPostDetailHeader = props => {
	const {
		pageType,
		isAdmin,
		jobPostId,
		status,
		trangthaitin,

		// Update
		onCancelUpdate,
		onSave,
		onSaveDraff,

		// Detail
		onUpdate,
		onUpdateStatus,
		onApprove,
		onReject,
		onDelete,
		onRestore
	} = props;

	const userRole = useSelector(selectCurrentUser).roles[0];

	// All buttons JSX
	const allButtonsJSX = {
		approve: (
			<Button variant="secondary" onClick={onApprove}>
				Duyệt
			</Button>
		),
		reject: (
			<Button variant="danger-outline" onClick={onReject}>
				Không duyệt
			</Button>
		),
		delete: (
			<Button variant="danger-outline" onClick={onDelete}>
				{status === 3 ? 'Xóa vĩnh viễn' : 'Xóa tin'}
			</Button>
		),
		restore: (
			<Button className="edit" onClick={onRestore}>
				Khôi phục
			</Button>
		),
		cancelUpdate: (
			<Button variant="secondary" onClick={onCancelUpdate}>
				Hủy
			</Button>
		),
		saveDraff: <Button onClick={onSaveDraff}>Lưu nháp</Button>,
		save: (
			<Button onClick={onSave}>{pageType === 1 ? 'Gửi tin' : 'Lưu'}</Button>
		),
		update: <Button onClick={onUpdate}>Chỉnh sửa</Button>,
		updateStatus: (
			<Button
				variant={isAdmin ? 'secondary' : 'primary'}
				onClick={onUpdateStatus}
			>
				{trangthaitin === 'Ẩn' ? 'Hiện tin' : 'Ẩn tin'}
			</Button>
		)
	};

	// Button JSX
	const buttonsJSX = {
		detail: {
			SuperAdmin: {
				0: (
					<>
						{allButtonsJSX.reject}
						{allButtonsJSX.approve}
						{allButtonsJSX.update}
					</>
				),
				1: (
					<>
						{allButtonsJSX.delete}
						{allButtonsJSX.updateStatus}
						{allButtonsJSX.update}
					</>
				),
				2: (
					<>
						{allButtonsJSX.delete}
						{allButtonsJSX.update}
					</>
				),
				3: (
					<>
						{allButtonsJSX.delete}
						{allButtonsJSX.restore}
					</>
				)
			},
			Basic: {
				1: <>{allButtonsJSX.updateStatus}</>,
				4: <>{allButtonsJSX.update}</>,
				5: <>{allButtonsJSX.update}</>
			}
		},
		update: {
			SuperAdmin: (
				<>
					{allButtonsJSX.cancelUpdate}
					{allButtonsJSX.save}
				</>
			),
			Basic: (
				<>
					{allButtonsJSX.cancelUpdate}
					{allButtonsJSX.save}
				</>
			)
		},
		create: (
			<>
				{allButtonsJSX.cancelUpdate}
				{allButtonsJSX.saveDraff}
				{allButtonsJSX.save}
			</>
		)
	};

	const headerButtonsJSX =
		pageType === 0
			? buttonsJSX.detail[userRole]?.[status]
			: pageType === 1
			? buttonsJSX.create
			: buttonsJSX.update[userRole];

	// Return JSX
	return (
		<>
			<div className="bread-crumb">
				<CBreadcrumb>
					<CBreadcrumbItem className="first-breadcrumb">
						<Link to="/jobPost">Quản lý tin đăng tuyển</Link>
					</CBreadcrumbItem>
					<CBreadcrumbItem className="first-breadcrumb">
						{pageType === 2 ? (
							<Link to={`/jobPost/detail/${jobPostId}`}>
								Chi tiết tin đăng tuyển
							</Link>
						) : (
							<>Chi tiết tin đăng tuyển</>
						)}
					</CBreadcrumbItem>
					{pageType === 2 && (
						<CBreadcrumbItem className="second-breadcrumb">
							Chỉnh sửa tin đăng tuyển
						</CBreadcrumbItem>
					)}
				</CBreadcrumb>
			</div>
			<div className="wrap-management-header">
				<div className="wrap-management-header-title">
					{pageType === 2
						? 'CHỈNH SỬA TIN ĐĂNG TUYỂN'
						: 'CHI TIẾT TIN ĐĂNG TUYỂN'}
				</div>
				{/* Header buttons */}
				<div className="wrap-management-header-buttons">{headerButtonsJSX}</div>
			</div>
		</>
	);
};
