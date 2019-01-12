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
res.redirect('/reminder');

}
//     let errors = [];
    
    


//     else {

        // User.findOne({ email: email }).then(user => {
//             if (user) {
//                 errors.push({ msg: 'Email already exists' });
//                 res.render('register', {
//                     errors,
//                     name,
//                     email,
//                     password,
//                     password2
//                 });
//             } else {

//                 const newUser = new User({
//                     name,
//                     email,
//                     password
//                 });
//                 bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
//                     if (err) throw err;
//                     // Set password to hashed 
//                     newUser.password = hash;
//                     newUser.save()
//                         .then(user => {
//                             req.flash('success_msg', 'You are now registered and can log into your account')
//                             res.redirect('/users/login');
//                         })
//                         .then(user => {
//                             smtpTransport.sendMail(mailOptions);
//                         })
//                         .catch(err => console.log(err));
//                 }));

//             }
//         })
//     }
// }