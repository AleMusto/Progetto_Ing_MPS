import React, { useState } from 'react';
import PatternForm from '../View/PatternForm';
import { userData } from '../helpers';
import PropTypes from 'prop-types';

function formatBody(formData, filtri, userId, stato, idPatternAssociato) {
  const jsonData = Object.fromEntries(formData);

  const filtriConIdCampi = {};
  filtri.forEach(filtro => {
    filtriConIdCampi[filtro.label] = filtro.checkedItems.map(item => item.id_campo);
  });

  const id = idPatternAssociato || null;
  let statoBody;

  if (stato === 'Aggiungi') {
    statoBody = { id: 3 };
  } else if (stato === 'Modifica') {
    statoBody = { id: 1 };
  }

  const body = {
    data: {
      user: userId,
      stato: statoBody,
      titolo: jsonData.titolo,
      descrizione: jsonData.descrizione,
      contesto: jsonData.contesto,
      esempio: jsonData.esempio,
      pattern: id,
      ...filtriConIdCampi
    }
  };

  return body;
}

async function handlePost(event, patternData, setMessage) {
  event.preventDefault();
  setMessage(null);

  const { formData, filtri, userId, stato, jwt, singlePatternId } = patternData;
  const body = formatBody(formData, filtri, userId, stato, singlePatternId);

  const reqLoginOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    },
    body: JSON.stringify(body)
  };

  const req = await fetch('http://localhost:1337/api/pattern-buffers', reqLoginOptions);
  const res = await req.json();

  if (res.error) {
    setMessage(res.error.message);
    return;
  }

  if (res.data) {
    setMessage('Pattern inviato con successo');
  }
}

export default function CompilaPattern({ filtri, singlePattern, stato }) {
  const [message, setMessage] = useState(null);
  const { jwt, userId } = userData();

  const sendPattern = async (event) => {
    if (window.confirm('Sei sicuro di voler inviare il pattern?')) {
      const formData = new FormData(event.target);
      const patternData = {
        formData,
        filtri,
        userId,
        stato,
        jwt,
        singlePatternId: singlePattern?.id
      };
      await handlePost(event, patternData, setMessage);
    }
  };

  return (
    <div>
      <PatternForm sendPattern={sendPattern} message={message} singlePattern={singlePattern} stato={stato} />
    </div>
  );
}

CompilaPattern.propTypes = {
  filtri: PropTypes.array.isRequired,
  singlePattern: PropTypes.object.isRequired,
  stato: PropTypes.string.isRequired
};
