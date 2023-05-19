const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../MiddleWare/auth");
const { v4: uuidv4 } = require('uuid');
const {CreateUser, EditUser, DeleteUser, FindOneUserRecord} = require("../DatabaseMethods/UserMethods");

class AuthController {
    static async SignUp(req, res) {
        console.log (req.body)
        try {
            console.log (`Body `);
            console.log (req.body);
            const { Fname, Lname, Email, Password } = req.body;

            if (!(Email && Password && Fname && Lname)) {
              return res.status(400).send("All input is required");
            }

            const oldUser = await FindOneUserRecord({ Email });
            // console.log (oldUser);
            if (oldUser.length !=0) {
              return res.status(409).send("User Already Exist. Please Login");
            }
            // console.log (uuidv4())
            //Encrypt user password
            const encryptedPassword = await bcrypt.hash(Password, 10);
        
            // Create user in our database
            const user = {
                UserId: uuidv4(),
                Fname,
                Lname,
                Email: Email.toLowerCase(), // sanitize: convert email to lowercase
                Password: encryptedPassword,};
            await CreateUser(user);
            const JWT_SECRET ="goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
            // Create token
            const token = jwt.sign(
              { UserId: user.UserId, Email },
              JWT_SECRET,
            );
            // save user token
            user.token = token;
            // console.log (user);
            // return new user
            res.status(201).send(user);
          } catch (err) {
            console.log(err);
          }
    }

    static async LogIn(req, res){
        try{
            const { Email, Password } = req.body;
            console.log("reqqqq");
            // Validate user input
            if (!(Email && Password)) {
                return res.status(400).send("All input is required");
            }
            const user = await FindOneUserRecord({ Email });
            if (user.length!= 0 && user[0] && (await bcrypt.compare(Password, user[0].Password))) {
                // Create token
                const JWT_SECRET ="goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
                const token = jwt.sign(
                { UserId: user[0].UserId, Email },
                JWT_SECRET,
                );
                const UserDataToSend = {"UserData":user[0], "Token":token};
                console.log(UserDataToSend);
                return res.status(200).send(UserDataToSend);
            }
            res.status(400).send("Invalid Credentials");
        } catch (err) {
            console.log(err);
        }
    }
    static async wtv(req, res) {
        res.send("brr3");
    }
}

module.exports = AuthController;