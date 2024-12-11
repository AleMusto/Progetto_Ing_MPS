import React from 'react';
import { links } from '../Model/LinkArticoliGDPR'

export default function ArticoliGDPR() {
  return (
    <div>
      {links?.map((linkItem, index) => (
        <h3 key={index}>
          <a className='link-articolo'
             target='_blank'
             rel='noreferrer'
             href={linkItem.link}>
            {linkItem.label}
          </a>
        </h3>
      ))}
    </div>
  );
}
