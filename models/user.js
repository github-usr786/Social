// creating schema fro User collection(table)
const mongoose = require('mongoose');
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const multer  = require('multer');
const path  = require('path');
//path where profile pic will be stored locally(on disk)
const AVATAR_PATH = path.join('/uploads/users/avatars');

//creting schema ->userSchema
const userSchema = mongoose.Schema({
        name: {
            type: String,
            required:true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required:true
        },
        //field avatar store path(location) of profile_pic in db
        avatar:{
            type: String
        }
},
    {    
    timestamps: true    
    }
);

//setting destination property of multer
//destination ->  is used to determine within which folder the uploaded files should be stored. 
//filename -> is used to determine what the file should be named inside the folder
let storage = multer.diskStorage({
  destination: function (req, file, cb) {                       //cb-> callback function
    cb(null, path.join(__dirname,'..',AVATAR_PATH));         //destination -> moving from current dir to AVATAR_PATH       
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()); //every filename -> fieldname(avatar)-date.now()(current time) to keep all file name unique
  }
});

//static functions for userSchema  --  uploadedAvatar  avatarPath
                                                    //single instance of avatar will be uploaded at a time 
//setting storage property of multer                                                      
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
//making AVATAR_PATH publicly avalable
userSchema.statics.avatarPath = AVATAR_PATH;



// created/named new collection User and it's schema named userSchema
const User = mongoose.model('User', userSchema);

module.exports = User;