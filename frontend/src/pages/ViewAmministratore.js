import React from 'react';
import { Link } from 'react-router-dom';

export default function ViewAmministratore() {
  return (
    <div>
      <h1 >View Amministratore</h1>
      <hr/ >
      <Link to="/amministratore/registra-responsabile">
        <button className='registra-button'>Registra Responsabile</button>
      </Link>
      <Link to="/amministratore/elimina-responsabile">
        <button className='elimina-button'>Elimina Responsabile</button>
      </Link>
      <Link to="/amministratore/modifiche-pkb">
        <button className='modifica-button'>Modifiche PKB</button>
      </Link>
    </div>
  );
}
