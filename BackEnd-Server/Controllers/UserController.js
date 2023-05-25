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
            console.log(req.body)
            console.log(UserId , Hashtags)
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
    static async AddUserDetails(req , res){
        try{
            const {UserId , Phonenumber , DateOfBirth , UserDetails} = req.body ;
            // console.log(UserId , Hashtags)
            if (!(UserId && Phonenumber && DateOfBirth) || JSON.stringify(UserDetails) === "{}") {
                return res.status(400).send("Send all the fields");
            }
            await EditUser(UserId , {Phonenumber , DateOfBirth , UserDetails} )
            res.status(201).send("done")
        }
        catch(err){
            res.status(400).send(err)
            console.log(err)
        }
    }
}

module.exports = UserController;