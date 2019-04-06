// const express = require("express")
// const app = express()
// const socket = require("socket.io")
// const Todo = require("./Modals/TodoModal")
// const mongoose = require("mongoose")
// const server = app.listen(8000)
// const cors =  require("cors");
// mongoose.connect("mongodb://quizapp:maaz1234@ds227664.mlab.com:27664/quiz_data");
// const io = socket(server)
// const bodyParser =  require("body-parser")

// => CREATE CONNECTION BETWEEN SOCKET.IO AND SERVER

// // => CREATE CONNECTION 
// io.on("connection", (socket) => {

//     // => GET ALL TODOS FROM DATABASE AND SENDING TO CLIENT
//     Todo.find().then((suc) => {
//         io.sockets.emit("GET_PREV_TODO", suc)
//     })


//     // => SAVE NEW TODO IN DATABASE AND SEND TO CLIENT
//     socket.on("ADD_TODO", (data) => {
//         const todo = new Todo({
//             todo: data.todo
//         })
//         todo.save((err, suc) => {
//             io.sockets.emit("ADD_TODO", suc)
//         })
//     })


//     // => DELETE TODO FROM DATABASE
//     socket.on("DELTE_TODO", (data) => {
//         Todo.deleteOne({ _id: data._id }, (err, suc) => {
//             io.sockets.emit("DELTE_TODO", data)
//         })
//     })

//     // =>  EDIT TODO FROM DATABASE
//     socket.on("UPDATED_TODO", (data) => {
//         Todo.updateOne({ _id: data._id }, { todo: data.todo }, (err, suc) => {
//             io.sockets.emit("UPDATED_TODO", data)
//         })
//     })
// })










// const express = require("express")
// const app = express()
// const socket = require("socket.io")
// const Todo = require("./app/Modals/TodoModal")
// const User = require("./app/Modals/Accounts")
// const mongoose = require("mongoose")
// const server = app.listen(8000)
// const cors = require("cors");
// const io = socket(server)
// const bodyParser = require("body-parser")
// mongoose.connect("mongodb://quizapp:maaz1234@ds227664.mlab.com:27664/quiz_data");


// app.use(cors())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json({ limit: "5000kb" }))



// let clients = {};
// io.on("connection", (socket) => {
//     clients[socket.id] = socket;
//     socket.on("disconnect", () => {
//         delete clients[socket.id]
//     })
// })




// app.post("/signup", (req, res) => {
//     User.find({ email: req.body.email }).exec().
//         then((user) => {
//             if (user.length >= 1) {
//                 return res.status(409).json({
//                     message: "Mail exists"
//                 })
//             } else {
//                 const user = new User({
//                     username: req.body.username,
//                     email: req.body.email,
//                     password: req.body.password
//                 })
//                 user.save().then((success) => {
//                     res.status(201).json({
//                         message: "User Created"
//                     })
//                 }).catch((err) => {
//                     res.status(500).json({
//                         error: "Somthing went wrong !"
//                     })
//                 })
//             }
//         }).catch((err) => {
//             res.send({
//                 message: "someyhing want wrong"
//             })
//         })
// })




// app.post("/signin", (req, res) => {
//     User.find({ email: req.body.email }).exec().
//         then((user) => {
//             if (user < 1) {
//                 res.status(401).json({
//                     message: "Email not found"
//                 })
//             } else if (req.body.password === user[0].password) {
//                 res.status(200).json({
//                     message: "Login Successful",
//                     user: user[0]
//                 })
//             } else {
//                 res.status(401).json({
//                     userId: "Invelid email or password !"
//                 })
//             }
//         }).catch((err) => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// })


// app.get("/getTodo", (req, res) => {
//     Todo.find({ currentUserID: req.query.acountID }).then((data) => {
//         res.send(data)
//         clients[req.query.userId].emit("GET_TODOS", data)
//     })
// })





// //  ==>> CREATE TODO
// app.post("/createTodo", (req, res) => {
//     const todo = new Todo({
//         todo: req.body.todo,
//         currentUserID: req.body.currentUserID
//     })
//     todo.save((err, suc) => {
//         clients[req.query.userId].emit("ADD_TODO", suc)
//         res.send(err || suc)
//     })
// })

