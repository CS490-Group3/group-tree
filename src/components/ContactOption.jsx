import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import '../css/ContactBook.css';
import 'react-responsive-modal/styles.css';

const BASE_URL = '/api/v1/contacts';

function ContactOption(props) {
  const { onSelectContact } = props;
  const [contacts, setContacts] = useState([]);

  const [defaultValue, setDefaultValue] = useState(null);

  const fetchContacts = () => {
    fetch(BASE_URL, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
        if (data.length !== 0) {
          setDefaultValue(data[0].id);
        }
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  function handleChange(event) {
    onSelectContact(event.target.value);
    setDefaultValue(event.target.value.name);
  }

  return (
    <label htmlFor="exampleSelect1">
      Contact
      <select
        className="form-control"
        id="exampleSelect1"
        placeholder="Activity"
        onChange={(event) => handleChange(event)}
        value={onSelectContact(defaultValue)}
      >
        {contacts.map((contact) => (
          <option value={contact.id} selected={defaultValue === contact.name}>
            {contact.name}
          </option>
        ))}
      </select>
    </label>
  );
}

ContactOption.propTypes = {
  onSelectContact: PropTypes.func.isRequired,
};

export default ContactOption;
