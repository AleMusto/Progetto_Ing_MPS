import { useState, useEffect } from 'react';
import { userData } from '../helpers';
import Header from '../View/Header';

export default function SiteHeader() {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = userData();
    //console.log(user)
    
    if (user?.jwt && user.role) {
      setIsAuth(true);
      setRole(user.role);
    }
  }, []);

  return (
    <Header isAuth={isAuth} role={role} />
  )
}
