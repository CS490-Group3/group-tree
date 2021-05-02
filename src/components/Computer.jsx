import React from 'react';
import PropTypes from 'prop-types';

export default function Computer(props) {
  const { step, p1, p2 } = props;

  return (
    <div className="comp-container">
      <div className="screen">
        <h3>Step {step}: </h3>
        <p>{p1}</p>
        <p>{p2}</p>
      </div>
      <div className="key">
        <div className="comp-button" />
      </div>
      <div className="stand" />
      <div className="bottom-stand" />
    </div>
  );
}

Computer.propTypes = {
  step: PropTypes.string.isRequired,
  p1: PropTypes.string.isRequired,
  p2: PropTypes.string.isRequired,
};
