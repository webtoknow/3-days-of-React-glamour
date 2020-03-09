import React, { Component } from 'react'
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
        fetch(backendUrl.quoteService.getCurrencies)
            .then(response => response.json())
            .then(currencies => this.setState({ currencies }));
    }

    onAddWidget = () =>  {
        this.setState({ widgets: [...this.state.widgets, new WidgetModel('', '', 0, 0, null, '', true)] });
    }

    onDeleteWidget = (index: number) => {
        this.setState({ widgets: this.state.widgets.splice(index, 1) });
    }

    render() {
        const { currencies, widgets } =  this.state
        const widgetList = widgets.map( (widget, index) => (
            <Widget 
                key={index}
                index={index}
                widget={widget}
                currencies={currencies}
                onDelete={this.onDeleteWidget}
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

