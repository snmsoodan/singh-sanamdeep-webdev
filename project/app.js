module.exports=function (app) {

    var models=require("./models/models.server.js")();
    require("./services/user.service.server.js")(app,models);
    require("./services/movie.service.server.js")(app,models);
    require("./services/like.service.server.js")(app,models);
    require("./services/review.service.server.js")(app,models);
    require("./services/follow.service.server")(app,models);
    
};
