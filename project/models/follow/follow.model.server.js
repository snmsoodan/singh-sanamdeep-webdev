module.exports=function () {

    var mongoose=require("mongoose");
    var FollowSchema=require("./follow.schema.server.js")();
    var Follow=mongoose.model("Follow",FollowSchema);

    var api={
        addFollow:addFollow,
        unfollowUser:unfollowUser,
        checkFollowing:checkFollowing,
        findAllFollowedByUserId:findAllFollowedByUserId,
        findAllFollowingOtherUserId:findAllFollowingOtherUserId,
        deleteFollowing:deleteFollowing,
        deleteFollowedBy:deleteFollowedBy
        
    };
    return api;

    function deleteFollowedBy(userId) {
        return Follow.remove({otherUserId:userId});
    }

    function deleteFollowing(userId) {
        return Follow.remove({userId:userId});
    }



    function findAllFollowingOtherUserId(follow) {
        return Follow.find({otherUserId:follow.userId});
    }
    
    function findAllFollowedByUserId(follow) {
        return Follow.find({userId:follow.userId});
    }

    function checkFollowing(follow) {
        console.log(follow.userId,follow.otherUserId)
        return Follow.findOne({userId:follow.userId,otherUserId:follow.otherUserId});
    }
    

    function addFollow(follow) {
            return Follow.create(follow);
    }

    function unfollowUser(follow) {
        console.log("reached here")
        return Follow.remove({userId:follow.userId,otherUserId:follow.otherUserId});
    }

    
}