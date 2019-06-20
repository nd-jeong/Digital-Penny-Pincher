import React, { Component } from "react";
import { Link } from "react-router-dom";


class LandingPage extends Component {
  render() {
    return (
      <div className="landing-container">

          <h2 style={{ padding: "10px 20px", textAlign: "center", color: "lightgreen"}}>Digital Penny Pincher</h2>
          <div className='landing-button-container'>
            <Link to='/createuser' className='landing-button'>Create User</Link>
            <Link to='/signin' className='landing-button'>Sign In</Link>
          </div>
        

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
