import React, { useRef } from 'react';

function ActivityOption(prop) {
  const { activityList } = prop;
  const selectedActivity = useRef(null);

  function handleChange() {
    prop.onSelectActivity(selectedActivity);
  }
  return (
    <label htmlFor="exampleSelect1">
      Activity
      <select
        className="form-control"
        id="exampleSelect1"
        placeholder="Activity"
        onChange={handleChange}
        ref={selectedActivity}
      >
        {activityList.map((activity) => (
          <option>{activity[0].toUpperCase() + activity.substring(1)}</option>
        ))}
      </select>
    </label>
  );
}

export default ActivityOption;
