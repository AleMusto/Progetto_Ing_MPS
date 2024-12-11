import React, { useState, useEffect } from 'react';
import { userData } from '../helpers';

export default function EliminaResponsabile() {
  const [responsabili, setResponsabili] = useState([]);
  const [selectedResponsabile, setSelectedResponsabile] = useState(null);
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { jwt} = userData();

  useEffect(() => {
    const fetchResponsabili = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/users?populate=role&filters[role][type][$eqi]=responsabile_della_sicurezza');
        const data = await response.json();
        setResponsabili(data);
      } catch (error) {
        console.error('Error fetching responsabili:', error);
      }
    };

    fetchResponsabili();
  }, []);

  const handleDelete = async () => {
    if (!selectedResponsabile) {
      setMessage('Seleziona un responsabile da eliminare');
      return;
    }


    try {
      const response = await fetch(`http://localhost:1337/api/users/${selectedResponsabile}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        }
      });

      if (response.ok) {
        setMessage('Responsabile eliminato con successo');
        setSelectedResponsabile(null); // Reset the selected value
        // Reload the list of responsabili
        const updatedResponse = await fetch('http://localhost:1337/api/users?populate=role&filters[role][type][$eqi]=responsabile_della_sicurezza');
        const updatedData = await updatedResponse.json();
        setResponsabili(updatedData);
      } else {
        setMessage('Errore nell\'eliminazione del responsabile');
      }
    } catch (error) {
      console.error('Error deleting responsabile:', error);
      setMessage('Errore nell\'eliminazione del responsabile');
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
      <h1>Elimina Responsabile</h1>
      <div className="pattern-select-container">
        <select
          className="pattern-select"
          value={selectedResponsabile || ''}
          onChange={e => setSelectedResponsabile(e.target.value)}
        >
          <option value="" disabled>Seleziona un responsabile</option>
          {responsabili.map(responsabile => (
            <option key={responsabile.id} value={responsabile.id}>
              {responsabile.username}
            </option>
          ))}
        </select>
        <button className="richiesta-button" onClick={() => setShowConfirmation(true)}>Elimina</button>
      </div>
      {message && <p className="message">{message}</p>}
      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Sicuro di voler eliminare questo Responsabile?</p>
          <button className="richiesta-button" onClick={confirmDelete}>Conferma</button>
          <button className="richiesta-button" onClick={cancelDelete}>Annulla</button>
        </div>
      )}
    </div>
  );

}  
