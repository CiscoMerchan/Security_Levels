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

### Get dependencise and packge in the app

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

### Render the page on the local machine

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

<br />

## Level 1 of Security

###  Email & Password

this is the lowes level of security. Email and password are registred in the database when user register and the hen the same user wants to login both data will be compared to verify that they are the same.

To save the registred data is necesary to create a database. 

*MongooseDB as database (this assume that mongoose as alredy been install in the local computer).

**Mongoose**
1. Stop terminal 'Ctrl+C'

2. **Install mongoose**
 ```
 npm install mongoose
```
 Then'require' mongoose in app.js file

3. **Connect mongodb**: 

```
/*mongoose connection to the local
 host (:27017 is the local port by default for mongodb).*/ 
mongoose.connect('mongodb://localhost:27017/userBD', {useNewUrlParser: true});
```
The **{ useNewUrlParser: true }** option is provided to handle the MongoDB URL parser deprecation warning. This option enables the new URL parser introduced in Mongoose version 5.3 or later.

**userBD** is the name  of the DB (is the DB doesn't exist mongodb will creat it).

4. Open another terminal tab and start mongoose.
```$mongod``` to run mongoose.

5. Back to the app terminal and run again ```nodemon app.js```

6. **Create Schema DB**

In app.js file, bellow mongoose connection.
```
const useSchema = {
    email: String,
    password: String
};

const User = new mongoose.model(User, userSchema);
```
*a.* The code defines a new Mongoose schema using mongoose.Schema(). The schema specifies the structure of the document to be stored in the 'User' collection.

*b.* The userSchema object defines two properties: email and password. Both properties are of type String.

*c.* After defining the schema, the code creates a Mongoose model using mongoose.model(). The model is assigned to the User variable.

*d.* The first argument of mongoose.model() is the model name, which should be in uppercase and singular form. In this case, the model name is 'User'.

*** Now the User model to perform database operations, such as creating new user documents, querying existing documents, or updating/deleting documents in the 'User' collection.



