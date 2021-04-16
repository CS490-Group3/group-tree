import React from 'react';

export default function ActivityOption(prop) {
  const { activityList } = prop;
  return (
    <label htmlFor="exampleSelect1">
      Activity
      <select className="form-control" id="exampleSelect1" placeholder="Activity">
        {activityList.map((activity) => (
          <option>{activity}</option>
        ))}
      </select>
    </label>
  );
}
