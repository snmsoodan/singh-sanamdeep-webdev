module.exports=function () {
    var mongoose=require("mongoose");

    var ReviewSchema= mongoose.Schema({
        
        titleId:String,
        title:String,
        userId:String,
        status:String,
        review:String,
        username:String,
        dateCreated: {type:Date,default:Date.now}
    },{collection:"project.review"});

    return ReviewSchema;
};