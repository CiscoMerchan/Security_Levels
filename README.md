# Authentification & Security

This is a simple web app that allow the user to write a secret. the porpuse is to learn how to secure a web app through different levels of securities.
<hr>

**npm package:**
* express
* ejs
* body-parser

The app is compose by pages:
- Home : user register or login.

- Register: first time user register detail. details use to authentificate in the future once login.

- login : Already register user type details and goes to 'secret' page.

- secret : page were the secrets are keeped.

<hr>

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

<hr />

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
const userSchema = {
    email: String,
    password: String
};

const User = new mongoose.model('User', userSchema);
```
*a.* The code defines a new Mongoose schema using mongoose.Schema(). The schema specifies the structure of the document to be stored in the 'User' collection.

*b.* The userSchema object defines two properties: email and password. Both properties are of type String.

*c.* After defining the schema, the code creates a Mongoose model using mongoose.model(). The model is assigned to the User variable.

*d.* The first argument of mongoose.model() is the model name, which should be in uppercase and singular form. In this case, the model name is 'User'.

*** Now the User model to perform database operations, such as creating new user documents, querying existing documents, or updating/deleting documents in the 'User' collection.

7. **Fetch data from registration form to add in the DB**

- Add a 'post' request routein app.js file:
```
// Registration 'POST' resquest
app.post('/register', function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
```
8. **User registerd and directed to 'secrets.ejs' page**   
   ```
    newUser.save().then(()=>{
         /*now that the user is register, the user
            has access to the 'secrets.ejs' page*/ 
        res.render('secrets');
        }).catch((err)=>{
            console.log(err);
        });
    });```

*a.* Extracts the email and password (from 'name=""' in the form) from the request body submitted by the user.
Creates a new instance of the User model using the extracted email and password.

*b.* Invokes the save() method on the newUser object, which saves the user's information to the database.

*c.* If the user is successfully saved to the database, the code inside the .then() callback is executed.

*d.* The user is redirected to the 'secrets.ejs' page using the res.render() method. This assumes that there is a corresponding 'secrets.ejs' template defined in the application.

*e.* If there is an error during the save operation, the code inside the .catch() callback is executed.
The error is logged to the console for debugging purposes.

*f.* This code demonstrates a basic registration process, where user data is saved to the database upon successful registration. After registration, the user is redirected to a page where they can access privileged information (in this case, the 'secrets.ejs' page). Any errors that occur during the registration process are logged to the console for error tracking and debugging.

*At this point the email just check is thee is '@' and ' .' .* *And there is not condition in the password characters or minimun.* 

9. **Login User registered**

 Login functionality where the user's entered email and password are compared with the stored user data in the database. If the credentials match, it allows access to the secrets page; otherwise, it provides appropriate error messages.

 POST request to the '/login' route. Let's break down what is happening in the code:

1. The code begins with defining the route and the HTTP method using app.post('/login', function(req, res) { ... }). This means that when a POST request is made to the '/login' URL, the corresponding function will be executed.

2. Inside the function, two variables are declared:

- username: It extracts the value of the 'username' field from the request body. This assumes that the form data sent in the POST request includes a field named 'username'.
- password: It extracts the value of the 'password' field from the request body. This assumes that the form data sent in the POST request includes a field named 'password'.
- The code then proceeds to query the database using Mongoose. It uses the User model to find a document that matches the provided username (email) using User.findOne({ email: username }). This queries the database for a user document where the 'email' field matches the provided username.

3. After executing the query, a promise-based callback function is chained using .then(function(foundUser) { ... }). If the query is successful, the callback function receives the foundUser document as an argument.

4. Inside the callback function, it checks if foundUser exists (i.e., if a user with the provided username is found). If foundUser exists, it further checks if the password provided matches the stored password in the foundUser document using foundUser.password === password.

5. If the password matches, it logs the stored password to the console using console.log('Password:', foundUser.password) and renders the 'secrets.ejs' template using res.render('secrets.ejs'). This typically means the user has successfully authenticated, and they can access the secrets page.

6. If the password doesn't match, it logs 'Incorrect password' to the console using console.log('Incorrect password').

7. If foundUser is not truthy (i.e., no user with the provided username is found), it logs 'User not found' to the console using console.log('User not found').

8. If an error occurs during the database query or any other operation, the error is caught by the .catch(function(error) { ... }) block. The error is logged to the console using console.error('An error occurred:', error).

#### Code

```
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
```
### Note: Level 1 Security
At this stage the security is very bad because any body how have access to the database it will be able to see clearly the password of the user.

<hr>

## Level 2 of Security

### Encryption
For encrypt the user pasword we will us `mongoose-encryption` a npm package. Encryption is performed using `AES-256-CBC` with a random, unique initialization vector for each operation. Authentication is performed using HMAC-SHA-512.

Mongoose-encryption
Simple encryption and authentication for mongoose documents. Relies on the Node crypto module. Encryption and decryption happen transparently during save and find. Rather than encrypting fields individually, this plugin takes advantage of the BSON nature of mongoDB documents to encrypt multiple fields at once.

for this level we will use only the encrytion (fro more information: `https://www.npmjs.com/package/mongoose-encryption`).
To encrypt, the relevant fields are removed from the document, converted to JSON, enciphered in Buffer format with the IV and plugin version prepended, and inserted into the _ct field of the document. Mongoose converts the _ct field to Binary when sending to mongo.

