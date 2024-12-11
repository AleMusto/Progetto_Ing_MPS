import React from 'react'
import { Link } from 'react-router-dom';

export default function ViewResponsabile() {
  return (
    <div>
      <h1 >View Responsabile</h1>
      <hr/ >
      <Link to="/responsabile/aggiungi-elemento">
        <button className='registra-button'>Aggiungi Elemento</button>
      </Link>
      <Link to="/responsabile/elimina-elemento">
        <button className='elimina-button'>Elimina Elemento</button>
      </Link>
      <Link to="/responsabile/modifica-elemento">
        <button className='modifica-button'>Modifiche Elemento</button>
      </Link>
    </div>
  )
}
