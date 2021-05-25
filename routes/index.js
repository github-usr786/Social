const express = require('express');
const router  = express.Router();        //impoting express router

//created  homeController as instance having imported  all functions of home_controller.js
const homeController = require('../controllers/home_controller');           

console.log("router loaded");                          

router.get('/',homeController.home);               //called home function as callback function for route '/'

router.get('/sample', homeController.sample);      //called sample function as callback function for route '/sample'

//all requests of route '/users/ anything ' will be transfered to users.js of routes   
router.use('/users', require('./users'));

//all requests of route '/posts/ anything ' will be transfered to posts.js of routes folder   
router.use('/posts',require('./posts'));

//all requests of route '/posts/ anything ' will be transfered to posts.js of routes folder   
router.use('/comments',require('./comments'));

//all requests of route '/sample/ anything ' will be transfered to users.js of routes   
router.use('/demons', require('./demo'));



//exporting router
module.exports = router;
