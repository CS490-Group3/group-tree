import React, { useState }  from 'react'
import '../css/ContactBook.css';
import "react-responsive-modal/styles.css";
import { Modal } from 'react-responsive-modal';
import { useForm } from 'react-hook-form';

/* eslint-disable react/jsx-props-no-spreading */

export default function ContactBook() {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
  
  
    const onSubmit = (data) => console.log(data);

    
    /*
    const [contacts, setContacts] = useState(
       { name: 'Lary', email: '@gmail.com' },
    //    { name: 'Pine', email: '@gmail.com' },
    //    { name: 'pal', email: '@gmail.com' }
    //    ); // all the users
    
    */
    const contacts = [
    { name: 'Chris Doe', email:"@gmail", phoneNumber: "732-344-0000"},
    { name: 'Nick Doe', email:"@gmail", phoneNumber: "732-344-0000"},
    { name: 'Jacov Doe', email:"@gmail", phoneNumber: "732-344-0000"}
    ];
  
    return (
        <div>
            <h2 className="text-center">Contact Book</h2>
            <div className="text-right">
              <button onClick={onOpenModal} type="button"  className="add-button">Add New Contact</button>
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
                    {contacts.map(c => (
                      <tr>
                        <th>{c.name}</th>
                        <td>{c.email}</td>
                        <td>{c.phoneNumber}</td>
                    </tr>
                  ))}
                </tbody>
            </table>
            
            <div>
              <Modal open={open} onClose={onCloseModal} center>
                <h2>Edit Contact</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                
                    Name:
                    <input type="text" placeholder="Name" {...register("name", {required: true, maxLength: 80})} />
                    {errors.name && <p>Name is required.</p>}
                  
                    Email:
                    <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
                    {errors.email && <p>Please enter valid email.</p>}

                    Phone Number:
                    <input type="tel" placeholder="Mobile number" {...register("phoneNumber", {required: true, maxLength: 12})} />
                    {errors.phoneNumber && <p>Plese Enter valid phone number</p>}
                    
                  <input type="submit" />
                  
                </form>
              </Modal>
            </div>
        </div>
        
  );
}