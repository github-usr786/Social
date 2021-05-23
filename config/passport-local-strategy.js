const passport = require('passport');                          //importing pasport

const LocalStrategy = require('passport-local').Strategy;      //import strategy property of passport-local 

const User = require('../models/user');

//authenticating using passport
passport.use(new LocalStrategy({
            usernameField: 'email'                              //email of collection used for identification of user
        },
        function(email,password,done){                          //callback fun (done is a fun as parameter)
        //find a user and establish the identity
        User.findOne({email: email}, function(err,user){       //second email is parameter passed to function
            if(err)
            {
                console.log("error in finding user --> Passport ");
                return done(err);
            }

            if(!user || user.password != password)              //second password id password passed to function
            {
                console.log("Invalid Username/Password");
                return done(null, false);                           //false -> user not found
            }
                return done(null, user);                           //user found -> return user
        });
        }
));

//  serializing --  when user is authenticated -> find which property(field) to save in cookie -> cookie then send this
//                  to browser in response automatically.
//  deserializing -- When next request comes in -> we need to deserialize it means find which user is signed in and 
//                   making request.  


//serializing the user to decide which key is to be kept in cookie
passport.serializeUser(function(user, done){
            done(null,user.id);                                     //user.id will be save in cookie 
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
        User.findById(id, function(err,user){
            if(err)
            {
                console.log("error in finding user --> Passport ");
                return done(err);
            }   
                return done(null, user);  
        });
});

//sending data of current signed in user to views
    // creating checkAuthentication fun and will use it as middleware
    //check if user is authenticated
passport.checkAuthentication = function(req, res, next){    
        //if user is signined in then pass request to next fun(controller fun)
        if(req.isAuthenticated()){      //isAuthenticated() is inbuilt passport fu to check if user is authenticated
            return next();
        }

        //if user is not signed in
        return res.redirect('/users/signin');    
}

//setting views to authenticated user
    // creating setAuthenticatedUser fun and will use it as middleware
passport.setAthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
     //req.user contains the current signed in user from session cookie and we are just sending it to locals for views
     res.locals.user = req.user;       
    }
    next();
}   







module.exports = passport;