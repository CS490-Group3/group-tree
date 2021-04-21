import React, { render, screen, fireEvent } from '@testing-library/react';

import ContactBook from './pages/ContactBook';

test('add new contact click function', () => {
  render(<ContactBook />);
  const addnewBtnElement = screen.getByText('Add New Contact');
  expect(addnewBtnElement).toBeInTheDocument();
  const formElement = screen.getByText('Phone Number');
  fireEvent.click(addnewBtnElement);
  expect(formElement).toBeInTheDocument();
});

test('contactbook appears', () => {
  render(<ContactBook />);
  const contactbookElement = screen.getByText('Contact Book');
  expect(contactbookElement).toBeInTheDocument();
  const pageElement = screen.getByText('Name');
  fireEvent.click(contactbookElement);
  expect(pageElement).toBeInTheDocument();
});
