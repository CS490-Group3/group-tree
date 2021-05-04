import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import Notification from 'react-web-notification';
import 'react-calendar/dist/Calendar.css';

import DateInformation from '../components/DateInformation';
import InputForm from '../components/InputForm';

function CalendarView() {
  const [dateView, setDateView] = useState(new Date());
  const [eventBlob, setEventBlob] = useState({});
  const today = new Date();

  const shortISOFormat = (date) => {
    return date.toISOString().slice(0, 10);
  };

  const fetchEvents = () => {
    fetch(`/api/v1/events?date=${shortISOFormat(today)}`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => setEventBlob(data));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="landing">
      {Object.values(eventBlob).flatMap((eventList) =>
        eventList.map((event) => (
          <Notification
            title={`${event.activity} with ${event.contact}`}
            options={{ body: event.start_time }}
          />
        )),
      )}
      <div className="container">
        <div className="item">
          <h3 className="calendar__header font-weight-bold">Calendar View</h3>
          <Calendar
            calendarType="US"
            className="calendar"
            onChange={setDateView}
            onClickDay={setDateView}
          />
        </div>
        <DateInformation fullDate={dateView} />
      </div>
      <div className="container-form text-big text-green font-weight-bold">
        <InputForm />
      </div>
    </div>
  );
}

export default CalendarView;
