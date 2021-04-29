import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FREQUENCY = ['Once', 'Daily', 'Weekly', 'Biweekly', 'Monthly'];

function FrequencyOption(props) {
  const { onSelectFrequency } = props;
  const [defaultValue, setDefaultValue] = useState(FREQUENCY[0]);

  function handleChange(event) {
    onSelectFrequency(event.target.value);
    setDefaultValue(event.target.value);
  }

  return (
    <label htmlFor="exampleSelect1">
      Frequency
      <select
        className="form-control"
        id="exampleSelect1"
        placeholder="Frequency"
        onChange={(event) => handleChange(event)}
        value={onSelectFrequency(defaultValue)}
      >
        {FREQUENCY.map((freq) => (
          <option value={freq} selected={defaultValue === freq}>
            {freq}
          </option>
        ))}
      </select>
    </label>
  );
}

FrequencyOption.propTypes = {
  onSelectFrequency: PropTypes.func.isRequired,
};

export default FrequencyOption;
