import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export default function Header({isAuth, role}) {
  return (
    <header className='site-header'>
      <div className="site-title">
        <Link reloadDocument to="/"><h1>POSD System</h1></Link>
      </div>
      <div>
        <Link to={"/articoli-gdpr"}>
          <button className='articoli-button'>Visualizza Articoli GDPR</button>
        </Link>
      </div>
      <div className='auth-buttons'>
        {isAuth ? (
          <>
            <Link to={role === 'amministratore' ? "/amministratore" : "/responsabile"}>
              <button className='area-riservata'>Area Riservata</button>
            </Link>
            <Link to={"/logout"}>
              <button className='logout-button'>Logout</button>
            </Link>
          </>
        ) : (
          <Link to={"/login"}>
            <button className='login-button'>Login</button>
          </Link>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired
}