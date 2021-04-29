import React from 'react';
import PropTypes from 'prop-types';

import EVENT_DATA from '../assets/EventData';

function ActivityOption(props) {
  const { onSelectActivity } = props;
  const activityList = [...new Set(EVENT_DATA.map((item) => item.activity))];
  const DEFAULT = null;
  return (
    <label htmlFor="exampleSelect1">
      Activity
      <select
        className="form-control"
        id="exampleSelect1"
        placeholder="Activity"
        onChange={(event) => onSelectActivity(event.target.value)}
      >
        <option value={DEFAULT} disabled>
          {' '}
          Choose frequency{' '}
        </option>
        {activityList.map((activity) => (
          <option value={activity}>
            {activity[0].toUpperCase() + activity.substring(1)}
          </option>
        ))}
      </select>
    </label>
  );
}

ActivityOption.propTypes = {
  onSelectActivity: PropTypes.func.isRequired,
};

export default ActivityOption;
