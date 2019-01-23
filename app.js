const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');



//Db config;
const db = require('./config/keys').MongoURI;

require('./config/passport')(passport);

// connect to mongo


mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("MongoDB connected..."))
.catch(err => console.log(err));


const app = express();
app.use(express.static('public'));

// Ejs 
app.set('view engine','ejs');

// prints when the server was acessed 

app.use(express.urlencoded({ extended: false}));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,

}));


app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

// Global Vars()
 app.use((req,res,next) => {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error = req.flash('error');
     next()
 });



const PORT = process.env.PORT || 5001;


//routes

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));


app.listen(PORT,console.log(`Server started on Port ${PORT}`));
