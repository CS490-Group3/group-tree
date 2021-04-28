import React, { useState, useEffect } from 'react';
import '../css/ContactBook.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from 'react-hook-form';

import ContactRow from '../components/ContactRow';

/* eslint-disable react/jsx-props-no-spreading */
const BASE_URL = '/api/v1/contacts';

function ContactBook() {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [contacts, setContacts] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetchContacts = () => {
    fetch(BASE_URL, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => setContacts(data));
  };

  const addContact = (contact) => {
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    }).then(fetchContacts);
  };

  const onSubmit = (data) => {
    addContact(data);
    reset({
      name: '',
      email: '',
      phone: '',
    });
    setOpen(false);
  };

  // Fetch all contacts when you first load the page
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="contact-book">
      <div>
        <h2 className="text-center">Contact Book</h2>
        <div className="text-right">
          <button onClick={onOpenModal} type="button" className="add-button">
            Add New Contact
          </button>
        </div>
        <table className="table table-hover text-left">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Next Event</th>
              <th scope="col" className="clear">
                DELETE
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <ContactRow
                name={c.name}
                email={c.email}
                phone={c.phone}
                nextEvent={c.nextEvent}
                onConfirmDelete={() =>
                  fetch(`${BASE_URL}?id=${c.id}`, {
                    method: 'DELETE',
                  }).then(fetchContacts)
                }
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-primary">
        <Modal open={open} onClose={onCloseModal} center id="model-special">
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <h4 className="modal-title w-100 font-weight-bold">
              Enter Contact Information:
            </h4>
            <br />
            <i className="fas fa-user-alt fa-2x align-middle" />
            <input
              type="text"
              placeholder="Full Name"
              {...register('name', { required: true, maxLength: 80 })}
            />
            <br />
            {errors.name && <p>Name is required.</p>}
            <i className="fas fa-envelope prefix grey-text fa-2x align-middle" />
            <input
              type="text"
              placeholder="example@email.com"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p>Please enter valid email.</p>}
            <br />
            <i className="fas fa-phone-square-alt fa-2x align-middle" />
            <input
              type="text"
              placeholder="123-456-7890"
              {...register('phone', { required: true, minLength: 12 })}
            />
            {errors.phone && <p>Plese enter phone number in format 123-456-7890</p>}
            <input className="form-submit" type="submit" />
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default ContactBook;
