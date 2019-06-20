import React, { Component } from "react";
import axios from "axios";

class BudgetTracker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            transaction: [],
            currentBalance: 0,
            dailyBudget: 0
        }
        this.totalTransactions = this.totalTransactions.bind(this);
    }

    async componentDidMount() {
        const userInfo = await axios.get(`http://localhost:4567/users/${this.props.match.params.id}`);
        const user = userInfo.data        

        const transactionList = await axios.get(`http://localhost:4567/transactions/${this.props.match.params.id}`);
        const transaction = transactionList.data
        console.log(transaction)

        this.setState({
            user,
            transaction
        });
        this.totalTransactions()
    }

    totalTransactions() {
        const transactionArray = this.state.transaction
        const amountArray = []
        console.log(amountArray)
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        for (let i = 0; i < transactionArray.length; i++) {
            let transaction = transactionArray[i].amount
            transaction = Number.parseFloat(transaction)
            amountArray.push(transaction);
        }
        const currentBalance = amountArray.reduce(reducer);
        const roundedCurrentBalance = Math.floor(currentBalance * 100) / 100; // Rounds the balance to the first two integers after the decimal
        console.log(roundedCurrentBalance)
        this.setState({
            currentBalance: roundedCurrentBalance
        });
        
    }

    


    render() {

        let user = this.state.user;

        return(
        
            <div className="budget-container"> 
                <h2>Budget Tracker Activity (container)</h2>
                <div>Current Month Balance: ${this.state.currentBalance} </div>
                <div>Remaining Monthly Budget: ${user.limit - this.state.currentBalance} </div>
                <div>Monthly Limit: ${user.limit} </div>
                <br></br>
                <div>(Set SMS budget alerts in this component)</div>
                <div>(Include spending category totals here or in transactions)</div>
            </div>
        )
    }
}

export default BudgetTracker;