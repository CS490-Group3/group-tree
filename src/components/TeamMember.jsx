import React from 'react';
import PropTypes from 'prop-types';
/* jsx-a11y/anchor-is-valid */

export default function TeamMember(props) {
  const { name, github, linkedin } = props;

  const githubClick = () => {
    window.open(github);
  };

  const linkedinClick = () => {
    window.open(linkedin);
  };

  return (
    <div className="member-container">
      <div className="member-item">
        <i className="fas fa-user-circle" id="team-icon" />
      </div>
      <div className="member-item team-info">
        <p className="team-name">{name}</p>
        <p>CEO and Co-Founder</p>
        <p>Full stack developer</p>
        <button type="submit" href="#" className="team-link" onClick={githubClick}>
          <i className="fab fa-github fa-2x margin-left" />
        </button>
        <button type="submit" href="#" className="team-link" onClick={linkedinClick}>
          <i className="fab fa-linkedin-in fa-2x margin-left" />
        </button>
      </div>
    </div>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
};
