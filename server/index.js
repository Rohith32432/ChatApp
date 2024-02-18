const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const { registerUser } = require('./controllers/useercontroller');
const userrouter = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatroutes');
const msgroutes = require('./routes/messagerouter');
app.use(cors())
app.use(express.json())
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.mongo_url);
  console.log('DB Connected successfully ');
}

app.get('/',(req,res)=>{
    res.send('welcome')
})
app.use('/api/user',userrouter)
app.use("/api/chat", chatRoutes);
app.use('/api/messages', msgroutes)

app.listen(2021,()=>{
    console.log('conteted to port 2021');
})