const Post  = require('../models/post');

// created exportable home function  (controller/callback function)
module.exports.home  = function(request, response){
    //response.end("<h1> Express is up for codial! </h1>");
    //console.log(request.cookies);                          //reading cookies
    //response.cookie('user_id','25');                       //postig cookie to server also saves at browser
    
    // Post.find({}, function(err, posts){                     //all documents(entries) of collection post is fetched
    //     if(err){console.log("Error in fetching all posts from db"); return;}

        // posts has all fetched post passed to posts of home.ejs for display
    //     response.render('home',{title:"home",posts: posts});             
    // });

//all documents(entries) of collection post is fetched 
        //populate user of each post, fetching all details of user and extracting user.name in home.ejs
        //nested population -> populating comment and user of that comment
    Post.find({})
                .populate('user')
                .populate({
                    path: 'comments',
                    populate: {
                    path: 'user' 
                    }
                })
                .exec(function(err, posts){

        if(err){console.log("Error in fetching all posts along with comments and user commented  from db"); return;}
        
        // posts has all fetched post passed to posts of home.ejs for display
        response.render('home',{title:"home",posts: posts});
    });
    
}

module.exports.sample  = function(request, response){
    response.end("<h1> Express is up for codial! and running sample page </h1>");
}