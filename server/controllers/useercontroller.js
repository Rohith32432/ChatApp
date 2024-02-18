const User = require('../models/usermodel')
const jwt=require('jsonwebtoken')
const bcrypt =require('bcrypt')
const nodemailer=require('nodemailer')
function createtoken(id){
    return   jwt.sign( {id}, process.env.secret,{
        expiresIn:"1d"
    })
    
}
async function createmail(data){
  const transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure:false,
    auth: {
        user: '2100032432cseh@gmail.com',
        pass: 'ffekkospetxnqvnm'
    }
})

const info = await transporter.sendMail({
  from: '2100032432cseh@gmail.com', // sender address
  to: data.email, // list of receivers
  subject: `Hi ${data.name}`, // Subject line
  text: "Hello world?", // plain text body
  html: `<h2 align='center'>welcome to lets  talk</h2>
  <img src="${data.pic}" alt=""  height="100px"/>`, // html body
  amp: ``
 });
}
const registerUser = async (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        res.send('already exists')
    }
   
    const hashedPassword = bcrypt.hashSync(password.toString(), 10);
    const user = await User.create({
        name,
        email,
      password:  hashedPassword,
        pic,
    });

  
    if (user) {
      createmail()
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token:createtoken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
};

const loginuser= async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email: email})
   
    const de= bcrypt.compareSync(password, user.password)
    // user.token=createtoken(user._id)
    if(de){
      console.log(user);
    createmail(user)
    res.status(201).json({
        _id: user._id, 
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: createtoken(user._id),
      });}
    else res.send('error')
}



const allUsers = async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  };

module.exports = { registerUser,loginuser,allUsers,createtoken,createmail };