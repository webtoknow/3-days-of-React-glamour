# Day 1 - Exercises

## Table of contents

- [General indications](#general-indications)
- [Exercise 0 - Development setup](#exercise-0---development-setup)
- [Exercise 1 - Initial Setup](#exercise-1---initial-setup)
- [Exercise 2 - Pages, Routing and Navigation](#exercise-2---pages-routing-and-navigation)
  - [Create pages](#create-pages)
  - [Add routes using React Router](#add-routes-using-react-router)
- [Exercise 3 - Add global styles](#exercise-3---add-global-styles)
- [Exercise 4 - Add Google Fonts](#exercise-4---add-google-fonts)
- [Exercise 5 - Create menu component](#exercise-5---create-menu-component)
- [Exercise 6 - Display articles](#exercise-6---display-articles)
- [Exercise 7 - Create Footer component](#exercise-7---create-footer-component)

## General indications

🔥 This rocket 🚀 will be followed by the statement of the exercise.

🔥 To help you to code without too many tears, 🎁 means that we are providing some hints to you.

🔥 You can find the exercises solutions for this day at _Day-1\Exercise-Blog\Solution_. Please check the solutions after you finish the exercises to compare your code.

## Exercise 0 - Development setup

### Clone repo

Use the terminal to clone this repo: `https://github.com/WebToLearn/3-days-of-React-glamour.git`

```bash
git clone https://github.com/WebToLearn/3-days-of-React-glamour.git
```

### Navigate to the location

The working folder for this day will be _Day-1\Exercise-Blog\Code_. Navigate to it using terminal.

```bash
cd 3-days-of-React-glamour\Day-1\Exercise-Blog\Code
```

### Start backend server

Open a new terminal in the same location _Day-1\Exercise-Blog\Code_ and start the JSON server:

```bash
json-server --watch db.json -p 4000
```

If the command is not recognized as an internal command, open another terminal and install JSON server:

```bash
npm install -g json-server
```

## Exercise 1 - Initial Setup

🚀 Let's do the initial step to build our first React application. We should start generating a new project, named `blog`, with React and Typescript.

  🎁 One very easy method is to use [Create React App](https://create-react-app.dev/docs/adding-typescript/).

  🎁 After generating the project, you should start it. *npm start* will do the job.

## Exercise 2 - Pages, Routing and Navigation

### Create pages

🚀 Our application will have two pages. Can you identify these ones based on the design? Let's create them as dummy React components.

  🎁 A very important thing when you write code is to be organized. So put these newly-created components (`home` and `details`) into a new folder named *pages* under *blog\src*.

  🎁 You can create the components as functions returning one simple message. Do not forget to export them to be available for import and use.

### Add routes using React Router

🚀 You should also can navigate through the pages you just created. So let's create now the navigation part.

  🎁 [React Router](https://reacttraining.com/react-router/web/guides/quick-start) should help you a lot with this exercise. Don't forget to also delete unnecesarry files like *logo.svg* and *App.css*.

  🎁 After the installation part, use the Router components to link your pages with the appropriate URLs. This should be done in the root component: *App.tsx*.

 🎁 To have full Typescript support please also install [React router types](https://www.npmjs.com/package/@types/react-router-dom).

## Exercise 3 - Add global styles

🚀 Even if our application has two pages, they should seem to be from the same story. This means that a global style file should be filled in with some CSS. Does your styles makes the app look the same as in the design mockups?

  🎁 The global style file is *index.css*.

  🎁 The browsers can display the elements differently. To have the same standard, we need to import *normalize.css* file.
  
```css
  @import-normalize;

  :root {
    --white-color: #FFFFFF;
    --black-color: #1e1e1e;
    --grey-color: #9b9b9b;
    --pink-color: #FFE3E3;
    --cardo-font: 'Cardo', serif;
    --montserrat-font: 'Montserrat', sans-serif;
  }
  ...
```

> The rest of the style can be found in [/Design/Blog/HTML-CSS folder](../../Design/Blog/HTML-CSS/README.MD)

## Exercise 4 - Add Google Fonts

🚀 The fonts make the blog page looks really nice. Insert them in our project!

🎁 Use [Google Fonts](https://fonts.google.com/) to add `Cardo` and `Montserrat` fonts to the `<head>` of *blog\public\index.html*.

## Exercise 5 - Create Menu component

🚀 If we want to extend our blog in the future, we need a menu component. Let's build it together!

🎁 In a new folder named *components* (located under *blog\src*), create the *Menu* component using the HTML found in [/Design/Blog/HTML-CSS folder](../../Design/Blog/HTML-CSS/README.MD).

🎁 Integrate Menu into *App.tsx*. App component should look like:

```JS
function App() {
  return (
    <div className="container">
      <Menu/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
```

## Exercise 6 - Display articles

🚀 We should display our articles in the Home page.

🎁 Use *fetch* to get the articles list from server in *Home* component. A good article about AJAX can be found in [React's documentation](https://reactjs.org/docs/faq-ajax.html).

🎁 Create the article component using the HTML found in [/Design/Blog/HTML-CSS folder](../../Design/Blog/HTML-CSS/README.MD) and use it to display the article. Don't forget to create article interface.

🎁 Copy the *img* folder from [/Design/Blog/HTML-CSS folder](../../Design/Blog/HTML-CSS/README.MD) to *blog/public*.

## Exercise 7 - Pagination

🚀 We can have many articles in our blog, so a pagination is really needed.

🎁 Create the Footer component using the HTML found in [/Design/Blog/HTML-CSS folder](../../Design/Blog/HTML-CSS/README.MD).

🎁 Create the logic to display only 3 articles on the page and add functionality on the *next* and *prev* buttons to be able to navigate to other articles. Please also hide these buttons when there are no articles to display.
