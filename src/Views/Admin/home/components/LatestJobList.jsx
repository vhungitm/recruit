export const LatestJobList = props => {
	const { data } = props;

	// Return JSX
	return (
		<div className="latest-jobs">
			<div className="latest-jobs-header">
				<div className="latest-jobs-header-tab"></div>
				<div className="latest-jobs-header-title">Tin đăng gần đây</div>
			</div>
			<div className="latest-jobs-body">
				{data.map(item => (
					<div key={item.id} className="latest-job">
						<div className="latest-job-header">
							<div className="latest-job-title">{item.jobTitle}</div>
							<div className="latest-job-total">
								{item.total} Ứng viên đã nộp hồ sơ
							</div>
						</div>

						<div className="latest-job-id">ID: {item.jobPostRefID}</div>
						<div className="latest-job-address">
							<img
								src="/Assets/images/home/address.png"
								className="latest-job-address-icon"
								alt="address"
								width={24}
								height={24}
							/>
							<div className="latest-job-address-value">{item.address}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
