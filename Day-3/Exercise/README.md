# Day 3 - Exercises

## Table of contents

- [General indications](#general-indications)
- [Exercise 0 - Configuration](#exercise-0---configuration)
  - [Download all npm dependencies](#download-all-npm-dependencies)
  - [Install Formik](#install-formik)
  - [Configure Mock Server](#configure-mock-server)
- [Exercise 1 - Register page](#exercise-1---register-page)
  - [User model](#user-model)
  - [Register component](#register-component)
- [Exercise 2 - Login page](#exercise-2---login-page)
  - [Login component](#login-component)
  - [Authentication guard](#authentication-guard)
  - [Logout](#logout)
  - [JWT Interceptor](#jwt-interceptor)
- [Exercise 3 - Not found page](#exercise-3---not-found-page)

## General indications

🔥 The working folder for this day will be _Day-3\Exercise\Code_. The code from previous days is already here.

🔥 You can find the exercises solutions for this day at _Day-3\Exercise\Solution_.

🔥 This rocket 🚀 will be followed by the statement of the exercise.

🔥 To help you to code without too many tears, 🎁 means that we are providing some hints to you.

## Exercise 0 - Configuration

### Download all npm dependencies

🚀 You already have all the names and versions of dependencies in *package.json*. To complete this exercise, you only need to download them.

  🎁 Use *npm* to download all dependencies.

  🎁 Take care from where you run the command. The folder should contain *package.json*.

### Install Formik

🚀 [Formik](https://jaredpalmer.com/formik) and [Yup](https://github.com/jquense/yup) help a lot to manipulate the forms. Let's install them.

  🎁 You should install *Formik* and *Yup* via *npm*.

### Configure Mock Server

🚀 Previously, you used JSON Server to simulate a Back-end server. But you had to open many terminal windows (one for each microservice). This time, a better option can be used: Mock Server (also based on JSON Server). Let's install it and then start all the microservices in a single terminal.

  🎁 All database files are now in *mock-server* folder, also the *package.json* for this server. So, install and start npm commands from there.

## Exercise 1 - Register page

### User model

🚀 At the end of this day, you will be able to login and register the user. The server will also send back a response to you. So, two models are now required: *User* and *AuthResponse*. For the *User* one, let's take a look at the design mockups and identify the fields and then implement it.

  🎁 Your interfaces will be created into _models_ folder.

### Register component

🚀 Register component allows the user to make an account in the application by completing a form. After that, the data should be sent to the server. Let's follow the mockups and create this component.

  🎁 This new code will be put into *pages/register-page.tsx*.

  🎁 Use *Formik* and *Yup* for building the form and validations.

  🎁 *Register* button will have attached the *onSubmit* function which will send the *User* entity to Back-end if the form is valid.

  🎁 If the register action was successful, use *CogoToast* to display a message and then redirect the user to *Login* page. If not, display an appropriate text.

  🎁 You should also have a link to the *Login* page to connect the two pages.

  🎁 The style of this component will be put in a new file called _register-page.css_ into *styles* folder and then will be linked by importing the CSS from the component. Do your best to make your design to look like the mockup!

## Exercise 2 - Login page

### Login component

🚀 After the register step, the user will want to log in into our application. A form will be completed and sent to the server. Let's create this new component!

  🎁 The implementation will be written the existing file *pages/login-page.tsx*.

  🎁 Use *Formik* and *Yup* for building the form and validations.

  🎁 *Login* button will have attached the *onSubmit* function which will send the *User* entity to Back-end if the form is valid.

  🎁 If the user logged in successfully, he will be redirected to *Dashboard* page.  Else, you will display an error message.

  🎁 You should also have a link to the *Register* page.

  🎁 The new created file _login-page.css_ will contain the component style and will be linked by importing the CSS from the component.

### Authentication guard

🚀 Why did you implement the login functionality? Because you wanted a method to restrict the access for the user to some pages if he is not logged in. Create a private *Route* function and check if the user has access to view the pages.

  🎁 The private *Route* function will be implemented into the root component: *App.tsx*.

  🎁 You need a method to check if the user is logged in (or not) to allow (or not allow) to view our private page: *Dashboard*. How about verifying if the *currentUser* property has been set on *localStorage*?

  🎁 If *currentUser* is not there, redirect the user to */login* page.

### Logout

🚀 The opposite action for login is logout. Let's implement this function!

  🎁 You already have the *Logout* button on *Dashboard* page. Put a function on it and start coding!

  🎁 This method will remove the *currentUser* property from *localStorage*.

## JWT Interceptor

🚀 An interceptor for requests and responses is also needed. For HTTP requests, a JWT auth token will be added to the Authentication header if the user is logged in. For the responses, it will check if the user is not authorized to view the response, so he will be logged out.

  🎁 *axios* will help you again via *AxiosRequestConfig*.
  
  🎁 The interceptor will be put in *onSubmit* function from *Login* component

## Exercise 3 - Not found page

🚀 All applications should have a page which will be displayed if the user accesses a route that does not exist. Let's implement ours and inspiring ourselves from the design!

  🎁 Your code will be written in *not-found-page.tsx*.

  🎁 The page should display an image, a message and a button which redirects the user to the *login* page.
  
  🎁 For a nice layout, you need to create the file *not-found-page.css* into *styles* folder and fill it with appropriate styles.
