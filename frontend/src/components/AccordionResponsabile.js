import React, { useEffect, useState } from 'react';
import './AccordionResponsabile.css';
import CompilaPattern from '../pages/CompilaPattern';
import { PropTypes } from 'prop-types';

const AccordionResponsabile = ({ items, singlePattern, keepOthersOpen, stato }) => {
  const [accordionItems, setAccordionItems] = useState([]);
  const [filtri, setFiltri] = useState([]);

  // Initialize accordion items when items prop changes
  useEffect(() => {
    if (items) {
      const newAccordionItems = items.map(item => ({
        ...item,
        toggled: false,
        checkedItems: new Array(item.campi.length).fill(false)
      }));
      setAccordionItems(newAccordionItems);
    }
  }, [items]);

  // Update checked items based on singlePattern
  useEffect(() => {
    if (singlePattern?.attributes && accordionItems.length > 0) {
      const singlePatternFields = {};

      Object.keys(singlePattern.attributes).forEach(key => {
        if (Array.isArray(singlePattern.attributes[key]?.data)) {
          singlePatternFields[key] = singlePattern.attributes[key].data.map(item => item.id);
        }
      });

      const updatedAccordionItems = accordionItems.map(item => {
        const checkedItems = item.id_campi.map(id_campo => {
          return singlePatternFields[item.label]?.includes(id_campo) || false;
        });

        return {
          ...item,
          checkedItems
        };
      });

      setAccordionItems(updatedAccordionItems);
    }
  }, [singlePattern]);

  const handleAccordionToggle = (clickedItem) => {
    setAccordionItems(prevItems =>
      prevItems.map(item => ({
        ...item,
        toggled: item.id === clickedItem.id ? !item.toggled : (keepOthersOpen ? item.toggled : false)
      }))
    );
  };

  const handleCheckboxChange = (itemId, index) => {
    setAccordionItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
          const checkedItems = [...item.checkedItems];
          checkedItems[index] = !checkedItems[index];

          // Update filtri state
          const updatedFiltri = filtri.filter(filtro => filtro.label !== item.label);
          const selectedFields = checkedItems.reduce((acc, isChecked, i) => {
            if (isChecked) {
              acc.push({
                campo: item.campi[i],
                id_campo: item.id_campi[i]
              });
            }
            return acc;
          }, []);

          if (selectedFields.length > 0) {
            updatedFiltri.push({
              label: item.label,
              checkedItems: selectedFields
            });
          }

          setFiltri(updatedFiltri);

          return {
            ...item,
            checkedItems
          };
        }
        return item;
      })
    );
  };

  return (
    <div className='container'>
      <div className='side-menu'>
        <div className='accordion-parent'>
          {accordionItems.map((listItem, key) => (
            <div className={`accordion ${listItem.toggled ? 'toggled' : ''}`} key={listItem.id}>
              <button className='toggle' onClick={() => handleAccordionToggle(listItem)}>
                <p>{listItem.label}</p>
                <div className='direction-indicator'>{listItem.toggled ? '-' : '+'}</div>
              </button>
              <div className='content-parent'>
                <div className='content'>
                  {listItem.toggled && (
                    <div>
                      {listItem.campi.map((campo, index) => (
                        <div key={campo.id}>
                          <input
                            type="checkbox"
                            id={`${campo}-${index}`}
                            name={campo}
                            value={campo}
                            checked={listItem.checkedItems[index]}
                            onChange={() => handleCheckboxChange(listItem.id, index)}
                            className="custom-checkbox"
                          />
                          <label htmlFor={`${campo}-${index}`} className="custom-checkbox-label">
                            <span>{campo}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='pattern-form-container'>
        <CompilaPattern filtri={filtri} singlePattern={singlePattern} stato={stato} />
      </div>
    </div>
  );
};

export default AccordionResponsabile;

AccordionResponsabile.propTypes = {
  items: PropTypes.array.isRequired,
  keepOthersOpen: PropTypes.bool.isRequired,
  singlePattern: PropTypes.object,
  stato: PropTypes.string.isRequired
}