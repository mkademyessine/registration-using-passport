//importing express for our app
const express = require('express')
const app = express()
// importa mongoose for out database
const mongoose = require('mongoose')
// body parser to fech html data
const bodyParser = require('body-parser')
// import all dependency for using passport
const session = require('express-session')
const passport = require('passport')


app.set('view engine', 'ejs')
// allow user to use body parser
app.use(express.urlencoded({extended:true}));

// connect to our  database
mongoose.connect('mongodb://localhost:27017/userDatabase',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String
});
// creating the user model
const User = new mongoose.model("User",userSchema);

// Handling get request on home route.
app.get("/", function (req, res) {
    res.send("This is the home route");
});
/// creating the login page
app.get('/login', (req, res) => {
    res.render('login');
}); 

app.get('/register',(req, res) => {
    res.render('register');
});


// Allowing app to listen on port 3000
app.listen(3000, function () {
  console.log("server started successfully");
})
// Handling the post request on /register route.
app.post("/register", function(req, res){
    console.log(req.body);
        
    // Getting the email and password entered
    // by the user
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
      
    // Creating a new user with entered credentials.
    var newuser = new User({
      name: name,  
      email : email,
      password : password
    })
    // Saving the newuser.
    newuser.save();
    console.log("saved successfully");
      
    // Sending the response that user
    // is saved successfully
    res.render("login",{newuser: new User()});
  })
// check if user find and login
app.post("/login",(req, res)=> {
    console.log(req.body);
    // getting the email and password from our database
    var emailEntered = req.body.email;
    var passwordEntered = req.body.password;
    // check if the email exist 
    User.findOne({email:emailEntered},function(err,data){
        if (data) {
            console.log(data);
            if (data.password == passwordEntered)
            {
                res.send("login successfully")
            } else 
            {
                res.send("password wrong try again")
                console.log(passwordEntered)

            }
        }
        else
        // the email does not exist in the database
        console.log(err);
    })
