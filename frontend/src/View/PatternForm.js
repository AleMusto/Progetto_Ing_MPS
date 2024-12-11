import React from 'react';
import { PropTypes } from 'prop-types';

export default function PatternForm({ sendPattern, message, singlePattern, stato }) {
  return (
    <div className='pattern-form'>
      <form autoComplete='off' onSubmit={sendPattern}>
        <label htmlFor='titolo' className='label-titolo'>Titolo</label>
        <input
          type='text'
          id='titolo'
          name='titolo'
          className='input-titolo'
          defaultValue={singlePattern?.attributes?.titolo || ''}
        />

        <label htmlFor='descrizione' className='label-descrizione'>Descrizione</label>
        <textarea
          id='descrizione'
          name='descrizione'
          className='text-descrizione'
          defaultValue={singlePattern?.attributes?.descrizione || ''}
        />

        <label htmlFor='contesto' className='label-contesto'>Contesto</label>
        <textarea
          id='contesto'
          name='contesto'
          className='text-contesto'
          defaultValue={singlePattern?.attributes?.contesto || ''}
        />

        <label htmlFor='esempio' className='label-esempio'>Esempio</label>
        <textarea
          placeholder='Example 1: <text>. Example 2: <text>.'
          id='esempio'
          name='esempio'
          className='text-esempio'
          defaultValue={singlePattern?.attributes?.esempio || ''}
        />

        <button type='submit' className='richiesta-button'>
          {stato === 'Aggiungi' ? (
            <p className='p-richiesta'>Manda richiesta di aggiunta</p>
          ) : (
            <p className='p-richiesta'>Manda richiesta di modifica</p>
          )}
        </button>
        <div>{message}</div>
      </form>
    </div>
  );
}

PatternForm.propTypes = {
  sendPattern: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  singlePattern: PropTypes.object,
  stato: PropTypes.string.isRequired,
}