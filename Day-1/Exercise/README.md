# Day 1 - Exercises

## Table of contents

- [Exercise 0 - Initial Setup](#exercise-0---initial-setup)
- [Exercise 1 - Pages, Routing and Navigation](#exercise-1---pages-routing-and-navigation)
  - [Create pages](#create-pages)
  - [Add routes using React Router](#add-routes-using-react-router)
- [Exercise 2 - Update favicon](#exercise-2---update-favicon)
- [Exercise 3 - Add font awesome](#exercise-3---add-font-awesome)
- [Exercise 4 - Add boostrap and styles](#exercise-4---add-boostrap-and-styles)
- [Exercise 5 - Add boostrap components](#exercise-5---add-boostrap-components)

## Exercise 0 - Initial Setup

- go to *Day-1\Exercise\Code*:

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

- go to *Day-1\Exercise\Code\fx-trading-app*:

```bash
cd 3-Days-of-React-glamour\Day-1\Exercise\Code\fx-trading-app
```

- install *CogoToast* to see the alerts in a nice way:

```bash
npm install --save cogo-toast
```

- create a folder for our views in *fx-trading-app\src\*:

```bash
cd src
mkdir pages
cd pages
```

- create react component files for every page folowing the dashboard page exemple below:
  - dashboard-page.tsx
  - login-page.tsx
  - not-found-page.tsx
  - register-page.tsx

```javascript
import React from 'react';

function DashboardPage() {
  return (
    <p>Dashboard page</p>
  );
}

export default DashboardPage;
```

### Add routes using [React Router](https://reacttraining.com/react-router/web/guides/quick-start)

- install react-router-dom and TS types

```bash
npm install react-router-dom
npm install @types/react-router-dom
```

- remove the old markup from *App.tsx* and replace it with router markup:

```javascript
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

## Exercise 2 - Update favicon

- Let's update favicon by deleting logo files from *src* and *public* folders
- Download [fav icon package](https://github.com//WebToLearn/3-day-of-React-glamour/raw/master/Design/fx-trading-favicon-package.zip) and copy and replace all files to *public* folder
- Insert the following code in the <head> section of *public/index.html* and replace react create app tags:

```html
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png">
    <link rel="mask-icon" href="%PUBLIC_URL%/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <meta
      name="description"
      content="Fx Trading application"
    />
    <title>Fx trading app</title>
```

## Exercise 3 - Add font awesome

- also in <head> we need to add [Font Awesome](https://fontawesome.com/v4.7.0/) library

```HTML
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
```

## Exercise 4 - Add boostrap and styles

- Add boostrap

```bash
npm install --save bootstrap
```

- import Bootstrap CSS in the beginning of your *src/index.js* file:

```javascript
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
```

- clear and add reset style into *src/index.css*:

```css
@import-normalize;
```

## Exercise 5 - Add boostrap components

- install boostrap component packages:

```bash
npm install react-bootstrap --save
npm install react-datepicker --save
```
