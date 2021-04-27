import React from 'react';
import PropTypes from 'prop-types';

function ContactRow(props) {
  const { name, email, phone, nextEvent, onConfirmDelete } = props;

  return (
    <tr>
      <th>
        <p>
          <i className="fas fa-user-circle fa-2x" />
          &nbsp;&nbsp;&nbsp;{name}
        </p>
      </th>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{nextEvent}</td>
      <td>
        <button
          onClick={() => {
            if (confirm(`Delete ${name}?`)) onConfirmDelete(); // eslint-disable-line no-alert, no-restricted-globals
          }}
          type="button"
          className="delete-button"
        >
          <i className="fas fa-user-minus" />
        </button>
      </td>
    </tr>
  );
}

ContactRow.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  nextEvent: PropTypes.string.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
};

export default ContactRow;
