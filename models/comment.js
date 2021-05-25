// creating schema for comment collection(table)
const mongoose = require('mongoose');

//creting schema ->commentSchema
const commentSchema  = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,        //second field is post on which comment is done 
        ref: 'Post'                                 //refering to object id of Schema Post
    },
    user:{                                          //third field is user that commented
        type: mongoose.Schema.Types.ObjectId,       //refering to object id of Schema User  
        ref: 'User'  
    }
},
    {
        timestamps:true
    }  
);

// created/named new collection Comment and it's schema named commentSchema
const Comment  = mongoose.model('Comment', commentSchema);

module.exports  = Comment;