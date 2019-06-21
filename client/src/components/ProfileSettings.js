import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import NavDashboard from './NavDashboard';


class ProfileSettings extends Component {
    constructor() {
        super()

        this.state = {
            userToUpdate: {},
            redirect: false,
            edit: false
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    async componentDidMount() {
        const response = await axios.get(`/users/${this.props.match.params.id}`);
        const currentUser = response.data;

        this.setState({
            userToUpdate: currentUser
        })
    }

    async handleDelete() {
        await axios.delete(`/users/${this.props.match.params.id}`);

        this.setState({
            redirect: true
        });
    }

    redirect() {
        this.setState({
            edit: true
        });
    }

    render() {
        const userToUpdate = this.state.userToUpdate;

        return(
            <div className="user-profile">
                <NavDashboard
                    user={this.state.userToUpdate}
                />
                <h2> My Profile </h2>
                {this.state.redirect ? <Redirect to="/" /> : null}
                {this.state.edit ? <Redirect to={`/dashboard/${this.props.match.params.id}/profile/edit`}/> : null}
                <div> Limit: {userToUpdate.limit} </div>
                <div> Name: {userToUpdate.name} </div>
                <div> Email: {userToUpdate.email} </div>
                <div> Phone Number: {userToUpdate.phoneNumber} </div>
                <button onClick={this.redirect} className='user-profile-button'> Edit </button>
                <button onClick={this.handleDelete} className='user-profile-button'> Delete </button>
            </div>
        )
    }
}

export default ProfileSettings;

