// creating schema for Post collection(table)
const mongoose = require('mongoose');

//creting schema ->postSchema
const postSchema  = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{                                          //second field is user that created that post
        type: mongoose.Schema.Types.ObjectId,       //refering to object id of Schema User  
        ref: 'User'  
    },
    //include the array of ids of all comments in this post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
    {
        timestamps:true
    }  
);

// created/named new collection Post and it's schema named postSchema
const Post  = mongoose.model('Post', postSchema);

module.exports  = Post;