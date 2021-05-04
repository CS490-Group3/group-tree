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
            <TeamMember
              name="Benjamin Hayduchok"
              linkedin="https://www.linkedin.com/in/benjamin-hayduchok/"
              github="https://github.com/Benjamin-Hayduchok"
            />
          </div>
          <div className="team-item">
            <TeamMember
              name="Juhi Chaudhari"
              linkedin="https://www.linkedin.com/in/juhichaudhari88/"
              github="https://github.com/juhichaudhari"
            />
          </div>
        </div>
        <div className="team-row">
          <div className="team-item">
            <TeamMember
              name="Andrew Kritzler"
              github="https://github.com/peppermintpatty5/"
              linkedin="https://www.linkedin.com/in/andrew-kritzler-799630196/"
            />
          </div>
          <div className="team-item">
            <TeamMember
              name="Kathlyn Hang Nguyen"
              github="https://github.com/kathlynnguyenh11"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
