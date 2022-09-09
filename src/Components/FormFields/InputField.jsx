import { useController } from 'react-hook-form';
import { Input } from '../Fields/Input';

export const InputField = props => {
	let { control, name, ...inputProps } = props;

	const { field, fieldState } = useController({ name, control });

	// Return
	return <Input field={field} fieldState={fieldState} {...inputProps} />;
};
