const User  = require('../../../models/user');
const jwt = require('jsonwebtoken');                            //importing jsonwebtoken to create token

//function to create tokens for requested email and password
module.exports.createSession =  async function(req, res){

    try{
        let user = await User.findOne({email: req.body.email});

    //console.log("user: ",user);
   //password doesn't match
    if(!user || user.password!= req.body.password){
       return res.status(422).json({
           message:"Invalid Username/Password"
       });
   }
   //user found in db
   return res.status(200).json({
       message:"Sign in successful, here is your token keep it safe!",
       data: {
//user converted to json then using jwt.sign fun token is created / codial (key use to decrypt) / expires in 10000millisec
           token: jwt.sign(user.toJSON(), 'codial', {expiresIn :'100000' })
       }
       });

    }catch(err){
        console.log("*****Error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });    
    }
}