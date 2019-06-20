import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


class LandingPage extends Component {
  render() {
    return (
      <div className="landing-container">

          <h2 style={{ padding: "10px 20px", textAlign: "center", color: "lightgreen"}}>Digital Penny Pincher</h2>
        <Link to='/createuser'>Create User</Link>
        <Link to='/signin'>Sign In</Link>

  <ul className="bubbles">

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
