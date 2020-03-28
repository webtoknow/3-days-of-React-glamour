# Day 1 - Theory

## Table of contents

- [Introduction and Architecture](#introduction-and-architecture)
- [Why and how to split UI into components](#why-and-how-to-split-UI-into-components)
- [JSX](#jsx)
- [Virtual DOM](#virtual-dom)
- [Rendering Elements](#rendering-elements)
- [Handling Events](#handling-events)
- [Manipulating Dates](#manipulating-dates)
- [Routes and Navigation](#routes-and-navigation)

## Introduction and Architecture

- [React](https://reactjs.org/) is a JavaScript library for building interfaces
- the components manage their own state
- all components take input data and return what to display
- we can easily write our code in the component using [JSX](https://reactjs.org/docs/introducing-jsx.html), an XML-like syntax extension for JavaScript
- [TypeScript](https://www.typescriptlang.org/) is a statically compiled language to write clear and simple JavaScript code
- TypeScript is converted into plain JavaScript code
- the main benefits of using TypeScript are:
  - instant type error detection
  - better IDE experience
  - more readable code
- TypeScript can be used with JSX: [TypeScript for JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
- here we have an example with a very simple React component:

    ```JavaScript
    class Hello extends React.Component {
        render() {
            return (
                <div>Hello {this.props.name}</div>
            );
        }
    }

    ReactDOM.render(
        <Hello name="World" />,
        document.getElementById('our-first-example');
    )
    ```

## Why and how to split UI into components

- there is no rule saying that it is forbidden to have only one component in our application, but:
  - performance will be affected because every state change will re-render the entire application
  - code reusability will not be easy
  - state will be a huge object and it will be a real challenge to follow the impact of event handlers
  - working in a team will be terrible because of the code-conflicts
- to avoid these and many other problems, we should split our UI into many components
- we will know when to start splitting because we will experience at least one of the enumerated issues above
- we should be also careful because every split (and abstraction) of our code comes with a cost: it can not be easy to merge them into one functional piece
- basically, we should break up our components into smaller ones, but not until facing some real problems with our growing component
- here we have an example about how we splitted our FX-Trading dashboard into components:

![Components](img/components.png "Components")

## JSX

- basically, JSX is a language that composes the HTML with the React elements:

    ```JavaScript
    function Hello() {
        const helloWorld = <h1>Hello, World!</h1>;
    }
    ```

- behind the scenes, each element rendered by *Hello* is transpiled into a *React.createElement* call:

    ```JavaScript
    function Hello() {
        return React.createElement("h1", {}, "Hello, World!");
    }
    ```

- when React creates elements, it calls *React.createElement*, which takes three arguments:
  - the element name
  - an object representing the element's props
  - an array of the element's children
- React interprets lowercase elements as HTML and camelCase elements as custom components
- our components can render children - JSX make it easy for us to create tree-like structures:

    ```JavaScript
    function Header() {
        return (<header> <Nav /> <ProfilePicture/> </header>)
    }
    ```

- components need to pass data to the children to be rendered properly - these are called *props*
- through JSX, we can pass props in a number of ways:
  - defaulted to true:

    ```JavaScript
    <User loggedIn />
    ```

  - string literals:

    ```JavaScript
    <User name="John Smith" />
    ```

  - JavaScript expressions:

    ```JavaScript
    <User age={2+3+20} />
    ```

  - spread attributes:

    ```JavaScript
    <User settings={...this.state} />
    ```

- we cannot pass *if statements* or *for loops* as props

## Virtual DOM

- virtual DOM was created to improve the performance when updating the DOM elements
- basically, virtual DOM can be manipulated and updated, without using DOM APIs
- once all updates have been made to the virtual DOM, we can apply the changes to the original DOM in an optimised way
- for this purpose, we should use a library such as *ReactDOM*
- the process is called *reconciliation*
- through this process, React makes sure the DOM matches the state of your current UI view

## Rendering Elements

- an element is the smallest block of a React application:

    ```JavaScript
    const element = <h1>Hello, everybody!</h1>;
    ```

- it is just a plain JavaScript object without own methods
- an element has four properties:
  - *type*: a String representing a HTML tag or a refference to a React Component
  - *key*: a String which uniquely identifies an element
  - *ref*: a refference to access either the underlying DOM node or React Component Instance
  - *props*: a properties Object
- React components are made up of elements
- ReactDOM renders the elements through *render* method:

    ```JavaScript
    import React from 'react';
    import ReactDOM from 'react-dom';

    function getCurrentTime() {
    const currentTime = (
        <div>
            <h1>Welcome !</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(currentTime, document.getElementById('root'));
    }

    setInterval(getCurrentTime, 1000);
    ```

- React elements are *immutable* - once we create an element, we can't change its children or attributes
- the only method to update the UI is to create a new element and pass it to *ReactDOM.render* method
- ReactDOM only applies the DOM updates necessary to bring the DOM to the desired state

## Handling Events

- similar to handling events on DOM elements
- the naming of React events should be camelCase
- the event handler in JSX is a function, not a string as in HTML
- for example, in HTML we have:

    ```HTML
    <button onclick="sayHello()">Hello there!</button>
    ```

    but in React:

    ```HTML
    <button onClick={this.sayHello}>Hello there!</button>
    ```

- methods are not bound to class by default, so we should declare and bind them in constructor:

    ```JavaScript
    import React, { Component } from 'react';

    class Hello extends React.Component {
        constructor() {
            // we will talk about super() later
            super();
            // method binding
            this.sayHello = this.sayHello.bind(this);
        }

        sayHello() {
            alert("Hello!")
        }
    }
    ```

- instead of binding all methods in the constructor, an alternative is to use arrow functions:

    ```JavaScript
    import React, { Component } from 'react';

    class Hello extends React.Component {
        sayHello = () => {
            alert("Hello!")
        }
    }
    ```

- if we want to pass argument(s) to an event handler, we can write an inline arrow function:

    ```HTML
    <!-- e is the React event and id is the identifier for the row we want to update -->
    <button onClick={(e) => {this.updateRow(id,e)}>Update Row</button>
    ```

    or bind all the arguments to the function:

    ```HTML
    <!-- e,the React event, is passed implicitly so we should not provide it -->
    <button onClick={this.updateRow.bind(this,id)}>Update Row</button>
    ```

## Manipulating Dates

- in JavaScript, handling dates and timezones can be a really challenging task
- that is how date libraries appeared
- they simplify date parsing, arithmetic and logical operations, date formatting
- *date-fns* is one of these libraries which helps us a lot with manipulating the dates
- we have to install it via npm:

    ```bash
    npm install date-fns
    ```

- here we can see some examples of can we can use this library:

    ```JavaScript
    import { format, compareAsc, formatDistance, subDays } from 'date-fns'

    format(new Date(2014, 1, 11), 'dd/??/yyyy')
    //=> '11/02/2014'

    const dates = [new Date(1995, 6, 2), new Date(1987, 1, 11), new Date(1989, 6, 10)]
    dates.sort(compareAsc)
    //=> [
    //   Wed Feb 11 1987 00:00:00,
    //   Mon Jul 10 1989 00:00:00,
    //   Sun Jul 02 1995 00:00:00
    // ]

    formatDistance(subDays(new Date(), 3), new Date())
    //=> "3 days ago"
    ```

> **Note**
>
> You can find more documentation on [Date Fns official website](https://date-fns.org/).

## Routes and Navigation

- React does not have a native routing mechanism
- in order to enable routing and navigation, we should import a library
- there are many alternatives, but the most used one is *react-router-dom*
- when we decided to route our application, we need to import two components from *react-router-dom*, *Switch* and *Route*, and then map the path with the component we want to access when navigating to that route:

    ```JavaScript
    import React from 'react';
    import {
    BrowserRouter as Router,
    Switch,
    Route,
    } from 'react-router-dom';

    import DashboardPage from './pages/dashboard-page';
    import NotFoundPage from './pages/not-found-page';

    function App() {
        return (
            <Router>
                <Switch>
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
