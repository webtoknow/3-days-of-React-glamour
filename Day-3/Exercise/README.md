# Day 3 - Exercises

## Table of contents

- [Exercise 0 - Configuration](#exercise-0---configuration)
  - [Download all npm dependencies](#download-all-npm-dependencies)
  - [Configure Mock Server](#configure-mock-server)
- [Exercise 1 - Register page](#exercise-1---register-page)
  - [User model](#user-model)
  - [Install Formik](#install-formik)
  - [Register component](#register-component)
- [Exercise 2 - Login page](#exercise-2---login-page)
  - [Login component](#login-component)

## Exercise 0 - Configuration

### Download all npm dependencies

- go to *Day-3\Exercise\Code\fx-trading-app*:

```bash
cd 3-day-of-React-glamour\Day-3\Exercise\Code\fx-trading-app
```

- run *npm install* to download all dependencies:

```bash
npm install
```

### Configure Mock Server

- used to create a fake API to mock the backend data and is using [JSON Server](https://github.com/typicode/json-server)
- we will be able to start all microservices in the same time
- let's install its packages:

```bash
cd 3-day-of-React-glamour\Day-3\Exercise\Code\fx-trading-app\mock-server
npm install
```

- start all microservices in a single terminal:

```bash
npm start
```

- now we can access these APIs:
  - `/user/authenticate` - sign-in
  - `/user/register` - register
  - `/transactions` - get all transactions
  - `/currencies` - get all currencies
  - `/fx-rate` - get fx rates for specific currencies

## Exercise 1 - Register page

### User model

- by taking a look at the register page's design, we can identify the required fields for user entity:
  - id
  - username
  - email
  - password
  - confirmPassword
- create a new file *user.tsx* into *fx-trading-app\src\models* containing the fields above:

```JavaScript
export interface User {
    id?: number;
    username: string;
    email?: string
    password: string;
    confirmPassword?: string;
}
```

### Install Formik

- let's buid forms in React, without the tears by using [Formik](https://jaredpalmer.com/formik) and [Yup](https://github.com/jquense/yup):

```javascript
npm install formik --save
```

```javascript
npm install -S yup
npm install -S @types/yup
```

### Register component

```javascript
import React from 'react';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import cogoToast from 'cogo-toast';

import { User } from './../models/user';
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
        .catch((error) => {
          cogoToast.error(error, { position: 'top-right' });
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
```

- we can notice here:
  - we used formik to manage our form by adding:
    - `initialValues`
    - `onSubmit` function so we can fetch the server
    - yup `validationSchema`

  ```javascript
  const formik = useFormik({
    initialValues,
    onSubmit: (values: User) => {
    // fetch the user to backend server
    },
    validationSchema: validationSchema
  });
  ```

  ```javascript
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
  ```

  - in onSubmit function we send the user entity to be saved on backend. If the request is successful, We display a message and redirect the user to login page, but if it is not, we just display ond appropriate message.
  - we also have a link to Login Page:

  ```html
  <div className="text-container">
    <span>Already have an account?&nbsp;</span>
    <Link className="btn btn-link" to="/">Login</Link>
  </div>
  ```

- don't forget to create _register-page.css_ and add the following styles:

```css
.container-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-logo-container {
    background-color: rgb(141,213,170);
}

.fx-grayscale-logo {
    width: 350px;
    height: 350px;
}

.content {
    width: 350px;
}

.col {
    padding: 0;
}

.flex {
    display: flex;
}

.invalid-feedback {
    font-weight: bold;
    display: block;
}

.btn-link {
    padding: 0;
}

.text-container {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
```

## Exercise 2 - Login page

## Login component

```javascript
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
```

```CSS
.container-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-logo-container {
    background-color: rgb(141,213,170);
}

.fx-grayscale-logo {
    width: 350px;
    height: 350px;
}

.content {
    width: 350px;
}

.icon {
    font-size: 24px;
    color: #dddddd;
    margin-right: 15px;
    line-height: 31px;
}

.col {
    padding: 0;
}

.invalid-feedback {
    font-weight: bold;
}

.btn-link {
    padding: 0;
}

.text-container {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
```
