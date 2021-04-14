import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function LandingPage() {
  const [value, onChange] = useState(new Date());
  
    return (
        <div className="landing">
          <h1>Calendar View</h1>
          <Calendar
            onChange={onChange}
            value={value}
          />
        </div>
  );
}