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
  if (!data) {
    console.error("Data is undefined or null");
    return []; // Return an empty array or default value
  }

  const fields = {};

  data.forEach(item => {
    // Iterate over all fields of each item
    Object.entries(item).forEach(([field, value]) => {
      // Skip non-relevant fields (e.g., 'user' and 'pattern-buffers')
      if (field === 'user' || field === 'pattern-buffers' || field === 'createdAt' || field === 'updatedAt' || field === 'publishedAt') {
        return;
      }

      // Process "Descrizione" and "Esempio" fields which are arrays of objects
      if (Array.isArray(value)) {
        value.forEach(nestedItem => {
          if (nestedItem.children && Array.isArray(nestedItem.children)) {
            nestedItem.children.forEach(child => {
              if (child.type === 'text' && child.text) {
                if (!fields[field]) {
                  fields[field] = {
                    values: new Set(),
                    ids: new Set(),
                  };
                }
                fields[field].values.add(child.text);  // Add text content
                fields[field].ids.add(item.id);  // Track the parent item's ID
              }
            });
          }
        });
      }
    });
  });

  // Convert sets to arrays before returning
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