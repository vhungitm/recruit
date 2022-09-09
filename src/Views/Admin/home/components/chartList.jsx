import homePageAPI from 'API/homePageAPI';
import { BarChart } from 'Components/Chart';
import { format, subDays } from 'date-fns';
import { useEffect, useState } from 'react';

export const ChartList = () => {
	// Jobpost chart data
	const [chartJobpostingDate, setChartJobpostingDate] = useState({
		startDate: subDays(new Date(), 31),
		endDate: new Date()
	});
	const [chartJobpostingData, setChartJobpostingData] = useState();
	const [chartJobpostingType, setChartJobpostingType] = useState(0);

	// Effect update jobpost chart data
	useEffect(() => {
		const getChartJobpostingData = async () => {
			try {
				const { startDate, endDate } = chartJobpostingDate;

				const res = await homePageAPI.getChartJobposting(
					format(startDate, 'yyyy-MM-dd'),
					format(endDate, 'yyyy-MM-dd'),
					chartJobpostingType
				);

				if (res.succeeded) {
					const chartItem = res.data.chartItem;
					const labels = chartItem.map(item => item.timeline);
					const approvedData = chartItem.map(item => item.approved);
					const waitingData = chartItem.map(item => item.waiting);
					const expiredData = chartItem.map(item => item.expired);
					const blockedData = chartItem.map(item => item.blocked);

					const newData = {
						labels,
						datasets: [
							{
								label: 'Đã duyệt',
								data: approvedData,
								backgroundColor: ['#27AE60'],
								stack: '1',
								barThickness: 16
							},
							{
								label: 'Chờ duyệt',
								data: waitingData,
								backgroundColor: ['#108FCF'],
								stack: '1',
								barThickness: 16
							},
							{
								label: 'Hết hạn',
								data: expiredData,
								backgroundColor: ['#EF3737'],
								stack: '1',
								barThickness: 16
							},
							{
								label: 'Đã khóa',
								data: blockedData,
								backgroundColor: ['#A19F9F'],
								stack: '1',
								barThickness: 16
							}
						]
					};

					setChartJobpostingData(newData);
				} else {
					setChartJobpostingData(null);
				}
			} catch (error) {
				setChartJobpostingData(null);
			}
		};

		getChartJobpostingData();
	}, [chartJobpostingDate, chartJobpostingType]);

	// Recruiter account chart data
	const [chartRecruiterAccountDate, setChartRecruiterAccountDate] = useState({
		startDate: subDays(new Date(), 31),
		endDate: new Date()
	});
	const [chartRecruiterAccountType, setChartRecruiterAccountType] = useState(0);
	const [chartRecruiterAccountData, setChartRecruiterAccountData] = useState();

	// Effect update recruiter account chart data
	useEffect(() => {
		const getChartRecruiterAccountData = async () => {
			try {
				const { startDate, endDate } = chartRecruiterAccountDate;
				const res = await homePageAPI.getChartRecruiterAccount(
					format(startDate, 'yyyy-MM-dd'),
					format(endDate, 'yyyy-MM-dd'),
					chartRecruiterAccountType
				);

				if (res.succeeded) {
					const chartItem = res.data.chartItem;
					const labels = chartItem.map(item => item.timeline);
					const approvedData = chartItem.map(item => item.approved);
					const waitingData = chartItem.map(item => item.waiting);
					const expiredData = chartItem.map(item => item.expired);
					const blockedData = chartItem.map(item => item.blocked);

					const newData = {
						labels,
						datasets: [
							{
								label: 'Đã duyệt',
								data: approvedData,
								backgroundColor: ['#27AE60'],
								stack: '1',
								barThickness: 16
							},
							{
								label: 'Chờ duyệt',
								data: waitingData,
								backgroundColor: ['#108FCF'],
								stack: '1',
								barThickness: 16
							},
							{
								label: 'Hết hạn',
								data: expiredData,
								backgroundColor: ['#EF3737'],
								stack: '1',
								barThickness: 16
							},
							{
								label: 'Đã khóa',
								data: blockedData,
								backgroundColor: ['#A19F9F'],
								stack: '1',
								barThickness: 16
							}
						]
					};

					setChartRecruiterAccountData(newData);
				} else {
					setChartRecruiterAccountData(null);
				}
			} catch (error) {
				setChartRecruiterAccountData(null);
			}
		};

		getChartRecruiterAccountData();
	}, [chartRecruiterAccountDate, chartRecruiterAccountType]);

	// Recruiter account chart data
	const [chartCandidateRegisterDate, setChartCandidateRegisterDate] = useState({
		startDate: subDays(new Date(), 31),
		endDate: new Date()
	});
	const [chartCandidateRegisterData, setChartCandidateRegisterData] =
		useState();
	const [chartCandidateRegisterType, setChartCandidateRegisterType] =
		useState(0);

	// Effect update recruiter account chart data
	useEffect(() => {
		const getChartCandidateRegisterData = async () => {
			try {
				const { startDate, endDate } = chartCandidateRegisterDate;
				const res = await homePageAPI.getChartCandidateRegister(
					format(startDate, 'yyyy-MM-dd'),
					format(endDate, 'yyyy-MM-dd'),
					chartCandidateRegisterType
				);

				if (res.succeeded) {
					const chartItem = res.data.chartItem;
					const labels = chartItem.map(item => item.timeline);
					const totals = chartItem.map(item => item.total);

					const newData = {
						labels,
						datasets: [
							{
								label: 'Đã duyệt',
								data: totals,
								backgroundColor: ['#0C557A'],
								stack: '1',
								barThickness: 16
							}
						]
					};

					setChartCandidateRegisterData(newData);
				} else {
					setChartCandidateRegisterData(null);
				}
			} catch (error) {
				setChartCandidateRegisterData(null);
			}
		};

		getChartCandidateRegisterData();
	}, [chartCandidateRegisterDate, chartCandidateRegisterType]);

	return (
		<div className="charts">
			<BarChart
				title="Biểu đồ cột thể hiện số lượng tin đăng tuyển"
				data={chartJobpostingData}
				date={chartJobpostingDate}
				setDate={setChartJobpostingDate}
				type={chartJobpostingType}
				setType={setChartJobpostingType}
			/>
			<BarChart
				title="Biểu đồ thể hiện số lượng nhà tuyển dụng đăng ký"
				data={chartRecruiterAccountData}
				date={chartRecruiterAccountDate}
				setDate={setChartRecruiterAccountDate}
				type={chartRecruiterAccountType}
				setType={setChartRecruiterAccountType}
			/>

			<BarChart
				title="Biểu đồ cột thể hiện số lượng ứng viên đăng ký"
				data={chartCandidateRegisterData}
				date={chartCandidateRegisterDate}
				setDate={setChartCandidateRegisterDate}
				type={chartCandidateRegisterType}
				setType={setChartCandidateRegisterType}
			/>
		</div>
	);
};

export default ChartList;
