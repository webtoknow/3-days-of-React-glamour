# Day 2 - Exercises

## Table of contents

## Exercise 0 - Configuration

- [Exercise 0 - Configuration](#exercise-0---configuration)
  - [Download all npm dependencies](#download-all-npm-dependencies)
  - [Install and use JSON Server](#install-and-use-json-server)

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
