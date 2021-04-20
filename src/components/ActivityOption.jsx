import React from 'react';

function ActivityOption(prop) {
  const { activityList } = prop;
  return (
    <label htmlFor="exampleSelect1">
      Activity
      <select className="form-control" id="exampleSelect1" placeholder="Activity">
        {activityList.map((activity) => (
          <option>{activity[0].toUpperCase() + activity.substring(1)}</option>
        ))}
      </select>
    </label>
  );
}

export default ActivityOption;
