import React, { useState, useEffect, useRef } from 'react';
import '../css/ContactBook.css';
import 'react-responsive-modal/styles.css';

/* eslint-disable react/jsx-props-no-spreading */
/* const BASE_URL = '/api/v1/contacts'; */

export default function ContactOption(prop) {
  const [contacts, setContacts] = useState([]);
  const selectedContact = useRef(null);

  function handleChange() {
    prop.onSelectContact(selectedContact);
  }

  useEffect(() => {
    window
      .fetch('/api/v1/contacts', {
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
      <select
        className="form-control"
        id="exampleSelect1"
        placeholder="Activity"
        onChange={handleChange}
        ref={selectedContact}
      >
        {contacts.map((person) => (
          <option>{person.name}</option>
        ))}
      </select>
    </label>
  );
}
