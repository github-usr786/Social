const express = require('express');
const router = express.Router();

// creating instance userController having access to all functions of user_controller.js
const userController = require('../controllers/user_controller');

//calling profile fun (action) for route '/profile'  
// '/users/profile' coz all request of route '/users' is transferd to user.js   from index.js of rotes
router.get('/profile', userController.profile);

router.get('/signin', userController.signin);

router.get('/signup', userController.signup);

router.post('/create', userController.create);

module.exports = router;