To decrypt, the _ct field is deciphered, the JSON is parsed, and the individual fields are inserted back into the document as their original data types.

### 1. Install `mongoose-encryption` package
(if `nodemon app.js` is runnig on the terminal, stop it Ctrl+C)
On the terminal `$npm install mongoose-encryption` 

### 2. require  `mongoose-encryption`
On app.js file:
`const ecrypt = require('mongoose-encryption');`

### 3. Create a new mongoose Schema
At level 1 the 'userSchema' is a javaScript object. Now it is requere a moongose Schema Object (in the documentation is show how to do it). becasue later will be need it to add `.plugin` to the new Schema.

Actual Schema:
```
const userSchema = {
    email: String,
    password: String
};
``` 
New Mongoose Schema (now is object created from mongoose Schema class):
```
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const secret = "Thisourlittlesecret.";
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});

const User = new mongoose.model("User", userSchema);
```

**Let's break down the code step by step:**

**const userSchema = new mongoose.Schema({ email: String, password: String });:** This line creates a new Mongoose schema called userSchema for the "User" collection. The schema defines two fields: "email" and "password", both of which are of type String. This schema will be used to define the structure and validation rules for documents in the "User" collection.

**const secret = "Thisourlittlesecret.";:** This line declares a secret key that will be used for encryption. This secret key should be kept secure and not shared publicly. It will be used to encrypt and decrypt the "password" field in the user documents.

**userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});:** This line adds the "mongoose-encryption" plugin to the userSchema. The plugin is used to encrypt certain fields in the documents based on the provided options. In this case, the "password" field is specified as the field to be encrypted. The secret variable is used as the encryption secret key.

**const User = new mongoose.model("User", userSchema);:** This line creates a Mongoose model named "User" based on the userSchema. The model represents the "User" collection in the MongoDB database. It provides an interface for interacting with the collection, including querying, creating, updating, and deleting documents.

With this code, any documents created using the "User" model will have their "password" field encrypted using the "mongoose-encryption" plugin and the specified secret key. When retrieving documents from the database, the plugin will automatically decrypt the "password" field for you

### Note: Level 2 Security
This level of security is not enough because the key word to encrypt the passwor is visible in our code `const secret = "Thisourlittlesecret.";`. If some have access to this 'secret' and use the same package that we use to encrypt the user password that person can have access to real users password. In conclution this not very secure.

<hr>

## Level 3 of Security

### Environment Variables

 **Package** `Dotenv` is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology. more info: `https://www.npmjs.com/package/dotenv`

1. in the terminal install `npm install dotenv `

2. As early as possible in your application, import and configure dotenv (right at the top of the app.js file, 'dotenv' will be active and running): `require ('dotenv').config();`

3. Create a `.env` file in the root directory of the project (in this case at "Secrets - Starting Code": `...\Screts - Starting Code> touch .env`). Add environment specific variables on new lines in the form of `NAME=VALUE`. For example: 
``` 
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mp13 
```
For this app the line of code in app.js  `const secret = "Thisourlittlesecret.";` is remove and pasted on .env file formated with the dotenv requirements: `SECRET=Thisourlittlesecret.`, capital letters, no space, no quotations marks, no comas. **THIS NOT** a javaScript file is a text file.

4. Now that the key is inside .env file is necessary add the key in the inside `userSchema.plugin`
before:
```
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});
```

now:

```
userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});
```
#### What it says this code? 
* `userSchema` is likely a schema object defined using a library like Mongoose, which is commonly used with MongoDB to define the structure and behavior of documents in a collection.

* `plugin` is a method provided by Mongoose that allows you to add additional functionality or behavior to a schema. In this case, the `encrypt` plugin is being added to the `userSchema`.

* The second argument passed to the `plugin` method is an options object that configures the behavior of the `encrypt` plugin. It has two properties:

 * `secret`: This property is set to the value of `process.env.SECRET`. `process.env` is a Node.js global object that provides access to environment variables. The `SECRET` variable is likely an environment variable that holds a secret key or passphrase used for encryption.

 * `encryptedFields`: This property is an array containing the names of fields in the userSchema that should be encrypted. In this case, only the `'password'` field is specified, indicating that the password field of the user document should be encrypted using the provided secret.

Overall, this line of code adds an encryption plugin to a userSchema, specifying that the password field should be encrypted using a secret key stored in an environment variable. This can enhance the security of the application by ensuring sensitive user data is stored securely.

### .gitignore

In order to keep safe the 'keys' that we don't want to show in online to the public the `.env` file needs to be hide for that at the top level directory we have to create a `.gitignore` file. in order to do it correctly here is the documentation to follow the guidelines while using 'node.js', `https://github.com/github/gitignore/blob/main/Node.gitignore `

5. Create a `.gitignore` file in the root directory of the project (in this case at "Secrets - Starting Code": `...\Screts - Starting Code> touch .gitignore`).

6. Copy the code from the template file from `https://github.com/github/gitignore/blob/main/Node.gitignore `. And pasted inside '.gitignore'file.









