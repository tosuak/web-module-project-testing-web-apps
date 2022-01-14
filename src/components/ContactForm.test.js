import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);

    const headerElem = screen.queryByTest(/contact form/i);

    expect(headerElem).toBeInTheDocument();
    expect(headerElem).toBeTruthy();
    expect(headerElem).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, '123');

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
      const errorMessages = screen.queryAllByTestId('errors');
      expect(errorMessages).toHaveLength(3);
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />);

  const firstName = screen.getByLabelText(/first name*/i);
  userEvent.type(firstName, 'tafiqul');

  const lastName = screen.getByLabelText(/last name*/i);
  userEvent.type(lastName, 'tosuak');

  const button = screen.getByRole('button');
  userEvent.click(button);

  const errorMessages = await screen.getAllByTestId('error');
  expect(errorMessages).toHaveLength(1);


});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailField = screen.getByLabelText(/email*/i);
  userEvent.type(emailField, 'tosuak@gmail');

  const errorMessages = await screen.findByText(/email must be a valid email address/i);
  expect(errorMessages).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  const errorMessages = await screen.findByText(/lastName is a required field/i);
  expect(errorMessages).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm />);

  const firstName = screen.getByLabelText(/First Name*/i);
  const lastName = screen.getByLabelText(/last name*/i);
  const emailField = screen.getByLabelText(/email*/i);

  userEvent.type(firstName, 'tafiqul');
  userEvent.type(lastName, 'tosuak');
  userEvent.type(emailField, 'tosuak@gmail');

  const button = screen.getByRole('button');
  userEvent.click(button);

  await waitFor(() => {
    const firstNameDisplay = screen.queryByText('tafiqul');
    const lastNameDisplay = screen.queryByText('tosuak');
    const emailDisplay = screen.queryByText('tosuak@gmail.com');
    const messageDisplay = screen.queryByText('messsageDisplay');

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();
  })
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm />);

  const firstName = screen.getByLabelText(/First Name*/i);
  const lastName = screen.getByLabelText(/last name*/i);
  const emailField = screen.getByLabelText(/email*/i);
  const message = screen.getByLabelText(/Message/i);


  userEvent.type(firstName, 'tafiqul');
  userEvent.type(lastName, 'tosuak');
  userEvent.type(emailField, 'tosuak@gmail');
  userEvent.type(message, 'message');


  const button = screen.getByRole('button');
  userEvent.click(button);

  await waitFor(() => {
    const firstNameDisplay = screen.queryByText('tafiqul');
    const lastNameDisplay = screen.queryByText('tosuak');
    const emailDisplay = screen.queryByText('tosuak@gmail.com');
    const messageDisplay = screen.queryByTestId(/message/i);

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();
  })
  
});