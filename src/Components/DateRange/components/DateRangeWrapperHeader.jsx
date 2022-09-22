import React from 'react';

export const DateRangeWrapperHeader = props => {
  const { type, calendarDate, handleChangeCalendar } = props;

  // JSX for day type and week type
  const dateValueJSX = (
    <div className="date-range-wrapper-header">
      <div
        className="date-range-wrapper-header-btn btn-pre"
        onClick={() => handleChangeCalendar(true)}
      ></div>
      <div className="date-range-wrapper-header-value">
        <span>Tháng {calendarDate.getMonth() + 1}</span>
        <span>{calendarDate.getFullYear()}</span>
      </div>
      <div
        className="date-range-wrapper-header-btn btn-next"
        onClick={() => handleChangeCalendar(false)}
      ></div>
    </div>
  );

  // JSX for month type
  const monthJSX = (
    <div className="date-range-wrapper-header">
      <div
        className="date-range-wrapper-header-btn btn-pre"
        onClick={() => handleChangeCalendar(true)}
      ></div>
      <div className="date-range-wrapper-header-value">
        <span>{calendarDate.getFullYear()}</span>
      </div>
      <div
        className="date-range-wrapper-header-btn btn-next"
        onClick={() => handleChangeCalendar(false)}
      ></div>
    </div>
  );

  // Return JSX
  return type === 0 || type === 1 ? dateValueJSX : type === 2 ? monthJSX : null;
};
