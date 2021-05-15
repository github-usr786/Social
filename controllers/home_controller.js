// created exportable home function  (controller/callback function)
module.exports.home  = function(request, response){
    response.end("<h1> Express is up for codial! </h1>");
}

module.exports.profile  = function(request, response){
    response.end("<h1> Express is up for codial! and running profile </h1>");
}