import React, { Component } from "react"



export default class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            Username: "",
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
        const { Username, Email, Password } = this.state;
        const obj = {
            username:Username, 
            email:Email, 
            password:Password
        }
        fetch("http://localhost:8000/signup", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }

        }).then((res) => {
            res.json().then((data) => {
                console.log(data)
            })
        }).catch((data) => {
            console.log(data, "")
        })
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.Username} onChange={this._changeHeandler.bind(this)} name="Username" placeholder="Username" />
                <br />
                <input type="text" value={this.state.Email} onChange={this._changeHeandler.bind(this)} name="Email" placeholder="Email" />
                <br />
                <input type="text" value={this.state.Password} onChange={this._changeHeandler.bind(this)} name="Password" placeholder="Password" />
                <br />
                <button onClick={this.signUp.bind(this)} >Sign up</button>
                
            </div>
        )
    }
}