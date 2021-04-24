import React from 'react';
import PropTypes from 'prop-types';

function ContactRow(props) {
  const { name, email, phone, onClick } = props;

  return (
    <tr onClick={onClick}>
      <th>{name}</th>
      <td>{email}</td>
      <td>{phone}</td>
    </tr>
  );
}

ContactRow.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactRow;
