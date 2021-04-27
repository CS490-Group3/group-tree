import React, { useState, useEffect, useRef } from 'react';
import '../css/ContactBook.css';
import 'react-responsive-modal/styles.css';

/* eslint-disable react/jsx-props-no-spreading */
const BASE_URL = '/api/v1/contacts';

function ContactOption(props) {
  const [contacts, setContacts] = useState([]);
  const selectedContact = useRef(null);

  const handleChange = () => {
    props.onSelectContact(selectedContact);
  };

  const fetchContacts = () => {
    fetch(BASE_URL, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => setContacts(data));
  };

  // Fetch all contacts when you first load the page
  useEffect(() => {
    fetchContacts();
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

export default ContactOption;
