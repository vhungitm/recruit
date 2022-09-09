import React from 'react';
import { DateRangeCalendar } from './DateRangeCalendar';
import { DateRangeMonth } from './DateRangeMonth';
import { DateRangeWrapperHeader } from './DateRangeWrapperHeader';
import { DateRangeYear } from './DateRangeYear';

export const DateRangeWrapper = props => {
	const {
		type,
		value,
		calendar,
		calendarDate,
		months,
		weeks,
		weekdays,
		handleChangeValue,
		handleChangeCalendar
	} = props;

	return (
		<div className="date-range-wrapper">
			<DateRangeWrapperHeader
				type={type}
				calendarDate={calendarDate}
				handleChangeCalendar={handleChangeCalendar}
			/>

			{type === 0 || type === 1 ? (
				<DateRangeCalendar
					type={type}
					weeks={weeks}
					weekdays={weekdays}
					calendar={calendar}
					handleChangeValue={handleChangeValue}
				/>
			) : type === 2 ? (
				<DateRangeMonth months={months} handleChangeValue={handleChangeValue} />
			) : (
				<DateRangeYear value={value} handleChangeValue={handleChangeValue} />
			)}
		</div>
	);
};
