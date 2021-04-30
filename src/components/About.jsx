import React from 'react';
import Computer from './Computer';

export default function About() {
  return (
    <div className="about">
      <h3>What is it?</h3>
      <div className="outer">
        <div className="row">
          <div className="item">
            <Computer />
            <p>Add Your Contacts</p>
          </div>
          <div className="item">
            <Computer />
            <p>Creates Events and Get Reminders</p>
            <p>Creates Events and Get Reminders</p>
          </div>
          <div className="item">
            <Computer />
            <p>Watch your tree grow</p>
          </div>
        </div>
      </div>
    </div>
  );
}
