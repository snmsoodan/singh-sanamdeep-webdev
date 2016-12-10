module.exports=function (app,models) {


    var reviewModel=models.reviewModel;

    app.post("/api/review/create",reviewCreate);
    app.get("/api/review/user/:userId/title/:titleId",getReview);
    app.get("/api/review/getAll/:titleId",getAllReviews);
    app.get("/api/allReviews",allReviews);
    app.put("/api/review/user/:userId/title/:titleId",updateReview);
    app.delete("/api/review/user/:userId/title/:titleId",deleteReview);
    app.get("/api/findReviews/:userId",findAllReviewsByUserId);
    app.delete("/api/areview/:id",deleteaReview);
    app.delete("/api/deleteByUser/:userId",deleteReviewByUserId);

    function deleteReviewByUserId(req,res) {
        var userId=req.params.userId;
        reviewModel
            .deleteReviewByUserId(userId)
            .then(function (reviews) {
                res.send(reviews);
            },function (error) {
                res.sendStatus(404).send(error);
            })
    }
    
    
    function deleteaReview(req,res) {
        var id=req.params.id;
        console.log(id)
        reviewModel
            .deleteaReview(id)
            .then(function (reviews) {
                res.send(reviews);
            },function (error) {
                res.sendStatus(404).send(error);
            })
    }
    
    function allReviews(req,res) {
        reviewModel
            .allReviews()
            .then(function (reviews) {
                res.send(reviews);
            },function (error) {
                res.sendStatus(404).send(error);
            })
    }


    function findAllReviewsByUserId(req,res) {
        var userId=req.params.userId;
        reviewModel
            .findAllReviewsByUserId(userId)
            .then(function (reviews) {
                res.send(reviews);
            },function (error) {
                res.sendStatus(404).send(error);
            })
    }


    function reviewCreate(req,res) {
        var review=req.body;
        console.log(review)
        console.log("review create service")
        reviewModel
            .reviewCreate(review)
            .then(
                function (review) {
                    res.send(review);
                },function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function getAllReviews(req,res) {
        console.log("get all review server")
        titleId=req.params.titleId;
        reviewModel
            .getAllReviews(titleId)
            .then(
                function (reviews) {
                    res.send(reviews);
                },function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
    
    function getReview(req,res) {
        var userId=req.params.userId;
        var titleId=req.params.titleId;
        console.log(userId)
        console.log(titleId)
        console.log("get review server")
        reviewModel
            .getReview(userId,titleId)
            .then(
                function (review) {
                    res.send(review);
                },function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
    
    
    function updateReview(req,res) {
        var userId=req.params.userId;
        var titleId=req.params.titleId;
        var review=req.body;
        console.log(userId)
        console.log(titleId)
        console.log("update review server")
        reviewModel
            .updateReview(userId,titleId,review)
            .then(
                function (review) {
                    console.log("server update success")
                    res.send(review);
                },function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function deleteReview(req,res) {
        var userId=req.params.userId;
        var titleId=req.params.titleId;
        console.log(userId)
        console.log(titleId)
        console.log("update review server")
        reviewModel
            .deleteReview(userId,titleId)
            .then(
                function (review) {
                    console.log("server delete success")
                    res.send(review);
                },function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }


    };