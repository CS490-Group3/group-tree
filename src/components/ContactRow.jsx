import React from 'react';
import PropTypes from 'prop-types';

function ContactRow(props) {
  const { name, email, phone, onConfirmDelete } = props;

  return (
    <tr>
      <th>{name}</th>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <div
          onClick={() => {
            if (confirm(`Delete ${name}?`)) onConfirmDelete();
          }}
        >
          DELETE
        </div>
      </td>
    </tr>
  );
}

ContactRow.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
};

export default ContactRow;
