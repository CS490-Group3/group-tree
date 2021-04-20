import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import ContactBook from './pages/ContactBook';

test('add new contact click function', () => {
  const result = render(<ContactBook />);
  const addnewBtnElement = screen.getByText('Add New Contact');
  expect(addnewBtnElement).toBeInTheDocument();
  const formElement = document.getElementById("Submit");
  fireEvent.click(addnewBtnElement);
  expect(addnewBtnElement).toBeInTheDocument();
});