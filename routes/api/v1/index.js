// routes/api/v1/index.js  --> index of v1 of api in routes  
const express = require('express');
const router = express.Router();

//routing /api/posts route to posts.js file of api/posts.js 
router.use('/posts', require('./posts'));
//routing /api/users route to users.js file of api/users.js 
router.use('/users', require('./users'));


module.exports  = router;