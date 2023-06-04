//jshint esversion:6
// environmentvariables package
require ('dotenv').config();
const  express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
// level2
const encrypt = require('mongoose-encryption');


// Initialize app with express
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

/*mongoose connection to the local
 host (:27017 is the local port by default for mongodb).*/ 
mongoose.connect('mongodb://127.0.0.1:27017/userBD', {useNewUrlParser: true});
/*Create an js object to build to store the data in the dabase 
to used as amodel*/ 
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});


userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});

const User = new mongoose.model("User", userSchema);

// ROUTE
app.get('/', function(req, res){
    res.render('home.ejs');
});

app.get('/login', function(req, res){
    res.render('login.ejs');
});

app.get('/register', function(req, res){
    res.render('register.ejs')
});

/*The web app will be display at : http://localhost:3030/ */ 
app.listen(3030, function(){
    console.log('Server 3030')
});

// Registration 'POST' resquest
app.post('/register', function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
   
    newUser.save().then(()=>{
         /*now that the user is register, the user
            has access to the 'secrets.ejs' page*/ 
        res.render('secrets');
        }).catch((err)=>{
            console.log(err);
        });

});

// Login

app.post('/login', function(req,res){
    // email from the login form
    const username = req.body.username;
    // password from the form
    const password = req.body.password;
        // query to the 
        User.findOne({ email: username })
        .then(function(foundUser) {
          if (foundUser) {
            if (foundUser.password === password) {
              console.log('Password:', foundUser.password);
              res.render('secrets.ejs');
            } else {
              console.log('Incorrect password');
            }
          } else {
            console.log('User not found');
          }
        })
        .catch(function(error) {
          console.error('An error occurred:', error);
        });        
});
