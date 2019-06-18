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
            creditCard: [],
            transaction: [],
            totalBalance: 0,
            totalLimit: 0
        };
        this.updateReadout = this.updateReadout.bind(this);
        this.updateTotals = this.updateTotals.bind(this);
    }

    async componentDidMount() {
        const resOne = await axios.get(`http://localhost:4567/users/${this.props.match.params.id}`);
        const user = resOne.data;

        const resTwo = await axios.get(`http://localhost:4567/creditcards/${this.props.match.params.id}`);
        const creditCard = resTwo.data;

        const resThree = await axios.get(`http://localhost:4567/transactions/${this.props.match.params.id}`);
        const transaction = resThree.data;

        this.setState({
            user,
            creditCard,
            transaction
        });

        await this.updateTotals()
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

    updateTotals() {
        let creditCard = this.state.creditCard;
        let balance = [];
        let limit = [];
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        for (let i = 0; i < creditCard.length; i++) {
            if (creditCard[i].balance) {
                balance.push(creditCard[i].balance)
                console.log(balance)
            }
            if (creditCard[i].limit) {
                limit.push(creditCard[i].limit)
                console.log(limit)
            }
        }
        let totalBalance = balance.reduce(reducer);
        let totalLimit = limit.reduce(reducer);

        this.setState({
            totalBalance,
            totalLimit
        });
    }

    render() {
        let buttons = this.state.buttons;
        let readout = this.state.readout;


        return (
            <div className="dashboard-container">

                <div className="dashboard-nav">
                    <div>Nav goes here</div>
                    <NavDashboard />

                </div>

                <div className="keypad-container">
                    <div className="dashboard-summary">
                        <div>Current Month balance: ${this.state.totalBalance} (Limit: ${this.state.totalLimit})</div>
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
                        <button className="personal"> Personal </button>
                        <button className="business"> Business </button>
                        <button className="charity"> Charitable Donations </button>
                        <button className="other"> Other </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
