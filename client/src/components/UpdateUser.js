import React, { Component } from "react";
import axios from "axios";

class UpdateUser extends Component {
    constructor(){
        super();
        this.state = {
            limit: 0,
            name: "",
            email: "",
            phoneNumber: ""
        }
    }
}


export default UpdateUser;

// const andy = await User.create({
//     name: "Andy Jeong",
//     email: "andyj@fakemail.com",
//     phoneNumber: "000-000-0000",
//     limit: 1000