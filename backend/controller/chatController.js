const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModal");
const accesChat = asyncHandler(async(req,res)=>{
    const {userId} = req.body;

    if(!userId){
        console.log("UserId is not available");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ]
    }).populate("users","-password").populate("latesMessage");

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name email pic",
    });

    if(isChat>0){
        res.send(isChat[0]);

    }else{
        var chatData ={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id:createdChat._id}).populate(
                "users",
                "-password"
            )
            res.status(200).send(FullChat)
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})

const fetchChats = asyncHandler(async(req,res)=>{
    try {
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results =  await User.populate(results,{
                path:"latestMessage.sender",
                select:"name email pic",
            });
            res.status(200).send(results);
        })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

module.exports = {accesChat,fetchChats}