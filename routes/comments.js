const express = require('express');
const router = express.Router();
const passport = require('passport');

// creating instance commentController having access to all functions of post_controller.js
const commentController  = require('../controllers/comment _controller');

//calling create fun (action) for route '/create'  
// '/commnets/create' coz all request of route '/commentss' is transferd to comments.js   from index.js of routes

//before writting comment shld check if user is signed in (authenticated)
    //use middleware function 'passport.checkAuthentication' (created in config/passport-local-strategy) to check auth.
router.post('/create',passport.checkAuthentication, commentController.create);

module.exports = router;