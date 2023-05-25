const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const { GetUser } = require("./UserController");
const { FindOneUserRecord } = require("../DatabaseMethods/UserMethods");

const client = new MongoClient('mongodb+srv://fakheralden1:CHBsfnMo4Rzc9qZT@onedorm.nmnmx8u.mongodb.net/');
let collection;
async function connect (){
    try {
        await client.connect();
        collection = client.db("test").collection("questions");
    } catch (e) {
        console.error(e);
    }
}
class SearchController{
    static async SearchPost(req, res){
        await connect();
        let query = req.query.query;
        console.log (query);
        try {
            let result = await collection.aggregate([
                {
                    "$search": {
                        index:'SearchPost',
                        "text": {
                            "query": `${query}`,
                            "path": ["QuestionDetailsHTML", "QuestionTitle","Hashtags"],
                            "score": { 
                                // "boost": { 
                                //     "value": 1 
                                // },
                                "function": {
                                    "multiply": [
                                        {
                                            "path":{
                                                "value" : 'AnswerCount' ,
                                                "undefined" : 1
                                            }
                                        },
                                        {
                                            "score": "relevance"
                                        }
                                    ],
                                    "multiply": [
                                        {
                                            "path":{
                                                "value" : 'QuestionVotesCount' ,
                                                "undefined" : 1
                                            }
                                        },
                                        {
                                            "score": "relevance"
                                        }
                                    ]
                                }
                            },
                            "fuzzy": {
                                "maxEdits": 2,
                                "prefixLength": 3
                            }
                        }
                    }
                },
                {
                  $project: {
                    QuestionDetailsHTML: 1,
                    QuestionTitle: 1,
                    QuestionId:1,
                    CreatedBy:1,
                    QuestionDetails:1,
                    QuestionVotesCount:1,
                    ReportedCount:1,
                    IsPinned:1,
                    CreatedAt:1,
                    LastEdit:1,
                    Hashtags:1,
                    AnswersList:1,
                    Attachments:1,
                    score: { $meta: "searchScore" }
                  }
                }
            ]).sort({score:-1}).toArray();
            console.log (result)
            res.status(201).send(result);
        } catch (e) {
            console.log (e);
            res.status(400).send(e);
        }
    }

    static async NewsFeed(req, res){
        await connect();
        const UserId = req.params.Id;
        // const UserId = '62b1e7d2-0ba8-45fb-a08d-9138e4bc7af9';
        const User = await FindOneUserRecord ({UserId});
        
        if(User.length == 0){
            return res.status(400).send("User Id was not found");
        }
        let Hashtags = User.CategoriesList;
        // for(let i = 0 ; i<User[0].CategoriesList.length ; i++){
        //     Hashtags.append(User[0].CategoriesList[i])
        // }
        try {
            let result = await collection.aggregate([
                {
                    "$search": {
                        index:'SearchPost',
                        "text": {
                            "query": `${Hashtags.length==0 ? 'p': Hashtags}`,
                            "path": ["QuestionDetailsHTML", "QuestionTitle","Hashtags"],
                            "score": { 
                                // "boost": { 
                                //     "value": 1 
                                // },
                                "function": {
                                    "multiply": [
                                        {
                                            "path":{
                                                "value" : 'AnswerCount' ,
                                                "undefined" : 1
                                            }
                                        },
                                        {
                                            "score": "relevance"
                                        }
                                    ]
                                }
                            },
                            "fuzzy": {
                                "maxEdits": 2
                            }
                        },
                    }
                },
                {
                  $project: {
                    QuestionDetailsHTML: 1,
                    QuestionTitle: 1,
                    // QuestionId:1,
                    // CreatedBy:1,
                    // QuestionDetails:1,
                    QuestionVotesCount:1,
                    // ReportedCount:1,
                    // IsPinned:1,
                    // CreatedAt:1,
                    // LastEdit:1,
                    Hashtags:1,
                    AnswersList:1,
                    // { "$ifNull": [ "$answers", [] ] } }
                    AnswerCount : 1,
                    // Attachments:1,
                    score: { $meta: "searchScore" }
                  }
                }
            ]).sort({score:-1}).toArray();
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send(e);
        }
    }
}

module.exports = SearchController;