const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../MiddleWare/auth");
const { v4: uuidv4 } = require('uuid');
const { CreateQuestion,FindOneQuestionRecord, EditQuestion, DeleteQuestion } = require("../DatabaseMethods/QuestionMethods");
const { FindOneCategoryRecord , EditCategory , CreateCategory , EditCategoryByValue} = require("../DatabaseMethods/CategoryMethods");
const { EditUser } = require("../DatabaseMethods/UserMethods");
const { FindOneUserRecord } = require("../DatabaseMethods/UserMethods");
const { EditAnswer, FindOneAnswerRecord, DeleteAnswer } = require("../DatabaseMethods/AnswerMethods");

class QuestionController {
    static async CreatePost(req, res){
      try{// connect it to hashtags table and user table
          
          const { CreatedBy, QuestionTitle , QuestionDetails , Hashtags, QuestionDetailsHTML } = req.body; // loop over hashtags -> find -> 
          if (!(CreatedBy && QuestionTitle && QuestionDetails && QuestionDetailsHTML)) {
            return res.status(400).send("Send all the fields");
          }
          // console.log("hastags : " , Hashtags)
          let QuestionId = uuidv4()
          let categories = []
          for(let i = 0 ; i<Hashtags.length ; i++){
            const oldHashtag = await FindOneCategoryRecord({CategoryTitle:Hashtags[i]});
            let CategoryId = uuidv4() ;
            if (oldHashtag.length == 0) {
              const category = {
                CategoryId,
                CategoryTitle : Hashtags[i]
              }
              await CreateCategory(category)
            }
            else{
              CategoryId = oldHashtag[0].CategoryId
            }
            // console.log(i , CategoryId)
            categories.push(CategoryId);
            // await EditCategory(CategoryId , {$push: { PostIds: QuestionId }}  )
          }
          // console.log (QuestionDetails);
          for(let i = 0 ; i<categories.length ; i++){
            await EditCategory(categories[i] , {$push: { PostIds: QuestionId }}  )
          }
          const question = {
            QuestionId,
            CreatedBy,
            QuestionTitle,
            QuestionDetails,
            QuestionDetailsHTML,
            Hashtags // gwt_w gwt_w
          }
          await CreateQuestion(question)
          EditUser(CreatedBy , {$push: { PostList: QuestionId }} )
          console.log("reqqqq");
          
          res.status(201).send(question)
      } catch (err) {
          res.status(403).send(err) 
          console.log(err);
      }
    }
    static async GetPost(req, res){
      try{
        const Id = req.params.Id;
        // console.log (Id);
        const PostData = await FindOneQuestionRecord({QuestionId:Id});
        // console.log (PostData[0]);
        if (PostData.length == '0') return res.status(400).send("Post Not Found!");
        const UserData = await FindOneUserRecord({UserId:PostData[0].CreatedBy})
        if (UserData.length == '0') return res.status(400).send("User Not Found!");
        let data = {PostData:PostData[0],UserData:{
          Fname:UserData[0].Fname,
          Lname:UserData[0].Lname,
        }};
        // console.log (data);
        res.status(200).send(data);
      }
      catch (err) {
        res.status(403).send(err) 
        console.log(err);
      }
    }

    static Delete = async (Id , Type) => {

      console.log("ID = " , Id)
      if(Type == 0){
        let question = await FindOneQuestionRecord({QuestionId:Id});
        await DeleteQuestion(Id);
        await EditUser(question[0].CreatedBy , {$pull : {PostList : Id}})
        for(let i = 0 ; i<question[0].Hashtags.length ; i++){
          await EditCategoryByValue({CategoryTitle:question[0].Hashtags[i]} , {$pull : {PostIds : Id}});
        }
        for(let i = 0 ; i<question[0].AnswersList.length ; i++){
          // console.log("ID = " , question[0].AnswersList[i])
          await QuestionController.Delete(question[0].AnswersList[i] , 1)
        }
      }
      else{
        let answer = await FindOneAnswerRecord({AnswerId : Id}) ;
        await DeleteAnswer(Id);
        await EditUser(answer[0].CreatedBy , {$pull : {AnswersList : Id}})
        for(let i = 0 ; i<answer[0].AnswersList.length ; i++){
          // console.log("ID = " , answer[0].AnswersList[i])
          await QuestionController.Delete(answer[0].AnswersList[i] , 1)
        }
      }
    }
    
    static async DeletePost(req, res){
      try{// connect it to hashtags table and user table
          
          const { Id , Type } = req.body; // loop over hashtags -> find -> 
          if (!(Id)) {
            return res.status(400).send("Send all the fields");
          }
          QuestionController.Delete(Id , Type=='Answer') ;
          console.log("reqqqq");
          res.status(201).send("Deleted")
      } catch (err) {
          res.status(403).send(err) 
          console.log(err);
      }
    }

    static async Vote(req, res){
      try{// connect it to hashtags table and user table
          // console.log("UPPPPP")
          let { UserId , Id , Type , VoteValue} = req.body; // loop over hashtags -> find -> 
          console.log(VoteValue)
          if (!(UserId && Id && Type && VoteValue)) {
            return res.status(400).send("Send all the fields");
          }
          const user = await FindOneUserRecord({UserId});
          const temp = VoteValue;
          const obj = user[0].UserVotes ;
          if(obj[Id]){
            // console.log(obj[Id]);
            const vote = obj[Id] ;
            if(vote != VoteValue){
              VoteValue *= 2 
            }
            else{
              return res.status(201).send("Already Voted")
            }
          }
          obj[Id] = temp
          await EditUser(UserId , {$set : {UserVotes: obj} })
          // console.log(user)
          // console.log(obj)
          if(Type == "Answer"){
            EditAnswer(Id , {$inc: { AnswerVotesCount: VoteValue}} )
          }
          else if(Type == "Question"){
            EditQuestion(Id , {$inc: { QuestionVotesCount : VoteValue}} )
          }
          // console.log("reqqqq");
          res.status(201).send("Vote done")
      } catch (err) {
          res.status(403).send(err) 
          console.log(err);
      }
    }
}

module.exports = QuestionController;