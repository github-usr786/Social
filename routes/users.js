const express = require('express');
const router = express.Router();
const passport = require('passport');

// creating instance userController having access to all functions of user_controller.js
const userController = require('../controllers/user_controller');

//calling profile fun (action) for route '/profile'  
// '/users/profile' coz all request of route '/users' is transferd to user.js   from index.js of rotes

//before accessing profile shld check if user is signed in (authenticated)
    //use middleware function 'passport.checkAuthentication' (created in config/passport-local-strategy) to check auth.
    //:id to open profile of tht user
router.get('/profile/:id',passport.checkAuthentication, userController.profile);

router.post('/update/:id',passport.checkAuthentication, userController.update);

router.get('/signin', userController.signin);

router.get('/signup', userController.signup);

router.post('/create', userController.create);

//use passport as middleware to authenticate (three args passed to post -> route, middleware, callback fun) 
router.post('/create-session',passport.authenticate(
       'local',                                          // auth is local   
       {failureRedirect: '/users/signin'},               //when authentication fails       
    )
    ,userController.createSession);                      //callback fun for route   

router.get('/signout', userController.destroySession);

//route for authenticate by google and fetch profile and email
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

//route for callback from google
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/signin'},)
            , userController.createSession);


module.exports = router;