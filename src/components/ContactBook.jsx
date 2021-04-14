import React from 'react'
import '../css/ContactBook.css';

export default function ContactBook() {
    return (
        <div>
            <h2 className="text-center">Contact Book</h2>
            <div className="text-right">
              <button type="button"  className="add-button">Add New Contact</button>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr className="table-success">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Next Reminder</th>
                        <th scope="col"> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                       <td>Mark Otto</td>
                       <td>otto@gmail.com</td>
                       <td>732-000-0000</td>
                       <td>5 Days</td>
                       <td><button type="button" className="edit-button">Edit</button></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob Thornton</td>
                        <td>thornton@gmail.com</td>
                        <td>732-000-5660</td>
                        <td>2 Days</td>
                        <td><button type="button" className="edit-button">Edit</button></td>

                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry the Bird</td>
                        <td>larry@gmail.com</td>
                        <td>732-567-0000</td>
                        <td>5 Days</td>
                        <td><button type="button" className="edit-button">Edit</button></td>

                    </tr>
                </tbody>
            </table>
        </div>
        
  );
}