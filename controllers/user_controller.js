const User = require('../models/user');                     //importin models/user having schema of collection

// Profile action/callback function
module.exports.profile = function(request, response){
     response.render('user_profile', {title: "profile"});
}

// Signin action/callback function
module.exports.signin = function(request, response){    
     response.render('user_signin', {title: "user sign in"});
}

// Signup action/callback function
module.exports.signup = function(request, response){
    response.render('user_signup', {title: "user signup"});
}

//Create action/callback function to crate user in dtabase
module.exports.create = function(request, response){
    console.log(request.body);
    if(request.body.password != request.body.confirm_password)    //when both password don't maych --> error 
    {
        console.log("Re-enter conform password , don't match");
        return response.redirect('back');
    }
    
    //when email entered not match in db (means unique) create user in db (signup)
    User.findOne({email: request.body.email}, function(err, user)       
    {
        if(err){cosole.log("error in finding user in singing up"); return}
        
        if(!user)
        {
            User.create(request.body, function(err, user){
                if(err){console.log("error in creating user while signing up."); return}

                return response.redirect('/users/signin');
            })
        }
        else  //if email already present -> do signup again
        {
            console.log("Email already present in db , enter some other email");
            return response.redirect('back');
        }
    });
}

