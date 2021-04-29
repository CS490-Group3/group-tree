import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ActivityOption from '../components/ActivityOption';
import DateInformation from '../components/DateInformation';
import ContactOption from '../components/ContactOption';

const BASE_URL = '/api/v1/events';

function CalendarView() {
  const [value, setValue] = useState(new Date());
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
          start_time: selectedDate,
          period: multiplier !== '0' ? multiplier : null,
          contact_id: selectedContact,
        }),
      }).then(() => setCreateStatus(true));
    }
  }

  function selectDefaultActivity(activity) {
    setSelectedActivity(activity);
  }

  function selectDefaultContact(contact) {
    setSelectedContact(contact);
  }

  return (
    <div className="landing">
      <div className="container">
        <div className="item">
          <h3>Calendar View</h3>
          <Calendar onChange={setValue} onClickDay={setValue} />
        </div>
        <div className="item">
          <h3>Upcoming events //Sprint 2</h3>
          <ul className="list-group">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
          </ul>
        </div>
        <DateInformation fullDate={value} />
      </div>
      <div className="container-form">
        <div className="item">
          <form className="container-fluid">
            <div className="form-row">
              <div className="col center">
                <label htmlFor="example-date-input">
                  Date
                  <input
                    className="form-control"
                    type="date"
                    placeholder="Date"
                    id="example-date-input"
                    onChange={(event) => setSelectedDate(event.target.value)}
                  />
                </label>
              </div>
              <div className="col center">
                <ActivityOption onSelectActivity={selectDefaultActivity} />
              </div>
              <div className="col center">
                <ContactOption onSelectContact={selectDefaultContact} />
              </div>
              <div className="col center">
                <label htmlFor="exampleTextarea">
                  Repeat every # days
                  <input
                    type="number"
                    className="form-control"
                    placeholder="#"
                    onChange={(event) => setMultiplier(event.target.value)}
                  />
                </label>
              </div>
              <div className="col center">
                <button className=" btn btn-info" type="button" onClick={createEvent}>
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
      </div>
    </div>
  );
}

export default CalendarView;
