module.exports=function () {
    var models={
        userModel:require("./user/user.model.server")(),
        websiteModel:require("./website/website.model.server")(),
        pageModel:require("./page/page.model.server")(),
        widgetModel:require("./widget/widget.model.server")()
        //TODO:add all the other models:websteModel,pageModel...
    };


    return models;
};