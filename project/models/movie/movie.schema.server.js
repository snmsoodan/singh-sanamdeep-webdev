module.exports=function () {
    var mongoose=require("mongoose");

    var MovieSchema= mongoose.Schema({
        rating:String,
        director:String,
        username:String,
        titleId:String,
        title:String,
        userId:String,
        dateCreated: {type:Date,default:Date.now}
    },{collection:"project.movie"});

    return MovieSchema;
};