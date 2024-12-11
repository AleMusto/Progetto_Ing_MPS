import React, { useState, useEffect } from 'react';
import { userData } from '../helpers';

export default function EliminaPattern() {
  const [patterns, setPatterns] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { jwt, userId } = userData();

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/patterns?pagination[pageSize]=100&populate=*&filters[pending_delete][$eq]=false');
        const data = await response.json();
        setPatterns(data.data); // Adjust based on the structure of the response
      } catch (error) {
        console.error('Error fetching patterns:', error);
      }
    };

    fetchPatterns();
  }, []);

  const handleDelete = async () => {
    if (!selectedPattern) {
      setMessage('Seleziona un pattern da eliminare');
      return;
    }

    const patternId = selectedPattern.id;
    const patternData = selectedPattern.attributes;

    try {
      // Step 1: Add the selected pattern to pattern-buffers
      const bufferResponse = await fetch('http://localhost:1337/api/pattern-buffers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify({
          data: {
            titolo: patternData.titolo,
            descrizione: patternData.descrizione,
            contesto: patternData.contesto,
            esempio: patternData.esempio,
            strategias: patternData.strategias.data.map(el => el.id),
            collocazione_mvcs: patternData.collocazione_mvcs.data.map(el => el.id),
            fase_isos: patternData.fase_isos.data.map(el => el.id),
            articolo_gdprs: patternData.articolo_gdprs.data.map(el => el.id),
            principio_pbds: patternData.principio_pbds.data.map(el => el.id),
            categoria_owasps: patternData.categoria_owasps.data.map(el => el.id),
            cwe_associata_a_categoria_owasps: patternData.cwe_associata_a_categoria_owasps.data.map(el => el.id),
            user: userId,
            pattern: patternId,
            stato: {"id": 2}
          }
        })
      });

      if (!bufferResponse.ok) {
        throw new Error('Error adding pattern to buffer');
      }

      // Step 2: Update the selected pattern's pending_delete field
      const updateResponse = await fetch(`http://localhost:1337/api/patterns/${patternId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify({
          data: { pending_delete: true }
        })
      });

      if (!updateResponse.ok) {
        throw new Error('Error updating pattern');
      }

      setMessage('Pattern marked for deletion successfully');
      setSelectedPattern(null);

      // Step 3: Reload the list of patterns
      const updatedResponse = await fetch('http://localhost:1337/api/patterns?pagination[pageSize]=100&populate=*&filters[pending_delete][$eq]=false');
      const updatedData = await updatedResponse.json();
      setPatterns(updatedData.data);
    } catch (error) {
      console.error('Error handling pattern:', error);
      setMessage('Errore nella gestione del pattern');
    }
  };

  const confirmDelete = () => {
    handleDelete();
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="pattern-form-container">
      <h1>Elimina Pattern</h1>
      <div className="pattern-select-container">
        <select
          className="pattern-select"
          value={selectedPattern ? selectedPattern.id : ''}
          onChange={e => setSelectedPattern(patterns.find(pattern => pattern.id === parseInt(e.target.value)))}
        >
          <option value="" disabled>Seleziona un pattern</option>
          {patterns.map(pattern => (
            <option key={pattern.id} value={pattern.id}>
              {pattern.attributes.titolo}
            </option>
          ))}
        </select>
        <button className="richiesta-button" onClick={() => setShowConfirmation(true)}>Elimina</button>
      </div>
      {message && <p className="message">{message}</p>}
      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Sicuro di voler inviare la richiesta per eliminare questo pattern?</p>
          <button className="richiesta-button" onClick={confirmDelete}>Conferma</button>
          <button className="richiesta-button" onClick={cancelDelete}>Annulla</button>
        </div>
      )}
    </div>
  );
}
  