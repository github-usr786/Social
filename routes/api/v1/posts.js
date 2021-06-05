const express = require('express');
const router = express.Router();
const passport = require('passport');
const postApi = require('../../../controllers/api/v1/posts_api');       //controller instance

//on route /api/v1/posts   index fun will called
router.get('/', postApi.index);             //index fun will be called 
//:id will be pass to delete that post
// {session:false} coz we dont wan session cookie to be generated
//putting authenticaton check over passport
router.delete('/:id', passport.authenticate('jwt', {session: false}), postApi.destroy);     

module.exports  = router;