import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { getPatterns } from '../Model/Query';
import { PropTypes } from 'prop-types';

const filterPatterns = (patterns, filtri) => {
  if (!filtri || filtri.length === 0) {
    return patterns;
  }

  return patterns.filter(pattern => {
    return filtri.every(filtro => {
      const attributeName = filtro.label;
      let patternField = pattern.attributes[attributeName];

      // Controllo per i casi speciali come 'CWE'
      if (filtro.label === 'CWE') {
        patternField = pattern.attributes.cwe_associata_a_categoria_owasps;
      }
      
      if (!patternField?.data) return false;

      const patternFieldValues = patternField.data.map(item => item.attributes.nome);
      return filtro.checkedItems.every(item => patternFieldValues.includes(item));
    });
  });
};

export default function PatternList({ filtri, query, user }) {
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let message;
  const filteredPatterns = filterPatterns(
    query === getPatterns ?
    data.patterns.data :
    data.patternBuffers.data,
    filtri);
  
  if (query === getPatterns) {
    message = <p>Nessun pattern corrisponde ai filtri selezionati</p>;
  } else {
    message = <p>Nessuna richiesta di modifica</p>;
  }

  return (
    <div className='pattern-list'>
      {filteredPatterns.length === 0 ? (
        message
      ) : (
        filteredPatterns.map(item => {
          const pattern = item.attributes;

          return (
            <div key={item.id} className="pattern-card">
              <div className='pattern-id'>Pattern id: {item.id}</div>
                {query === getPatterns && user === null ? (
                  <Link to={`/dettagli/${item.id}`}><h2>{pattern.titolo}</h2></Link>
                ) : (
                  user === "responsabile" ? (
                    <Link reloadDocument to={`/responsabile/modifica-elemento/dettagli/${item.id}`}><h2>{pattern.titolo}</h2></Link>
                  ) : (    
                    <div className='pattern-title'>
                      <Link reloadDocument to={`/amministratore/modifiche-pkb/dettagli/${item.id}`}><h2>{pattern.titolo}</h2></Link>
                      <p>{pattern.stato.data.attributes.nome}</p>
                    </div>
                  )
                )}
              <br></br>
            </div>
          );
        })
      )}
    </div>
  );
}

PatternList.propTypes = {
  filtri: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}