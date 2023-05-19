const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../MiddleWare/auth");
const { v4: uuidv4 } = require('uuid');
const {CreateUser, EditUser, DeleteUser, FindOneUserRecord} = require("../DatabaseMethods/UserMethods");

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
}

module.exports = UserController;