// created exportable home function  (controller/callback function)
module.exports.home  = function(request, response){
    response.end("<h1> Express is up for codial! </h1>");
}

module.exports.sample  = function(request, response){
    response.end("<h1> Express is up for codial! and running sample page </h1>");
}