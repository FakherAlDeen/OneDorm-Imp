const { v4: uuidv4 } = require('uuid');
const { EditQuestion } = require("../DatabaseMethods/QuestionMethods");
const { CreateAnswer, EditAnswer, FindOneAnswerRecord } = require("../DatabaseMethods/AnswerMethods");
const { EditUser } = require("../DatabaseMethods/UserMethods");
const {FindOneUserRecord} = require("../DatabaseMethods/UserMethods");

class AnswerController {
    static async CreateAnswer(req, res){
        try{// connect it to hashtags table and user table
            const { CreatedBy, AnswerDetails , AnswerDetailsHTML , Id , Type } = req.body; // loop over hashtags -> find -> 
            if (!(CreatedBy && AnswerDetails && AnswerDetailsHTML && Id && Type)) {
              return res.status(400).send("Send all the fields");
            }
            let AnswerId = uuidv4()
            const answer = {
              AnswerId,
              ParentId:Id,
              CreatedBy,
              AnswerDetails,
              AnswerDetailsHTML
            }
            await CreateAnswer(answer)
            if(Type == 'Answer'){
                EditAnswer(Id , {$push: { AnswersList: AnswerId }})
            }
            else if(Type == 'Question'){
                EditQuestion(Id , {$push: { AnswersList: AnswerId } , $inc : {AnswerCount : 0.1} })
            }
            EditUser(CreatedBy , {$push: {AnswersList : AnswerId }} )
            res.status(201).send(answer)
        } catch (err) {
            res.status(403).send(err) 
            console.log(err);
        }
      }

      static async GetAnswer(req, res){
        try{
          const Id = req.params.Id;
          const AnswerData = await FindOneAnswerRecord({AnswerId:Id});
          if (AnswerData.length == '0') return res.status(400).send("Answer Not Found!");
          const UserData = await FindOneUserRecord({UserId:AnswerData[0].CreatedBy})
          if (UserData.length == '0') return res.status(400).send("User Not Found!");
          let data = {AnswerData:AnswerData[0],UserData:{
            Fname:UserData[0].Fname,
            Lname:UserData[0].Lname,
          }};
          res.status(200).send(data);
        }
        catch (err) {
          res.status(403).send(err) 
          console.log(err);
        }
      }
      
      static async EditAnswer(req, res){
        try{
          const { Id , Data } = req.body;
          if (!Id || JSON.stringify(Data) === "{}") {
            return res.status(400).send("Send all the fields");
          }
          await EditAnswer(Id , Data);
          res.status(201).send("Answer edited");
        } catch (err) {
            res.status(403).send(err) 
            console.log(err);
        }
      }

}

module.exports = AnswerController;