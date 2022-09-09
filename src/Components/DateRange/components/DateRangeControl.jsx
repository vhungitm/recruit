import { format, getISOWeek, getYear } from 'date-fns';

export const DateRangeControl = props => {
	const { value, type, setShowWrapper } = props;

	// value JSX for day type
	const dayValueJSX = (
		<div className="date-range-control-value">
			{format(value.startDate, 'dd.MM.yyyy')}
			{' đến '}
			{format(value.endDate, 'dd.MM.yyyy')}
		</div>
	);

	// Value JSX for week type
	const weekValueJSX = (
		<div className="date-range-control-value">
			{'Tuần '}
			{getISOWeek(value.startDate, { weekStartsOn: 1 })}.
			{getYear(value.startDate)}
			{' đến tuần '}
			{getISOWeek(value.endDate, { weekStartsOn: 1 })}.{getYear(value.endDate)}
		</div>
	);

	// Value JSX for month type
	const monthValueJSX = (
		<div className="date-range-control-value">
			{'Tháng '}
			{value.startDate.getMonth() + 1}.{getYear(value.startDate)}
			{' đến tháng '}
			{value.endDate.getMonth() + 1}.{getYear(value.endDate)}
		</div>
	);

	// Value JSX for year type
	const yearValueJSX = (
		<div className="date-range-control-value">
			{'Năm '}
			{value.startDate.getFullYear()}
			{' đến năm '}
			{value.endDate.getFullYear()}
		</div>
	);

	// Value JSX
	const valueJSX =
		type === 0
			? dayValueJSX
			: type === 1
			? weekValueJSX
			: type === 2
			? monthValueJSX
			: yearValueJSX;

	// Return JSX
	return (
		<div className="date-range-control" onClick={setShowWrapper}>
			{valueJSX}
			<div className="date-range-control-icon"></div>
		</div>
	);
};