// //  ==>> REMOVE 


// app.post("/removeTodo", (req, res) => {
//     console.log(req.query)
//     Todo.deleteOne({ _id: req.body._id }).then((data) => {
//         console.log(data, "-------")
//         clients[req.query.userId].email()

//     })
// })











// const express = require("express")
// const app = express()
// const socket = require("socket.io")
// const Todo = require("./app/Modals/TodoModal")
// const User = require("./app/Modals/Accounts")
// const mongoose = require("mongoose")
// const server = app.listen(8000)
// const cors = require("cors");
// const io = socket(server)
// const bodyParser = require("body-parser")
// mongoose.connect("mongodb://quizapp:maaz1234@ds227664.mlab.com:27664/quiz_data");


// app.use(cors())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json({ limit: "5000kb" }))

// const nicknames = []



// io.on("connection", (socket) => {
//     socket.on("SEND_MESSAGE", (data) => {
//         io.sockets.emit("NEW_MESSAGE", { msg: data, nick: socket.nickname })
//     })

//     socket.on("NEW_USER", (data, callback) => {
//         socket.nickname = data;
//         nicknames.push(socket.nickname);
//         uupDataname()
//     })
//     function uupDataname() {
//         io.sockets.emit("USERSNAME", nicknames);

//     }

//     socket.on("disconnect", () => {
//         if (!socket.nickname) return;
//         else {
//             nicknames.splice(nicknames.indexOf(socket.nickname), 1)
//             uupDataname()
//         }
//     })
// })
















// const express = require("express")
// const app = express()
// const socket = require("socket.io")
// const Todo = require("./app/Modals/TodoModal")
// const User = require("./app/Modals/Accounts")
// const mongoose = require("mongoose")
// const server = app.listen(8000)
// const cors = require("cors");
// const io = socket(server)
// const bodyParser = require("body-parser")
// const nicknames = []

// app.use(cors())
// app.use(bodyParser.json({ limit: "5000kb" }))
// app.use(bodyParser.urlencoded({ extended: true }))
// mongoose.connect("mongodb://quizapp:maaz1234@ds227664.mlab.com:27664/quiz_data");




// app.post("/signin", (req, res) => {
//     User.find({ email: req.body.email }).exec().
//         then((user) => {
//             if (user < 1) {
//                 res.status(401).json({
//                     message: "Email not found"
//                 })
//             } else if (req.body.password === user[0].password) {
//                 res.status(200).json({
//                     message: "Login Successful",
//                     user: user[0]
//                 })
//             } else {
//                 res.status(401).json({
//                     userId: "Invelid email or password !"
//                 })
//             }
//         }).catch((err) => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// })



// io.on("connection", (socket) => {
//     let chatuser;
//     socket.on("START_CAHT", data => {
//         chatuser = data
//         io.sockets.emit('GET_CHAT', data);
//     })


//     socket.on("SEND_MESSAGE", (data) => {
//         io.to(chatuser.id).emit('NEW_MESSAGE', { msg: data, nick: socket.nickname });

//     })

//     socket.on("NEW_USER", (data) => {
//         User.find().exec().then((users) => {
//             socket.nickname = data;
//             nicknames.push(data);
//             let a = nicknames.concat(users)
//             function getUnique(arr, comp) {
//                 const unique = arr
//                     .map(e => e[comp])
//                     .map((e, i, final) => final.indexOf(e) === i && i)
//                     .filter(e => arr[e]).map(e => arr[e]);
//                 return unique;
//             }
//             uupDataname(getUnique(a, 'email'))
//         })
//     })

//     function uupDataname(arr) {
//         io.sockets.emit("USERSNAME", arr);
//     }

//     socket.on("disconnect", () => {
//         if (!socket.nickname) return;
//         else {
//             nicknames.splice(nicknames.indexOf(socket.nickname), 1)
//             // console.log(nicknames[nicknames.indexOf(socket.nickname)].socketId)
//             // delete nicknames[nicknames.indexOf(socket.nickname)].socketId
//             uupDataname(nicknames)
//         }
//     })

