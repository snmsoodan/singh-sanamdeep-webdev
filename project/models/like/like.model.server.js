module.exports=function () {

    var mongoose=require("mongoose");
    var LikeSchema=require("./like.schema.server.js")();
    var Like=mongoose.model("Like",LikeSchema);

    var api={
        findThisLikedByUserId:findThisLikedByUserId,
        likeCreate:likeCreate,
        likeDelete:likeDelete,
        findUsers:findUsers,
        findAllLikedByUserId:findAllLikedByUserId,
        deleteLikeByUserId:deleteLikeByUserId
        
    };
    return api;

    function deleteLikeByUserId(userId) {
        console.log("mongo   "+userId)
        return Like.remove({userId:userId});
    }

    function findAllLikedByUserId(userId) {
        return Like.find({userId:userId});
    }

    function findUsers(userId,titleId) {
        console.log(userId);
        console.log(titleId)
        return Like.find({titleId:titleId,userId:{$ne:userId}})
    }

    
    function findThisLikedByUserId(titleId,userId) {
        return Like.findOne({titleId:titleId,userId:userId})
    }
    
    function findLikeId(titleId,userId) {
        return Like.findOne({titleId:titleId,userId:userId})
    }

    function likeCreate(movie) {
            return Like.create(movie);
    }

    function likeDelete(movie) {
        console.log("reached here")
        return Like.remove({titleId:movie.titleId,userId:movie.userId});
    }

    
}