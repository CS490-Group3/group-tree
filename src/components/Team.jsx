import React from 'react';
import TeamMember from './TeamMember';
import '../css/Team.css';

export default function Team() {
  return (
    <div className="team">
      <h3 className="team-title">Our Team</h3>
      <div className="team-container">
        <div className="team-row">
          <div className="team-item">
            <TeamMember name="Benjamin Hayduchok" />
          </div>
          <div className="team-item">
            <TeamMember name="Juhi Chaudhari" />
          </div>
        </div>
        <div className="team-row">
          <div className="team-item">
            <TeamMember name="Andrew Kritzler" />
          </div>
          <div className="team-item">
            <TeamMember name="Kathlyn Hang Nguyen" />
          </div>
        </div>
      </div>
    </div>
  );
}
