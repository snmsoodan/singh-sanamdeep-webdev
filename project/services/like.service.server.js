module.exports=function (app,models) {


    var likeModel=models.likeModel;

    app.put("/api/like/delete",likeDelete);
    app.post("/api/like/create",likeCreate);
    app.get("/api/checkLike/:titleId/user/:userId",findThisLikedByUserId);
    app.get("/api/user/:userId/title/:titleId",findUsers);
    app.get("/api/findlikes/:userId",findAllLikedByUserId);
    app.delete("/api/like/deletebyAdmin/:userId",deleteLikeByUserId);
    
    function deleteLikeByUserId(req,res) {
        var userId=req.params.userId;
        console.log(userId);
        likeModel
            .deleteLikeByUserId(userId)
            .then(
                function (userId) {
                    console.log("success delete")
                    res.send(userId);
                },function (error) {
                    console.log("failure delete")
                    res.statusCode(404).send(error);
                }
            )
    }
    
    
    function findAllLikedByUserId(req,res) {
        var userId=req.params.userId;
        likeModel
            .findAllLikedByUserId(userId)
            .then(function (likes) {
                res.send(likes);
            },function (error) {
                res.sendStatus(404).send(error);
            })
    }


    function findUsers(req,res) {
        console.log("in find user service")
        var userId=req.params.userId;
        console.log(userId)
        var titleId=req.params.titleId;
        console.log(titleId)
        likeModel
            .findUsers(userId,titleId)
            .then(function (users) {
                res.send(users);
            },function (error) {
                res.sendStatus(404).send(error);
            })
    }


    function findThisLikedByUserId(req,res) {
        var id=req.params.titleId;
        var userId=req.params.userId;
        console.log("userid service like find by user "+userId);
        console.log("titleId service like find by user "+id);
        likeModel
            .findThisLikedByUserId(id,userId)
            .then(function (movie) {
                res.send(movie);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }
    


    
    function likeCreate(req,res) {
        var movie=req.body;
        console.log("like create service")
        likeModel
            .likeCreate(movie)
            .then(
                function (movie) {
                    res.send(movie);
                },function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
    
    function likeDelete(req,res) {
        var movie=req.body;
        likeModel
            .likeDelete(movie)
            .then(
                function (movie) {
                    console.log("success delete")
                    res.send(movie);
                        },function (error) {
                            console.log("failure delete")
                            res.statusCode(404).send(error);
                        }
                    )




    }
};