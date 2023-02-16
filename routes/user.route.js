const express = require('express');
const router =  express.Router();
const controller = require('../controllers/user.controller');

//Route for register a new user
router.post('/', controller.registerNewUser);


//Route for login method for users
router.post('/login', controller.loginOfUsers);

module.exports = router;