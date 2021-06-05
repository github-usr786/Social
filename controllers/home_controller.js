const Post  = require('../models/post');
const User  = require('../models/user');

/*
// created exportable home function  (controller/callback function)
//fun without async and await----
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

        User.find({}, function(err, users){
            //handle error

            // posts has all fetched post passed to posts of home.ejs for display
            response.render('home',{title:"home",posts: posts, all_users: users});

        });
        
});
}*/

//same home fun with async and await (cleaner way to write same code)
//all documents(entries) of collection post is fetched 
        //populate user of each post, fetching all details of user and extracting user.name in home.ejs
        //nested population -> populating comment and user of that comment
module.exports.home  = async function(request, response){   //fun declared as async
try{
    let posts = await Post.find({})               //first this will exexcute and posts store all results
    .sort('-createdAt')                           //sorting post (dispalying recently created post first)  
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
        path: 'user' 
        }
    });

    //console.log(posts);
    
    let users = await User.find({});      //next this will execute and store result into users after completion of posts


    // posts has all fetched post passed to posts of home.ejs for display
    // users has all fetched users passed to all_users of home.ejs for display
    response.render('home',{title:"home",posts: posts, all_users: users});


}catch(err){
    console.log("Error",err);
    return;
}

}


module.exports.sample  = function(request, response){
    response.end("<h1> Express is up for codial! and running sample page </h1>");
}