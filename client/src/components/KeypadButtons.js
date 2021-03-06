import React, { Component } from "react";

class KeypadButtons extends Component {
    
    handleClick = () => {
        this.props.update(this.props.value);
    }

    render() {
        return (
            <div className="keypad-buttons" onClick={this.handleClick}>
                {this.props.value}
            </div>
        )
    }
}

export default KeypadButtons;