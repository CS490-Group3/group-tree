import React from 'react';

export default function TeamMember() {
  return (
    <div className="member-container">
      <div className="member-item">
        <i className="far fa-user" id="team-icon" />
      </div>
      <div className="member-item">
        <p>TeamMember Name</p>
        <p>CEO and Co Founder</p>
        <p>Fullstack Developer</p>
        <i className="fab fa-github fa-2x margin-left" />
        <i className="fab fa-linkedin-in fa-2x margin-left" />
      </div>
    </div>
  );
}
