module.exports=function () {

    var mongoose=require("mongoose");
    var ReviewSchema=require("./review.schema.server.js")();
    var Review=mongoose.model("Review",ReviewSchema);

    var api={
        reviewCreate:reviewCreate,
        getReview:getReview,
        updateReview:updateReview,
        deleteReview:deleteReview,
        getAllReviews:getAllReviews,
        allReviews:allReviews,
        deleteaReview:deleteaReview,
        findAllReviewsByUserId:findAllReviewsByUserId,
        deleteReviewByUserId:deleteReviewByUserId
        
    };
    return api;

    function deleteReviewByUserId(userId) {
        console.log("mongo    "+userId);
        return Review.remove({userId:userId})
    }

    function deleteaReview(id) {
        console.log("mongo    "+id);
        return Review.remove({_id:id})
    }

    function findAllReviewsByUserId(userId) {
        return Review.find({userId:userId});
    }

    function allReviews() {
        return Review.find();
    }
    

    function reviewCreate(review) {
        console.log("review model")
            return Review.create(review);
    }

    function getReview(userId,titleId) {
        return Review.findOne({userId:userId,titleId:titleId})
    }


    function getAllReviews(titleId) {
        return Review.find({titleId:titleId});
    }

    function updateReview(userId,titleId,review) {
        return Review
            .update({userId:userId,titleId:titleId},{
                $set: {
                    review:review.review,
                }
            });
    }


    function deleteReview(userId,titleId) {
        return Review.remove({userId:userId,titleId:titleId})
    }
   

    
}