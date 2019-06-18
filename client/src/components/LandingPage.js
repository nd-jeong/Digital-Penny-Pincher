import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class LandingPage extends Component {
    constructor() {
        super();

        this.state= {
            users: []
        }
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4567/users');

        this.setState({
            users: res.data
        });
    }

  render() {
      const users = this.state.users.map(user => {
        return <Link to={`/dashboard/${user.id}`}>{user.name}</Link>
      });
    return (
      <div className="landing-container">
        <Link to="/dashboard"> Dashboard </Link>
        {users}
      </div>
    );
  }
}

export default LandingPage;
