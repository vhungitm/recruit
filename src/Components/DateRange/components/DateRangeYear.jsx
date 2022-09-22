import { addYears, getYear } from 'date-fns';

export const DateRangeYear = props => {
  const { value, handleChangeValue } = props;

  const onChangeValue = (isPre = true, isStartDate = true) => {
    let newValue = isStartDate ? value.startDate : value.endDate;
    newValue = addYears(newValue, isPre ? -1 : 1);

    if (isStartDate && getYear(newValue) > getYear(value.endDate)) return;
    if (!isStartDate && getYear(newValue) < getYear(value.startDate)) return;

    handleChangeValue(newValue, isStartDate);
  };

  return (
    <div className="date-range-wrapper-header">
      {'Từ '}
      <div
        className="date-range-wrapper-header-btn btn-pre"
        onClick={() => onChangeValue(true, true)}
      />
      <div className="date-range-wrapper-header-value">
        <span>{value.startDate.getFullYear()}</span>
      </div>
      <div
        className="date-range-wrapper-header-btn btn-next"
        onClick={() => onChangeValue(false, true)}
      />
      {' đến '}
      <div
        className="date-range-wrapper-header-btn btn-pre"
        onClick={() => onChangeValue(true, false)}
      />
      <div className="date-range-wrapper-header-value">
        <span>{value.endDate.getFullYear()}</span>
      </div>
      <div
        className="date-range-wrapper-header-btn btn-next"
        onClick={() => onChangeValue(false, false)}
      />
    </div>
  );
};
