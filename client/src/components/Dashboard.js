import React, { Component } from "react";
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
        let date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
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

        if (transactionArray.length > 0) {
            for (let i = 0; i < transactionArray.length; i++) {
                let transaction = transactionArray[i].amount;
                transaction = Number.parseFloat(transaction);
                amountArray.push(transaction);
            }

            const balance = amountArray.reduce(reducer);
            const roundedBalance = Math.floor(balance * 100) / 100;

            this.setState({
                balance: roundedBalance
            });
        }
    }

    render() {
        let buttons = this.state.buttons;
        let readout = this.state.readout;
        let user = this.state.user;

        return (
            <div className="dashboard-container">
                <NavDashboard
                    user={this.state.user}
                />
                <div className="dashboard-summary">
                    <div className='dashboard-info'>
                        <p>Current Month balance: ${this.state.balance} (Limit: ${user.limit})</p>
                    </div>
                    <div className='dashboard-info'>
                        <p>Remaining Monthly Budget: ${user.limit - this.state.balance} </p>
                    </div>
                </div>
                <div className="keypad-container">
                    <div className="read-out"> {readout} </div>
                    <div className="keypad-num-container">
                        {buttons.map(button => (
                            <KeypadButtons
                                key={button}
                                value={button}
                                update={this.updateReadout}
                            />
                        ))}
                    </div>
                </div>
                <div className="transaction-type-container">
                    <button className="personal" value='personal' onClick={this.setTransactionInfo}> Personal </button>
                    <button className="business" value='business' onClick={this.setTransactionInfo}> Business </button>
                    <button className="charity" value='charity' onClick={this.setTransactionInfo}> Charitable Donations </button>
                    <button className="other" value='other' onClick={this.setTransactionInfo}> Other </button>

                    
                            {/* <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                            <a href="#">
                                <button className="charity" value='charity' onClick={this.setTransactionInfo}> Charitable Donations </button>
                          <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                        <a href="#">
                            <button className="business" value='business' onClick={this.setTransactionInfo}> Business </button>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                        <a href="#">
                            <button className="other" value='other' onClick={this.setTransactionInfo}> Other </button>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>  */}
                    </div>
            </div>
        );
    }
}

export default Dashboard;


