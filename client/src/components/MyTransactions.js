import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavDashboard from './NavDashboard';

class MyTransactions extends Component {
    constructor() {
        super();

        this.state = {
            transactionArray: [],
            transactionType: '',
            filter: false,
            filteredTransactionArray: [],
            user: []
        }

        this.transactionTypeFilter = this.transactionTypeFilter.bind(this);
    }

    async componentDidMount() {
        const res = await axios.get(`http://localhost:4567/transactions/${this.props.match.params.id}`);
        const user = await axios.get(`http://localhost:4567/users/${this.props.match.params.id}`);

        this.setState({
            transactionArray: res.data,
            user: user.data
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
            });
        }
    }

    render() {
        const transactionArray = this.state.transactionArray;
        const transactions = transactionArray.map(transaction => {
            return (
                <div key={transaction.id} className="transaction-div">
                    <Link to={`/dashboard/${this.props.match.params.id}/transactions/${transaction.id}`} style={{ textDecoration: 'none' }}>
                        <div>
                            <p>Date: {transaction.date}</p>
                        </div>
                        <div>
                            <p>Time: {transaction.time}</p>
                        </div>
                        <div>
                            <p>Amount: {transaction.amount}</p>
                        </div>
                        <div>
                            <p>Type: {transaction.type}</p>
                        </div>
                    </Link>
                </div>
            )
        });

        const filteredTransactionArray = this.state.filteredTransactionArray;
        const filteredTransactions = filteredTransactionArray.map(transaction => {
            return (
                <div key={transaction.id} className="transaction-div">
                    <Link to={`/dashboard/${this.props.match.params.id}/transactions/${transaction.id}`} style={{ textDecoration: 'none' }}>
                        <div>
                            <p>Date: {transaction.date}</p>
                        </div>
                        <div>
                            <p>Time: {transaction.time}</p>
                        </div>
                        <div>
                            <p>Amount: {transaction.amount}</p>
                        </div>
                        <div>
                            <p>Type: {transaction.type}</p>
                        </div>
                    </Link>
                </div>
            )
        });

        return (
            <div className="transactions-wrapper">
                <NavDashboard
                    user={this.state.user}
                />
                <h2>My Transactions</h2>
                <div>
                    <button value="" onClick={this.transactionTypeFilter} className='transaction-type-button'>All</button>
                    <button value="personal" onClick={this.transactionTypeFilter} className='transaction-type-button'>Personal</button>
                    <button value="business" onClick={this.transactionTypeFilter} className='transaction-type-button'>Business</button>
                    <button value="charity" onClick={this.transactionTypeFilter} className='transaction-type-button'>Charity</button>
                    <button value="other" onClick={this.transactionTypeFilter} className='transaction-type-button'>Other</button>
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