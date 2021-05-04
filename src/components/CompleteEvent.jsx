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
    const buttonPtr = document.getElementById('complete_button');
    buttonPtr.style.display = 'none';
    addPoints(data);
  }

  CompleteEvent.propTypes = {
    data: PropTypes.func.isRequired,
  };
  if (data.can_complete === 'True') {
    return (
      <div>
        <button type="button" id="complete_button" onClick={sendPoints}>
          Complete
        </button>
        <hr className="hr-green" />
      </div>
    );
  }
  return <hr className="hr-green" />;
}
