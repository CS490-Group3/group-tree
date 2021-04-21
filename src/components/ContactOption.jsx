import React, { useState, useEffect } from 'react';
import '../css/ContactBook.css';
import 'react-responsive-modal/styles.css';

/* eslint-disable react/jsx-props-no-spreading */
/* const BASE_URL = '/api/v1/contacts'; */

export default function ContactOption() {
  const [contacts, setContacts] = useState([]);

  // Fetch all contacts when you first load the page
  useEffect(() => {
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

  return (
    <label htmlFor="exampleSelect1">
      Contact
      <select className="form-control" id="exampleSelect1" placeholder="Activity">
        {contacts.map((person) => (
          <option>{person.name}</option>
        ))}
      </select>
    </label>
  );
}
