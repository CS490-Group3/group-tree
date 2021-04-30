import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BASE_URL = '/api/v1/events';
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function DateInformation(props) {
  const { fullDate } = props;
  const [selectedDate, setSelectedDate] = useState(fullDate);

  const [infomation, setInfomation] = useState(null);

  function formatDate() {
    const year = selectedDate.getFullYear();
    let month = selectedDate.getMonth() + 1;
    let date = selectedDate.getDate();

    if (date < 10) {
      date = `0${date}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    const time = [year, month, date];
    return time.join('-');
  }

  const fetchDateInfo = () => {
    const formattedDate = formatDate();
    const url = `${BASE_URL}?date=${formattedDate}`;
    setInfomation(null);
    fetch(url, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        if (data.length !== 0) {
          setInfomation(data);
        }
      });
  };

  // Only fetch info when prop fullDate changes = when a user clicks on a date
  useEffect(() => {
    setSelectedDate(fullDate);
    fetchDateInfo();
  }, [fullDate]);

  return (
    <div className="item border">
      <h3>Click on a date to view information</h3>
      <p className="lead">
        {fullDate === null ? 'TODO' : fullDate.getDate()} - {months[fullDate.getMonth()]}{' '}
        - {fullDate.getFullYear()}
      </p>
      {infomation === null ? (
        <p>No event on this date</p>
      ) : (
        <div>
          {Object.keys(infomation).map((contact) => {
            if (infomation[contact].length !== 0)
              return (
                <p>
                  {' '}
                  this is my key {contact} and this is my value
                  {infomation[contact].map((data) =>
                    Object.keys(data).map((value) => {
                      if (data[value] !== null) return <li>{data[value]}</li>;
                      return null;
                    }),
                  )}
                </p>
              );
            return null;
          })}
        </div>
      )}
    </div>
  );
}
DateInformation.propTypes = {
  fullDate: PropTypes.instanceOf(Date).isRequired,
};

export default DateInformation;
