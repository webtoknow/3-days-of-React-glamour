# Day 1 - Exercises

## Table of contents

- [General indications](#general-indications)
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

## General indications

🔥 The working folder for this day will be _Day-1\Exercise\Code_.

🔥 You can find the exercises solutions for this day at _Day-1\Exercise\Solution_.

🔥 This rocket 🚀 will be followed by the statement of the exercise.

🔥 To help you to code without too many tears, 🎁 means that we are providing some hints to you.

## Exercise 0 - Initial Setup

🚀 Let's do the first step to build our first React application. We should start generating a new project with React and Typescript.

  🎁 One very easy method is to use [Create React App](https://create-react-app.dev/).

  🎁 After generating the project, you should start it. *npm start* will do the job.

## Exercise 1 - Pages, Routing and Navigation

### Create pages

🚀 Our application will have many pages. Can you identify these ones based on the design? Let's create them as dummy React components.

  🎁 A very important thing when you write code is to be organized. So put these newly-created components into a new folder named *pages* under *fx-trading-app\src*.

  🎁 You can create the components as functions returning one simple message. Do not forget to export them to be available for import and use.

### Add routes using React Router

🚀 You should also can navigate through the pages you just created. So let's create now the navigation part.

  🎁 [React Router](https://reacttraining.com/react-router/web/guides/quick-start) should help you a lot with this exercise.

  🎁 After the instalation part, use the Router components to link your pages with appropriate URLs. This should be done in the root component: *App.tsx*.

## Exercise 2 - Update favicon

🚀 It is nice to have a logo for each application. Ours already has one. Let's put it as favicon to help users easily identify our app.

  🎁 We already packed the logo files for you [here](https://github.com//WebToLearn/3-days-of-React-glamour/raw/master/Design/fx-trading-favicon-package.zip)

  🎁 After downloading and unzipping, put them in _public_ folder.

  🎁 Link these images with our application via *head* section from *index.html* file.

## Exercise 3 - Add global styles

🚀 Even if our application has many pages, they should seem to be from the same story. This means that a global style file should be filled in with some CSS. Does your styles makes the app look the same as in the design mockups?

  🎁 The global style file is *index.css*.

  🎁 The browsers can display the elements differently. To have the same standard, we need to import *normalize.css* file.

  🎁 You should define the style for some common tags and classes like _h1_..._h6_, _.btn-primary_ and so on.

## Exercise 4 - Add Fontawesome

🚀 Our app looks prettier with icons. [Font Awesome](https://fontawesome.com) library will provide them to us.

  🎁 *index.html* is the place where you should import the library.

## Exercise 5 - Add Bootstrap

🚀 [Bootstrap](https://create-react-app.dev/docs/adding-bootstrap/) helps us with styling. Let's install it.

  🎁 You should install *bootstrap* via *npm*.
  
  🎁 Then you should import its CSS file into _index.tsx_ file.

## Exercise 6 - Add Date package

🚀 We need to manipulate dates and it is already known that it's not an easy task. [date-fns](https://date-fns.org/) library comes for helping us.

   🎁 Install *date-fns* via *npm*.

## Exercise 7 - Add Axios

🚀 Our Front-End will request data from Back-End server. Let's install [Axios](https://github.com/axios/axios) to do it.

  🎁 Install *axios* via *npm*.

## Exercise 8 - Add Alerts package

🚀 It is important to give feedback to the user and tell him if their requests were successfully or not. [CogoToast](https://cogoport.github.io/cogo-toast/) alerts are a nice way to display that info.

  🎁 Install *cogo-toast* via *npm*.

## Exercise 9 - Create blotter-view, fx-rates-view and widget components

🚀 When you have to build one big page, an important step is to divide it into many sections and make a component for each one, then put them together. Can you identify ours from *Dashboard* page? Let's create the components for each section and put them into the *Dashboard* one! Also, the navbar should be put there!

 🎁 To stay organized, put these newly-created components into a new folder named *components* under *fx-trading-app\src*.

 🎁 You can create the components as classes with *State* and *Props* interfaces, returning one simple message. Do not forget to export them to be available for import and usage.

 🎁 The navbar should be placed in the *header* section and will contain the logo (already present in *public/img* folder) and the *Log out* button (with no functionality at this moment).

 🎁 Do not forget also to create the style file for *Dashboard* and link it from the component file. *dashboard-page.css* will be placed into *src/styles* folder.
