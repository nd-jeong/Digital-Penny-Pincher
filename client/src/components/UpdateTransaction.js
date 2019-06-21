import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import NavDashboard from './NavDashboard';

class UpdateTransaction extends Component {
    constructor() {
        super();

        this.state = {
            redirect: false,
            transaction: [],
            newAmount: 0,
            newType: '',
            user: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteTransaction = this.deleteTransaction.bind(this);
    }

    async componentDidMount() {
        const transactionInfo = await axios.get(`/transactions/${this.props.match.params.userid}/find/${this.props.match.params.transactionid}`);

        const user = await axios.get(`/users/${this.props.match.params.id}`);
        
        this.setState({
            transaction: transactionInfo.data,
            user: user.data
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        await axios.put(`/transactions/${this.props.match.params.transactionid}`, {
            amount: this.state.newAmount,
            type: this.state.newType
        });

        this.setState({
            redirect: true
        });
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    async deleteTransaction() {
        await axios.delete(`/transactions/${this.props.match.params.id}/delete/${this.state.transaction.id}`);

        this.setState({
            redirect: true
        });
    }

    render() {
        const transaction = this.state.transaction;
        return(
            <div>
                <NavDashboard
                    user={this.state.user}
                />
                {this.state.redirect ? <Redirect to={`/dashboard/${this.props.match.params.id}/transactions`}/> : null}
                <div className="transaction-info-div">
                    <h5>Date:</h5>
                    <p> {transaction.date}</p>
                    <h5>Time:</h5>
                    <p> {transaction.time}</p>
                    <h5>Current Amount:</h5>
                    <p> ${transaction.amount}</p>
                    <h5>Current Type:</h5>
                    <p> {transaction.type}</p>
                </div>
                <form onSubmit={this.handleSubmit} className='transaction-update-form'>
                    <label>Enter new transaction amount:</label>
                    <input type="number" onChange={this.handleChange} name='newAmount' value={this.state.newAmount}></input>
                    <select onChange={this.handleChange} name='newType' value={this.state.newType}>
                        <option value=''>Select new type</option>
                        <option value='personal'>Personal</option>
                        <option value='business'>Business</option>
                        <option value='charity'>Charitable Donation</option>
                        <option value='other'>Other</option>
                    </select>
                    <input type='submit'></input>
                    <button onClick={this.deleteTransaction}>Delete Transaction</button>
                </form>
            </div>
        )
    }
}

export default UpdateTransaction;