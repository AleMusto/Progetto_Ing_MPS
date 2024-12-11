import React, { useEffect, useState } from 'react';
import './Accordion.css';
import PatternList from '../View/PatternList';
import { getPatterns } from '../Model/Query';
import { PropTypes } from 'prop-types';

const Accordion = ({ items, keepOthersOpen }) => {
  const [accordionItems, setAccordionItems] = useState(null);
  const [filtri, setFiltri] = useState([]);

  useEffect(() => {
    if (items) {
      setAccordionItems(items.map(item => ({
        ...item,
        toggled: false,
        checkedItems: new Array(item.campi.length).fill(false) // Inizializza lo stato delle checkbox
      })));
    }
  }, [items]);

  const handleAccordionToggle = (clickedItem) => {
    setAccordionItems(accordionItems.map((item) => {
      let toggled = item.toggled;

      if (clickedItem.id === item.id) {
        toggled = !item.toggled;
      } else if (!keepOthersOpen) {
        toggled = false;
      }

      return {
        ...item,
        toggled
      };
    }));
  };

  const handleCheckboxChange = (itemId, index) => {
    setAccordionItems(accordionItems.map((item) => {
      if (item.id === itemId) {
        const checkedItems = [...item.checkedItems];
        checkedItems[index] = !checkedItems[index];

        // Aggiorna i filtri
        const updatedFiltri = filtri.filter(filtro => filtro.label !== item.label);
        const selectedFields = checkedItems.reduce((acc, isChecked, i) => {
          if (isChecked) {
            acc.push(item.campi[i]);
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
    }));
  };

  return (
    <div className='container'>
      <div className='side-menu'>
        Filtra i pattern per le tue esigenze
        <div className='accordion-parent'>
          {accordionItems?.map((listItem, key) => (
            <div className={`accordion ${listItem.toggled ? 'toggled' : ''}`} key={key}>
              <button className='toggle' onClick={() => handleAccordionToggle(listItem)}>
                <p>{listItem.label}</p>
                <div className='direction-indicator'>{listItem.toggled ? '-' : '+'}</div>
              </button>
              <div className='content-parent'>
                <div className='content'>
                  {listItem.toggled && (
                    <div>
                      {listItem.campi.map((campo, index) => (
                        <div key={index}>
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
      <div>
        <PatternList filtri={filtri} query={getPatterns} user={null} />
      </div>
    </div>
  );
};

export default Accordion;

Accordion.propTypes = {
  items: PropTypes.array.isRequired,
  keepOthersOpen: PropTypes.bool.isRequired
}