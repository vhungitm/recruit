import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { DateRange } from 'Components/DateRange';

export const BarChart = props => {
	const { type, setType, title, data, date, setDate } = props;
	ChartJS.register(...registerables);

	return (
		<div className="chart">
			<div className="chart-header">
				<div className="chart-header-tab"></div>
				<div className="chart-header-title">{title}</div>
			</div>

			<div className="chart-calendar">
				<DateRange
					type={type}
					handleChangeType={setType}
					value={date}
					handleChangeValue={setDate}
				/>
			</div>
			<div className="chart-content">
				{data && (
					<Bar
						data={data}
						options={{
							plugins: {
								legend: {
									position: 'bottom',
									align: 'end',
									labels: {
										usePointStyle: true,
										boxWidth: 8,
										boxHeight: 8
									}
								}
							}
						}}
					/>
				)}
			</div>
		</div>
	);
};
