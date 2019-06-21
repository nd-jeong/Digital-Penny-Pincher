import React, { Component } from "react";
import { slide as Menu } from 'react-burger-menu';

class NavDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="dashboard-nav-container">
                <Menu noOverlay>
                    <a id="dashboard" className="menu-item" href={`/dashboard/${this.props.user.id}`}>Dashboard</a>
                    <a id="profile" className="menu-item" href={`/dashboard/${this.props.user.id}/profile`}>Profile & Settings</a>
                    <a id="budget" className="menu-item" href={`/dashboard/${this.props.user.id}/budget`}>My Budget</a>
                    <a id="transactions" className="menu-item" href={`/dashboard/${this.props.user.id}/transactions`}>My Transactions</a>
                    <a className="menu-item" href="/">Sign Out</a>
                </Menu>
            </div>
        );
    }
}

export default NavDashboard;
