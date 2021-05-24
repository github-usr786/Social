const Post  = require('../models/post');                //importing Post collection having schema postSchema

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

