import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";


class ProfileSettings extends Component {
    constructor() {
        super()

        this.state = {
            userToUpdate: {},
            redirect: false
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    async componentDidMount() {
        const response = await axios.get(`http://localhost:4567/users/${this.props.match.params.id}`)
        console.log(response)
        const currentUser = response.data
        this.setState({
            userToUpdate: currentUser
        })
    }

    async handleDelete() {
        await axios.delete(`http://localhost:4567/users/${this.props.match.params.id}`) // also written as: {this.state.userToShow.id}
        // Update state to intialize redirect
        this.setState({
            redirect: true
        })
    }


    render() {
        const userToUpdate = this.state.userToUpdate
        return(
            // <div className="profile-container"> Profile (container) </div>
            <div>
                {this.state.redirect ? <Redirect to="/" /> : null}
                <div> Limit: {userToUpdate.limit} </div>
                <div> Name: {userToUpdate.name} </div>
                <div> Email: {userToUpdate.email} </div>
                <div> Phone Number: {userToUpdate.phoneNumber} </div>
                <button><Link to={`/dashboard/${this.props.match.params.id}/profile/edit/`}> edit </Link></button>
                <button onClick={this.handleDelete}> delete </button>
                
            </div>
           
        )
    }
}

export default ProfileSettings;

