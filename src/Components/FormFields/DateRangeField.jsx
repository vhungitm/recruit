import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { Form } from 'react-bootstrap';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useController } from 'react-hook-form';
import { formatDateString } from 'utils';

export const DateRangeField = props => {
	const {
		control,
		size,
		name,
		label,
		labelClassName,
		wrapperAlign,
		...inputProps
	} = props;
	const {
		field: { value, onChange },
		fieldState: { error }
	} = useController({ name, control });

	// date state
	const [range, setRange] = useState([
		{
			startDate: value ? formatDateString(value.split(' - ')[0]) : new Date(),
			endDate: value ? formatDateString(value.split(' - ')[1]) : new Date(),
			key: 'selection'
		}
	]);

	useEffect(() => {
		if (!value)
			setRange([
				{
					startDate: new Date(),
					endDate: new Date(),
					key: 'selection'
				}
			]);
	}, [value]);

	// open / close
	const [open, setOpen] = useState(false);
	const refOne = useRef(null);

	useEffect(() => {
		document.addEventListener('keydown', hideOnEscape, true);
		document.addEventListener('click', hideOnClickOutside, true);
	}, []);

	// hide dropdown on ESC press
	const hideOnEscape = e => {
		if (e.key === 'Escape') {
			setOpen(false);
		}
	};

	// Hide on outside click
	const hideOnClickOutside = e => {
		if (refOne.current && !refOne.current.contains(e.target)) {
			setOpen(false);
		}
	};

	const handleChangeRange = item => {
		setRange([item.selection]);
		onChange(
			`${format(item.selection.startDate, 'dd/MM/yyyy')} - ${format(
				item.selection.endDate,
				'dd/MM/yyyy'
			)}`
		);
	};

	const handleReset = () => {
		onChange('');
		setRange([
			{
				startDate: new Date(),
				endDate: new Date(),
				key: 'selection'
			}
		]);
	};

	return (
		<Form.Group
			className={`form-group calendarWrapper${
				wrapperAlign && ` ${wrapperAlign}`
			}`}>
			{label && (
				<Form.Label as="div" className={labelClassName}>
					{label}
				</Form.Label>
			)}
			<div className="input">
				<Form.Control
					value={value}
					className="inputBox"
					onClick={() => setOpen(open => !open)}
					{...inputProps}
					onChange={() => {}}
				/>
				{value && <div className="close-btn" onClick={handleReset} />}
			</div>

			<div ref={refOne} className="rdrCalendarWrapper">
				{open && (
					<DateRange
						onChange={handleChangeRange}
						editableDateInputs={false}
						moveRangeOnFirstSelection={false}
						ranges={range}
						months={1}
						direction="horizontal"
						className="calendarElement"
					/>
				)}
			</div>
			{error && (
				<Form.Control.Feedback type="invalid">
					{error.message}
				</Form.Control.Feedback>
			)}
		</Form.Group>
	);
};
