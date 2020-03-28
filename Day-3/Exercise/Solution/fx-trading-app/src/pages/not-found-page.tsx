import React from 'react';
import  { useHistory } from 'react-router-dom';
import '../styles/not-found-page.css';

function NotFoundPage() {
  const history = useHistory();
  const goToLogin = () => {
    history.push('/');
  }

  return (
    <div>
      <div className="screen-full-height fx-not-found-container">
        <img className="fx-not-found-logo" alt="fx-not-found-logo" src="./img/error_404.png" />
        <div className="fx-not-found-text">Sorry, the page you are looking for does not exist.</div>
        <button className="btn btn-primary btn-block fx-not-found-go-login" onClick={goToLogin}>Go to Login</button>
      </div>
    </div>
  );
}

export default NotFoundPage;
