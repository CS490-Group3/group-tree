import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PeriodInformation from './PeriodInformation';
import StartTimeInformation from './StartTimeInformation';
import CompleteEvent from './CompleteEvent';
import MONTHS from '../assets/Months';

const BASE_URL = '/api/v1/events';

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
    <div className="item border card">
      <div className="card-body">
        <h5 className="card-title text-green font-weight-bold">
          Click on a date to view information
        </h5>
        <p className="card-header">
          {fullDate === null ? 'TODO' : fullDate.getDate()} -{' '}
          {MONTHS[fullDate.getMonth()]} - {fullDate.getFullYear()}
        </p>
      </div>
      {infomation === null ? (
        <p>No event on this date</p>
      ) : (
        <div>
          {Object.keys(infomation).map((contact) => {
            if (infomation[contact].length !== 0) {
              return (
                <ul className="list-group list-group-flush">
                  {infomation[contact].map((data) =>
                    Object.keys(data).map((value) => {
                      if (value === 'period') {
                        return <PeriodInformation period={data[value]} />;
                      }
                      if (value === 'start_time') {
                        return (
                          <div>
                            <StartTimeInformation startTime={data[value]} />
                            <CompleteEvent data={data} />
                            <hr className="hr-green" />
                          </div>
                        );
                      }
                      if (value === 'contact') {
                        return (
                          <li>
                            You are meeting up with:{' '}
                            <span className="font-weight-bold">{data[value]}</span>
                          </li>
                        );
                      }
                      if (value === 'id') {
                        return <span className="font-weight-bold"> </span>;
                      }
                      return (
                        <li>
                          {value[0].toUpperCase() + value.substring(1)}:{' '}
                          <span className="font-weight-bold">{data[value]}</span>
                        </li>
                      );
                    }),
                  )}
                </ul>
              );
            }
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
