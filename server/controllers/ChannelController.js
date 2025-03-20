import User from "../models/UserModel.js"
import Channel from "../models/ChannelModel.js"
import mongoose from "mongoose";

export const createChannel = async (request,response,next) => {
    
    try{
          const {name, members} = request.body;
          const userID = request.userID;

          const admin = await User.findById(userID);

          if(!admin){
            return response.status(400).send("Admin User not Found");
          }

          const validMembers = await User.find({_id: {$in: members}});

          if(validMembers.length !== members.length){
            return response.status(400).send("some members are not valid users");
          }

          const newChannel = new Channel({
            name,
            members,
            admin:userID,
          });

          await newChannel.save();
          return response.status(201).json({ channel: newChannel });

        } catch(error){
            console.log({error});
            return response.status(500).send("Internal Server Error");
        }
    };



export const getUserChannels = async (request,response,next) => {
    
    try{
          const userID = new mongoose.Types.ObjectId(request.userID);
          const channels = await Channel.find({
            $or:[{admin:userID},{members:userID}],
          }).sort({updatedAt:-1});

          
         
          return response.status(201).json({ channels });

        } catch(error){
            console.log({error});
            return response.status(500).send("Internal Server Error");
        }
    };


export const getChannelMessages = async (request,response,next) => {
    
    try{
          const {channelId} = request.params;
          const channel = await Channel.findById(channelId).populate({
            path:"messages",
            populate: {
              path: "sender",
              select: "firstName lastName email _id image color"
            },
          });
          if(!channel){
            return response.status(404).send("Channel not Found");
          }
          const messages = channel.messages
         
          return response.status(201).json({ messages } );

        } catch(error){
            console.log({error});
            return response.status(500).send("Internal Server Error");
        }
    };