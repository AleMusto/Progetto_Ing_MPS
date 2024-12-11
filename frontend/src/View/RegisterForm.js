import React from 'react';
import { PropTypes } from 'prop-types';

export default function RegisterForm({register, message}) {

  return (
    <form autoComplete='off' className='form' onSubmit={register}>
      <label htmlFor='nome' className='block'>Nome</label>
      <input type='text' id='nome' name='nome' className='block'></input>

      <label htmlFor='cognome' className='block'>Cognome</label>
      <input type='text' id='cognome' name='cognome' className='block'></input>

      <label htmlFor='username' className='block'>Username</label>
      <input type='text' id='username' name='username' className='block'></input>

      <label htmlFor='email' className='block'>Email</label>
      <input type='email' id='email' name='email' className='block mb-2'></input>

      <label htmlFor='password' className='block'>Password</label>
      <input type='password' id='password' name='password' className='block'></input>
      
      <button type='submit' className='block'>Registra nuovo responsabile</button>
      <div>{message}</div>
    </form>
  )
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}