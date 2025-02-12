const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const { registerUser } = require('./controllers/useercontroller');
const userrouter = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatroutes');
const msgroutes = require('./routes/messagerouter');
const path=require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
app.use(cors())
app.use(express.json())
main().catch(err => console.log(err));

async function main() {
  const url= String( process.env.mongo_url)
  // console.log(url);
  await mongoose.connect(url);
  console.log('DB Connected successfully ');
}

app.get("/", (req, res) => {
  res.send("API is running..");
});

app.use('/api/user', userrouter)
app.use("/api/chat", chatRoutes);
app.use('/api/messages', msgroutes)
const port=process.env.port||5000
const server=  app.listen(port, () => {
  console.log(`conteted to port ${port}` );
})

//-------------------------------------//
const __dirname1 = path.resolve('..');
console.log(__dirname1);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/chatapp/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "chatapp", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//------------------------//
 
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.ui,
    // credentials: true,   
  }, 
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.on('bot message',(botmsg)=>{
      var chat=botmsg.msg
      socket.in('bot').emit("bot recieved", chat);

  })

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});