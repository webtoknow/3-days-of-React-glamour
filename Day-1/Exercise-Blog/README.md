# Day 1 - Exercises

## Table of contents

- [General indications](#general-indications)
- [Exercise 0 - Development setup](#exercise-0---development-setup)
- [Exercise 1 - Initial Setup](#exercise-1---initial-setup)
- [Exercise 2 - Pages, Routing and Navigation](#exercise-2---pages-routing-and-navigation)
  - [Create pages](#create-pages)
  - [Add routes using React Router](#add-routes-using-react-router)
- [Exercise 3 - Add Axios](#exercise-7---add-axios)
- [Exercise 4 - Add global styles](#exercise-3---add-global-styles)
- [Exercise 5 - Add Google Fonts](#exercise-4---add-fontawesome)
- [Exercise 6 - Create Header componet](#exercise-6---create-header-component)
- [Exercise 7 - Display articles](#exercise-6---display-articles)
- [Exercise 8 - Create Footer componet](#exercise-6---display-articles)

## General indications

🔥 This rocket 🚀 will be followed by the statement of the exercise.

🔥 To help you to code without too many tears, 🎁 means that we are providing some hints to you.

🔥 You can find the exercises solutions for this day at _Day-1\Exercise-Blog\Solution_. Please check the solutions after you finish the exercises to compare your code.

## Exercise 0 - Development setup

### Clone repo

Use the terminal to clone the repo `https://github.com/WebToLearn/3-days-of-React-glamour.git`

```bash
git clone https://github.com/WebToLearn/3-days-of-React-glamour.git
```

### Start location

The working folder for this day will be _Day-1\Exercise-Blog\Code_, go to it using terminal.

```bash
cd 3-days-of-React-glamour\Day-1\Exercise-Blog\Code
```

### Start backend server

Open a new terminal in the same location _Day-1\Exercise-Blog\Code_, and start the JSON server:

```bash
json-server --watch db.json -p 3000
```

If the command is not recognized as an internal command, open another terminal and install JSON server:

```bash
npm install -g json-server
```

## Exercise 1 - Initial Setup

🚀 Let's do the first step to build our first React application. We should start generating a new project, named `blog`, with React and Typescript.

  🎁 One very easy method is to use [Create React App](https://create-react-app.dev/).

  🎁 After generating the project, you should start it. *npm start* will do the job.

## Exercise 2 - Pages, Routing and Navigation

### Create pages

🚀 Our application will have two pages. Can you identify these ones based on the design? Let's create them as dummy React components.

  🎁 A very important thing when you write code is to be organized. So put these newly-created components (home and details) into a new folder named *pages* under *blog\src*.

  🎁 You can create the components as functions returning one simple message. Do not forget to export them to be available for import and use.

### Add routes using React Router

🚀 You should also can navigate through the pages you just created. So let's create now the navigation part.

  🎁 [React Router](https://reacttraining.com/react-router/web/guides/quick-start) should help you a lot with this exercise.

  🎁 After the instalation part, use the Router components to link your pages with appropriate URLs. This should be done in the root component: *App.tsx*.

## Exercise 3 - Add Axios

🚀 Our Front-End will request data from Back-End server. Let's install [Axios](https://github.com/axios/axios) to do it.

  🎁 Install *axios* via *npm*.

## Exercise 4 - Add global styles

🚀 Even if our application has many pages, they should seem to be from the same story. This means that a global style file should be filled in with some CSS. Does your styles makes the app look the same as in the design mockups?

  🎁 The global style file is *index.css*.

  🎁 The browsers can display the elements differently. To have the same standard, we need to import *normalize.css* file.

  🎁 You should define the style for some common tags and classes like _h1_..._h6_, _.btn-primary_ and so on:
  
```css
  @import-normalize;
```
