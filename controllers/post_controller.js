const Post  = require('../models/post');            //importing Post collection having schema postSchema
const Comment = require('../models/comment');                

//to create a post
module.exports.create = async function(req, res){
    try{
            let post = await Post.create({
            content: req.body.content,                      //content of post   
            user: req.user._id                              //user id of user signed in 
            });
        
        //when request of ajax -> i.e xhr(xml http request)  -> returning response with post created 
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post: post
                    },
                    message: "Post created!"
                });
            }

            req.flash('success',"Post Published!");
            return res.redirect('back');

        }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }   
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
                
            });

    //ajax part-> when request of ajax -> i.e xhr(xml http request)  -> returning response
     if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: "Post deleted!"
                });
            }
            return res.redirect('back'); 
        }
        else{   //another user is trying to delete
            return res.redirect('back');
        }
    });
}

