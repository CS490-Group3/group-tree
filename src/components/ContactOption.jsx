import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import '../css/ContactBook.css';
import 'react-responsive-modal/styles.css';

const BASE_URL = '/api/v1/contacts';

function ContactOption(props) {
  const { onSelectContact } = props;
  const [contacts, setContacts] = useState([]);

  const fetchContacts = () => {
    fetch(BASE_URL, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
        if (data.length !== 0) onSelectContact(data[0].id);
        else onSelectContact(null);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <label htmlFor="exampleSelect1">
      Contact
      <select
        className="form-control custom-select"
        id="exampleSelect1"
        placeholder="Activity"
        onChange={(event) => onSelectContact(event.target.value)}
      >
        {contacts.map((contact) => (
          <option value={contact.id}>{contact.name}</option>
        ))}
      </select>
    </label>
  );
}

ContactOption.propTypes = {
  onSelectContact: PropTypes.func.isRequired,
};

export default ContactOption;
