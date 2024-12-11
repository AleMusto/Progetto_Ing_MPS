import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.setItem('user', '')
    navigate(0);
    navigate('/');
  }, [navigate])
  
  return null;
}

export default Logout;