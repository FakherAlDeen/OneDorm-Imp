const { EditUser, DeleteUser, FindOneUserRecord} = require("../DatabaseMethods/UserMethods");
const bcrypt = require("bcryptjs");

class UserController {
    static async GetUser(req, res) {
        try{
            const UserId = req.params.Id;
            const User= await FindOneUserRecord ({UserId});
            res.status(201).send(User[0]);
        }
        catch (err){
            res.status(403).send(err) 
            console.log(err);
        }
    }
    static async DeleteUser(req, res) {
        try{
            const {UserId} = req.body ; 
            if(!UserId){
                return res.status(400).send("Send all the fields");
            }
            await DeleteUser(UserId)
        }
        catch (err){
            res.status(403).send(err);
        }
    }
    static async AddHastags(req , res){
        try{
            const {UserId , Hashtags} = req.body ;
            if (!UserId || Hashtags.length == 0) {
                return res.status(400).send("Send all the fields");
            }
            await EditUser(UserId , {$push : { CategoriesList : {$each : Hashtags}}})
            res.status(201).send("done")
        }
        catch(err){
            res.status(400).send(err)
            console.log(err)
        }
    }
    static async EditProfile(req , res){
        try{
            
            const {UserId , Data} = req.body ;
            if (!UserId || JSON.stringify(Data) === "{}") {
                return res.status(400).send("Send all the fields");
            }
            await EditUser(UserId , Data)
            res.status(201).send("done")
        }
        catch(err){
            res.status(400).send(err)
            console.log(err)
        }
    }   
    static async SetUsername(req , res){
        try{
            const {UserId , Username} = req.body ;
            if (!(UserId && Username)) {
                return res.status(400).send("Send all the fields");
            }
            const User = await FindOneUserRecord({Username});
            if(User.length == 0){
                await EditUser(UserId , {Username})
                return res.status(201).send("done")
            }
            else{
                return res.status(200).send("Username is taken")
            }
        }
        catch(err){
            res.status(400).send(err)
            console.log(err)
        }
    }
    static async ChangePassword(req , res){
        try{
        
            const {UserId , OldPassword , NewPassword} = req.body ;
            const User = await FindOneUserRecord({UserId}) ;
            if(User.length == 0){
                return res.status(401).send("User not found");
            }
            const Password = User[0].Password;
            // console.log(OldPassword , NewPassword , Password , encryptedPassword)
            if(await bcrypt.compare(OldPassword , Password)){
                const Pass = await bcrypt.hash(NewPassword, 10);
                console.log(Pass);
                await EditUser(UserId , {Password:Pass});
                return res.status(201).send("Done");
            }
            return res.status(402).send('Old Password does not match your password');
        }
        catch(err){
            res.status(400).send(err)
            console.log(err)
        }
    }
}

module.exports = UserController;