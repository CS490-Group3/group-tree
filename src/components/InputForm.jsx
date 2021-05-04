import React, { useState } from 'react';

import RepeatOption from './RepeatOption';
import ContactOption from './ContactOption';
import DateOption from './DateOption';
import ActivityDropdown from './ActivityDropdown';

const BASE_URL = '/api/v1/events';

function InputForm() {
  const [createStatus, setCreateStatus] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [multiplier, setMultiplier] = useState(null);
  const [error, setError] = useState([]);

  function createEvent() {
    setCreateStatus(false);
    const errorMsg = [];

    // Handle input validation
    if (selectedActivity === null) errorMsg.push('Activity is not selected');
    if (selectedContact === null) errorMsg.push('Contact is not selected');
    if (selectedDate === null) errorMsg.push('Activity Date is not selected');
    if (multiplier === null) errorMsg.push('Number of Times is not selected');

    setError(errorMsg);

    if (errorMsg.length === 0) {
      fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activity: selectedActivity,
          start_time: new Date(...selectedDate.split('-')).toUTCString(),
          period: multiplier !== '0' ? multiplier : null,
          contact_id: selectedContact,
        }),
      }).then(() => setCreateStatus(true));
    }
  }

  return (
    <div className="item">
      <form className="container-fluid border rounded">
        <div className="form-row">
          <div className="col center">
            <DateOption onSelectDate={setSelectedDate} />
          </div>
          <div className="col center">
            <ActivityDropdown onSelectActivity={setSelectedActivity} />
          </div>
          <div className="col center">
            <ContactOption onSelectContact={setSelectedContact} />
          </div>
          <div className="col center">
            <RepeatOption onSetMultiplier={setMultiplier} />
          </div>
          <div className="col center">
            <button className=" btn btn-green" type="button" onClick={createEvent}>
              Add new event
            </button>
          </div>
          {createStatus ? (
            <div className="col center">
              <div className="alert alert-success" role="alert">
                Successfully added events!
              </div>
            </div>
          ) : null}
          {error.length === 0 ? null : (
            <div className="col center">
              <div className="alert alert-danger" role="alert">
                Error creating a new event
                <ul className="list-group">
                  {error.map((msg) => (
                    <li className="list-group-item">{msg}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default InputForm;
