# Authentification & Security

This is a simple web app that allow the user to write a secret. the porpuse is to learn how to secure a web app through different levels of securities.

**npm package:**
* express
* ejs
* body-parser

The app is compose by pages:
- Home : user register or login.

- Register: first time user register detail. details use to authentificate in the future once login.

- login : Already register user type details and goes to 'secret' page.

- secret : page were the secrets are keeped.

## Get dependencise and packge in the app

1. Initialize npm. open terminal, get into the top folder and write : ```npm init -y``` (-y. to say yes to all the specifications). It wll install 'package.json' file

2. Add dependencies in the terminal:
 ```npm i express ejs body-parser```
install all the dependencies in one line code.

3. Check in the 'package.json' file the dependances as been installed: 
```
    "dependencies": {
    "body-parser": "^1.20.2",
    "ejs": "^3.1.9",
    "express": "^4.18.2"
}
```

## Render the page on the local machine

1. Open 'app.js' file.

2. import dependancies:
```
const  express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
```
3. Path route

```
// Initialize app with express
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
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
```

4. Display app in the browser
Terminal :
```nodemon app.js```

* if there is any error, lock for misspeling if not google it.

If everything is ok this should be display in the terminal, so is working well.
```
[nodemon] restarting due to changes...   
[nodemon] starting `node app.js`
Server 3030
``` 
- Go to the browser and type ```localhost3030``` and the web app will be working.

- Check each page is display properly.



