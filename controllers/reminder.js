const express = require("express");
const nodemailer = require("nodemailer");
const Myusername = require("../config/keys").SendGridUsername;
const Mypassword = require("../config/keys").SendGridPassword;

// const User = require("../models/User");
function miliseconds(time){
    return time*3600000
}

module.exports.postreminder = (req, res) => {
    const { name, time ,email,} = req.body;
console.log(name)
console.log(time)
console.log(email)
console.log(req.body)
if(!name){
    res.redirect('/dasboard')
}
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: Myusername,
            pass: Mypassword
        }
    });
    const mailOptions = { to: email, from: "thesarthakarora@gmail.com", 
    subject: "Eat " + name,
     text: "Please eat your medicine " + name + " as soon as possible!"   };
    setTimeout(() => { smtpTransport.sendMail(mailOptions)
        },miliseconds(time));

req.flash('success_msg', 'You will be notified to take your medicine')
res.redirect('/dashboard');

}
