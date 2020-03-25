# Day 3 - Theory

## Table of contents

- [Function Composition](#function-composition)
- [Formik](#formik)
- [Yup](#yup)

## Function Composition

- it is a mechanism to build complex functions by combining multiple simpler functions
- basically, it takes the return value from one function and pass it as an argument for another function
- here we have a JavaScript example:

  ```JavaScript
  function square(x) {
      return x*x;
  }

  function double(x) {
      return x*2;
  }

  function compose(fn1, fn2) {
      return function(input) {
          return fn1(fn2(input))
      }
  };

  compose(square,double)(x);
  ```

- the way React components are designed makes it easy to compose them
- a React component can control how another component is rendered by providing props to it and control whether it is rendered:

    ```JavaScript
    function PrivateRoute({ children, ...rest}) {
      return (
        <Route
          {...rest}
          render={() =>
            isLoggedIn ?
            (children) :
            (<p>Not logged in!</p>)
          }
        />
      );
    }

    function App() {
      return (
        <Router>
            <PrivateRoute path="/dashboard">
              <DashboardPage />
            </PrivateRoute>
        </Router>
      );
    }
    ```

## Formik

- it is a library that helps us with forms
- more precisely, it takes care of:
  - getting values in and out of form state
  - validation and error messages
  - handling form submission
- it is compatible with React v15+ and works with ReactDOM
- formik can be installed via npm:

  ```bash
  npm install formik
  ```

- an alternative for formik is *Redux-Form*, but it is bigger and has an unnecessary complexity (like keeping the forms values in a global state, even if they should be only used locally in our component)
- below we can see an example of how we can use formik with no validations, as they will be implemented with another library:

  ```JavaScript
  import React from 'react';
  import { useFormik } from 'formik';

  const LoginForm = () => {
    // We have to initialize ALL of fields with values.
    const formik = useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      onSubmit: values => {
        alert(values);
      }
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={formik.values.email}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="text"
          value={formik.values.password}
        />
        <button type="submit">Submit</button>
      </form>
    );
  };
  ```

> **Note**
>
> You can find more documentation on [Formik official website](https://jaredpalmer.com/formik/docs/overview).

## Yup

- makes our form validations easier to do and read
- yup can be installed via npm:

  ```bash
  npm install yup
  ```

- to use it, we need to create an object that resembles our schema and then use Yup functions to validate if our data objects match this schema
- after that, we should pass the validation schema to formik in order to check and link it with our form:

  ```JavaScript
    const localValidationSchema = yup.object().shape({
      username: yup
        .string()
        .label('Email')
        .required(),
      password: yup
        .string()
        .label('Password')
        .required()
        .min(6, 'Password must be at least 6 characters!')
    });

    const formik = useFormik({
      initialValues,
      onSubmit: values => {
        // submit our values
      },
      validationSchema: localValidationSchema
  ```

> **Note**
>
> You can find more on [Yup GitHub repository](https://github.com/jquense/yup).
