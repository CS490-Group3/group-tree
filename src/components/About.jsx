import React from 'react';
import Computer from './Computer';

function About() {
  return (
    <div className="about">
      <h3>How It Works</h3>
      <div className="about-outer">
        <div className="about-item">
          <Computer
            step="1"
            p1="Add Your Contacts"
            p2="Adding Contacts allows you to create events with important people in your life"
          />
        </div>
        <div className="about-item">
          <Computer
            step="2"
            p1="Create Events"
            p2="Create events and get reminders about those event so no event is missed"
          />
        </div>
        <div className="about-item">
          <Computer
            step="3"
            p1="Watch Your Tree Grow"
            p2="Be rewarded for staying connected with your family and friends and watch your tree grow"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
