const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/educonnect");
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const path = require('path');
const express = require('express');
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use("/public",express.static('public'));

app.use(express.static('public'));

app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret : "educonnect@04",
    saveUninitialized : true,
    resave : false,
}));

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    res.locals.loggedin = req.session.loggedin;
    res.locals.userId = req.session.userId;
    res.locals.email = req.session.email;
    res.locals.user = req.session.user;
    delete req.session.message;
    next();
});

const router = require('./router/edurouter');
app.use('/',router);


app.listen(5000, function () {
    console.log("Started application on port %d", 5000)
});