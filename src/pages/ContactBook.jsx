import React, { useState, useEffect } from 'react';
import '../css/ContactBook.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from 'react-hook-form';

/* eslint-disable react/jsx-props-no-spreading */
/* const BASE_URL = '/api/v1/contacts'; */

export default function ContactBook() {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [contacts, setContacts] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  function addContact(contact) {
    // setCreateStatus(false);

    const data = JSON.stringify({
      name: contact.name,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
    });
    window
      .fetch('/api/v1/addContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data, // No query parameter, for POST we put in body
      })
      .then((response) => response.json())
      .then((responseData) => {
        setContacts(responseData);
        // setCreateStatus(responseData.success);
      });
  }

  function onSubmit(data) {
    console.log(data);
    // setContacts((copyContacts) => [...copyContacts, data]);
    addContact(data);
  }

  return (
    <div>
      <h2 className="text-center">Contact Book</h2>
      <div className="text-right">
        <button onClick={onOpenModal} type="button" className="add-button">
          Add New Contact
        </button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr className="table-success">
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr>
              <th>{c.name}</th>
              <td>{c.emails}</td>
              <td>{c.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <Modal open={open} onClose={onCloseModal} center>
          <h4>Enter Contact Information:</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            Name:
            <input
              type="text"
              placeholder="Full Name"
              {...register('name', { required: true, maxLength: 80 })}
            />
            {errors.name && <p>Name is required.</p>}
            Email:
            <input
              type="text"
              placeholder="example@email.com"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p>Please enter valid email.</p>}
            Phone Number:
            <input
              type="tel"
              placeholder="123-456-7890"
              {...register('phoneNumber', { required: true, minLength: 12 })}
            />
            {errors.phoneNumber && <p>Plese enter phone number in format 123-456-7890</p>}
            <input type="submit" />
          </form>
        </Modal>
      </div>
    </div>
  );
}
