const nodemailer = require('nodemailer');
const Myusername = require("../config/keys").SendGridUsername;
const Mypassword = require('../config/keys').SendGridPassword;
module.exports.WelcomeEmail = function(email,name){
const smtpTransport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user : Myusername,
        pass: Mypassword
    }    
});
const mailOptions = {
    to: email,
    from: Myusername,
    subject: 'Welcome',
    text: "Welcome here," + name + "How are you"
};
smtpTransport.sendMail(mailOptions, function (err) {
    console.log("Error")
});}
