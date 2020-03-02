import React from 'react';
import FxRatesView from '../components/fx-rates-view';
import BlotterView from '../components/blotter-view';
import '../styles/dashboard-page.css';

function DashboardPage() {
  return (
    <div>
      <header>
        <nav className="navbar">
          <img className="fx-main-logo" alt="fx-main-logo" src="./img/logo-main.svg" />
          <button className="btn btn-logout">Log out</button>
        </nav>
      </header>

      <div className="dashboard-container">
        <div className="row">
          <div className="col-sm">
            <FxRatesView></FxRatesView>
          </div>
          <div className="col-sm">
            <BlotterView></BlotterView>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
