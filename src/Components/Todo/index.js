

















import React, { Component } from 'react';
import io from "socket.io-client"

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Icon from '@material-ui/core/Icon';



const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },

    Toolbar: {
        display: "flex",

    }

};

const socket = io("http://localhost:8000")
export default class Todo extends Component {

    constructor() {
        super()
        this.state = {
            auth: true,
            anchorEl: null,
            messageArr: [],
            userArr: [],
            message: "",
            currentChatName: "",
            myName: "",
            socketID: "",
            conversetionOBJ: {},
            currentUser: {},
            UseractiveColor: "green",
            ChatactiveColor: "",


        }
    }


    async componentWillMount() {
        socket.on("connect", async () => {
            const currentUser = await JSON.parse(localStorage.getItem("currentUser"))
            currentUser.socketId = await socket.id
            this.setState({
                currentUser: currentUser
            })
            this.setState({
                socketID: socket.id,
                currentUser: currentUser
            })
        })
    }


    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        socket.on("USERS", (data) => {
            let arr = []
            data.map((val) => {
                if (val._id !== currentUser._id) {
                    arr.push(val)
                }
            })
            this.setState({
                userArr: arr
            })
        })
    }




    startChat(data) {
        const currentUser = this.state.currentUser
        const conversetion = {
            conversetionIdS: [currentUser._id, data._id],
            senderID: currentUser._id,
            receiverID: data._id,
        }


        fetch(`http://localhost:8000/createConversation`, {
            method: "POST",
            body: JSON.stringify(conversetion),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json().then(data => {
            this.setState({
                conversetionOBJ: data.data,
                messageArr: data.messages
            })
            socket.on(`GET_MESSAGE${data.data._id}`, message => {
                this.state.messageArr.push(message)
                this.setState({
                    messageArr: this.state.messageArr,
                })
            })
        })
        ).catch((err) => {
            console.log(err)
        })
    }


    sendMessage() {
        const conversetionOBJ = this.state.conversetionOBJ;
        const currentUser = this.state.currentUser
        socket.emit("SEND_MESSAGE",
            {
                message: "message",
                conversetionID: conversetionOBJ._id,
                senderID: currentUser._id,
            })
    }



    userHeandler() {
        this.setState({
            ChatactiveColor: "",
            UseractiveColor: "green"
        })
    }
    chatHeandler() {
        this.setState({
            ChatactiveColor: "green",
            UseractiveColor: ""
        })
    }

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };




    render() {
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            // <div>
            //     <div style={{ display: "flex" }} >
            //         <div style={{ width: "300px", height: "100vh", borderWidth: 1, borderColor: "#000", borderStyle: "solid", float: "left" }}  >
            //             <button onClick={this.userHeandler.bind(this)} style={{ width: "50%", backgroundColor: this.state.UseractiveColor, outline: "none", padding: 5 }} >Users</button>
            //             <button onClick={this.chatHeandler.bind(this)} style={{ width: "50%", backgroundColor: this.state.ChatactiveColor, outline: "none", padding: 5 }} >Chats</button>
            //             <div>
            //                 {this.state.userArr.map((val, inde) => {
            //                     return (
            //                         <div key={inde} >
            //                             <button
            //                                 onClick={this.startChat.bind(this, val)}
            //                                 key={inde} >{val.username}</button>
            //                         </div>
            //                     )
            //                 })}
            //             </div>
            //         </div>
            //         <div style={{ flex: 1, borderWidth: 1, borderColor: "#000", marginLeft: 10, borderStyle: "solid", float: "left" }}  >
            //             <h3>{this.state.currentChatName}</h3>
            //             <div style={{ display: "flex", flexDirection: "column", }} >
            //                 <div style={{ backgroundColor: "green", height: "90vh", overflowY: "scroll" }} >
            //                     {this.state.messageArr.map((val, inde) => {
            //                         return (
            //                             <p style={{
            //                                 padding: 10,
            //                                 backgroundColor:
            //                                     (val.senderID == this.state.currentUser._id ? "#f2f2f2" : "green"),
            //                                 color: (val.senderID == this.state.currentUser._id ? "green" : "#fff"),
            //                                 margin: 20,
            //                                 textAlign: (val.senderID == this.state.currentUser._id ? "right" : "left")
            //                             }} key={inde} >{val.message}</p>
            //                         )
            //                     })}
            //                 </div>
            //                 <div style={{ flex: 1, height: 100 }} >
            //                     <input style={{ height: 30, width: "90%" }} type="text" onChange={(ev) => this.setState({ message: ev.target.value })} value={this.state.message} placeholder="Message" />
            //                     <button onClick={this.sendMessage.bind(this)} >Send</button>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <div className={styles.root}>
                <AppBar style={{ height: 80, justifyContent: "center" }} position="relative">
                    <Toolbar style={{ display: "flex", justifyContent: "space-between" }} >
                        <Typography variant="h5" color="inherit" className={styles.grow}>Photos </Typography>
                        <Fab color="primary" aria-label="Add" >
                            <AccountCircle />
                        </Fab>
                    </Toolbar>
                </AppBar>
                <div style={{ backgroundColor: "green",   margin: "auto", }} >
                    <div style={{ backgroundColor:"red",height:"100%" }} >
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                      <div>a</div>
                    </div>
                    <div style={{backgroundColor:"green", position:"fixed", bottom:0, height:70,left:0, right:0}} >

                    </div>
                </div>
            </div>
        )
    }
}