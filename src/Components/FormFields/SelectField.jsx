import { Form } from 'react-bootstrap';
import { useController } from 'react-hook-form';
import Select from 'react-select';

export const SelectField = props => {
	const {
		control,
		name,
		label,
		labelClassName,
		placeholder,
		options,
		onChange: onChangeProp,
		...selectProps
	} = props;

	const {
		field: { value, onChange, ref },
		fieldState: { invalid, error }
	} = useController({ name, control });
	const selectedOption = options.find(option => option.value === value) || null;

	const handleSelectOptionChange = selectedOption => {
		const selectedValue = selectedOption
			? selectedOption.value
			: selectedOption;

		onChangeProp
			? onChangeProp({
					target: {
						name,
						value: selectedValue
					}
			  })
			: onChange(selectedValue);
	};

	return (
		<Form.Group className="form-group">
			{label && (
				<Form.Label as="div" className={labelClassName}>
					{label}
				</Form.Label>
			)}
			<Select
				name={name}
				value={selectedOption}
				onChange={handleSelectOptionChange}
				{...selectProps}
				ref={ref}
				options={options}
				placeholder={placeholder || ''}
				className={`react-select-container ${invalid ? ' is-invalid' : ''}`}
				classNamePrefix="react-select"
			/>
			{error && (
				<Form.Control.Feedback type="invalid">
					{error?.message}
				</Form.Control.Feedback>
			)}
		</Form.Group>
	);
};
