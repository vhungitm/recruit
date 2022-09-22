import React from 'react';
import { Form } from 'react-bootstrap';

export const Input = props => {
  let {
    groupClassName,
    // label
    label,
    labelClassName,
    labelRequired,
    // icon
    iconStart,
    iconEnd,
    // control
    field = {},
    fieldState,
    ...inputProps
  } = props;

  // Form group className
  groupClassName = 'form-group' + (groupClassName ? ' ' + groupClassName : '');

  // Label required
  labelRequired = labelRequired ? (
    <span className="text-danger"> * </span>
  ) : null;

  return (
    <Form.Group className={groupClassName}>
      {label && (
        <Form.Label as="div" className={labelClassName}>
          {label}
          {labelRequired}
        </Form.Label>
      )}

      <div className="control-group">
        {iconStart && <div className="icon-start">{iconStart}</div>}
        {iconEnd && <div className="icon-end">{iconEnd}</div>}

        <Form.Control
          {...field}
          {...inputProps}
          isInvalid={fieldState?.invalid}
        />
      </div>

      {fieldState?.error && (
        <Form.Control.Feedback type="invalid">
          {fieldState?.error?.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};
