const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require("../models/User");

const LoginController = require('../controllers/login')
const RegisterController = require('../controllers/register')


router.get('/login',LoginController.getLogin)

// Registeration page
router.get('/register',RegisterController.getRegister);
// Register Handle

router.post('/register', RegisterController.postRegister)

// Login post request

router.post('/login',LoginController.postLogin);

// Logout
router.get('/logout', (req,res) => {
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/login')
})

router.get('/forgot',(req,res) =>{
    res.render('forgot')
})
router.post('/forgot',(req,res)=>{
    res.send("a post request")
    console.log(req.body)
})


module.exports = router;