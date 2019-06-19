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

          <h2 style={{ padding: "10px 20px", textAlign: "center", color: "white"}}>Digital Penny Pincher</h2>
        <Link to="/dashboard"> Dashboard </Link>
        {users}

  <ul class="bubbles">

          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>

          </ul>
      </div>
    );
  }
}

export default LandingPage;
