import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DROPDOWN_DATA from '../assets/DropdownData';

function ActivityDropdown(props) {
  const { onSelectActivity } = props;
  // const activityList = [...new Set(DROPDOWN_DATA.map((item) => item.activity))];
  // const [defaultValue, setDefaultValue] = useState(activityList[0]);
  const newActivityList = DROPDOWN_DATA;
  const [newDefaultValue, setNewDefaultValue] = useState(DROPDOWN_DATA[0].modules[0].key);
  function handleChange(event) {
    onSelectActivity(event.target.value);
    // setDefaultValue(event.target.value);

    setNewDefaultValue(event.target.value);
  }

  return (
    <label htmlFor="exampleSelect1">
      Activity
      <link
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/css/fontawesome.min.css"
        rel="stylesheet"
      />
      <select
        className="form-contro custom-select"
        id="exampleSelect1"
        placeholder="Activity"
        onChange={(event) => handleChange(event)}
        value={onSelectActivity(newDefaultValue)}
      >
        {newActivityList.map((activity) => (
          <optgroup label={activity.key} style={{ color: activity.color }}>
            {activity.modules.map((item) => (
              <option value={item.key} selected={newDefaultValue === item.key}>
                {item.key[0].toUpperCase() + item.key.substring(1)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}

ActivityDropdown.propTypes = {
  onSelectActivity: PropTypes.func.isRequired,
};

export default ActivityDropdown;
