const express  = require('express');            //impoting express
const port = 8000;                              // declare port no
const app = express();                          // calling express as function


app.listen(port, function(err){                          //starting or firing up express server   
    if(err){
        console.log(`Error in running the server...`);
    }
    console.log(`Server is up and running on port: ${port}`);
});