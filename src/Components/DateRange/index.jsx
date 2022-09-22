import {
  addMonths,
  addYears,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  getISOWeek,
  getYear,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isMonday,
  isSameDay,
  isSameMonth,
  isWeekend,
  lastDayOfMonth,
  lastDayOfWeek,
  lastDayOfYear,
  set,
  startOfMonth,
  startOfWeek,
  startOfYear
} from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import {
  DateRangeControl,
  DateRangeHeader,
  DateRangeWrapper
} from './components';
import { defaultWeekdays, types } from './datas';
import './scss/_date-range.scss';

export const DateRange = props => {
  // Props
  const {
    value: valueProp,
    handleChangeValue: handleChangeValueProp,
    type: typeProp,
    handleChangeType: handleChangeTypeProp,
    weekdays: weekdaysProp,
    minDate,
    maxDate
  } = props;

  // Value
  const [value, setValue] = useState({
    startDate: valueProp?.startDate || new Date(),
    endDate: valueProp?.endDate || new Date()
  });
  const [calendarDate, setCalendarDate] = useState(value.startDate);
  const [calendar, setCalendar] = useState([]);
  const [showWrapper, setShowWrapper] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);
  const [months, setMonths] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [weekdays] = useState(weekdaysProp || defaultWeekdays);
  const [type, setType] = useState(typeProp || 0);

  // Handle change type
  const handleChangeType = newType => {
    setShowWrapper(true);
    setType(newType);
    setCalendarDate(value.startDate);

    if (handleChangeTypeProp) handleChangeTypeProp(newType);
  };

  // Effect close wrapper
  const ref = useRef();

  useEffect(() => {
    const handleCloseWrapper = e => {
      if (ref.current && !ref.current.contains(e.target)) setShowWrapper(false);
    };

    document.body.addEventListener('click', handleCloseWrapper);

    return () => document.body.removeEventListener('click', handleCloseWrapper);
  }, []);

  // Effect update wrapper content
  useEffect(() => {
    // Check start date end end date
    if (value.startDate - value.endDate > 0) {
      setValue({
        startDate: value.endDate,
        endDate: value.startDate
      });

      return;
    }

    if (type === 0 || type === 1) {
      if (type === 1) {
        // Check start date
        if (!isMonday(value.startDate)) {
          setValue({
            ...value,
            startDate: startOfWeek(value.startDate, { weekStartsOn: 1 })
          });

          return;
        }

        // Check end date
        if (!isWeekend(value.endDate)) {
          setValue({
            ...value,
            endDate: endOfWeek(value.endDate, { weekStartsOn: 1 })
          });

          return;
        }
      }

      // New data
      let newCalendar = [];
      let newWeeks = [];

      // Update calendar
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(calendarDate), { weekStartsOn: 1 }),
        end: lastDayOfWeek(endOfMonth(calendarDate), { weekStartsOn: 1 })
      }).forEach(item => {
        // Update weeks
        if (isMonday(item)) {
          const newWeekValueType =
            isSameDay(item, value.startDate) &&
            isSameDay(endOfWeek(item, { weekStartsOn: 1 }), value.endDate)
              ? 'limit-week'
              : isSameDay(item, value.startDate)
              ? 'start-week'
              : isSameDay(endOfWeek(item, { weekStartsOn: 1 }), value.endDate)
              ? 'end-week'
              : item > value.startDate && item < value.endDate
              ? 'active'
              : '';
          const newWeekValueTitle = getISOWeek(item, { weekStartsOn: 1 });

          newWeeks = [
            ...newWeeks,
            {
              type: newWeekValueType,
              title: `Tuần ${newWeekValueTitle}`,
              value: item
            }
          ];
        }

        // New day type
        let newDayType = !isSameMonth(item, calendarDate) ? 'disable' : '';
        newDayType =
          type === 0
            ? isSameDay(item, value.startDate) && isSameDay(item, value.endDate)
              ? 'limit-date'
              : isSameDay(item, value.startDate)
              ? 'start-date'
              : isSameDay(item, value.endDate)
              ? 'end-date'
              : item > value.startDate && item < value.endDate
              ? 'active'
              : newDayType
            : item >= value.startDate && item <= value.endDate
            ? 'active'
            : newDayType;

        newCalendar = [...newCalendar, { type: newDayType, value: item }];
      });

      setCalendar(newCalendar);
      setWeeks(newWeeks);
    }

    if (type === 2) {
      // Check start date for month type
      if (!isFirstDayOfMonth(value.startDate)) {
        setValue({
          ...value,
          startDate: set(value.startDate, { date: 1 })
        });

        return;
      }

      // Check end date for month type
      if (!isLastDayOfMonth(value.endDate)) {
        setValue({
          ...value,
          endDate: set(value.endDate, {
            date: lastDayOfMonth(value.endDate).getDate()
          })
        });

        return;
      }

      // New months
      let newMonths = [];
      for (let i = 0; i < 12; i++) {
        const newMonthValue = new Date(getYear(calendarDate), i, 1);

        const newMonthType =
          isSameDay(value.startDate, newMonthValue) &&
          isSameDay(endOfMonth(value.endDate), newMonthValue)
            ? 'limit-month'
            : isSameDay(value.startDate, newMonthValue)
            ? 'start-month'
            : isSameDay(set(value.endDate, { date: 1 }), newMonthValue)
            ? 'end-month'
            : value.startDate < newMonthValue && newMonthValue < value.endDate
            ? 'active'
            : '';

        newMonths = [
          ...newMonths,
          {
            type: newMonthType,
            value: newMonthValue
          }
        ];
      }

      // Update new months
      setMonths(newMonths);
    }

    if (type === 3) {
      // Check start date for year type
      if (
        !isSameDay(value.startDate, set(value.startDate, { month: 0, date: 1 }))
      ) {
        setValue({
          startDate: set(value.startDate, { month: 0, date: 1 }),
          endDate: value.endDate
        });

        return;
      }

      // Check end date for year type
      if (!isSameDay(value.endDate, lastDayOfYear(value.endDate))) {
        setValue({
          startDate: value.startDate,
          endDate: lastDayOfYear(value.endDate)
        });

        return;
      }
    }

    // Update value prop
    if (handleChangeValueProp) handleChangeValueProp(value);
  }, [value, type, calendarDate, handleChangeValueProp]);

  // Handle change value
  const handleChangeValue = (newValue, isStartDateProp) => {
    if (type === 0) {
      if (minDate && newValue < minDate) return;
      if (maxDate && newValue > maxDate) return;

      // Update new value and value change type
      setValue({
        startDate: isStartDate ? newValue : value.startDate,
        endDate: newValue
      });
      setIsStartDate(!isStartDate);
    } else if (type === 1) {
      const newValueWeekStart = startOfWeek(newValue, { weekStartsOn: 1 });
      const newValueWeekEnd = endOfWeek(newValue, { weekStartsOn: 1 });

      // Check min date
      if (minDate) {
        const minDateWeekStart = startOfWeek(minDate, { weekStartsOn: 1 });
        if (newValueWeekStart < minDateWeekStart) return;
      }

      // Check max date
      if (maxDate) {
        const maxDateWeekEnd = endOfWeek(maxDate, { weekStartsOn: 1 });
        if (newValueWeekEnd > maxDateWeekEnd) return;
      }

      // Update new value and value change type
      setValue({
        startDate: isStartDate ? newValueWeekStart : value.startDate,
        endDate: newValueWeekEnd
      });
      setIsStartDate(!isStartDate);
    } else if (type === 2) {
      const newValueMonthStart = set(newValue, { date: 1 });
      const newValueMonthEnd = lastDayOfMonth(newValue);

      // Check min and max date
      if (minDate && newValueMonthStart < set(minDate, { date: 1 })) return;
      if (maxDate && newValueMonthEnd > lastDayOfMonth(maxDate)) return;

      // Update new value and value change type
      setValue({
        startDate: isStartDate ? newValueMonthStart : value.startDate,
        endDate: newValueMonthEnd
      });
      setIsStartDate(!isStartDate);
    } else {
      // Check min and max date
      if (minDate && getYear(newValue) < getYear(minDate)) return;
      if (maxDate && getYear(newValue) > getYear(maxDate)) return;

      // Update new value
      setValue({
        startDate: isStartDateProp ? startOfYear(newValue) : value.startDate,
        endDate: !isStartDateProp ? endOfYear(newValue) : value.endDate
      });
    }
  };

  // Handle change calendar date
  const handleChangeCalendar = isPre => {
    setCalendarDate(
      type === 0 || type === 1
        ? addMonths(calendarDate, isPre ? -1 : 1)
        : addYears(calendarDate, isPre ? -1 : 1)
    );
  };

  // Return JSX
  return (
    <div
      ref={ref}
      className={showWrapper ? 'itm-date-range show' : 'itm-date-range'}
    >
      {/* Date range header */}
      <DateRangeHeader
        types={types}
        type={type}
        handleChangeType={handleChangeType}
      />

      {/* Date range control */}
      <DateRangeControl
        type={type}
        value={value}
        showWrapper={showWrapper}
        setShowWrapper={() => setShowWrapper(!showWrapper)}
      />

      {/* Date range wrapper */}
      <DateRangeWrapper
        type={type}
        value={value}
        calendar={calendar}
        calendarDate={calendarDate}
        months={months}
        weeks={weeks}
        weekdays={Object.values(weekdays)}
        handleChangeValue={handleChangeValue}
        handleChangeCalendar={handleChangeCalendar}
      />
    </div>
  );
};
