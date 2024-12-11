import React from 'react';
import {splitExamples} from '../helpers.js'
import { PropTypes } from 'prop-types';

export default function ModificaSingola({ id, pattern }) {
  const idPatternAssociato = pattern.pattern?.data?.id;
  const patternAssociato = pattern.pattern?.data?.attributes;
  let esempi = splitExamples(pattern.esempio)

  return (
    <div className='pattern-card'>
      <p>Pattern id: {id}</p>
      <h1>{pattern.titolo}</h1>

      {/* Loop per mostrare i nomi delle strategie */}
      <div>
        <strong>Strategie:</strong>
        <ul>
          {pattern.strategias.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      <strong>Descrizione:</strong>
      <p>{pattern.descrizione}</p>

      <strong>Contesto:</strong>
      <p>{pattern.contesto}</p>

      {/* Loop per mostrare la collocazione MVC */}
      <div>
        <strong>Collocazione MVC:</strong>
        <ul>
          {pattern.collocazione_mvcs.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare le fasi ISO */}
      <div>
        <strong>Fasi ISO:</strong>
        <ul>
          {pattern.fase_isos.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare gli eventuali articoli del GDPR */}
      <div>
        <strong>Eventuali articoli GDPR:</strong>
        <ul>
          {pattern.articolo_gdprs.data.map(element => (
            <li key={element.id}>
              <a target='_blank' rel='noreferrer' href={element.attributes.link}>
                {element.attributes.nome}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare i principi della PbD */}
      <div>
        <strong>Principi PbD:</strong>
        <ul>
          {pattern.principio_pbds.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare le categorie OWASP */}
      <div>
        <strong>Categorie OWASP:</strong>
        <ul>
          {pattern.categoria_owasps.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare le CWE associate alle categorie OWASP */}
      <div>
        <strong>CWE associate alle categorie OWASP:</strong>
        <ul>
          {pattern.cwe_associata_a_categoria_owasps.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare gli esempi */}
      <div>
        <strong>Eventuali esempi:</strong>
        <ul>
          {esempi.map((element, index) => (
            <li key={element.id}>{element}</li>
          ))}
        </ul>
      </div>

      {pattern.user?.data?.attributes?.username && (
        <div>
          <strong>Pattern inviato da:</strong>
          <p>{pattern.user.data.attributes.username}</p>
        </div>
      )}

      {/* Condizionale per visualizzare il pattern associato */}
      {idPatternAssociato && patternAssociato && (
        <div>
          <h1>Pattern associato:</h1>
          <ModificaSingola id={idPatternAssociato} pattern={patternAssociato} />
        </div>
      )}
    </div>
  );
}

ModificaSingola.propTypes = {
  id: PropTypes.number.isRequired,
  pattern: PropTypes.object.isRequired
}