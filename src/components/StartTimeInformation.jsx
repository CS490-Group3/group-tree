import React from 'react';
import PropTypes from 'prop-types';

function StartTimeInformation(props) {
  const { startTime } = props;

  return (
    <li>
      Start time:{' '}
      <span className="font-weight-bold">{new Date(startTime).toDateString()}</span>
    </li>
  );
}

StartTimeInformation.propTypes = {
  startTime: PropTypes.string.isRequired,
};

export default StartTimeInformation;
