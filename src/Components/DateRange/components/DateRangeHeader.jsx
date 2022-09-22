import React from 'react';

export const DateRangeHeader = props => {
  const { types, type, handleChangeType } = props;

  return (
    <div className="date-range-header">
      {types.map(item => (
        <div
          key={item.id}
          className={
            item.id === type
              ? 'date-range-header-item active'
              : 'date-range-header-item'
          }
          onClick={() => handleChangeType(item.id)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};
