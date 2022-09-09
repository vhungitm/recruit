import { Form, FormCheck, FormGroup } from 'react-bootstrap';
import { useController } from 'react-hook-form';

export const CheckBoxField = props => {
	const {
		control,
		size,
		name,
		value,
		className,
		label,
		labelClassName,
		...inputProps
	} = props;
	const {
		field: { value: thisValue, onChange, onBlur },
		fieldState: { invalid, error }
	} = useController({ name, control });

	return (
		<FormGroup className="form-group">
			<FormCheck
				name={name}
				label={label}
				value={value}
				checked={value !== undefined ? value === thisValue : thisValue === true}
				className={`form-check ${className || ''}${
					invalid ? ' is-invalid' : ''
				}`}
				onChange={onChange}
				onBlur={onBlur}
				{...inputProps}
			/>
			<Form.Control.Feedback type="invalid">
				{error?.message}
			</Form.Control.Feedback>
		</FormGroup>
	);
};
