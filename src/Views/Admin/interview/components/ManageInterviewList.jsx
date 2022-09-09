import { Tooltip } from '@mui/material';
import { Header } from 'Views/datatable';

export const ManageInterviewList = props => {
	const {
		headers,
		data,

		// Sort
		handleSort,

		// Handle
		handleShowApproveModal,
		handleShowRejectModal
	} = props;

	return (
		<div className="datatable scroll">
			<table className="w-2000">
				<Header
					headers={headers}
					controlsClass="th-2 sticky"
					onSorting={handleSort}
				/>
				<tbody>
					{data.map((item, index) => (
						<tr key={item.interviewId}>
							<td>{item.id}</td>
							<td>{item.hoten}</td>
							<td>{item.email}</td>
							<td>{item.sodienthoai}</td>
							<td>{item.thoigian}</td>
							<td>{item.vitriphongvan}</td>
							<td>{item.hinhthuclamviec}</td>
							<td>{item.kenhphongvan}</td>
							<td>
								<div
									className="interview-status"
									dangerouslySetInnerHTML={{ __html: item.trangthai }}
								/>
							</td>
							<td>{item.taikhoan}</td>
							<td className="td-2 sticky">
								<div
									className={`controls${
										index % 2 === 0 ? ' bg-white' : ' bg-gray'
									}`}
								>
									<Tooltip arrow title="Duyệt">
										<img
											className="action"
											src={
												item.trangthai ===
												'<span class="orange">Chờ duyệt</span>'
													? '/Assets/images/jobpost/approved.png'
													: '/Assets/images/interview/disable-approve.png'
											}
											alt="approve"
											onClick={() => {
												if (
													item.trangthai ===
													'<span class="orange">Chờ duyệt</span>'
												)
													handleShowApproveModal(item);
											}}
										/>
									</Tooltip>
									<Tooltip arrow title="Từ chối">
										<img
											className="action"
											src={
												item.trangthai ===
												'<span class="orange">Chờ duyệt</span>'
													? '/Assets/images/interview/reject.png'
													: '/Assets/images/interview/disable-reject.png'
											}
											alt="reject"
											onClick={() => {
												if (
													item.trangthai ===
													'<span class="orange">Chờ duyệt</span>'
												)
													handleShowRejectModal(item);
											}}
										/>
									</Tooltip>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
