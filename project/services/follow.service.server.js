module.exports=function (app,models) {


    var followModel=models.followModel;

    app.put("/api/follow/delete",unfollowUser);
    app.post("/api/follow/create",addFollow);
    app.put("/api/follow/check",checkFollowing);
    app.put("/api/follow/follows",findAllFollowedByUserId);
    app.put("/api/follow/followed",findAllFollowingOtherUserId);
    app.delete("/api/deleteFollowing/:userId",deleteFollowing);
    app.delete("/api/deleteFollowedBy/:userId",deleteFollowedBy);

    function deleteFollowedBy(req,res) {
        var userId=req.params.userId;
        followModel
            .deleteFollowedBy(userId)
            .then(
                function (follow) {
                    res.send(follow);
                },function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
    
    function deleteFollowing(req,res) {
        var userId=req.params.userId;
        followModel
            .deleteFollowing(userId)
            .then(
                function (follow) {
                    res.send(follow);
                },function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
    

    function findAllFollowingOtherUserId(req,res) {
        var follow=req.body;
        followModel
            .findAllFollowingOtherUserId(follow)
            .then(
                function (follow) {
                    console.log("reached here")
                    res.send(follow);
                },function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
    
    function findAllFollowedByUserId(req,res) {
        var follow=req.body;
        followModel
            .findAllFollowedByUserId(follow)
            .then(
                function (follow) {
                    console.log("reached here")
                    res.send(follow);
                },function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
    
   

    function checkFollowing(req,res) {
        var follow=req.body;
        followModel
            .checkFollowing(follow)
            .then(
                function (follow) {
                    console.log("reached here")
                    res.send(follow);
                },function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
    
    function addFollow(req,res) {
        var follow=req.body;
        console.log("follow create service")
        followModel
            .addFollow(follow)
            .then(
                function (follow) {
                    res.send(follow);
                },function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
    
    function unfollowUser(req,res) {
        var follow=req.body;
        console.log("follow create service")
        followModel
            .unfollowUser(follow)
            .then(
                function (follow) {
                    res.send(follow);
                },function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
};