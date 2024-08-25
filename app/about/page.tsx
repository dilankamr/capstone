"use client";

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [message, setMessage] = useState<string>('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('service_l8az1ns', 'template_3p4r9td', form.current, 'Glr3cH7zxYNaYipHH')
        .then(
          () => {
            console.log('SUCCESS!');
            setMessage('Email sent successfully!');
            if (form.current) {
              form.current.reset();
            }
          },
          (error) => {
            console.log('FAILED...', error.text);
            setMessage('Failed to send email.');
          },
        );
    }
  };

  return (
  
   
    <div className="max-w-full p-12 ">
      <div className='margin-left'>
        <h1>cjhbjhbvf</h1>
      </div>

           
            <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-6 ali">
              <label className="text-xl font-medium text-gray-300">Name</label>
              <input type="text" name="user_name" className="border border-gray-700 bg-gray-800 text-white p-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />

              <label className="text-xl font-medium text-gray-300">Email</label>
              <input type="email" name="user_email" className="border border-gray-700 bg-gray-800 text-white p-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />

              <label className="text-xl font-medium text-gray-300">Message</label>
              <textarea name="message" className="border border-gray-700 bg-gray-800 text-white p-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />

              <input type="submit" value="Send" className="bg-indigo-500 text-white p-4 mt-4 rounded-lg cursor-pointer hover:bg-indigo-600 transition duration-200" />
            </form>
            {message && <div className="mt-4 text-center text-xl text-gray-300">{message}</div>}
          </div>
        
   
  );
};

export default ContactUs;
