# Day 2 - Exercises

## Table of contents

- [General indications](#general-indications)
- [Exercise 0 - Configuration](#exercise-0---configuration)
  - [Download all npm dependencies](#download-all-npm-dependencies)
  - [Install and use JSON Server](#install-and-use-json-server)
- [Exercise 1 - Create blotter-view, fx-rates-view and widget components](#exercise-1---create-blotter-view-fx-rates-view-and-widget-components)
- [Exercise 2 - Blotter View section](#exercise-2---blotter-view-section)
  - [Transaction model](#transaction-model)
  - [Constants file](#constants-file)
  - [Implement polling mechanism](#implement-polling-mechanism)
  - [Blotter View render](#blotter-view-render)
- [Exercise 3 - FX Rates View section](#exercise-3---fx-rates-view-section)
  - [Rate model](#rate-model)
  - [Widget model](#widget-model)
  - [FX Rates View component](#fx-rates-view-component)
  - [Widget component](#widget-component)

## General indications

🔥 The working folder for this day will be _Day-2\Exercise\Code_. The code from previous day is already here.

🔥 You can find the exercises solutions for this day at _Day-2\Exercise\Solution_.

🔥 This rocket 🚀 will be followed by the statement of the exercise.

🔥 To help you to code without too many tears, 🎁 means that we are providing some hints to you.

## Exercise 0 - Configuration

### Download all npm dependencies

🚀 You already have all the names and versions of dependencies in *package.json*. To complete this exercise, you only need to download them.

  🎁 Use *npm* to download all dependencies.

  🎁 Take care from where you run the command. The folder should contain *package.json*.

### Install and use JSON Server

🚀 As you do not have a Back-end server, JSON Server will behave like one. Let's install it! Your database consists of 2 JSON files, so you should make JSON Server read from both of them.

  🎁 To avoid installing JSON Server for each place you will use it, install it globally via *npm*.

  🎁 Open one different terminal window for each database file and run JSON Server there on a different port.

## Exercise 1 - Create blotter-view, fx-rates-view and widget components

🚀 When you have to build one big page, an important step is to divide it into many sections and make a component for each one, then put them together. Can you identify ours from *Dashboard* page? Let's create the components for each section and put them into the *Dashboard* one! Also, the navbar should be put there!

 🎁 To stay organized, put these newly-created components into a new folder named *components* under *fx-trading-app\src*.

 🎁 You can create the components as classes with *State* and *Props* interfaces, returning one simple message. Do not forget to export them to be available for import and usage.

 🎁 The navbar should be placed in the *header* section and will contain the logo (already present in *public/img* folder) and the *Log out* button (with no functionality at this moment).

 🎁 Do not forget also to create the style file for *Dashboard* and link it from the component file. *dashboard-page.css* will be placed into *src/styles* folder.

## Exercise 2 - Blotter View section

### Transaction model

🚀 Typescript helps you to not make mistakes regarding the types of the objects sent and received from the server. Build a *Transaction* interface containing all properties defining a transaction and their types. The design mockups should help finding them.

 🎁 You should be organized again and make a new folder called *models* into _src_. This folder will contain all models from our app.

### Constants file

🚀 You will need to make Back-end calls to some URLs. Put all of them into a *constants* file.

  🎁 Create *constants.tsx* file into _src_ folder.

  🎁 You have to use different ports depending on which microservice you call. We propose 8200 for *Auth*, 8210 for *Trade* and 8220 for *Quote* services.

### Implement polling mechanism

🚀 Transactions should be as accurate as possible, so you should simulate a real-time behavior. This can be done by implementing polling mechanism into *Blotter View* component.

  🎁 You should create a function which gets all the transactions using *axios*: *getTransactions()* and put them on the component's state.

  🎁 Also, because you have two distinct properties *primaryCcy* and *secondaryCcy* and you need to manipulate in the UI the pair of that 2, you should add a new property *ccyPair* just for display reasons.

  🎁 *getTransactions* will be called for the first time when the component is mounted, then at every 1s.

  🎁 It is very important from performance perspective to stop the timer when the component is destroyed.

### Blotter View render

🚀 As now you already have the transactions loaded from the server, you can start displaying them. Put there the table as in the design mockups.
  
  🎁 You should update the *render* function from the component to put there what you want to be displayed.

  🎁 In order to format the displayed date, use *date-fns*.

  🎁 The CSS for this file, *botter-view.css* should also be created in *styles* folder and imported from the component.

## Exercise 3 - FX Rates View section

### Rate model

🚀 Rate is another model we should create. Let's do it!

  🎁 The new file will be created into *models* folder.

### Widget model

🚀 Create also the *Widget* model.

  🎁 The new file will be created into *models* folder.

  🎁 Until now we just created interfaces. These can also be classes and the fields can be declared into the constructor.

### FX Rates View component

🚀 It's time to take care of the left-side part of the screen. We will need to get the currencies pairs and display all widgets.

  🎁 Currencies pairs will be loaded from *Quote Service* via *axios* when the component is created, then will be put on state.

  🎁 We will need to implement a function which add a new widget when clicking on "+". This new one will have all fields empty.

  🎁 The widgets can also be removed - JavaScript *splice* method can help here.

  🎁 As the widgets are maintained in the parent component - *FX Rates*, everytime a widget field is edited, we will call a method to update the state from the parent.

  🎁 A new file called _fx-rates-view.css_ should be created in *styles* folder and linked from the component. Put your style for *FX Rates* here. The design will help you!

  🎁 Because you passed some properties to the *Widget* component, Typescript will throw some errors. Put them also in *Widget Props*.

### Widget component

🚀 Let's now implement the *Widget* class. Same component will be used for both states:
    - one state which allows adding a new currency pair to let the user follow SELL and BUY rates
    - the other which allows saving a transaction.

 🎁 The first state of the component contains 2 dropdowns where Primary and Secondary currencies can be selected from the ones obtained by calling the backend through *startPolling()* method.

 🎁 *startPolling()* calls the method which get the FX Rates every second through axios.

 🎁 The second one allows saving a transaction. For this, the user have to enter the amount he wants to trade, the tenor (SP - now, 1M - in a month or 3M - in three months) and then press on the button which describes the action he want to do: Sell or Buy.

 🎁 Saving a transaction on sell or buy actions can be also possible via *axios*.

 🎁 Every edit on the widget will be put on parent's state as it maintain all the widget items.

 🎁 Create a new file named *widget.css* in *styles* folder and links it with the component.
