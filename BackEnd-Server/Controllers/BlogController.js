const { v4: uuidv4 } = require('uuid');
const { CreateBlog, FindOneBlogRecord , EditBlog, DeleteBlog } = require("../DatabaseMethods/BlogMethods");
const {EditUser , FindOneUserRecord} = require("../DatabaseMethods/UserMethods")
const {EditAnswer , FindOneAnswerRecord , DeleteAnswer} = require("../DatabaseMethods/AnswerMethods")
class BlogController {
    static async CreateBlog(req, res){
      try{
          const { CreatedBy, BlogTitle , BlogDetails , BlogDetailsHTML , CreatedAt } = req.body; // loop over hashtags -> find -> 
          if (!(CreatedBy && BlogTitle && BlogDetails && BlogDetailsHTML && CreatedAt)) {
            return res.status(400).send("Send all the fields");
          }
          let BlogId = uuidv4()
          const blog = {
            BlogId,
            CreatedBy,
            BlogTitle,
            BlogDetails,
            BlogDetailsHTML,
            CreatedAt
          }
          await CreateBlog(blog)
          EditUser(CreatedBy , {$push: { BlogList: BlogId }} )
          console.log("reqqqq");
          
          res.status(201).send(blog)
      } catch (err) {
          res.status(403).send(err) 
          console.log(err);
      }
    }

    static async GetBlog(req, res){
        try{
          const Id = req.params.Id;
          const BlogData = await FindOneBlogRecord({BlogId:Id});
          if (BlogData.length == '0') return res.status(400).send("Blog Not Found!");
          const UserData = await FindOneUserRecord({UserId:BlogData[0].CreatedBy})
          if (UserData.length == '0') return res.status(400).send("User Not Found!");
          let data = {BlogData:BlogData[0],UserData:{
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

    static async Vote(req, res){
        try{
            let { UserId , Id , VoteValue} = req.body;
            console.log(req.body) 
            if (!(UserId && Id && VoteValue)) {
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
            // console.log(VoteValue , Id)
            await EditUser(UserId , {$set : {UserVotes: obj} })
            await EditBlog(Id , {$inc: { BlogVotesCount : VoteValue}} )
            // console.log("reqqqq");
            res.status(201).send("Vote done")
        } catch (err) {
            res.status(403).send(err) 
            console.log(err);
        }
    }
    static async EditBlog(req, res){
        try{
          const { Id , Data } = req.body; 
          if (!Id || JSON.stringify(Data) === "{}") {
            return res.status(400).send("Send all the fields");
          }
          await EditBlog(Id , Data);
          res.status(201).send("Blog edited");
        } catch (err) {
            res.status(403).send(err) 
            console.log(err);
        }
    }

    static Delete = async (Id , Type) => {
        if(Type == 0){
          let blog = await FindOneBlogRecord({BlogId:Id});
          await DeleteBlog(Id);
          await EditUser(blog[0].CreatedBy , {$pull : {BlogList : Id}})
          // for(let i = 0 ; i<question[0].Hashtags.length ; i++){
          //   await EditCategoryByValue({CategoryTitle:question[0].Hashtags[i]} , {$pull : {PostIds : Id}});
          // }
          for(let i = 0 ; i<blog[0].AnswersList.length ; i++){
            await BlogController.Delete(blog[0].AnswersList[i] , 1)
          }
        }
        else{
          let answer = await FindOneAnswerRecord({AnswerId : Id}) ;
          await DeleteAnswer(Id);
          await EditUser(answer[0].CreatedBy , {$pull : {AnswersList : Id}})
          for(let i = 0 ; i<answer[0].AnswersList.length ; i++){
            await BlogController.Delete(answer[0].AnswersList[i] , 1)
          }
        }
    }
      
    static async DeleteBlog(req, res){
        try{
            const { Id , Type } = req.body;
            if (!(Id)) {
              return res.status(400).send("Send all the fields");
            }
            if(Type == 'Answer'){
              const ans = await FindOneAnswerRecord({AnswerId:Id})
              const Parent = ans[0].ParentId 
              await EditAnswer(Parent , {$pull : {AnswersList : Id}})
              await EditBlog(Parent , {$pull : {AnswersList : Id}})
            }
            BlogController.Delete(Id , Type=='Answer') ;
            res.status(201).send("Deleted")
        } catch (err) {
            res.status(403).send(err) 
        }
    }
      
}

module.exports = BlogController;