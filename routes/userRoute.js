const express = require('express');
const { loginController, registerController } = require('../controllers/userController');

//router obj

const router = express.Router()

// Login || Post

router.post('/login',loginController)

// Register || POST

router.post('/register',registerController)





module.exports = router
