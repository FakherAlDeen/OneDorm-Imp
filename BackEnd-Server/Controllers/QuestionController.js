const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../MiddleWare/auth");
const { v4: uuidv4 } = require('uuid');
const { CreateQuestion } = require("../DatabaseMethods/QuestionMethods");

class QuestionController {
    static async CreatePost(req, res){
      try{
          const { CreatedBy, QuestionTitle , QuestionDetails } = req.body;
          console.log("reqqqq");
          const question = {
            QeustionId: uuidv4(),
            CreatedBy,
            QuestionTitle,
            QuestionDetails,
          }
          await CreateQuestion(question)
          res.status(201).send(question)
      } catch (err) {
          console.log(err);
      }
    }
}

module.exports = QuestionController;