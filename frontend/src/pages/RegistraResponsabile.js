import React, { useState } from 'react';
import RegisterForm from '../View/RegisterForm';

const RegistraResponsabile = () => {
  const [message, setMessage] = useState(null);

  const register = async (event) => {
    event.preventDefault();
    setMessage(null);
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);

    const reqRegisterOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    };
    
    const req = await fetch('http://localhost:1337/api/auth/local/register', reqRegisterOptions);
    const res = await req.json();

    if (res.error) {
      setMessage(res.error.message);
    } else if (res.jwt && res.user) {
      setMessage('Utente registrato con successo');
      // Resetta il form
      event.target.reset();
    }
  };

  return (
    <RegisterForm message={message} register={register} />
  );
};

export default RegistraResponsabile;