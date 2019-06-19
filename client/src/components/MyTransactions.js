import React, { Component } from "react";
import axios from 'axios';

class MyTransactions extends Component {
    constructor() {
        super();

        this.state = {
            transactionArray: []
        }
    }

    async componentDidMount() {
        const res = await axios.get(`http://localhost:4567/transactions/${this.props.match.params.id}`);

        this.setState({
            transactionArray: res.data
        });
    }

    render() {
        const transactionArray = this.state.transactionArray;
        const transactions = transactionArray.map(transaction => {
            return(
                <div key={transaction.id}>
                    <p>{transaction.date}</p>
                    <p>{transaction.time}</p>
                    <p>{transaction.amount}</p>
                    <p>{transaction.type}</p>
                </div>
            )
        })
        return(
            <div className="transactions-container">
                 Transations(container)
                {transactions}
            </div>
        )
    }
}

export default MyTransactions;