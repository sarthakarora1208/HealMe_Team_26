const bcrypt = require("bcryptjs");
const passport = require("passport");

module.exports.getLogin = (req, res)  => res.render("login")

module.exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
}
    