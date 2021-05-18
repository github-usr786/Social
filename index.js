const express  = require('express');                //impoting express
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');      //requiring/importing cooike-parser
const port = 8000;                                  // declare port no
const app = express();                              // calling express as function

const db = require('./config/mongoose');            //importing config/mongoose module which estb. connection with db

app.use(express.urlencoded({extended: true }))      //using urlencoded to parse/read through post request

app.use(cookieParser());                            //using cookie-parser

//use express router
app.use('/',require('./routes/index'));             // route all request to index.js of routes folder

     
app.use(bodyParser.json());


// accesing static files
app.use(express.static('assets'));                  // it will find folder assets having css,images,fonts as subfolder


//set up view engine
app.set('view engine', 'ejs');                      // set up ejs as view engine/template engine
app.set('views', './views');                        // set up path of views folder  










app.listen(port, function(err){                          //starting or firing up express server   
    if(err){
        console.log(`Error in running the server...`);
    }
    console.log(`Server is up and running on port: ${port}`);
});