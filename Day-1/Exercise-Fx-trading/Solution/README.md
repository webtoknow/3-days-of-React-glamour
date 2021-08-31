# Day 1 - Exercises - Solution

## Table of contents

- [Exercise 0 - Initial Setup](#exercise-0---initial-setup)
- [Exercise 1 - Pages, Routing and Navigation](#exercise-1---pages-routing-and-navigation)
  - [Create pages](#create-pages)
  - [Add routes using React Router](#add-routes-using-react-router)
- [Exercise 2 - Update favicon](#exercise-2---update-favicon)
- [Exercise 3 - Add global styles](#exercise-3---add-global-styles)
- [Exercise 4 - Add Fontawesome](#exercise-4---add-fontawesome)
- [Exercise 5 - Add Bootstrap](#exercise-5---add-bootstrap)
- [Exercise 6 - Add Date package](#exercise-6---add-date-package)
- [Exercise 7 - Add Axios](#exercise-7---add-axios)
- [Exercise 8 - Add Alerts package](#exercise-8---add-alerts-package)
- [Exercise 9 - Create blotter-view, fx-rates-view and widget components](#exercise-9---create-blotter-view-fx-rates-view-and-widget-components)

## Exercise 0 - Initial Setup

- go to _Day-1\Exercise\Code_:

  ```bash
  cd 3-Days-of-React-glamour\Day-1\Exercise\Code
  ```

- let's generate a new React project using [Create React App](https://create-react-app.dev/) with Typescript:

  ```bash
  npx create-react-app fx-trading-app --template typescript
  ```

- start the project:

  ```bash
  cd fx-trading-app
  npm start
  ```

- you should be now able to see your our first React application on http://localhost:3000/

## Exercise 1 - Pages, Routing and Navigation

### Create pages

- go to _Day-1\Exercise\Code\fx-trading-app_:

  ```bash
  cd 3-Days-of-React-glamour\Day-1\Exercise\Code\fx-trading-app
  ```

- create a folder for our views in *fx-trading-app\src*:

  ```bash
  cd src
  mkdir pages
  cd pages
  ```

- create React component files for every page following the dashboard page exemple below:
  - dashboard-page.tsx
  - login-page.tsx
  - not-found-page.tsx
  - register-page.tsx

  ```javascript
  import React from 'react';

  function DashboardPage() {
    return <p>Dashboard page</p>;
  }

  export default DashboardPage;
  ```

### Add routes using [React Router](https://reacttraining.com/react-router/web/guides/quick-start)

- install react-router-dom and TS types

  ```bash
  npm install react-router-dom
  npm install @types/react-router-dom
  ```

- replace the old markup from _App.tsx_ with the router markup:

  ```javascript
  import React from 'react';
  import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

  import LoginPage from './pages/login-page';
  import RegisterPage from './pages/register-page';
  import DashboardPage from './pages/dashboard-page';
  import NotFoundPage from './pages/not-found-page';

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
  ```

- you should now be able to navigate through your application's URLs (*/dashboard*, */register*) and see the components linked with them

## Exercise 2 - Update favicon

- let's update favicon by first deleting logo files from _src_ and _public_ folders
- download [fav icon package](https://github.com//WebToLearn/3-days-of-React-glamour/raw/master/Design/fx-trading-favicon-package.zip) and unzip it, then copy and replace all files to _public_ folder
- replace the following code in the *head* section of _public/index.html_ file with:

  ```html
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="%PUBLIC_URL%/apple-touch-icon.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="32x32"
    href="%PUBLIC_URL%/favicon-32x32.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="%PUBLIC_URL%/favicon-16x16.png"
  />
  <link
    rel="mask-icon"
    href="%PUBLIC_URL%/safari-pinned-tab.svg"
    color="#5bbad5"
  />
  <meta name="msapplication-TileColor" content="#da532c" />
  <meta name="theme-color" content="#ffffff" />
  <meta name="description" content="Fx Trading application" />
  <title>Fx trading app</title>
  ```

## Exercise 3 - Add global styles

- add the following styles to _index.css_ file:

  ```css
  @import-normalize;

    html, body{
    height: 100%;
    color: #373A3C;
  }

  h1,h2,h3,h4,h5,h6 {
    color: #7C7C7C;
  }

  .btn-primary {
    background-color: #3496F0;
  }

  .btn-link {
    color: #3496F0;
  }
  .table-striped tbody tr:nth-of-type(odd) {
    background-color: #F2F2F2;
  }

  .flex {
    display: flex;
  }

  .flex-vertical-centered {
    display: flex;
    align-items: center;
  }

  .title {
    margin-bottom: 30px;
    padding-bottom: 20px;
  }

  .title-border {
    border-bottom: 1px solid #DDDDDD;
  }

  .screen-full-height {
    height: 100vh;
  }
  ```

## Exercise 4 - Add Fontawesome

- to import [Font Awesome](https://fontawesome.com) library, add this in *head* section of *index.html*:

  ```HTML
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
  ```

## Exercise 5 - Add Bootstrap

- add Bootstrap:

  ```bash
  npm install --save bootstrap
  ```

- import bootstrap CSS at the beginning of your _src/index.tsx_ file:

  ```javascript
  import 'bootstrap/dist/css/bootstrap.css';
  // Put any other imports below so that CSS from your components takes precedence over default styles.
  ```

## Exercise 6 - Add Date package

- install the following package for manipulating dates:

  ```bash
  npm install date-fns --save
  ```

## Exercise 7 - Add Axios

- install [Axios](https://github.com/axios/axios) for managing AJAX requests:

  ```bash
  npm install axios --save
  ```

## Exercise 8 - Add Alerts package

- install _CogoToast_ to see the alerts in a nice way:

  ```bash
  npm install --save cogo-toast
  ```

## Exercise 9 - Create blotter-view, fx-rates-view and widget components

- from design mockup, we can see that it can be divided in 2 big sections: **FX Rates View** and **Blotter View**. Also, the first one contains many widgets looking the same, so this can be also splitted into **Widget** components
- so, _dashboard-page_ component will use 3 smaller components which will need to be created:
  - _blotter-view_
  - _fx-rates-view_
  - _widget_

![Components](https://raw.githubusercontent.com/WebToLearn/3-days-of-React-glamour/master/Day-1/Theory/img/components.png)

- create _components_ folder:

  ```bash
  cd src
  mkdir components
  cd components
  ```

- create these 3 new React components, using the example below, as children of _components_ folder:
  - blotter-view.tsx
  - fx-rates-view.tsx
  - widget.tsx

  ```JavaScript
  import React, { Component } from 'react'

  interface Props {
  }
  interface State {
  }

  class BlotterView extends Component < Props, State > {
      state = {}

      render() {
          return (
              <div>
                  blotter view
              </div>
          )
      }
  }

  export default BlotterView
  ```

- in the design, we can see on the top of the dashboard a navbar, containing the logo and _Logout_ button
- next step is to include into _dashboard-page_ component the navbar, _blotter-view_ and _fx-rates-view_ and also use _bootstrap_ to place them
- so, in _dashboard-page.tsx_ we will have:

  ```HTML
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

        <main className="dashboard-container">
          <div className="row">
            <div className="col-sm">
              <FxRatesView></FxRatesView>
            </div>
            <div className="col-sm">
              <BlotterView></BlotterView>
            </div>
          </div>
        </main>
      </div>
    );
  }

  export default DashboardPage;
  ```

- create _styles_ folder into _Day-1\Exercise\Code\fx-trading-app\src_, so we can add some dashboard style:

  ```bash
  cd ..
  mkdir styles
  cd styles
  ```

- create _dashboard-page.css_ and add the following styles:

  ```CSS
  .dashboard-container {
      padding: 2rem 3rem;
  }

  .navbar {
      padding: 0.5rem 3rem;
      border: 1px solid #DDDDDD;
  }

  .fx-main-logo {
      width: 70px;
      height: 50px;
  }

  .btn-logout {
      border: 1px solid #dddddd;
      color: #7c7c7c;
  }

  .btn-logout:hover {
      background-color: #F2F2F2;
      opacity: 0.8;
  }
  ```
  