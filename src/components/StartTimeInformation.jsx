import React from 'react';
import PropTypes from 'prop-types';

import MONTHS from '../assets/Months';

function StartTimeInformation(props) {
  const { startTime } = props;

  function getStartTimeInfo() {
    const time = new Date(startTime);

    const date = time.getDate();
    const month = MONTHS[time.getMonth()];
    const year = time.getFullYear();
    const info = [date, month, year];
    return info.join(' - ');
  }

  return <li>Start time: {getStartTimeInfo()}</li>;
}

StartTimeInformation.propTypes = {
  startTime: PropTypes.func.isRequired,
};

export default StartTimeInformation;
