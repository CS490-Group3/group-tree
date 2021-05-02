import React from 'react';
import PropTypes from 'prop-types';

export default function TeamMember(props) {
  const { name } = props;

  return (
    <div className="member-container">
      <div className="member-item">
        <i className="fas fa-user-circle" id="team-icon" />
      </div>
      <div className="member-item">
        <p>{name}</p>
        <p>CEO and Co Founder</p>
        <p>Fullstack Developer</p>
        <i className="fab fa-github fa-2x margin-left" />
        <i className="fab fa-linkedin-in fa-2x margin-left" />
      </div>
    </div>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
};
