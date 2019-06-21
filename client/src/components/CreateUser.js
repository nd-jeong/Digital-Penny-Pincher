import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

class CreateUser extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            phoneNumber: '',
            limit: 0,
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        await axios.post(`http://localhost:4567/users/create`, {
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            limit: this.state.limit
        });

        this.setState({
            redirect: true
        });
    }


    render() {
        return(
            <div>
                <h2 className='signup-title'>Sign Up</h2>
                {this.state.redirect ? <Redirect to='/signin'/> : null}
                <div>
                    <form onSubmit={this.handleSubmit} className='create-user-form'>
                        <label className='create-user-label'>Name</label>
                        <input name='name' type='text' onChange={this.handleChange} value={this.state.name} placeholder='Enter your name'></input>
                        <label className='create-user-label'>Email</label>
                        <input name='email' type='email' onChange={this.handleChange} value={this.state.email} placeholder='Enter your email'></input>
                        <label className='create-user-label'>Phone Number (Optional)</label>
                        <input name='phoneNumber' type='text' onChange={this.handleChange} value={this.state.phoneNumber} placeholder='Enter your phone number'></input>
                        <label className='create-user-label'>Spending Limit</label>
                        <input name='limit' type='number' onChange={this.handleChange} value={this.state.limit}></input>
                        <input type='submit' className='create-user-submit'></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateUser;