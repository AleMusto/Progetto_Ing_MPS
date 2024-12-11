import { PropTypes } from 'prop-types';

export default function LoginForm({login, message}) {

  return (
    <form autoComplete='off' className='form' onSubmit={login}>
      <label htmlFor='identifier' className='block'>Username/Email</label>
      <input type='text' id='identifier' name='identifier' className='block'></input>

      <label htmlFor='password' className='block'>Password</label>
      <input type='password' id='password' name='password' className='block'></input>
      
      <button type='submit' className='block'>Login</button>
      <div>{message}</div>
    </form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}