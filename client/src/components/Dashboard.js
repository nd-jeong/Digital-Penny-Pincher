import React, { Component } from "react";
// import {Link} from "react-router-dom";
import KeypadButtons from "./KeypadButtons";
import NavDashboard from "./NavDashboard";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons: ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"],
      readout: ""
    };
    this.updateReadout = this.updateReadout.bind(this);
  }

  updateReadout = button => {
    if (button === "del") {
      let newReadout = this.state.readout;
      newReadout = newReadout.split("");
      newReadout.pop();
      newReadout = newReadout.join("");
      this.setState({
        readout: newReadout
      });
    } else {
      this.setState({
        readout: this.state.readout + button
      });
    }
  };

  render() {
    let buttons = this.state.buttons;
    let readout = this.state.readout;
    return (
      <div className="dashboard-container">

        <div className="dashboard-nav">
          <div>Nav goes here</div>
        <NavDashboard />

        </div>
        
        <div className="keypad-container">
          <div className="dashboard-summary">
            <div>Current Month balance: $1500 (Limit: $3000)</div>
            <br></br>
            <div>Daily Budget: (formula: available budget/days left in month)</div>
          </div>
          
          {/* <div className="dashboard-daily-budget"> Daily Budget: (formula: available budget/days left in month) </div> */}
          
          <div className="read-out"> {readout} </div>
          {buttons.map(button => (
            <KeypadButtons
              key={button}
              value={button}
              update={this.updateReadout}
            />
          ))}
          <div className="transaction-type-container">
              <button className="personal"> Personal </button>
              <button className="business"> Business </button>
              <button className="charity"> Charitable Donations </button>
              <button className="other"> Other </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
