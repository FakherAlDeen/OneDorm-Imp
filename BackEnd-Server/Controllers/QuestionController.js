const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../MiddleWare/auth");
const { v4: uuidv4 } = require('uuid');
const { CreateQuestion } = require("../DatabaseMethods/QuestionMethods");
const { FindOneCategoryRecord , EditCategory , CreateCategory} = require("../DatabaseMethods/CategoryMethods");
const { EditUser } = require("../DatabaseMethods/UserMethods");

class QuestionController {
    static async CreatePost(req, res){
      try{// connect it to hashtags table and user table
          
          const { CreatedBy, QuestionTitle , QuestionDetails , Hashtags, QuestionDetailsHTML } = req.body; // loop over hashtags -> find -> 
          if (!(CreatedBy && QuestionTitle && QuestionDetails && QuestionDetailsHTML)) {
            return res.status(400).send("Send all the fields");
          }
          let QuestionId = uuidv4()
          let arr = []
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
            arr.push(CategoryId)
            EditCategory(CategoryId , {$push: { PostIds: QuestionId }}  )
          }
          console.log (QuestionDetails);
          const question = {
            QuestionId,
            CreatedBy,
            QuestionTitle,
            QuestionDetails,
            QuestionDetailsHTML,
            Hashtags:arr // gwt_w gwt_w
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
}

module.exports = QuestionController;