import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class UpdateUser extends Component {
  constructor() {
    super();
    this.state = {
      limit: 0,
      name: "",
      email: "",
      phoneNumber: "",
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleChange.bind(this);
  }
  // When page loads fetch the current data and save/set it to the state:
  async componentDidMount() {
    const response = await axios.get(`/users/${this.props.match.params.id}`)
    console.log(response);
    const updateUser = response.data.updateUser
    this.setState({
      limit: updateUser.limit,
      name: updateUser.name,
      email: updateUser.email,
      phoneNumber: updateUser.phoneNumber
    });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await axios.put(
      `http://localhost:4567/users/${this.props.match.params.id}`, {
        limit: this.state.limit,
        name: this.state.name,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber
      }
    );
    this.setState({
      redirect: true
    });
  }

  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect to={`http://localhost:4567/profile/${this.props.match.params.id}`} />: null}
        <form onChange={this.handleChange} onSubmit={this.handleSubmit} >

            <input
              name="limit"
              type="number"
              placeholder="Input limit here!"
              value={this.state.limit}
            />
            <input
              name="name"
              type="text"
              placeholder="Input your name here!"
              value={this.state.name}
            />
            <input
              name="email"
              type="text"
              placeholder="Input email here!"
              value={this.state.email}
            />
            <input
              name="phoneNumber"
              type="number"
              placeholder="Input phone number here!"
              value={this.state.phoneNumber}
            />
            <br />
            <input type="submit"
            />
        </form>
      </div>
    );
  }
  
}

export default UpdateUser;


