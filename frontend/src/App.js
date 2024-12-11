import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// page & layout imports
import Homepage from './pages/Homepage'
import DettagliPattern from './pages/DettagliPattern'
import ViewAmministratore from './pages/ViewAmministratore'
import ViewResponsabile from './pages/ViewResponsabile'
import SiteHeader from './components/SiteHeader'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Logout from './pages/Logout'
import { Protector } from './helpers'
import ArticoliGDPR from './View/ArticoliGDPR'
import RegistraResponsabile from './pages/RegistraResponsabile'
import EliminaResponsabile from './pages/EliminaResponsabile'
import ModifichePKB from './pages/ModifichePKB'
import DettagliModifica from './pages/DettagliModifica'
import AggiungiElemento from './pages/AggiungiElemento'
import EliminaElemento from './pages/EliminaElemento'
import ModificaElemento from './pages/ModificaElemento'
import DettagliElemento from './pages/DettagliElemento'

//apollo client
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})

function App() {
  
  return (
    <ApolloProvider client={client}>
      <SiteHeader />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/dettagli/:id" element={<DettagliPattern />} />
          <Route path="/amministratore/*" element={<Protector Component={ViewAmministratore} />} />
          <Route path="/amministratore/registra-responsabile" element={<RegistraResponsabile />} />
          <Route path="/amministratore/elimina-responsabile" element={<EliminaResponsabile />} />
          <Route path="/amministratore/modifiche-pkb" element={<ModifichePKB />} />
          <Route path="/amministratore/modifiche-pkb/dettagli/:id" element={<DettagliModifica />} />
          <Route path="/responsabile/*" element={<Protector Component={ViewResponsabile} />} />
          <Route path="/responsabile/aggiungi-elemento" element={<AggiungiElemento />} />
          <Route path="/responsabile/elimina-elemento" element={<EliminaElemento />} />
          <Route path="/responsabile/modifica-elemento" element={<ModificaElemento />} />
          <Route reloadDocument path="/responsabile/modifica-elemento/dettagli/:id" element={<DettagliElemento />} />
          <Route path="/articoli-gdpr" element={<ArticoliGDPR />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
