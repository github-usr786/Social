// routes/api/index.js  --> index of api in routes    
const express = require('express');
const router = express.Router();

// routing /v1 req to v1 forlder of api
router.use('/v1', require('./v1'));


module.exports = router;