import React, { Component } from "react";
import cogoToast from 'cogo-toast';
import { WidgetModel } from "../models/widget";
import { backendUrl } from "../constants";

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
        localStorage.getItem("currentUser") || "{}"
      ).username;

      const newTransactions = {
        username,
        primaryCcy,
        secondaryCcy,
        rate: sellRate,
        action: "SELL",
        notional,
        tenor,
        date: Math.round(new Date().getTime())
      }

      fetch(backendUrl.fxTradeService.saveTransaction,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTransactions),
        }
      )
        .then(response => response.json())
        .then(() => {
          cogoToast.success("Transaction saved!", { position: 'top-right' });
        })
        .catch(() => {
          cogoToast.error('Server Error', { position: 'top-right' });
        });
    } else {
      cogoToast.error("Please fill in both Amount and Tenor!", { position: 'top-right' });
    }
  }
  onBuy = () => {
    const { notional, tenor, primaryCcy, secondaryCcy, sellRate } = this.props.widget;
    if (notional && tenor) {
      const username: string = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      ).username;

      const newTransactions = {
        username,
        primaryCcy,
        secondaryCcy,
        rate: sellRate,
        action: "BUY",
        notional,
        tenor,
        date: Math.round(new Date().getTime())
      }

      fetch(backendUrl.fxTradeService.saveTransaction,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTransactions),
        }
      )
        .then(response => response.json())
        .then(() => {
          cogoToast.success("Transaction saved!", { position: 'top-right' });
        })
        .catch(() => {
          cogoToast.error('Server Error', { position: 'top-right' });
        });
    } else {
      cogoToast.error("Please fill in both Amount and Tenor!", { position: 'top-right' });
    }
  }

  startPolling() {
    const { primaryCcy, secondaryCcy } = this.props.widget;
    this.setState({ timer: window.setInterval(() => this.getFxRate(primaryCcy, secondaryCcy), 10000) });
  }

  getFxRate(primaryCcy: string, secondaryCcy: string) {
    fetch(backendUrl.quoteService.getFxRate)
      .then(response => response.json())
      .then((fxRates) => {
        this.setState({ buyRateTrend: this.props.widget.buyRate > fxRates.buyRate ? 'down' : 'up' });
        this.setState({ sellRateTrend: this.props.widget.sellRate > fxRates.sellRate ? 'down' : 'up' });

        this.props.onEditWidget({ ...this.props.widget, buyRate: fxRates.buyRate, sellRate: fxRates.sellRate }, this.props.index);
      })
      .catch(() => {
        cogoToast.error('Server Error', { position: 'top-right' });
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
                <select name="tenor" className="form-control" value={tenor} defaultValue={''} onChange={this.handleChangeTenor} required>
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
