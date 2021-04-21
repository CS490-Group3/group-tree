import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EVENT_DATA from '../assets/EventData';
// import ActivityOption from '../components/ActivityOption';
import DateInformation from '../components/DateInformation';
// import ContactOption from '../components/ContactOption';

const BASE_URL = '/api/v1/events';
const FREQUENCY = ['Single', 'Daily', 'Weekly', 'Biweekly', 'Monthly'];

export default function LandingPage() {
  const [value, onChange] = useState(new Date());
  const [selectedDate, select] = useState(new Date());
  const [activityList, setList] = useState([]);
  const [createStatus, setCreateStatus] = useState(false);
  const [contacts, setContacts] = useState([]);

  // const [selectedActivity, setActivity] = useState(null);
  // const [selectedcontactName, setContact] = useState('');

  // Store reference to input elements to access typed in values

  const activityRef = useRef(null);
  const contactNameRef = useRef(null);
  const activityDateRef = useRef(null);
  const freqRef = useRef(null);
  const numEventRef = useRef(null);

  /*
  function onSelectActivity(selection) {
    // activityRef.current = selection;
    // setActivity(selection.current.value);
    console.log(selection.current.value);
  } */
  function onClickDay(date) {
    select(date);
  }
  /*
  function onSelectContact(selection) {
    // contactNameRef.current = selection;
    // console.log(contactNameRef.current.value);
    setContact(selection.current.value);
    console.log(selection.current.value);
  } */
  function updateActivityList() {
    const unique = [...new Set(EVENT_DATA.map((item) => item.activity))]; // [ 'A', 'B']
    setList(unique);
  }

  useEffect(() => {
    updateActivityList();
    window
      .fetch('/api/v1/contacts/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(
        (response) => response.json(), // Convert to json
      )
      .then((responseData) => {
        setContacts(responseData);
      });
  }, []);
  /*
  function fetchBookByID() {
    const idValue = idRef.current.value;
    const url = `${BASE_URL}?book_id=${idValue}`; // Add query parameter id, can add multiple with &
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Whatever you want to do with the data returned by server
        setBooks(responseData);
      });
  } */
  /* function getCircularReplacer() {
    const seen = new WeakSet();
    return (key, val) => {
      if (typeof val === 'object' && val !== null) {
        if (!seen.has(val)) {
          seen.add(val);
        }
      }
      return val;
    };
  } */

  function createEvent() {
    setCreateStatus(false);
    // const activity = activityRef.current.value;
    // const contactName = contactNameRef.current.value;
    const activity = activityRef.current.value;
    const contactName = contactNameRef.current.value;
    // const contactName = contactNameRef.current.value;
    const activityDate = activityDateRef.current.value;
    const freq = freqRef.current.value;
    const numEvent = numEventRef.current.value;

    console.log('here');
    const data = JSON.stringify({
      activity,
      contact_name: contactName,
      date_time: activityDate,
      frequency: freq,
      amount: numEvent,
    });
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data, // No query parameter, for POST we put in body
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Whatever you want to do with the data returned by server
        setCreateStatus(responseData.success);
      });
  }

  return (
    <div className="landing">
      <div className="container">
        <div className="item">
          <h3>Calendar View</h3>
          <Calendar onChange={onChange} onClickDay={onClickDay} value={value} />
        </div>
        <div className="item">
          <h3>Upcoming events //Sprint 2</h3>
          <ul className="list-group">
            <li className="list-group-item ">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
          </ul>
        </div>
        <DateInformation date={selectedDate} />
      </div>
      <div className="container-form">
        <div className="item">
          <form>
            <div className="form-row">
              <div className="col center">
                <label htmlFor="example-date-input">
                  Date
                  <input
                    ref={activityDateRef}
                    className="form-control"
                    type="date"
                    placeholder="Date"
                    id="example-date-input"
                  />
                </label>
              </div>
              <div className="col center">
                <label htmlFor="exampleSelect1">
                  Activity
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    placeholder="Activity"
                    ref={activityRef}
                  >
                    {activityList.map((activity) => (
                      <option value={activity}>
                        {activity[0].toUpperCase() + activity.substring(1)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="col center">
                <label htmlFor="exampleSelect1">
                  Contact
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    placeholder="Activity"
                    ref={contactNameRef}
                  >
                    {contacts.map((person) => (
                      <option>{person.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="col center">
                <label htmlFor="exampleTextarea">
                  Number of Events
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Exact number"
                    ref={numEventRef}
                  />
                </label>
              </div>
              <div className="col center">
                <label htmlFor="exampleSelect1">
                  Frequency
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    placeholder="Activity"
                    ref={freqRef}
                  >
                    {FREQUENCY.map((item) => (
                      <option>{item}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="col center">
                <ContactOption />
              </div>
              <div className="col center">
                <input
                  className=" form-control btn btn-primary"
                  type="submit"
                  value="Add new event"
                  onClick={createEvent}
                />
                {createStatus ? 'Successfully created events!' : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
