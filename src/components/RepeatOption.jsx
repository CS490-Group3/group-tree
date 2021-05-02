import React from 'react';
import PropTypes from 'prop-types';

function RepeatOption(props) {
  const { onSetMultiplier } = props;
  function handleChange(event) {
    onSetMultiplier(event.target.value);
  }

  return (
    <label htmlFor="exampleTextarea">
      Repeat every # days
      <input
        type="number"
        className="form-control"
        placeholder="#"
        onChange={(event) => handleChange(event)}
      />
    </label>
  );
}

RepeatOption.propTypes = {
  onSetMultiplier: PropTypes.func.isRequired,
};

export default RepeatOption;
