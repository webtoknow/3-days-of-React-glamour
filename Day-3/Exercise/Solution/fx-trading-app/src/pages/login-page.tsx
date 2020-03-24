import React from 'react';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import cogoToast from 'cogo-toast';
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

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
 
      axios.post(backendUrl.authService.authenticate, user)
        .then((response : AxiosResponse) => {
          const data: LoginResponse  =  response.data;
          // Login successful if there's a jwt token in the response
          if (data && data.token) {
            // Store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(response));
            cogoToast.success("Login successful!", { position: 'top-right' });
           
            // Add a request interceptor
            axios.interceptors.request.use(
              (config: AxiosRequestConfig) => {
                // Add token before request is sent
                config.headers["Authorization"] = `Bearer ${data.token}`;
                return config;
              },
              error => {
                Promise.reject(error);
              }
            );

            // Add a response interceptor
            axios.interceptors.response.use(
              (response: AxiosResponse) => {
                // If there is a 401 Unauthorized response the user is automatically logged out of the application.
                if (response.status === 401) {
                  localStorage.removeItem('currentUser');
                  history.push('/');
              }
                return response;
              },
              error => {
                Promise.reject(error);
              }
            );
          
            history.push('/dashboard');
          }
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 401) {
            cogoToast.error(error.response.data.message, { position: 'top-right' });
          } else {
            cogoToast.error(error.message, { position: 'top-right' });
          }
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
