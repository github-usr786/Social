const passport  = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;       //importing strategy prop. from passport-jwt
const ExtractJWT = require('passport-jwt').ExtractJwt;      //importing ExtractJwt prop.  to extract jwt from header of token 

const User = require('../models/user');

//creating options 
let opts = {
    //extracting token from bearer from header
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codial'                          //key to encrypt and decrtpy token
}

//setting up passport JWTStrategy
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){          //passing options to new JWTStrategy
            User.findById(jwtPayLoad._id, function(err, user){          //fetching _id from jwtpayLoad and finding user
                if(err){
                    console.log("Error in finding user from JWT");
                    return;
                }
                if(user){
                    return done(null, user);                            //user found        
                }
                else{
                    return done(null, false);                           //false-> user not found
                }

            });
}));

module.exports  = passport;