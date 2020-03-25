import React from 'react';
import '../styles/not-found-page.css';

function NotFoundPage() {
  return (
    <div>
      <div className="screen-full-height fx-not-found-container">
        <img className="fx-not-found-logo" alt="fx-not-found-logo" src="./img/error_404.png" />
        <div className="fx-not-found-text">Sorry, the page you are looking for does not exist.</div>
      </div>
    </div>
  );
}

export default NotFoundPage;
