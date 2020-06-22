import React, { useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppBar from './components/shared/AppBar'
import Login from './components/auth/Login';
import HomePage from './components/home/HomePage'
import AlumnoPage from './components/alumno/AlumnoPage'
import AgentePage from './components/agente/AgentePage'
import UserPage from './components/user/UserPage'
import ETSPage from './components/ets/ETSPage'
import ETS2Page from './components/ets2/ETSPage'
import TramiteFase1Page from './components/tramiteFase1/TramiteFase1Page'
import TramitePage from './components/tramite/TramitePage'

function App() {
  const [auth, setAuth] = React.useState(true);

  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, [])

  return (
    <Router>
      <AppBar auth={auth} setAuth={setAuth} />
      <Switch>
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/alumnos' component={AlumnoPage} />
        <Route exact path='/agentes' component={AgentePage} />
        <Route exact path='/users' component={UserPage} />
        <Route exact path='/ets' component={ETSPage} />
        <Route exact path='/ets2' component={ETS2Page} />
        <Route exact path='/tramiteFase1' component={TramiteFase1Page} />
        <Route exact path='/tramite' component={TramitePage} />
      </Switch>
    </Router>
  );
}

export default App;
