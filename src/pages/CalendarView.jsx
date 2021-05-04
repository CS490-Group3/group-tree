import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import DateInformation from '../components/DateInformation';
import InputForm from '../components/InputForm';

function CalendarView() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="landing">
      <div className="container">
        <div className="item">
          <h3 className="calendar__header font-weight-bold">Calendar View</h3>
          <Calendar
            calendarType="US"
            className="calendar"
            onChange={setValue}
            onClickDay={setValue}
          />
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
