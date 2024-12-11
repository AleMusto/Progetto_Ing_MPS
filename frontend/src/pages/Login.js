import { useEffect, useState } from 'react'
import { storeUser, userData } from '../helpers';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../View/LoginForm';

export default function Login() {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // se l'utente è loggato, viene reindirizzato alla home
  useEffect(() => {
    const user = userData();

    if (user?.jwt) navigate('/');
  }, [navigate]);

  const login = async (event) => {
    event.preventDefault();
    setMessage(null);

    // prende tutti i valori del form e li trasforma in un oggetto
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);

    // richiesta POST
    const reqLoginOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    };

    const req = await fetch('http://localhost:1337/api/auth/local', reqLoginOptions);
    const res = await req.json();

    // gestione errori
    if (res.error) {
      setMessage(res.error.message);
      return;
    }

    // se l'utente ha effettuato il login, viene memorizzato l'utente nel localStorage
    if (res.jwt && res.user) {
      const userId = res.user.id;
      const role = await getRole(res.jwt);
      if (role) {
        storeUser({...res, role, userId});
        setMessage(`You are logged in as ${res.user.username}, with role ${role}`);
        navigate(0);
      } else setMessage('Error getting role');
    }
    
    //console.log(res)
  };

  const getRole = async (jwt) => {
    const reqRoleOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
      }
    };

    const req = await fetch('http://localhost:1337/api/users/me?populate=*', reqRoleOptions);
    const res = await req.json();
    
    // gestione errori
    if (res.error) {
      setMessage(res.error.message);
      return '';
    }

    if (res.role?.type) return res.role.type;

    return '';
  }

  return (
    <LoginForm message={message} login={login} />
  )
}