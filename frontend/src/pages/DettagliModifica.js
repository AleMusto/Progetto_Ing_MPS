import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ModificaSingola from '../View/ModificaSingola';
import { userData } from '../helpers';

const PATTERN = gql`
  query getPattern($id: ID!) {
    patternBuffer(id: $id) {
      data {
        id
        attributes {
          titolo,
          descrizione,
          contesto,
          esempio,
          strategias {
            data {
              id
              attributes {
                nome
              }
            }
          },
          collocazione_mvcs {
            data {
              id
              attributes {
                nome
              }
            }
          },
          fase_isos {
            data {
              id
              attributes {
                nome
              }
            }
          },
          articolo_gdprs {
            data {
              id
              attributes {
                nome
                link
              }
            }
          },
          principio_pbds {
            data {
              id
              attributes {
                nome
              }
            }
          },
          categoria_owasps {
            data {
              id
              attributes {
                nome
              }
            }
          },
          cwe_associata_a_categoria_owasps {
            data {
              id
              attributes {
                nome
              }
            }
          }
          user {
            data {
              id
              attributes {
                username
              }
            }
          }
          stato {
            data {
              id
              attributes {
                nome
              }
            }
          }
          pattern {
            data {
              id
              attributes {
                titolo,
                descrizione,
                contesto,
                esempio,
                strategias {
                  data {
                    id
                    attributes {
                      nome
                    }
                  }
                },
                collocazione_mvcs {
                  data {
                    id
                    attributes {
                      nome
                    }
                  }
                },
                fase_isos {
                  data {
                    id
                    attributes {
                      nome
                    }
                  }
                },
                articolo_gdprs {
                  data {
                    id
                    attributes {
                      nome
                      link
                    }
                  }
                },
                principio_pbds {
                  data {
                    id
                    attributes {
                      nome
                    }
                  }
                },
                categoria_owasps {
                  data {
                    id
                    attributes {
                      nome
                    }
                  }
                },
                cwe_associata_a_categoria_owasps {
                  data {
                    id
                    attributes {
                      nome
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function DettagliModifica() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, loading } = useQuery(PATTERN, {
    variables: { id: id }
  });
  const [feedback, setFeedback] = useState('');
  const { jwt } = userData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pattern = data.patternBuffer.data.attributes;
  const idPatternAssociato = pattern.pattern?.data?.id;
  const stato = pattern.stato.data.attributes.nome;

  const handlePut = async () => {
    const urlPattern = `http://localhost:1337/api/patterns/${idPatternAssociato}`;
    const urlDelete = `http://localhost:1337/api/pattern-buffers/${id}`;
    const body = {
      data: {
        titolo: pattern.titolo,
        descrizione: pattern.descrizione,
        contesto: pattern.contesto,
        esempio: pattern.esempio,
        strategias: pattern.strategias.data.map(el => el.id),
        collocazione_mvcs: pattern.collocazione_mvcs.data.map(el => el.id),
        fase_isos: pattern.fase_isos.data.map(el => el.id),
        articolo_gdprs: pattern.articolo_gdprs.data.map(el => el.id),
        principio_pbds: pattern.principio_pbds.data.map(el => el.id),
        categoria_owasps: pattern.categoria_owasps.data.map(el => el.id),
        cwe_associata_a_categoria_owasps: pattern.cwe_associata_a_categoria_owasps.data.map(el => el.id),
        user: pattern.user.data.id
      }
    };

    try {
      const response = await fetch(urlPattern, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseDelete = await fetch(urlDelete, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        }
      });

      if (!responseDelete.ok) {
        throw new Error('Network response was not ok');
      }

      setFeedback('Pattern aggiornato e buffer eliminato con successo!');
      navigate('/amministratore/modifiche-pkb'); // Torna alla pagina precedente
    } catch (error) {
      setFeedback(`Errore nell'aggiornamento del pattern: ${error.message}`);
    }
  };

  const handlePost = async () => {
    const urlPattern = `http://localhost:1337/api/patterns`;
    const urlDelete = `http://localhost:1337/api/pattern-buffers/${id}`;
    const body = {
      data: {
        titolo: pattern.titolo,
        descrizione: pattern.descrizione,
        contesto: pattern.contesto,
        esempio: pattern.esempio,
        strategias: pattern.strategias.data.map(el => el.id),
        collocazione_mvcs: pattern.collocazione_mvcs.data.map(el => el.id),
        fase_isos: pattern.fase_isos.data.map(el => el.id),
        articolo_gdprs: pattern.articolo_gdprs.data.map(el => el.id),
        principio_pbds: pattern.principio_pbds.data.map(el => el.id),
        categoria_owasps: pattern.categoria_owasps.data.map(el => el.id),
        cwe_associata_a_categoria_owasps: pattern.cwe_associata_a_categoria_owasps.data.map(el => el.id),
        user: pattern.user.data.id
      }
    };

    try {
      const response = await fetch(urlPattern, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseDelete = await fetch(urlDelete, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        }
      });

      if (!responseDelete.ok) {
        throw new Error('Network response was not ok');
      }

      setFeedback('Pattern aggiunto e buffer eliminato con successo!');
      navigate('/amministratore/modifiche-pkb'); // Torna alla pagina precedente
    } catch (error) {
      setFeedback(`Errore nell'aggiunta del pattern: ${error.message}`);
    }
  };

  const handleDeletePatternAssociato = async () => {
    const urlDeletePattern = `http://localhost:1337/api/patterns/${idPatternAssociato}`;
    const urlDeleteBuffer = `http://localhost:1337/api/pattern-buffers/${id}`;

    try {
      const responseDeletePattern = await fetch(urlDeletePattern, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        }
      });

      if (!responseDeletePattern.ok) {
        throw new Error('Network response was not ok');
      }

      const responseDeleteBuffer = await fetch(urlDeleteBuffer, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        }
      });

      if (!responseDeleteBuffer.ok) {
        throw new Error('Network response was not ok');
      }

      setFeedback('Pattern associato eliminato e buffer eliminato con successo!');
      navigate('/amministratore/modifiche-pkb'); // Torna alla pagina precedente
    } catch (error) {
      setFeedback(`Errore nell'eliminazione del pattern associato: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    const urlDelete = `http://localhost:1337/api/pattern-buffers/${id}`;
    const urlResetPatternPendingDelete = `http://localhost:1337/api/patterns/${idPatternAssociato}`;

    try {
      const responseDelete = await fetch(urlDelete, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        }
      });

      if (!responseDelete.ok) {
        throw new Error('Network response was not ok');
      }

      const responseReset = await fetch(urlResetPatternPendingDelete, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify({
          data: { pending_delete: false }
        })
      });

      if (!responseReset.ok) {
        throw new Error('Error updating pattern');
      }

      setFeedback('Pattern buffer eliminato con successo!');
      navigate('/amministratore/modifiche-pkb'); // Torna alla pagina precedente
    } catch (error) {
      setFeedback(`Errore nell'eliminazione del pattern buffer: ${error.message}`);
    }
  };

  return (
    <div>
      <ModificaSingola id={id} pattern={pattern} />
      {stato === 'Modifica' && (
        <div>
          <button className='button-modifica' onClick={handlePut}>Conferma richiesta di modifica</button>
          <button className='button-modifica' onClick={handleDelete}>Respingi richiesta di modifica</button>
        </div>
      )}
      {stato === 'Aggiungi' && (
        <div>
          <button className='button-aggiungi' onClick={handlePost}>Conferma richiesta di aggiunta</button>
          <button className='button-aggiungi' onClick={handleDelete}>Respingi richiesta di aggiunta</button>
        </div>
      )}
      {stato === 'Elimina' && (
        <div>
          <button className='button-elimina' onClick={handleDeletePatternAssociato}>Conferma richiesta di eliminazione</button>
          <button className='button-elimina' onClick={handleDelete}>Respingi richiesta di eliminazione</button>
        </div>
      )}
      {feedback && <p>{feedback}</p>}
    </div>
  );
}
