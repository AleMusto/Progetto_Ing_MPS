import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import PatternSingolo from '../View/PatternSingolo'

const PATTERN = gql`
  query getPattern($id: ID!) {
    pattern(id: $id) {
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
`

function splitExamples(text) {
  if (text === "NA") return ["No examples"]

  // Divide il testo in base alle occorrenze di 'Example'
  let examples = text.split('Example')
  
  // Rimuovi il primo elemento dell'array che è una stringa vuota
  examples.shift()
  
  // Aggiungi 'Example' all'inizio di ogni elemento dell'array
  examples = examples.map(example => 'Example ' + example.trim())
  
  return examples
}

export default function DettagliPattern() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(PATTERN,
    { variables: {id: id} 
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  
  let pattern = data.pattern.data.attributes
  let esempi = splitExamples(pattern.esempio)

  return (
    <PatternSingolo id={id} pattern={pattern} esempi={esempi} />
  )
}
