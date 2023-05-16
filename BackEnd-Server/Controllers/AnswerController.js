const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../MiddleWare/auth");
const { v4: uuidv4 } = require('uuid');
const { CreateQuestion,FindOneQuestionRecord, EditQuestion } = require("../DatabaseMethods/QuestionMethods");
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
              CreatedBy,
              AnswerDetails,
              AnswerDetailsHTML
            }
            await CreateAnswer(answer)
            if(Type == 'Answer'){
                EditAnswer(Id , {$push: { AnswersList: AnswerId }})
            }
            else if(Type == 'Question'){
                EditQuestion(Id , {$push: { AnswersList: AnswerId }})
            }
            EditUser(CreatedBy , {$push: {AnswersList : AnswerId }} )
            console.log("reqqqq");
            res.status(201).send(answer)
        } catch (err) {
            res.status(403).send(err) 
            console.log(err);
        }
      }
      static async GetAnswer(req, res){
        try{
          const Id = req.params.Id;
          console.log (Id);
          const AnswerData = await FindOneAnswerRecord({AnswerId:Id});
          console.log (AnswerData[0]);
          if (AnswerData.length == '0') return res.status(400).send("Answer Not Found!");
          const UserData = await FindOneUserRecord({UserId:AnswerData[0].CreatedBy})
          if (UserData.length == '0') return res.status(400).send("User Not Found!");
          let data = {AnswerData:AnswerData[0],UserData:{
            Fname:UserData[0].Fname,
            Lname:UserData[0].Lname,
          }};
          console.log (data);
          res.status(200).send(data);
        }
        catch (err) {
          res.status(403).send(err) 
          console.log(err);
        }
      }

}

module.exports = AnswerController;