const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth"); //ES6
const nodemailer = require("nodemailer");
const ReminderController = require("../controllers/reminder");
// Renders the welcome page
router.get('/',(req,res)=>{
    res.render('home')
});
router.get('/about',(req,res)=>{
 
    res.render('about');   
});
router.get('/contact',(req,res)=>{
 
    res.render('contact')   
});
//
router.get('/dashboard',ensureAuthenticated, (req, res) => 
    res.render("dashboard",{
        user: req.user
    }));
router.get('/medicinelist', ensureAuthenticated, (req, res) =>
    res.render("medicinelist", {
        user: req.user
    }));
router.get("/reminder", ensureAuthenticated, (req, res) =>
  res.render("reminder", {
    user: req.user
  })
);
router.post('/reminder',ensureAuthenticated,ReminderController.postreminder)
module.exports = router;

