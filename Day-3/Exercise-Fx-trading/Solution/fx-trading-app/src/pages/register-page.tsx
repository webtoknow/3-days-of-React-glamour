import React from 'react';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import cogoToast from 'cogo-toast';

import { User, AuthResponse } from './../models/user';
import { backendUrl } from '../constants';
import '../styles/register-page.css';

const RegisterPage = () => {
  const history = useHistory();

  const initialValues: User = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .label('Username')
      .required(),
    email: yup
      .string()
      .label('Email')
      .email()
      .required(),
    password: yup
      .string()
      .label('Password')
      .required()
      .min(6, 'Password must be at least 6 characters!'),
    confirmPassword: yup
      .string()
      .required()
      .label('Confirm password')
      .test('passwords-match', 'Passwords must match!', function (value) {
        return this.parent.password === value;
      })
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values: User) => {
      const { username, email, password } = values;
      const newUser = {
        username,
        email,
        password
      }

      fetch(backendUrl.authService.register,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        }
      )
        .then(response => response.json())
        .then(() => {
          cogoToast.success("Registration successful!", { position: 'top-right' });
          history.push('/');
        })
        .catch((error: AuthResponse) => {
          cogoToast.error(error.message, { position: 'top-right' });
        });

    },
    validationSchema: validationSchema
  });

  return (
    <div className="container-fluid">
      <div className="row screen-full-height">
        <div className="col-md-6 login-logo-container container-center">
          <img className="fx-grayscale-logo" alt="fx-logo" src="./img/logo-grayscale.svg" />
        </div>
        <div className="col-md-6">
          <div className="container-center screen-full-height">
            <div className="content">
              <div className="title title-border">
                <h4>Register a new account</h4>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group flex">
                  <div className="col">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="username"
                      placeholder="username"
                      name="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    <p className="invalid-feedback">
                      {formik.touched['username'] && formik.errors['username']}
                    </p>
                  </div>
                </div>
                <div className="form-group flex">
                  <div className="col">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="email"
                      placeholder="email address"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <p className="invalid-feedback">
                      {formik.touched['email'] && formik.errors['email']}
                    </p>
                  </div>
                </div>
                <div className="form-group flex">
                  <div className="col">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="password"
                      placeholder="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <div className="invalid-feedback">
                      <p className="invalid-feedback">
                        {formik.touched['password'] && formik.errors['password']}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="form-group flex">
                  <div className="col">
                    <label>Confirm password</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="confirmPassword"
                      placeholder="confirm password"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                    />
                    <p className="invalid-feedback">
                      {formik.touched['confirmPassword'] && formik.errors['confirmPassword']}
                    </p>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
                <div className="text-container">
                  <span>Already have an account?&nbsp;</span>
                  <Link className="btn btn-link" to="/">Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
