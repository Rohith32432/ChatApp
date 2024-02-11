const User = require('../models/usermodel')
const jwt=require('jsonwebtoken')
const bcrypt =require('bcrypt')
 
function createtoken(id){
    return   jwt.sign( {id}, process.env.secret,{
        expiresIn:"1d"
    })
    
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
    if(de)
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: createtoken(user._id),
      });
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

module.exports = { registerUser,loginuser,allUsers,createtoken };