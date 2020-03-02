# Day 2 - Exercises

## Table of contents

## Exercise 0 - Configuration

- [Exercise 0 - Configuration](#exercise-0---configuration)
  - [Download all npm dependencies](#download-all-npm-dependencies)
  - [Install and use JSON Server](#install-and-use-json-server)
- [Exercise 1 - Create blotter-view, fx-rates-view and widget components](#exercise-1---create-blotter-view-fx-rates-view-and-widget-components)

### Download all npm dependencies

- go to *Day-2\Exercise\Code\fx-trading-app*:

```bash
cd 3-Days-of-React-glamour\Day-2\Exercise\Code\fx-trading-app
```

- run *npm install* to download all dependencies:

```bash
npm install
```

### Install and use JSON Server

- because we do not have a backend server and a link to a real database at this moment, we will simulate having some data using *JSON Server*
- the first step is to install it (globally), using the following command:

```bash
npm install json-server -g
```

- next, we have to start it with the 2 existing files - containing *quote* and *trade* data
- make sure you are in the following path, where both JSON files are situated: *Day-2/Exercise/Code/fx-trading-app*
- run these commands in separate terminal windows:

```bash
json-server --watch db.trade.json --port 8210
json-server --watch db.quote.json --port 8220
```

## Exercise 1 - Create blotter-view, fx-rates-view and widget components

- from design mockup, we can see that it can be divided in 2 big sections: **FX Rates View** and **Blotter View**. Also, the first one contains many widgets looking the same, so this can be also splitted into **Widget** components
- so, *dashboard-page* component will use 3 smaller components which will need to be created:
  - *blotter-view*
  - *fx-rates-view*
  - *widget*

![Components](https://raw.githubusercontent.com/WebToLearn/3-day-of-React-glamour/master/Design/img/components.png "Components")

- create *components* folder:

```bash
cd src
mkdir components
cd components
```

- create these 3 new React components, using the example below, as children of *components* folder:
  - blotter-view.tsx
  - fx-rates-view.tsx
  - widget.tsx

```JavScript
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

- in the design, we can see on the top of the dashboard a navbar, containing the logo and *Logout* button
- next step is to include into *dashboard-page* component the navbar, *blotter-view* and *fx-rates-view* and also use *bootstrap* to place them
- so, in *dashboard-page.ts* we will have:

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

- create *styles* folder so we can add dashboard styles:

```bash
cd ..
mkdir styles
cd styles
```

- create *dashboard-page.css* and add the following styles:

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
