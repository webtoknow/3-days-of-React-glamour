import React, { Component } from 'react';
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
        this.setState({ timer: window.setInterval(() => this.getTransactions(), 1000) });
    }
    componentWillUnmount() {
        this.setState({ timer: null });
    }

    getTransactions() {
        fetch(backendUrl.fxTradeService.getTransactions)
            .then(response => response.json())
            .then(transactions => {
                // Add currency pairs to transactions
                const transactionsWithCcyPair: Transaction[] = transactions.map((transaction: Transaction) => ({ ...transaction, ccyPair: `${transaction.primaryCcy}/${transaction.secondaryCcy}` }));
                this.setState({ transactions: transactionsWithCcyPair });
            });
    }

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
                <td>{trade.date}</td>
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
}

export default BlotterView
