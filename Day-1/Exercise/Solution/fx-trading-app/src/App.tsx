import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import DashboardPage from './pages/dashboard-page';
import NotFoundPage from './pages/not-found-page';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
