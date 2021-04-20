import React from 'react';

function DateInformation(prop) {
  const { date } = prop;
  return (
    <div className="item">
      <h3>Click on a date to view information</h3>
      <p className="lead">{date}</p>
    </div>
  );
}

export default DateInformation;
