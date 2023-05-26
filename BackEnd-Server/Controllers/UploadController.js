const fs = require("fs");
const { EditUser,FindOneUserRecord } = require("../DatabaseMethods/UserMethods");

class UploadController {
    static async UploadImage(req, res) {
        try{
            console.log("wtv",req.body.UserId)
            // console.log("file",req.file)
            const img = fs.readFileSync(req.file.path);
            const encode_img = img.toString('base64');
            const final_img = {
                contentType:req.file.mimetype,
                image:new Buffer(encode_img,'base64')
            };
            await EditUser(req.body.UserId,{Image:final_img})
            console.log (final_img);
            res.status(201).send("Done!")
        }catch(err){
            res.status(403).send(err) 
            console.log (err);
        }
    }
    static async GetImage(req, res) {
        try{
            console.log("wtv",req.params.UserId)
            const user = await FindOneUserRecord({UserId:req.params.UserId})
            console.log (user[0].Image);
            res.status(201).send(user[0].Image);
        }catch(err){
            res.status(403).send(err) 
            console.log (err);
        }
    } 
}
module.exports = UploadController;