import React, { useEffect, useState } from 'react'
import { getCampiUnici } from '../helpers';
import useFetch from '../hooks/useFetch';
import AccordionResponsabile from '../components/AccordionResponsabile';

export default function AggiungiElemento() {
  const { data, loading, error } = useFetch('http://localhost:1337/api/patterns?pagination[pageSize]=100&populate=*');
  const [uniqueFields, setUniqueFields] = useState([]);

  useEffect(() => {
    if (data) {
      const fields = getCampiUnici(data);
  
      const uniqueFieldsArray = Object.entries(fields).map(([field, { values, ids }], index) => ({
        id: index,
        label: field,
        campi: Array.from(values),
        id_campi: ids // Aggiungi l'array di id
      }));
  
      setUniqueFields(uniqueFieldsArray);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <AccordionResponsabile items={uniqueFields} keepOthersOpen={true} stato={"Aggiungi"} />
    </div>
  )
}
