import React, { useEffect, useState } from 'react';
import AccordionResponsabile from '../components/AccordionResponsabile';
import { getCampiUnici } from '../helpers';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';

export default function DettagliElemento() {
  const { data, loading, error } = useFetch('http://localhost:1337/api/patterns?pagination[pageSize]=100&populate=*');
  const [uniqueFields, setUniqueFields] = useState([]);
  const [singlePattern, setSinglePattern] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (data) {
      const fields = getCampiUnici(data);
  
      const uniqueFieldsArray = Object.entries(fields).map(([field, { values, ids }], index) => ({
        id: index,
        label: field,
        campi: Array.from(values),
        id_campi: ids
      }));
  
      setUniqueFields(uniqueFieldsArray);
    }
  }, [data]);

  useEffect(() => {
    if (data && id) {
      const pattern = data.find((item) => item.id === parseInt(id));
      setSinglePattern(pattern || null);
    }
  }, [data, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <AccordionResponsabile items={uniqueFields} singlePattern={singlePattern} keepOthersOpen={true} stato={"Modifica"} />
    </div>
  );
}
