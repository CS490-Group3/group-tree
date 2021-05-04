import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import DROPDOWN_DATA from '../assets/DropdownData';

function ActivityDropdown(props) {
  const { onSelectActivity } = props;
  const newActivityList = DROPDOWN_DATA;

  useEffect(() => {
    onSelectActivity(newActivityList[0].activities[0]);
  }, []);

  return (
    <label htmlFor="exampleSelect1">
      Activity
      <select
        className="form-contro custom-select"
        id="exampleSelect1"
        placeholder="Activity"
        onChange={(event) => onSelectActivity(event.target.value)}
      >
        {newActivityList.map((group) => (
          <optgroup label={group.category} style={{ color: group.color }}>
            {group.activities.map((activity) => (
              <option value={activity}>
                {activity[0].toUpperCase() + activity.substring(1)}
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
