const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/userController').registerUser;
const loginUser = require('../controllers/userController').loginUser;
const logoutUser = require('../controllers/userController').logoutUser;



// Register route
router.post('/register', registerUser);
// Login route
router.post('/login', loginUser);
// Logout route
router.post('/logout', logoutUser);

module.exports = router;
