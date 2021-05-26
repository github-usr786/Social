const express = require('express');
const router = express.Router();
const passport = require('passport');

// creating instance postController having access to all functions of post_controller.js
const postController  = require('../controllers/post_controller');

//calling create fun (action) for route '/create'  
// '/posts/create' coz all request of route '/posts' is transferd to post.js   from index.js of routes

//before writting post shld check if user is signed in (authenticated)
    //use middleware function 'passport.checkAuthentication' (created in config/passport-local-strategy) to check auth.
router.post('/create',passport.checkAuthentication, postController.create);

//:id will be passed from views - home.ejs <a> tag
router.get('/destroy/:id',passport.checkAuthentication, postController.destroy);

module.exports = router;