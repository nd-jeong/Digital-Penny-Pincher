import React, { Component } from "react";
import axios from "axios";

class BudgetTracker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userLimit: 0,
            balance: 0,
            dailyBudget: 0
        }
    }

    async componentDidMount() {
        const userInfo = await axios.get(`http://localhost:4567/users/${this.props.match.params.id}`);
        const userLimit = userInfo.data.limit
        console.log(userLimit)
        

        const transactionInfo = await axios.get(`http://localhost:4567/transactions/${this.props.match.params.id}`);
        const transaction = transactionInfo.data
        console.log(transaction)

        this.setState({
            userLimit,
            transaction
        })
    }

    totalTransactions(){}

    


    render() {
        return(
        <div>
            <div className="budget-container"> Budget Tracker Activity (container) </div>
            <div>Current Month Balance: {this.props.balance}</div>
        </div>
        )
    }
}

export default BudgetTracker;