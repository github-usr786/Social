const Post  = require('../models/post');            //importing Post collection having schema postSchema
const Comment = require('../models/comment');                

//to create a post
module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,                      //content of post   
        user: req.user._id                              //user id of user signed in 
    },
    function(err, post){
        if(err) { console.log("error in creating post"); return; }
        
        return res.redirect('back');
    });
}

// to delete/destroy a post -> associated comments shld also be deleted along with post
module.exports.destroy = function(req, res){
    //post is find in db by it's id on which user clicks to delete store it's id in -> req.params.id
    Post.findById(req.params.id, function(err, post){
        //post will be deleted only when user wants to delete and user created post are same
        //comparison always made between strings , .id in mongoose convert req.user.id in string 
        if(post.user == req.user.id)
        {
            post.remove();  

            //all comments in Comment collection whose post id match will be deleted
            Comment.deleteMany({post: req.params.id}, function(err, post){
                //handle errror

                return res.redirect('back');
            })
        }
        else{   //another user is trying to delete
            return res.redirect('back');
        }
    });
}

