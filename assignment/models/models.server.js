module.exports=function () {

    var connectionString ='mongodb://sanamsoodan:harman587@ds033066.mlab.com:33066/singh-sanamdeep';
    var mongoose = require("mongoose");
    // mongoose.createConnection(connectionString);
    mongoose.connect(connectionString);
    // mongoose.Promise = global.Promise;

    var models={
        userModel:require("./user/user.model.server")(),
        // userModel:require("./project/user.model.server")(),
        websiteModel:require("./website/website.model.server")(),
        pageModel:require("./page/page.model.server")(),
        widgetModel:require("./widget/widget.model.server")()
        //TODO:add all the other models:websteModel,pageModel...
    };


    return models;
};