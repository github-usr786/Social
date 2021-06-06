const passport = require('passport');
const googleStrategy  =require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');           //for generating random password
const User = require('../models/user');

//tell passport to use new strategy for google login
passport.use( new googleStrategy({
           clientID: "556035912684-f13qb3r8vo95jfttmsp9qpl85jf91prl.apps.googleusercontent.com",
           clientSecret:"8EiOsg8vM0OeiArIIqUJaGkE",
           callbackURL: "http://localhost:8000/users/auth/google/callback",
},
//callback fun
    //accessToken -> token given by google
    //refreshToken -> if token expired , new token re-generated
    //profile -> having all nfo abt. user requested for login
    //done is fun
    function(accessToken, refershToken, profile, done){
        //finding user
        User.findOne({email: profile.emails[0].value})
        .exec(function(err, user){
                if(err){console.log("Error in google-strategy-passport",err); return;}

//console.log(accessToken, refershToken);   print accesrrToken but refreshToken is undefine till generated
//console.log(profile);                 all info abt loged in user from google

                //if user found -> set it as req.user (means signed that user in)
                if(user){
                    return done(null, user);
                }
                //user not found -> create it
                else{
                    User.create({
                        name:profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes.toString('hex')
                        }, function(err, user){
                            if(err){console.log("error in creating google-strategy-passport"); return;}

                            return done(null, user);
                        });
                    }            
        });
    }

));

module.exports  = passport;
