# Day 2 - Exercises

## Table of contents

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

## Exercise 0 - Configuration

### Download all npm dependencies

- go to _Day-2\Exercise\Code\fx-trading-app_:

```bash
cd 3-Days-of-React-glamour\Day-2\Exercise\Code\fx-trading-app
```

- run _npm install_ to download all dependencies:

  ```bash
  npm install
  ```

### Install and use JSON Server

- because we do not have a backend server and a link to a real database at this moment, we will simulate having some data using _JSON Server_
- the first step is to install it (globally), using the following command:

  ```bash
  npm install json-server -g
  ```

- next, we have to start it with the 2 existing files - containing _quote_ and _trade_ data
- make sure you are in the following path, where both JSON files are situated: _Day-2/Exercise/Code/fx-trading-app_
- run these commands in separate terminal windows:

  ```bash
  json-server --watch db.trade.json --port 8210
  json-server --watch db.quote.json --port 8220
  ```

## Exercise 1 - Create blotter-view, fx-rates-view and widget components

- from design mockup, we can see that it can be divided in 2 big sections: **FX Rates View** and **Blotter View**. Also, the first one contains many widgets looking the same, so this can be also splitted into **Widget** components
- so, _dashboard-page_ component will use 3 smaller components which will need to be created:
  - _blotter-view_
  - _fx-rates-view_
  - _widget_

![Components](../../Day-1/Theory/img/components.png "Components")

- create _components_ folder:

  ```bash
  cd src
  mkdir components
  cd components
  ```

