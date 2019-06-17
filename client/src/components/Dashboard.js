import React, { Component } from "react";
// import {Link} from "react-router-dom";
import KeypadButtons from "./KeypadButtons";

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
        <div className="keypad-container">
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
