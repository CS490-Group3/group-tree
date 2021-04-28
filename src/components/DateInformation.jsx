import React from 'react';
import PropTypes from 'prop-types';

function DateInformation(props) {
  const { date } = props;

  return (
    <div className="item border">
      <h3>Click on a date to view information</h3>
      <p className="lead">{date !== null ? 'TODO' : null}</p>
    </div>
  );
}

DateInformation.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default DateInformation;
