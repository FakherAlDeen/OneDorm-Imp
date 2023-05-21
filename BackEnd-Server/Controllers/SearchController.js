const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
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
            response.status(400).send(e);
        }
    }

}

module.exports = SearchController;