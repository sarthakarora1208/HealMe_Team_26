const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const nodemailer = require("nodemailer");
const Myusername = require("../config/keys").SendGridUsername;
const Mypassword = require("../config/keys").SendGridPassword;

const User = require("../models/User");
module.exports.getRegister = (req, res) => res.render("register");

module.exports.postRegister = (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: Myusername,
            pass: Mypassword
        }
    });
    const mailOptions = {
        to: email,
        from: 'thesarthakarora@gmail.com',
        subject: 'Welcome '+ name,
        text: "Welcome here, " + name + " How are you?"
    };
    
   

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'PLease fill in all fields' });
    }

    // Check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }
    // Password Length

    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' })
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
             email,
            password,
            password2
        });

    }


    else {

        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {

                const newUser = new User({
                    name,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    // Set password to hashed 
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and can log into your account')
                            res.redirect('/users/login');
                        })
                        .then(user => {
                            smtpTransport.sendMail(mailOptions);
                        })
                        .catch(err => console.log(err));
                }));

            }
        })
    }
}