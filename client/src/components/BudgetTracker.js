import React, { Component } from "react";
import axios from "axios";
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import NavDashboard from './NavDashboard';
import { Link } from 'react-router-dom';

class BudgetTracker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            transaction: [],
            currentBalance: 0,
            dailyBudget: 0,
            personalTransactions: [],
            businessTransactions: [],
            chartiyTransactions: [],
            otherTransactions: [],
            personalTotal: 0,
            businessTotal: 0,
            charityTotal: 0,
            otherTotal: 0
        }

        this.totalTransactions = this.totalTransactions.bind(this);
        this.sortTransactions = this.sortTransactions.bind(this);
        this.addTransactionAmounts = this.addTransactionAmounts.bind(this);
    }

    async componentDidMount() {
        const userInfo = await axios.get(`http://localhost:4567/users/${this.props.match.params.id}`);
        const user = userInfo.data

        const transactionList = await axios.get(`http://localhost:4567/transactions/${this.props.match.params.id}`);
        const transaction = transactionList.data;

        this.setState({
            user,
            transaction
        });
        this.totalTransactions();
        this.sortTransactions();
        this.addTransactionAmounts();
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

    sortTransactions() {
        const personalArray = [];
        const businessArray = [];
        const charityArray = [];
        const otherArray = [];

        this.state.transaction.map(transaction => {
            if (transaction.type === 'personal') {
                return personalArray.push(transaction);
            } else if (transaction.type === 'business') {
                return businessArray.push(transaction);
            } else if (transaction.type === 'charity') {
                return charityArray.push(transaction);
            } else {
                return otherArray.push(transaction)
            }
        });

        this.setState({
            personalTransactions: personalArray,
            businessTransactions: businessArray,
            chartiyTransactions: charityArray,
            otherTransactions: otherArray
        });
    }

    addTransactionAmounts() {
        let personalTotal = 0;
        let businessTotal = 0;
        let charityTotal = 0;
        let otherTotal = 0;

        this.state.personalTransactions.map(transaction => {
            const amount = parseFloat(transaction.amount);
            return personalTotal = amount + personalTotal;
        });
        console.log(personalTotal);

        this.state.businessTransactions.map(transaction => {
            const amount = parseFloat(transaction.amount);
            return businessTotal = amount + businessTotal;
        });

        this.state.chartiyTransactions.map(transaction => {
            const amount = parseFloat(transaction.amount);
            return charityTotal = amount + charityTotal;
        });

        this.state.otherTransactions.map(transaction => {
            const amount = parseFloat(transaction.amount);
            return otherTotal = amount + otherTotal;
        });

        this.setState({
            personalTotal,
            businessTotal,
            charityTotal,
            otherTotal
        });
    }

    render() {

        let user = this.state.user;
        const remainingBudget = user.limit - this.state.currentBalance;

        const data = [
            { title: "Personal", value: this.state.personalTotal, color: '#FF7A86' },
            { title: "Business", value: this.state.businessTotal, color: '#0AFFB7' },
            { title: "Charitable Donation", value: this.state.charityTotal, color: '#F5F3F3' },
            { title: "Other", value: this.state.otherTotal, color: '#77BEDB' },
            {title: "Remaining Budget", value: remainingBudget, color: '#E1C076'}
        ];

        return (

            <div className="budget-container">
                <NavDashboard
                    user={this.state.user}
                />
                <h2>Budget Tracker Activity</h2>
                <div>Current Month Balance: ${this.state.currentBalance} </div>
                <div>Remaining Monthly Budget: ${remainingBudget} </div>

                <div className="edit-budget"> Monthly Limit: ${user.limit} 
                <button><Link className="edit-limit" to={`/dashboard/:id/profile/edit`}> Edit </Link></button>
                </div>
                
                <br></br>
                
                <div className='piechart-legend'>
                    <div className='legend-personal'></div>
                    <p>Personal</p>
                    <div className='legend-business'></div>
                    <p>Business</p>
                    <div className='legend-charity'></div>
                    <p>Charitable Donation</p>
                    <div className='legend-other'></div>
                    <p>Other</p>
                    <div className='legend-budget'></div>
                    <p>Remaining Budget</p>
                </div>
                <div>
                    <ReactMinimalPieChart
                        data={data}
                        style={{ height: '350px' }}
                        label
                        labelStyle={{
                            fontSize: '6px',
                            fontFamily: 'sans-serif'
                        }}
                        radius={42}
                        labelPosition={112}
                        animate
                        lineWidth={20}
                        paddingAngle={5}
                        lengthAngle={-360}
                        animationDuration={1500}
                    />
                </div>
            </div>
        )
    }
}

export default BudgetTracker;