module.exports=function () {
    var mongoose=require("mongoose");

    var FollowSchema= mongoose.Schema({
        userId:String,
        otherUserId:String,
        followed:String,
        followedBy:String,
        dateCreated: {type:Date,default:Date.now}
    },{collection:"project.follow"});

    return FollowSchema;
};