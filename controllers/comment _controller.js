const Comment = require('../models/comment');
const Post  =require('../models/post');

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