const express  = require('express');                                //impoting express
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');                      //requiring/importing cooike-parser
const port = 8000;                                                  // declare port no
const expressLayouts = require('express-ejs-layouts');              //importing express-ejs-layout to setup layout of page
const app = express();                                              // calling express as function

const db = require('./config/mongoose');            //importing config/mongoose module which estb. connection with db

// use for session cookie  -- imports
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');          //impoting connect-mongo 

app.use(express.urlencoded({extended: true }))      //using urlencoded to parse/read through post request

app.use(cookieParser());                            //using cookie-parser
     
app.use(bodyParser.json());

// accesing static files
app.use(express.static('assets'));                  // it will find folder assets having css,images,fonts as subfolder

app.use(expressLayouts);                                    //using expressLayouts
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//set up view engine
app.set('view engine', 'ejs');                      // set up ejs as view engine/template engine
app.set('views', './views');                        // set up path of views folder  

//using express session saving identity of user in encrypted form in cookie
app.use(session({
    name: 'codial_cookie_store',
    //TODO change secret key before deployment in production 
    secret:'blahsomething',                             //secret key to encrypt user id in to cookie
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (100*60*100)                            //time in millisec (after this cookie will empty)
    },
    //MongoStore is used to store session-cookie in db
    store:  MongoStore.create({ mongoUrl:'mongodb://localhost/codial_development', autoRemove: 'disabled' }, 
                function(err){
                console.log(err || 'connect-mongodb set up ok');
                }    
    )
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//setup current user usage  
    //when passport is initialize, then this middleware fun(setAthenticatedUser-created in config/passport-local-strategy)
    // is automatically called
app.use(passport.setAthenticatedUser);


//use express router
app.use('/',require('./routes/index'));             // route all request to index.js of routes folder







app.listen(port, function(err){                          //starting or firing up express server   
    if(err){
        console.log(`Error in running the server...`);
    }
    console.log(`Server is up and running on port: ${port}`);
});