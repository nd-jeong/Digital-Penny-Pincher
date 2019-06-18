import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavDashboard extends Component {
  render() {
    return (
      <div className="dashboard-nav-container">
        <div>Icon here?</div>
        <Link to={"/dashboard/profile"}> Profile Settings </Link>
        <Link to={"/dashboard/budget"}>My Budget Activity</Link>
        <Link to={"/dashboard/creditcards"}>Add/Remove Credit Card</Link>
        {/* The "sign out" link redirects to LandingPage (temporary placeholder until we incorporate auth) */}
        <Link to={"/"}>Sign out</Link>
      </div>
    );
  }
}

export default NavDashboard;
