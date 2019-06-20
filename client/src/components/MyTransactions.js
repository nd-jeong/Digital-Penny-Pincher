import React, { Component } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

class MyTransactions extends Component {
    constructor() {
        super();

        this.state = {
            transactionArray: [],
            transactionType: '',
            filter: false,
            filteredTransactionArray: []
        }

        this.transactionTypeFilter = this.transactionTypeFilter.bind(this);
    }

    async componentDidMount() {
        const res = await axios.get(`http://localhost:4567/transactions/${this.props.match.params.id}`);

        this.setState({
            transactionArray: res.data
        });
    }

    async componentDidUpdate() {
        if (this.state.transactionType) {
            const res = await axios.get(`http://localhost:4567/transactions/${this.props.match.params.id}/${this.state.transactionType}`);

            this.setState({
                filteredTransactionArray: res.data,
                filter: true,
                transactionType: ''
            })
        }
    }

    async transactionTypeFilter(event) {
        const transactionType = event.target.value;
        
        if (transactionType) {
            this.setState({
                transactionType
            });
        } else {
            this.setState({
                filter: false
            })
        }
        
    }

    render() {
        const transactionArray = this.state.transactionArray;
        const transactions = transactionArray.map(transaction => {
            return(
                <div key={transaction.id} className="transaction-div">
                    <Link to={`/dashboard/${this.props.match.params.id}/transactions/${transaction.id}`}>
                        <p>Date: {transaction.date}</p>
                        <p>Time: {transaction.time}</p>
                        <p>Amount: {transaction.amount}</p>
                        <p>Type: {transaction.type}</p>
                    </Link>
                </div>
            )
        });

        const filteredTransactionArray = this.state.filteredTransactionArray;
        const filteredTransactions = filteredTransactionArray.map(transaction => {
            return(
                <div key={transaction.id} className="transaction-div">
                    <Link to={`/dashboard/${this.props.match.params.id}/transactions/${transaction.id}`}>
                        <p>Date: {transaction.date}</p>
                        <p>Time: {transaction.time}</p>
                        <p>Amount: {transaction.amount}</p>
                        <p>Type: {transaction.type}</p>
                    </Link>
                </div>
            )
        })

        return(
            <div className="transactions-wrapper">
                <h2>My Transactions</h2>
                <div>
                    <button value="" onClick={this.transactionTypeFilter}>All</button>
                    <button value="personal" onClick={this.transactionTypeFilter}>Personal</button>
                    <button value="business" onClick={this.transactionTypeFilter}>Business</button>
                    <button value="charity" onClick={this.transactionTypeFilter}>Charitable Donations</button>
                    <button value="other" onClick={this.transactionTypeFilter}>Other</button>
                </div>
                <div className="transactions-container">
                    {this.state.filter ? filteredTransactions : transactions}
                </div>
            </div>
            
        )
    }
}

export default MyTransactions;

// Just a thought: Perhaps transactions 