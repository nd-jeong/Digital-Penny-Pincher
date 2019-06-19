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

    render() {
        const transaction = this.state.transaction;
        return(
            <div>
                {this.state.redirect ? <Redirect to={`/dashboard/${this.props.match.params.id}/transactions`}/> : null}
                <div>
                    <p>{transaction.date}</p>
                    <p>{transaction.time}</p>
                    <p>{transaction.amount}</p>
                    <p>{transaction.type}</p>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="number" placeholder='Enter new amount' onChange={this.handleChange} name='newAmount' value={this.state.newAmount}></input>
                    <select onChange={this.handleChange} name='newType' value={this.state.newType}>
                        <option value=''>Select new type</option>
                        <option value='personal'>Personal</option>
                        <option value='business'>Business</option>
                        <option value='charity'>Charitable Donation</option>
                        <option value='other'>Other</option>
                    </select>
                    <input type='submit'></input>
                </form>
            </div>
        )
    }
}

export default UpdateTransaction;