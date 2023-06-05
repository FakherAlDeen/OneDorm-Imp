const {CreateChat,FindOneChatRecord} = require("../DatabaseMethods/ChatMethods"); 
const {EditUser} = require("../DatabaseMethods/UserMethods"); 

const { v4: uuidv4 } = require('uuid');
class ChatController {
    static async CreateChat(req, res) {
        try{
            const body = req.body;
            const ChatId = uuidv4();
            const newChat = {
                ChatId,
                FirstUserId: body.to,
                SecondUserId: body.from,
                ChatArr: [],
                CreatedAt:body.CreatedAt,
            }
            await CreateChat(newChat);
            await EditUser(body.to , {$push : { ChatList:ChatId }});
            await EditUser(body.from , {$push : { ChatList:ChatId }});
            res.status(201).send(newChat);
        }catch(e){
            res.status(403).send(e);
            console.log(e);
        }
    }
    static async GetChat(req, res) {
        try{
            const ChatId = req.params.Id;
            const Chat = await FindOneChatRecord({ChatId});
            res.status(201).send(Chat[0]);
        }catch(e){
            res.status(403).send(e);
            console.log(e);
        }
    }
}

module.exports = ChatController;