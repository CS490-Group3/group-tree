import React from 'react';
import PropTypes from 'prop-types';

function DateOption(props) {
  const { onSelectDate } = props;
  function handleChange(event) {
    onSelectDate(event.target.value);
  }

  return (
    <label htmlFor="example-date-input">
      Date
      <input
        className="form-control"
        type="date"
        placeholder="Date"
        id="example-date-input"
        onChange={(event) => handleChange(event)}
      />
    </label>
  );
}

DateOption.propTypes = {
  onSelectDate: PropTypes.func.isRequired,
};

export default DateOption;
