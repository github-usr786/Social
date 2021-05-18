//establishing connection with database
const mongoose = require('mongoose');           //imopting mongoose

// conecting to databse -> codial_development
mongoose.connect('mongodb://localhost/codial_development',{useNewUrlParser:true, useUnifiedTopology:true});

//acquiring the connection (to check if it's sucessfull)
const db = mongoose.connection;

//error on connecting to database
db.on('error',console.error.bind(console, 'Error connecting to database'));

//sucessfully connected to database
db.once('open', function()
{
    console.log("Sucessfully connected to database");
});

//exporting connection instance of db
module.exports = db;