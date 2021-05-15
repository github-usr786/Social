const express = require('express');
const router  = express.Router();        //impoting express router

//created  homeController as instance having imported  all functions of home_controller.js
const homeController = require('../controllers/home_controller');           

console.log("router loaded");

router.get('/',homeController.home);               //called home function as callback function for route '/'

router.get('/sample', homeController.sample);     //called sample function as callback function for route '/profile'

//all requests of route '/users/ anything ' will be transfered to users.js of routes   
router.use('/users', require('./users'));

//exporting router
module.exports = router;
