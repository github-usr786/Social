const Comment = require('../models/comment');
const Post  =require('../models/post');

//create comment 
module.exports.create = function(req, res){
    //post in req.body.post is name of <input> tag posted by comment form in home.ejs
    //we are searching that post id into Post collection(table)
    Post.findById(req.body.post, function(err, post){      
            //handle error

          // if post exist/found -> create comment for that post
          if(post)
          {
              Comment.create({
                  content: req.body.content,
                  post: req.body.post,
                  user: req.user._id
              }, function(err, comment){
                  //handle error

                  //if comment created -> push comment also in post and save comment into post
                  post.comments.push(comment);
                  post.save();

                  res.redirect('/');
              });
          }  
    });
}

//delete comment (from comment collection and also from post)
module.exports.destroy  = function(req, res){
//find comment by id and save post id of comment so that comment can also be deleted from post having array of comment
    Comment.findById(req.params.id, function(err, comment){
            if(comment.user == req.user.id)
            {
                //saving post id of comment before deleting comment ,to delete comment from post as well  
                    let postId = comment.post;
                    comment.remove();
                    //$pull is mongodb syntax to pull out/delete that comment from array of comment inside post
                    Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err,post){
                            //handle error

                            return res.redirect('back');
                    });
            }
            else{
                return res.redirect('back');
            }
    });
}