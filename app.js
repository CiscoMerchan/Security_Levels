//jshint esversion:6
const  express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');


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
const userSchema = {
    email: String,
    password: String
};

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