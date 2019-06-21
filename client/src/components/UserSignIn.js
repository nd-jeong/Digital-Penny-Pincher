import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class UserSignIn extends Component {
    constructor() {
        super();

        this.state = {
            userArray: []
        }
    }

    async componentDidMount() {
        const getUsers = await axios.get('/users');

        this.setState({
            userArray: getUsers.data
        });
    }

    render() {
        const users = this.state.userArray.map(user => {
            return <Link to={`/dashboard/${user.id}`} key={user.id}>{user.name}</Link>
        })
        return(
            <div>
                {users}
            </div>
        )
    }
}

export default UserSignIn; 