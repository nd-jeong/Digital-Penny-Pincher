import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class UpdateTransaction extends Component {
    constructor() {
        super();

        this.state = {
            redirect: false,
            transaction: [],
            newAmount: 0,
            newType: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteTransaction = this.deleteTransaction.bind(this);
    }

    async componentDidMount() {
        const transactionInfo = await axios.get(`http://localhost:4567/transactions/${this.props.match.params.userid}/find/${this.props.match.params.transactionid}`);
        
        this.setState({
            transaction: transactionInfo.data
        })
    }

    async handleSubmit(event) {
        event.preventDefault();

        await axios.put(`http://localhost:4567/transactions/${this.props.match.params.transactionid}`, {
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
        await axios.delete(`http://localhost:4567/transactions/${this.props.match.params.id}/delete/${this.state.transaction.id}`);

        this.setState({
            redirect: true
        });
    }

    render() {
        const transaction = this.state.transaction;
        return(
            <div>
                {this.state.redirect ? <Redirect to={`/dashboard/${this.props.match.params.id}/transactions`}/> : null}
                <div className="transaction-info-div">
                    <p><h5>Date:</h5> {transaction.date}</p>
                    <p><h5>Time:</h5> {transaction.time}</p>
                    <p><h5>Current Amount:</h5> ${transaction.amount}</p>
                    <p><h5>Current Type:</h5> {transaction.type}</p>
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