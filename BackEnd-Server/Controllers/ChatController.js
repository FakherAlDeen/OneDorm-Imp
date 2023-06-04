const {CreateChat} = require("../DatabaseMethods/ChatMethods"); 

class ChatController {
    static async CreateChat(req, res) {
        try{
            const body = req.body;
            const newChat = {
                ChatId: body.ChatId,
                UserId: body.UserId,
                ChatArr: [],
                CreatedAt:body.CreatedAt,
            }
            const chat = await CreateChat(newChat);
            res.status(201).send(chat[0]);
        }catch(e){
            res.status(403).send(err);
            console.log(err);
        }
    }
}

module.exports = ChatController;