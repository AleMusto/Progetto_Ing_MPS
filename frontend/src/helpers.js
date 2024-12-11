import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

export const storeUser = (data) => {
  localStorage.setItem(
    'user',
    JSON.stringify({
      username: data.user.username,
      jwt: data.jwt,
      role: data.role,
      userId: data.user.id
    })
  )
}

export const userData = () => {
  const stringifiedUser = localStorage.getItem('user') || '""';
  return JSON.parse(stringifiedUser || {});
}

export const Protector = ({Component}) => {
  const navigate = useNavigate();
  const {jwt} = userData();

  useEffect(() => {
    if (!jwt) navigate('/login');
  }, [navigate, jwt]);

  return <Component />;
};

Protector.propTypes = {
  Component: PropTypes.element.isRequired
}

export const getCampiUnici = (data) => {
  const fields = {};

  data.forEach(item => {
    Object.entries(item.attributes).forEach(([field, value]) => {
      // Skip the 'user' and 'pattern-buffers' field
      if (field === 'user' || field === 'pattern-buffers') {
        return;
      }

      if (value?.data) {
        const dataArray = Array.isArray(value.data) ? value.data : [value.data];
        dataArray.forEach(nestedItem => {
          Object.entries(nestedItem.attributes).forEach(([subField, subValue]) => {
            if (subField === 'nome') {
              if (!fields[field]) {
                fields[field] = {
                  values: new Set(),
                  ids: new Set() // Utilizza un Set per tenere traccia degli ID unici
                };
              }
              fields[field].values.add(subValue);
              fields[field].ids.add(nestedItem.id); // Aggiungi l'id del sottocampo al Set
            }
          });
        });
      }
    });
  });

  // Converte i Set in array prima di restituire i campi
  Object.keys(fields).forEach(field => {
    fields[field].ids = Array.from(fields[field].ids);
  });

  return fields;
}

export const parseCampi = (fields) => {
  const parsedArray = Object.entries(fields).map(([field, { values, ids }], index) => {
    return {
      id: index,
      label: field,
      campi: Array.from(values).sort(),
      id_campi: ids // Aggiungi l'array di id
    };
  });

  return parsedArray;
}

export const splitExamples = (text) => {
  if (text === "NA") return ["No examples"];

  // Divide il testo in base alle occorrenze di 'Example'
  let examples = text.split('Example');
  
  // Rimuovi il primo elemento dell'array che è una stringa vuota
  examples.shift();
  
  // Aggiungi 'Example' all'inizio di ogni elemento dell'array
  examples = examples.map(example => 'Example ' + example.trim());
  
  return examples;
}