// })


















const express = require("express")
const app = express()
const socket = require("socket.io")
const Message = require("./app/Modals/Message")
const User = require("./app/Modals/Accounts")
const mongoose = require("mongoose")
const server = app.listen(8000)
const cors = require("cors");
const io = socket(server);
const bodyParser = require("body-parser");
const clients = {};
const Conversation = require("./app/Modals/ConversionModal");

app.use(cors())
app.use(bodyParser.json({ limit: "5000kb" }))
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect("mongodb://quizapp:maaz1234@ds227664.mlab.com:27664/quiz_data");


app.post("/signup", (req, res) => {
    User.find({ email: req.body.email }).exec().
        then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                })
            }
            else {
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })
                user.save().then((success) => {
                    res.status(201).json({
                        message: "User Created"
                    })
                }).catch((err) => {
                    res.status(500).json({
                        error: "err"
                    })
                })

            }
        })
})


app.post("/signin", (req, res) => {
    User.find({ email: req.body.email }).exec().
        then((user) => {
            if (user < 1) {
                res.status(401).json({
                    message: "Email not found"
                })
            } else if (req.body.password === user[0].password) {
                res.status(200).json({
                    message: "Login Successful",
                    user: user[0]
                })
            } else {
                res.status(401).json({
                    userId: "Invelid email or password !"
                })

            }
        }).catch((err) => {
            res.status(500).json({
                error: err
            })
        })
})


app.post(`/createConversation`, (req, res) => {
    let obj;
    const conversation = new Conversation({
        conversetionIdS: req.body.conversetionIdS
    })
    Conversation.find().exec()
        .then((data) => {
            data.map((val) => {
                if (
                    (
                        req.body.conversetionIdS[0] === val.conversetionIdS[0]
                        &&
                        req.body.conversetionIdS[1] === val.conversetionIdS[1]
                    )
                    ||
                    (
                        req.body.conversetionIdS[0] === val.conversetionIdS[1]
                        &&
                        req.body.conversetionIdS[1] === val.conversetionIdS[0])
                ) {
                    obj = val;
                }
            })
            
            if (obj === undefined) {
                conversation.save().then((conver) => {
                    Message.find({ conversetionID: conver._id }).exec().then((messages) => {
                        res.send({
                            data: conver,
                            messages,
                            message: "Conversation has been created !",
                        })
                    })
                })
            }
            else {
                Message.find({ conversetionID: obj._id }).exec().then((messages) => {
                    res.send({
                        data: obj,
                        messages,
                        message: "Conversation alrady created !",
                    })
                })
            }



            // async function getMessage(ids) {
            //     Message.find({ conversetionID: ids._id }).exec().then((messages) => {
            //         // io.sockets.emit(`PREVE_MESSAGE${ids._id}`, messages)
            //         return messages
            //     })
            // }




            // if (data.length <= 0) {
            //     console.log(data.length)
            //     conversation.save().then((conver) => {
            //         res.send({
            //             data: conver,
            //             message: "Conversation has been created !",

            //         })
            //     })
            // }
            // else {
            //     res.send({
            //         data: data[0],
            //         message: "Conversation alrady created !"
            //     })
            // }
        })
})







io.on("connection", (socket) => {
    User.find().exec().then((snap) => {
        io.sockets.emit("USERS", snap)
    })

    // socket.on("GET_CONVERSATIONS", (data) => {
    //     Conversation.find({ conversetionIdS: { $in: [data] } }).exec().then((data) => {
    //         console.log(data)
    //     })

    // })
    clients[socket.id] = socket;
    socket.on("SEND_MESSAGE", data => {
        const message = new Message({
            message: data.message,
            conversetionID: data.conversetionID,
            senderID: data.senderID,
        })
        message.save().then((suc) => {
            io.sockets.emit(`GET_MESSAGE${suc.conversetionID}`, suc)

        })

    })


    socket.on("disconnect", () => {
        delete clients[socket.id]
    })
})















