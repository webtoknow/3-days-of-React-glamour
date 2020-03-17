# Day 3 - Exercises

## Table of contents

- [Exercise 0 - Configuration](#exercise-0---configuration)
  - [Download all npm dependencies](#download-all-npm-dependencies)
  - [Configure Mock Server](#configure-mock-server)
- [Exercise 1 - Register page](#exercise-1---register-page)
  - [User model](#user-model)
  - [Install Formik](#install-formik)

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
    email: string
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
