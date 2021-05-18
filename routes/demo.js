const express = require('express');
const router = express.Router();

// creating instance userController having access to all functions of user_controller.js
const demoController = require('../controllers/demo_controller');

//calling demo fun (action) for route '/demo'  
// '/demons/demo' coz all request of route '/demons' is transferd to demo.js   from index.js of rotes
router.post('/demo', demoController.demo);

module.exports = router;