//index fun of controller /api
const Post  = require('../../../models/post');
const Comment    = require('../../../models/comment');

//it's api which display all posts from db
//converted fun into async and await
module.exports.index = async function(req, res,){

//populating post to display
let posts = await Post.find({})               //first this will exexcute and posts store all results
    .sort('-createdAt')                           //sorting post (dispalying recently created post first)  
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
        path: 'user' 
        }
    });

    return res.status(200).json({               //200 is success status code
            message: "Lists of posts",
            posts: posts
    });
}


//to delete post by id through api
// to delete/destroy a post -> associated comments shld also be deleted along with post
module.exports.destroy = async function(req, res){

    try{
    let post = await Post.findById(req.params.id);
        
        //Authorization
        if(post.user == req.user.id)
         {
             post.remove();  

                //all comments in Comment collection whose post id match will be deleted
            await  Comment.deleteMany({post: req.params.id});

            return res.status(200).json({
                    message:"Post and associated comment succesfully deleted."   
            });
         }else{
               return res.status(401).json({
                   message:"You are not authorized to delete this post"
               }) 
         }     

    }catch(err)
    {
        console.log("Error: ",err);
        return res.status(500).json({
                 message:"Internal Server error" 
        });
    
    }
}    





    
