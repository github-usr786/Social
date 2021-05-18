// created exportable home function  (controller/callback function)
module.exports.home  = function(request, response){
    //response.end("<h1> Express is up for codial! </h1>");
    //console.log(request.cookies);                          //reading cookies
    //response.cookie('user_id','25');                       //postig cookie to server also saves at browser
    response.render('home',{title:"home"});
}

module.exports.sample  = function(request, response){
    response.end("<h1> Express is up for codial! and running sample page </h1>");
}