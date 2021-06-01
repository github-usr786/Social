const User = require('../models/user');                     //importin models/user having schema of collection

//Profile action/callback function
module.exports.profile = function(request, response){
    //finding and opening profile of user whose id is requested 
    User.findById(request.params.id, function(err, user){
        return response.render('user_profile', {title: "profile", profile_user: user});
    });
     
}

//update action/function to update profile of user
module.exports.update = function(req, res){
    if(req.user.id == req.params.id)
    {
        //finding user by req.params.id and updating it with req.body 
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
                return res.redirect('back');
        });
    }
    else
    {
        return res.status(401).send('Unauthorized');
    }
}

// Signin action/callback function
module.exports.signin = function(request, response){    
    //if user is already signed in -> -> restricting signin page access
    if(request.isAuthenticated()){
        return response.redirect('/users/profile');
    }

     response.render('user_signin', {title: "user sign in"});
}

// Signup action/callback function
module.exports.signup = function(request, response){
    //if user is already signed in -> restricting signup page access
    if(request.isAuthenticated()){
        return response.redirect('/users/profile');
    }
    response.render('user_signup', {title: "user signup"});
}

//Create action/callback function to crate user in database
module.exports.create = function(request, response){
    //console.log(request.body);
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

//signin and create session for user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in Successfully');          //msg type is success   //setting msg into request
    return res.redirect('/');
}

//signout and destroy session of user
module.exports.destroySession = function(req, res){
    req.logout();                                    //logout fun is given to request using passport.js to logout user
    req.flash('success','Logged Out!');
    return res.redirect('/');
}