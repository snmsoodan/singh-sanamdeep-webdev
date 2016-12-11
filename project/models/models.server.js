module.exports=function () {

    var connectionString ='mongodb://sanamsoodan:harman587@ds033066.mlab.com:33066/singh-sanamdeep';
    // var connectionString ='mongodb://sanamsoodan:harman587@ds127948.mlab.com:27948/sanamdeep';
    var mongoose = require("mongoose");
    // mongoose.createConnection(connectionString);
    mongoose.connect(connectionString);
    // mongoose.Promise = global.Promise;

    var models={
        projectModel:require("./user/user.model.server")(),
        // userModel:require("./user/projectUser.model.server")(),
        movieModel:require("./movie/movie.model.server")(),
        likeModel:require("./like/like.model.server")(),
        reviewModel:require("./review/review.model.server")(),
        followModel:require("./follow/follow.model.server")()
        //TODO:add all the other models:websteModel,pageModel...
    };
    

    return models;
};