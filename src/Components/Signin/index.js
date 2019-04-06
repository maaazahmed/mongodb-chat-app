import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import io from "socket.io-client"



const socket = io("http://localhost:8000")


export default class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            Email: "",
            Password: ""
        }
    }

    _changeHeandler(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    signUp() {
        const { Email, Password } = this.state;
        const obj = {
            email: Email,
            password: Password
        }
        fetch("http://localhost:8000/signin", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }

        }).then((res) => {
            res.json().then((data) => {
                console.log(data)
                // socket.emit("NEW_USER", data.user)
                localStorage.setItem("currentUser", JSON.stringify(data.user))
            })
        }).catch((data) => {
            console.log(data, "")
        })
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.Email} onChange={this._changeHeandler.bind(this)} name="Email" placeholder="Email" />
                <br />
                <input type="text" value={this.state.Password} onChange={this._changeHeandler.bind(this)} name="Password" placeholder="Password" />
                <br />
                <button onClick={this.signUp.bind(this)} >Sign up</button>
            </div>
        )
    }
}