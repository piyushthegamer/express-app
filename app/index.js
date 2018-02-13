const RateLimit = require('express-rate-limit');
const  helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const register = require('./register/register.js').register;
const config = require("config");
const login = require("./login/login.js").login;
const page = require("./pages.js").pages;
const path = require("path");

let pageHandler = new page();
let app = express();

app.use(helmet());
app.use(helmet.noCache());

let apiLimiter = new RateLimit({
  windowMs: 15*60*1000,
  max: 100,
  delayMs: 0
});
 
app.use('/api/', apiLimiter);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({secret: config.get('secret')}));

app.use(express.static(path.join(__dirname,"../public/")));

app.get("/",(req,res)=>{
    if(!req.session.logged){
        res.sendFile(path.join(__dirname,"../public/welcome.html"));
    }else{
        res.redirect('/page1');
    }
});

app.post("/api/login",login);

app.post("/api/register",register);

app.get("/logout",pageHandler.logout);

app.post("/login",pageHandler.login);

app.post("/register",pageHandler.register);

app.get("/page1",pageHandler.page1);

app.get("/page2",pageHandler.page2);

function startServer(port,callback){
    return app.listen(port,callback)
}

exports.startServer = startServer;