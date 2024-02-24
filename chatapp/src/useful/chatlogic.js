export const getSender = (loggedUser, users) => {

     return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;

};
export const getpic=(loggeduser,users)=>{
     return users[0]._id===loggeduser._id?users[1].pic:users[0].pic
}
export const filteruser = (name, chart) => {
<<<<<<< HEAD
     let userNames = chart
         .filter((chat) => {
             const user = chat.users[1].name.toLowerCase();
             return user.includes(name);
         })
         .map((chat) => chat); 
     return userNames;
=======
     const copy=chart
     let userNames = copy
         .filter((chat) => {
             const user = chat.users[1].name.toLowerCase(); // Get the name of the second user in the chat
             return user.includes(name); // Check if the name includes the input value
         })
         .map((chat) => chat); // Extract the name of the second user from filtered chats
     return userNames; // Return the array of user names
>>>>>>> 23a8fa8c79254c72cb64b15af1d2e2e3f376a395
 };
 
export const getSenderFull = (loggedUser, users) => {
     return users[0]._id === loggedUser._id ? users[1] : users[0];
};
export const isSameUser = (messages, m, i) => {
     return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
export const isSameSenderMargin = (messages, m, i, userId) => {
     // console.log(i === messages.length - 1);

     if (
          i < messages.length - 1 &&
          messages[i + 1].sender._id === m.sender._id &&
          messages[i].sender._id !== userId
     )
          return 33;
     else if (
          (i < messages.length - 1 &&
               messages[i + 1].sender._id !== m.sender._id &&
               messages[i].sender._id !== userId) ||
          (i === messages.length - 1 && messages[i].sender._id !== userId)
     )
          return 0;
     else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
     return (
       i < messages.length - 1 &&
       (messages[i + 1].sender._id !== m.sender._id ||
         messages[i + 1].sender._id === undefined) &&
       messages[i].sender._id !== userId
     );
   };


export const isLastMessage = (messages, i, userId) => {
     return (
          i === messages.length - 1 &&
          messages[messages.length - 1].sender._id !== userId &&
          messages[messages.length - 1].sender._id
     );
};