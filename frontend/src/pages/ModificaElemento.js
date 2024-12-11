import React from 'react'
import PatternList from '../View/PatternList'
import { getPatterns } from '../Model/Query'

export default function ModificaElemento() {
  return (
    <div>
      <PatternList filtri={null} query={getPatterns} user={"responsabile"} />
    </div>
  )
}
