import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BASE_URL = '/api/v1/events';
function DateInformation(props) {
  const { date } = props;
  const [infomation, setInfomation] = useState(null);

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

  const fetchDateInfo = () => {
    fetch(BASE_URL, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInfomation(data);
        console.log(infomation);
      });
  };

  useEffect(() => {
    fetchDateInfo();
  }, []);

  return (
    <div className="item border">
      <h3>Click on a date to view information</h3>
      <p className="lead">
        {date === null ? 'TODO' : date.getDate()} - {months[date.getMonth()]} -{' '}
        {date.getFullYear()}
      </p>
      {infomation === null ? (
        <p>no info</p>
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
  date: PropTypes.instanceOf(Date).isRequired,
};

export default DateInformation;
