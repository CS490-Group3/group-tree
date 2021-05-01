import React from 'react';
import TeamMember from './TeamMember';
import '../css/Team.css';

export default function Team() {
  return (
    <div className="team">
      <h3>Our Team</h3>
      <div className="team-container">
        <div className="team-row">
          <div className="team-item">
            <TeamMember />
          </div>
          <div className="team-item">
            <TeamMember />
          </div>
        </div>
        <div className="team-row">
          <div className="team-item">
            <TeamMember />
          </div>
          <div className="team-item">
            <TeamMember />
          </div>
        </div>
      </div>
    </div>
  );
}
