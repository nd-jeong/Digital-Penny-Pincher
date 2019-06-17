import React, { Component } from "react";
// import {Link} from "react-router-dom";
import KeypadButtons from "./KeypadButtons";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttons: ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"],
            keypadReadout: ""
        };
    }

    updateReadout = button => {
        if (button === "del") {
            let newReadout = this.state.keypadReadout;
            newReadout = newReadout.split("");
            newReadout.pop();
            newReadout = newReadout.join("");
            this.setState({
                keypadReadout: newReadout
            });
        } else {
            this.setState({
                keypadReadout: this.state.keypadReadout + button
            });
        }
    };

    render() {
        let buttons = this.state.buttons;
        let keypadReadout = this.state.keyPadReadout;
        return (
            <div className="dashboard-container">
                <div className="keypad-container">
                    <div className="read-out"> {keypadReadout} </div>
                    {buttons.map(button => (
                        <KeypadButtons 
                            key={button} 
                            value={button} 
                            update={this.updateReadout} 
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Dashboard