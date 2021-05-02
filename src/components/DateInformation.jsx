import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PeriodInformation from './PeriodInformation';

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
      <hr />
      {infomation === null ? (
        <p>No event on this date</p>
      ) : (
        <div>
          {Object.keys(infomation).map((contact) => {
            if (infomation[contact].length !== 0)
              return (
                <ul>
                  {infomation[contact].map((data, i) =>
                    Object.keys(data).map((value, j) => {
                      if (value === 'period') {
                        return <PeriodInformation period={data[value]} />;
                      }
                      if (j === 3 && i !== infomation[contact].length - 1) {
                        return (
                          <div>
                            <li>
                              {value} - {data[value]}
                            </li>
                            <hr />
                          </div>
                        );
                      }
                      return (
                        <li>
                          {value} - {data[value]}
                        </li>
                      );
                    }),
                  )}
                </ul>
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
