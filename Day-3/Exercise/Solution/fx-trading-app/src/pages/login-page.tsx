import React from 'react';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import cogoToast from 'cogo-toast';

import { backendUrl } from '../constants';
import '../styles/login-page.css';
import { LoginResponse } from '../models/user';

function LoginPage() {
  const history = useHistory();

  const initialValues = {
    username: '',
    password: '',
  }

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .label('Username')
      .required(),
    password: yup
      .string()
      .label('Password')
      .required()
      .min(6, 'Password must be at least 6 characters!')
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (user) => {
 
      fetch(backendUrl.authService.authenticate,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      )
        .then(response => response.json())
        .then((response : LoginResponse) => {
          // login successful if there's a jwt token in the response
          if (response && response.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(response));
            cogoToast.success("Login successful!", { position: 'top-right' });
            // add interceptor
          
            history.push('/dashboard');
          }

          if (response.message) {
            cogoToast.error(response.message, { position: 'top-right' });
          }
        })
        .catch((error: string) => {
          cogoToast.error(error, { position: 'top-right' });
        });

    },
    validationSchema: validationSchema
  });

  return (
    <div className="container-fluid">
      <div className="row screen-full-height">
        <div className="col-md-6 login-logo-container container-center">
          <img className="fx-grayscale-logo" alt="fx-grayscale-logo" src="./img/logo-grayscale.svg" />
        </div>
        <div className="col-md-6">
          <div className="container-center screen-full-height">
            <div className="content">
              <div className="title title-border">
                <h4>Login to your account</h4>
              </div>
              <form id="login" onSubmit={formik.handleSubmit}>
                <div className="form-group flex">
                  <i className="fa fa-user icon" aria-hidden="true"></i>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="username"
                      id="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    <p className="invalid-feedback">
                      {formik.touched['username'] && formik.errors['username']}
                    </p>
                  </div>
                </div>
                <div className="form-group flex">
                  <i className="fa fa-lock icon" aria-hidden="true"></i>
                  <div className="col">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="password"
                      id="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <p className="invalid-feedback">
                      {formik.touched['password'] && formik.errors['password']}
                    </p>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <div className="text-container">
                  <span>You don't have an account?&nbsp;</span>
                  <Link className="btn btn-link" to="/register">Register</Link>
                </div >
              </form >
            </div >
          </div >
        </div >
      </div >
    </div>

  );
}

export default LoginPage;
