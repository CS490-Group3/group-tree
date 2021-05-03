import React from 'react';
import PropTypes from 'prop-types';

export default function CompleteEvent(props) {
  const { data } = props;
  const BASE_URL = '/api/v1/events/complete';

  // Might need to add .then() to change confirm button
  const addPoints = (id) => {
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });
  };

  function sendPoints() {
    // const time = new Date(date);
    console.log(data);
    addPoints(data);
  }

  CompleteEvent.propTypes = {
    data: PropTypes.func.isRequired,
  };
  return (
    <button type="button" onClick={sendPoints}>
      Complete
    </button>
  );
}
