const Chat = require("../models/chatModel");
const Message = require("../models/msgmodel");
const User = require("../models/usermodel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const model=createbotinstance()
function createbotinstance(){
  const genAI = new GoogleGenerativeAI("AIzaSyAk1RWGtoLT1tSJTvL3SuL1SdP5yoFyHpo");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  return model
}
async  function gemminibot(req,res) {
  const prompt = req?.body.prompt
  const result = await model.generateContent(prompt)
  res.json({msg:  result.response.text(),prompt:prompt})
}

async function sendmessage(req,res){
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);
    
        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        message = await User.populate(message, {
          path: "chat.users",
          select: "name pic email",
        });
    
        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    
        res.json(message);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }

}

async function getallMsg(req,res){
    try {
        const messages = await Message.find({ chat: req.params.chatId })
          .populate("sender", "name pic email")
          .populate("chat");
        res.json(messages);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
}

module.exports={gemminibot,sendmessage,getallMsg}