- create these 3 new React components, using the example below, as children of _components_ folder:
  - blotter-view.tsx
  - fx-rates-view.tsx
  - widget.tsx

  ```JavaScript
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

- in the design, we can see on the top of the dashboard a navbar, containing the logo and _Logout_ button
- next step is to include into _dashboard-page_ component the navbar, _blotter-view_ and _fx-rates-view_ and also use _bootstrap_ to place them
- so, in _dashboard-page.tsx_ we will have:

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

- create _styles_ folder into _Day-2\Exercise\Code\fx-trading-app\src_, so we can add some dashboard style:

  ```bash
  cd ..
  mkdir styles
  cd styles
  ```

- create _dashboard-page.css_ and add the following styles:

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

## Exercise 2 - Blotter View section

### Transaction model

- create a new folder named _models_ into _Day-2\Exercise\Code\fx-trading-app\src_ which will contain all required models:

  ```bash
  cd Day-2\Exercise\Code\fx-trading-app\src
  mkdir models
  cd models
  ```

- let's make a new file there, named _transaction.tsx_, representing the _Transaction_ model:

  ```JavaScript
  export interface Transaction {
      id?: number;
      username: string;
      primaryCcy: string
      secondaryCcy: string;
      rate: number;
      action: string;
      notional: number;
      tenor: string;
      date: number;
      ccyPair?: string
  }
  ```

### Constants file

- to have all backend URLs in one place we need to create a _constants.tsx_ file in _Day-2\Exercise\Code\fx-trading-app\src_:

  ```Javascript
  export const authApi = 'http://localhost:8200'
  export const tradeApi = 'http://localhost:8210'
  export const quoteApi = 'http://localhost:8220'

  export const backendUrl = {
    authService: {
      authenticate: `${authApi}/user/authenticate`,
      register: `${authApi}/user/register`,
    },
    fxTradeService: {
      getTransactions: `${tradeApi}/transactions`,
      saveTransaction: `${tradeApi}/transactions`,
    },
    quoteService: {
      getCurrencies: `${quoteApi}/currencies`,
      getFxRate: `${quoteApi}/fx-rate`
    }
  }
  ```

### Implement polling mechanism

- we want to simulate the real-time behavior for getting the transactions. This is the reason why we implement polling mechanism and using fetch API in `BlotterView` component:

  ```Javascript
  import React, { Component } from 'react';
  import { fromUnixTime, format } from 'date-fns'

  import cogoToast from 'cogo-toast';
  import axios, { AxiosResponse, AxiosError } from 'axios';

  import { Transaction } from '../models/transaction';
  import { backendUrl } from '../constants';
  import './../styles/blotter-view.css'

  interface Props {
  }

  interface State {
      timer: number | null;
      transactions: Transaction[];
  }

  class BlotterView extends Component<Props, State> {
    state = {
      timer: null,
      transactions: [],
    }
    componentDidMount() {
      this.getTransactions();
      this.setState({ timer: window.setInterval(() => this.getTransactions(), 1000) });
    }
    componentWillUnmount() {
      window.clearInterval(this.state.timer || 0)
    }

    getTransactions() {
      axios.get(backendUrl.fxTradeService.getTransactions)
        .then((response: AxiosResponse) => {
          const transactions = response.data;
          // Add currency pairs to transactions
          const transactionsWithCcyPair: Transaction[] = transactions.map((transaction: Transaction) => ({ ...transaction, ccyPair: `${transaction.primaryCcy}/${transaction.secondaryCcy}` }));
          this.setState({ transactions: transactionsWithCcyPair });
        })
        .catch((error: AxiosError) => {
          cogoToast.error(error.message, { position: 'top-right' });
        });
    }

    render() {
        return (
            <div>
                blotter view
            </div >
        )
    }
  }

  export default BlotterView
  ```

- so, we have the following behavior:

  - when we initiate this component (_componentDidMount_), we should call polling mechanism, which calls _getTransactions()_
  - _componentWillUnmount_ unsubscribes from getting transactions

### Blotter View render

- now it is the time replace the *render* function to display the table containing all the transactions:

  ```Javascript
  ...
  render() {
      const transactionsList = this.state.transactions.map((trade: Transaction) =>
        <tr key={trade.id}>
          <td>{trade.id}</td>
          <td>{trade.username}</td>
          <td>{trade.ccyPair}</td>
          <td>{trade.rate}</td>
          <td>{trade.action}</td>
          <td>{trade.notional}</td>
          <td>{trade.tenor}</td>
          <td>{format(fromUnixTime(trade.date / 1000), "dd-MM-yyyy HH:mm")}</td>
        </tr>
      )
      return (
        <div>
          <div className="title title-border">
            <h4>Blotter View</h4>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead className="blotter-table-header">
                <tr>
                  <th>ID</th>
                  <th>
                    <span>Username&nbsp;</span>
                  </th>
                  <th>
                    <span>Ccy Pair&nbsp;</span>
                  </th>
                  <th>Rate</th>
                  <th>
                    <span>Action&nbsp;</span>
                  </th>
                  <th>
                    <span>Notional&nbsp;</span>
                  </th>
                  <th>Tenor</th>
                  <th>
                    <span>Transaction Date&nbsp;</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactionsList}
              </tbody>
            </table>
          </div>
        </div >
      )
    }
  ```

- here we display a table containing the following information from all transactions got from the backend:

  - id
  - username
  - ccyPair
  - rate
  - action
  - notional
  - tenor
  - date

- we need also to create into _Day-2\Exercise\Code\fx-trading-app\src\styles_ the _blotter-view.css_ file to add the table style:

  ```CSS
  .blotter-table-header {
      background: #3496F0;
      color: white;
      overflow: hidden;
      white-space: nowrap;
  }
  ```

- the file _blotter-view.css_ is already imported into _blotter-view.tsx_, so this is how we linked them:

  ```Javascript
  import './../styles/blotter-view.css'
  ```

## Exercise 3 - FX Rates View section

### Rate model

- into _Day-2/Exercise/Code/fx-trading-app/src/app/models_, let's make a new file, named _rate.tsx_, representing the _Rate_ model:

  ```JavaScript
  export interface Rate {
      buyRate: number;
      sellRate: number;
      ts?: number;
  }
  ```

### Widget model

- in the same location, _Day-2/Exercise/Code/fx-trading-app/src/app/models_, we want to have the _widget_ interface (a new file is required, _widget.tsx_):

  ```JavaScript
  export class WidgetModel {
    constructor(
      public primaryCcy: string,
      public secondaryCcy: string,
      public buyRate: number,
      public sellRate: number,
      public notional: number | null,
      public tenor: string,
      public pickCCYState: boolean
    ) {}
  }
  ```

### FX Rates View component

- `FX Rates View` component is the left-side of the screen, containing all Widget Components:

  ```Javascript
  import React, { Component } from 'react'
  import axios, { AxiosResponse } from 'axios';
  import { WidgetModel } from '../models/widget'
  import { backendUrl } from '../constants';
  import Widget from './widget';

  import './../styles/fx-rates-view.css'

  interface Props {
  }

  interface State {
    widgets: WidgetModel[];
    currencies: string[];
  }

  class FxRatesView extends Component<Props, State> {

    state = {
      widgets: [],
      currencies: []
    }

    componentDidMount() {
      this.getCurrencies();
    }

    getCurrencies() {
      axios.get(backendUrl.quoteService.getCurrencies)
        .then((response: AxiosResponse) => this.setState({ currencies: response.data }));
    }

    onAddWidget = () => {
      this.setState({ widgets: [...this.state.widgets, new WidgetModel('', '', 0, 0, null, '', true)] });
    }

    onDeleteWidget = (index: number) => {
      const newWidgets = this.state.widgets.filter((widgets, i) => i !== index);
      this.setState({ widgets: [...newWidgets] });
    }

    onEditWidget = (newWidget: WidgetModel, index: number) => {
      const newWidgets = this.state.widgets.map((widget, i) => {
        if (index === i) {
          return newWidget
        }
        return widget
      });
      this.setState({ widgets: [...newWidgets] });
    }

    render() {
      const { currencies, widgets } = this.state
      const widgetList = widgets.map((widget, index) => (
        <Widget
          key={index}
          index={index}
          widget={widget}
          currencies={currencies}
          onDelete={this.onDeleteWidget}
          onEditWidget={this.onEditWidget}
        >
        </Widget>
      ));
      return (
        <div>
          <h4 className="title">Fx Rates View</h4>
          <div className="container-widget">
            {widgetList}
            <button className="button-widget" onClick={this.onAddWidget}>
              <span className="fa fa-plus button-plus"></span>
            </button>
          </div >
        </div >
      )
    }
  }

  export default FxRatesView
  ```

- so, as we can see:

  - we are fetching currencies pairs from _Quote Service_
  - we use `Widget` component to render all widgets and pass index, currencies and onDelete as props
  - we have the possibility to add a new widget by clicking on "+" button
  - when a new widget is added, a new Widget component is created with default/empty values
  - when a widget is removed, *onDeleteWidget* method is called, which uses the JavaScript *splice* method
- don't forget to create _fx-rates-view.css_ into *styles* folder and add the following styles:

  ```CSS
  .container-widget {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-right: 2rem;
  }

  .button-widget {
      width: 47%;
      height: 250px;
      border: 1px solid grey;
      border-radius: 5px;
      padding: 10px;
  }

  .button-plus {
      font-size: 60px;
      color: grey;
  }

  @media only screen and (max-width: 1440px) {
      .rate {
          font-size: 26px;
      }
  }
  ```

- fix type errors by adding Props in `Widget` component:

  ```Javascript
  interface Props {
    index: number;
    widget: WidgetModel;
    currencies: string[];
    onDelete: (index: number) => void,
    onEditWidget: (widgets: WidgetModel, index: number) => void;
  }
  ```

- don't forget to import *WidgetModel*:

  ```JavaScript
  import { WidgetModel } from '../models/widget';
  ```

### Widget component

- in `Widget` component we can notice:

  - a widget can be deleted by pressing the close icon from top-right corner of it
  - there are 2 types of widgets:

    - one which allows adding a new currency pair to let the user follow SELL and BUY rates. This contains 2 dropdowns where Primary and Secondary currencies can be selected from the ones obtained by calling the backend through startPolling() method
    - the other which allows saving a transaction. For this, the user have to enter the amount he wants to trade, the tenor (SP - now, 1M - in a month or 3M - in three months) and then press on the button which describes the action he want to do: Sell or Buy

  ```Javascript
  import React, { Component } from 'react';
  import cogoToast from 'cogo-toast';
  import axios, { AxiosResponse, AxiosError } from 'axios';

  import { WidgetModel } from '../models/widget';
  import { Rate } from '../models/rate';
  import { backendUrl } from '../constants';
  import '../styles/widget.css'

  interface Props {
    index: number;
    widget: WidgetModel;
    currencies: string[];
    onDelete: (index: number) => void;
    onEditWidget: (widgets: WidgetModel, index: number) => void;
  }
  interface State {
    timer: number;
    buyRateTrend: string;
    sellRateTrend: string;
  }

  class Widget extends Component<Props, State> {
    state = {
      timer: 0,
      buyRateTrend: '',
      sellRateTrend: '',
    };
    tenors = ['SP', '1M', '3M'];
    onDelete = () => {
      const { onDelete, index } = this.props;
      onDelete(index);
    }

    onSell = () => {
      const { notional, tenor, primaryCcy, secondaryCcy, sellRate } = this.props.widget;
      if (notional && tenor) {
        const username: string = JSON.parse(
          localStorage.getItem('currentUser') || '{}'
        ).username;

        const newTransactions = {
          username,
          primaryCcy,
          secondaryCcy,
          rate: sellRate,
          action: 'SELL',
          notional,
          tenor,
          date: Math.round(new Date().getTime())
        }

        axios.post(backendUrl.fxTradeService.saveTransaction, newTransactions)
          .then(() => {
            cogoToast.success('Transaction saved!', { position: 'top-right' });
          })
          .catch((error: AxiosError) => {
            cogoToast.error(error.message, { position: 'top-right' });
          });
      } else {
        cogoToast.error('Please fill in both Amount and Tenor!', { position: 'top-right' });
      }
    }
    onBuy = () => {
      const { notional, tenor, primaryCcy, secondaryCcy, sellRate } = this.props.widget;
      if (notional && tenor) {
        const username: string = JSON.parse(
          localStorage.getItem('currentUser') || '{}'
        ).username;

        const newTransactions = {
          username,
          primaryCcy,
          secondaryCcy,
          rate: sellRate,
          action: 'BUY',
          notional,
          tenor,
          date: Math.round(new Date().getTime())
        }

        axios.post(backendUrl.fxTradeService.saveTransaction, newTransactions)
          .then(() => {
            cogoToast.success('Transaction saved!', { position: 'top-right' });
          })
          .catch((error: AxiosError) => {
            cogoToast.error(error.message, { position: 'top-right' });
          });
      } else {
        cogoToast.error('Please fill in both Amount and Tenor!', { position: 'top-right' });
      }
    }

    startPolling() {
      const { primaryCcy, secondaryCcy } = this.props.widget;
      this.getFxRate(primaryCcy, secondaryCcy);
      this.setState({ timer: window.setInterval(() => this.getFxRate(primaryCcy, secondaryCcy), 1000) });
    }

    getFxRate(primaryCcy: string, secondaryCcy: string) {
      axios.get(backendUrl.quoteService.getFxRate, { params: { primaryCcy, secondaryCcy } })
        .then((response: AxiosResponse) => {
          const fxRates: Rate = response.data;
          this.setState({ buyRateTrend: this.props.widget.buyRate > fxRates.buyRate ? 'down' : 'up' });
          this.setState({ sellRateTrend: this.props.widget.sellRate > fxRates.sellRate ? 'down' : 'up' });

          this.props.onEditWidget({ ...this.props.widget, buyRate: fxRates.buyRate, sellRate: fxRates.sellRate }, this.props.index);
        })
        .catch((error: AxiosError) => {
          cogoToast.error(error.message, { position: 'top-right' });
        });
    }

    onSwitchCCY = () => {
      this.props.onEditWidget({ ...this.props.widget, primaryCcy: this.props.widget.secondaryCcy, secondaryCcy: this.props.widget.primaryCcy }, this.props.index);
    }

    onPickCurrency = () => {
      const { primaryCcy, secondaryCcy } = this.props.widget;
      if (primaryCcy && secondaryCcy && primaryCcy !== secondaryCcy) {
        this.props.onEditWidget({ ...this.props.widget, pickCCYState: false }, this.props.index);
        this.startPolling();
      }
      else if (!primaryCcy || !secondaryCcy) {
        cogoToast.error('Please select both Primary and Secondary Currencies!', { position: 'top-right' });
      }
      else {
        cogoToast.error('Please select different Primary and Secondary Currencies!', { position: 'top-right' });
      }
    }

    componentWillUnmount() {
      window.clearInterval(this.state.timer);
    }
    handleChangePrimaryCcy = (event: React.ChangeEvent<HTMLSelectElement>) => {
      this.props.onEditWidget({ ...this.props.widget, primaryCcy: event.target.value }, this.props.index);
    }
    handleChangeSecondaryCcy = (event: React.ChangeEvent<HTMLSelectElement>) => {
      this.props.onEditWidget({ ...this.props.widget, secondaryCcy: event.target.value }, this.props.index);
    }
    handleChangeNotional = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.props.onEditWidget({ ...this.props.widget, notional: parseInt(event.target.value) }, this.props.index);
    }
    handleChangeTenor = (event: React.ChangeEvent<HTMLSelectElement>) => {
      this.props.onEditWidget({ ...this.props.widget, tenor: event.target.value }, this.props.index);
    }
    render() {
      let content;
      const { primaryCcy, secondaryCcy, buyRate, sellRate, notional, tenor } = this.props.widget;
      const { buyRateTrend, sellRateTrend } = this.state;
      const currencies = this.props.currencies.map(currency => <option key={currency} value={currency}>{currency}</option>);
      const tenors = this.tenors.map(tenor => <option key={tenor} value={tenor}>{tenor}</option>);
      const notionalSting = notional ? notional.toString() : ''
      if (this.props.widget.pickCCYState) {
        // Select currency pair step
        content = (
          <div className='content-widget'>
            <span className="fa fa-times close" onClick={this.onDelete}></span>
            <div>
              <h4 className="widget-title">Pick a currency</h4>
              <div className="content-container">
                <div className="form-inline form-inline-long form-group">
                  <label className="label-long">Primary</label>
                  <select name="primaryCcy" className="form-control" onChange={this.handleChangePrimaryCcy} defaultValue={''} required>
                    <option value="" disabled>Please select</option>
                    {currencies}
                  </select>
                </div>
                <div className="form-inline form-inline-long form-group">
                  <label className="label-long">Secondary</label>
                  <select name="secondaryCcy" className="form-control" onChange={this.handleChangeSecondaryCcy} defaultValue={''} required>
                    <option value="" disabled>Please select</option>
                    {currencies}
                  </select>
                </div >
                <div className="btn-wraper">
                  <button className="btn btn-primary" onClick={this.onPickCurrency}>Ok</button>
                </div >
              </div >
            </div >
          </div>
        )
      } else {
        // Trade step
        content = (
          <div className='content-widget'>
            <span className="fa fa-times close" onClick={this.onDelete}></span>
            <div>
              <h4 className="widget-title no-border">
                <span className="widget-primary">{primaryCcy}</span>/{secondaryCcy}
                <span className="fa fa-exchange exchange" onClick={this.onSwitchCCY}></span>
              </h4>
              <div className="rates-container">
                <div>
                  <span className="widget-subtitle">SELL: </span>
                  <span className="rate">{sellRate}</span>
                  <span className={sellRateTrend === 'up' ? 'fa fa-caret-up rate-up' : 'fa fa-caret-down rate-down'}></span>
                </div>
                <div>
                  <span className="widget-subtitle">BUY: </span>
                  <span className="rate">{buyRate}</span>
                  <span className={buyRateTrend === 'up' ? 'fa fa-caret-up rate-up' : 'fa fa-caret-down rate-down'}></span>
                </div >
              </div >
              <div className="content-container">
                <div className="form-inline form-group">
                  <label className="label-short">Amount</label>
                  <input type="number" className="form-control" value={notionalSting} placeholder="Type the amount" onChange={this.handleChangeNotional} required />
                </div>
                <div className="form-inline form-inline-short form-group">
                  <label className="label-short">Tenor</label>
                  <select name="tenor" className="form-control" value={tenor} onChange={this.handleChangeTenor} required>
                    <option value="" disabled>Please select</option>
                    {tenors}
                  </select>
                </div >
                <div className="btns-wrapper">
                  <button className="btn btn-primary" onClick={this.onSell}>Sell</button>
                  <button className="btn btn-success" onClick={this.onBuy} > Buy</button >
                </div >
              </div >
            </div>
          </div>
        );
      }
      return (
        <div className="widget">
          {content}
        </div >
      )
    }
  }

  export default Widget;
  ```

- in `Widget` component, we can see many functionalities implemented:

  - onDelete: when the user removes a widget
  - onSell: save the transaction with SELL action
  - onBuy: save the transaction with BUY action
  - onCCYChange: switch the primary currency with the secondary one
  - startPolling: get FX Rates through polling to simulate real-time behavior
  - onPickCurrency: when a new widget is added with primary and secondary currencies, start polling FX Rates

- don't forget about styling (create a new file into _styles_ folder named *widget.css*):

  ```CSS
  .widget {
    display: flex;
    flex-basis: 47%;
    border: 1px solid grey;
    border-radius: 5px;
    margin-bottom: 2.5rem;
    height: 297px;
  }

  .content-widget {
    width: 100%;
    position: relative;
  }

  .widget-title {
    padding: 1rem 1rem 10px;
    border-bottom: 1px solid #DDDDDD;
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }

  .widget-subtitle {
    font-size: 20px;
    color: #7C7C7C;
    font-weight: bold;
  }

  .widget-primary {
    font-size: 24px;
    color: #373A3C;
  }

  .widget-primary-currency {
    color: #373A3C;
    font-size: 24px;
  }

  .label-long {
    width: 80px;
    justify-content: flex-start;
  }

  .label-short {
    width: 60px;
    justify-content: flex-start;
  }

  .form-control {
    display: flex;
    flex-grow: 1;
  }

  .btn-wraper {
    display: grid;
    justify-content: flex-end;
  }

  .btns-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .rates-container {
    display: flex;
    justify-content: space-between;
    background: #F2F2F2;
    padding: 10px 1rem;
  }

  .rate-up {
    color: green;
  }

  .rate-down {
    color: red;
  }

  .rate {
    font-size: 30px;
    font-weight: bold;
  }

  .content-container {
    padding: 1rem;
  }

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 15px;
    cursor: pointer;
  }

  .no-border {
    border: 0;
  }

  .exchange {
    color: #F0AD4E;
    font-size: 18px;
    cursor: pointer;
    margin-left: 5px;
  }

  @media only screen and (max-width: 1440px) {
    .rate {
      font-size: 26px;
    }
  }
  ```
