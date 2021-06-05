const express = require('express');
const router = express.Router();
const usersApi = require('../../../controllers/api/v1/users_api');       //controller instance

//on route /api/v1/posts   index fun will called
router.post('/create-session', usersApi.createSession);    


module.exports = router;