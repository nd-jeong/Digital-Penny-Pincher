import React, { Component } from "react";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-container">
        <Link to="/dashboard"> Dashboard </Link>
      </div>
    );
  }
}

export default LandingPage;
