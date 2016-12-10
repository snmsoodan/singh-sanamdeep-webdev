module.exports=function () {
    var mongoose=require("mongoose");

    var LikeSchema= mongoose.Schema({
        
        titleId:String,
        title:String,
        userId:String,
        status:String,
        username:String,
        dateCreated: {type:Date,default:Date.now}
    },{collection:"project.like"});

    return LikeSchema;
};