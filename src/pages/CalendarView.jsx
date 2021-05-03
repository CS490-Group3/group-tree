import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
/*
import RepeatOption from '../components/RepeatOption';
import ContactOption from '../components/ContactOption';
import DateOption from '../components/DateOption';
import ActivityDropdown from '../components/ActivityDropdown';
*/
import DateInformation from '../components/DateInformation';

import InputForm from '../components/InputForm';

// const BASE_URL = '/api/v1/events';

function CalendarView() {
  const [value, setValue] = useState(new Date());
  /* const [createStatus, setCreateStatus] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [multiplier, setMultiplier] = useState(null);
  const [error, setError] = useState([]);
  */
  /*
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
          start_time: new Date(selectedDate).toUTCString(),
          period: multiplier !== '0' ? multiplier : null,
          contact_id: selectedContact,
        }),
      }).then(() => setCreateStatus(true));
    }
  } */

  return (
    <div className="landing">
      <div className="container">
        <div className="item">
          <h3 className="calendar__header font-weight-bold">Calendar View</h3>
          <Calendar className="calendar" onChange={setValue} onClickDay={setValue} />
        </div>
        <DateInformation fullDate={value} />
      </div>
      <div className="container-form text-big text-green font-weight-bold">
        <InputForm />
      </div>
    </div>
  );
}

export default CalendarView;
