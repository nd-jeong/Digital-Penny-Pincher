import React, { Component } from "react";
// import {Link} from "react-router-dom";
import KeypadButtons from "./KeypadButtons";
import NavDashboard from "./NavDashboard";
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttons: ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"],
            readout: "",
            user: [],
            transaction: [],
            transactionType: '',
            balance: 0,
            date: '',
            time: ''
        };

        this.updateReadout = this.updateReadout.bind(this);
        this.setTransactionInfo = this.setTransactionInfo.bind(this);
        this.totalTransactions = this.totalTransactions.bind(this);
    }

    async componentDidMount() {
        const userInfo = await axios.get(`http://localhost:4567/users/${this.props.match.params.id}`);
        const user = userInfo.data;

        // const resTwo = await axios.get(`http://localhost:4567/creditcards/${this.props.match.params.id}`);
        // const creditCard = resTwo.data;

        const transactionList = await axios.get(`http://localhost:4567/transactions/${this.props.match.params.id}`);
        const transaction = transactionList.data;

        this.setState({
            user,
            transaction
        });

        this.totalTransactions();
    }

    async componentDidUpdate() {
        if (this.state.transactionType) {
            // add error catch before updating balance
            const newTransaction = await axios.post(`http://localhost:4567/transactions/${this.props.match.params.id}/create`, {
                amount: this.state.readout,
                type: this.state.transactionType,
                date: this.state.date,
                time: this.state.time
            })
            
            const updatedTransactionArray = this.state.transaction;
            updatedTransactionArray.push(newTransaction.data.newTransaction);

            this.setState({
                transactionType: '',
                readout: '',
                transaction: updatedTransactionArray
            })

            this.totalTransactions();
        }
    }

    updateReadout = button => {
        if (button === "del") {
            let newReadout = this.state.readout;
            newReadout = newReadout.split("");
            newReadout.pop();
            newReadout = newReadout.join("");
            this.setState({
                readout: newReadout
            });
        } else {
            this.setState({
                readout: this.state.readout + button
            });
        }
    };

    setTransactionInfo(event) {
        const transactionType = event.target.value;

        // https://tecadmin.net/get-current-date-time-javascript/
        const today = new Date();
        let date = (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        
        this.setState({
            transactionType,
            date,
            time
        });

        this.totalTransactions();
    }

    totalTransactions() {
        const transactionArray = this.state.transaction;
        const amountArray = [];
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

        for (let i = 0; i < transactionArray.length; i++) {
            let transaction = transactionArray[i].amount;
            transaction = Number.parseFloat(transaction);
            amountArray.push(transaction);
        }
        
        const balance = amountArray.reduce(reducer);
        
        this.setState({
            balance
        });
    }

    render() {
        let buttons = this.state.buttons;
        let readout = this.state.readout;
        let user = this.state.user;

        return (


            <div className="dashboard-container">

                <div className="dashboard-nav">
                    <div>Nav goes here</div>
                    <NavDashboard 
                        userid={this.state.user.id}
                    />
                </div>

                <div className="keypad-container">
                    <div className="dashboard-summary">
                        <div>Current Month balance: ${this.state.balance} (Limit: ${user.limit})</div>
                        <br></br>
                        <div>Daily Budget: (formula: available budget/days left in month)</div>
                    </div>

                    {/* <div className="dashboard-daily-budget"> Daily Budget: (formula: available budget/days left in month) </div> */}

                    <div className="read-out"> {readout} </div>
                    {buttons.map(button => (
                        <KeypadButtons
                            key={button}
                            value={button}
                            update={this.updateReadout}
                        />
                    ))}
                    <div className="transaction-type-container">
                        <button className="personal" value='personal' onClick={this.setTransactionInfo}> Personal </button>
                        <button className="business" value='business' onClick={this.setTransactionInfo}> Business </button>
                        <button className="charity" value='charity' onClick={this.setTransactionInfo}> Charitable Donations </button>
                        <button className="other" value='other' onClick={this.setTransactionInfo}> Other </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
