// creating schema fro User collection(table)

const mongoose = require('mongoose');

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
        }
},
    {    
    timestamps:true    
    }
);

// created/named new collection User and it's schema named userSchema
const User = mongoose.model('User', userSchema);

module.exports = User;