import React from 'react';
import PropTypes from 'prop-types';

function PeriodInformation(props) {
  const { period } = props;

  const getPeriodInfo = () => {
    switch (period) {
      case null:
        return 'This is a non-repeating event';
      case 1:
        return 'This is a daily event';
      case 7:
        return 'This is a weekly event';
      case 30:
        return 'This is a monthly event';
      case 31:
        return 'This is a monthly event';
      default:
        return `This event occurs every ${period} days`;
    }
  };
  return <li className="font-italic">{getPeriodInfo()}</li>;
}

PeriodInformation.propTypes = {
  period: PropTypes.number.isRequired,
};

export default PeriodInformation;
