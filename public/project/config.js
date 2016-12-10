(function () {
    angular
        .module("WebAppMaker")
        .config(Config);


    function Config($routeProvider) {
        $routeProvider

            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/flickr", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })

            .when("/",{
                templateUrl:"views/user/login.view.client.html"
            })
            .when("/login",{
                templateUrl:"views/user/login.view.client.html",
                controller:"LoginController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl:"views/user/register.view.client.html",
                controller:"RegisterController",
                controllerAs:"model"
            })
           // .when("/user/:id",{
            .when("/user",{
                templateUrl:"views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs:"model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })

            .when("/user/admin",{
                templateUrl:"views/admin/admin.view.client.html",
                controller: "AdminController",
                controllerAs:"model",
                // resolve:{
                //     loggedIn:checkLoggedIn
                // }
            })

            .when("/user/mainHome", {
                templateUrl: "views/user/mainHome.view.client.html",
                controller: "UserHomeController",
                controllerAs: "model",
            })


            .when("/user/title/:titleId", {
                templateUrl: "views/title/titleMain.view.client.html",
                controller: "MovieMainController",
                controllerAs: "model",
            })
            
            

            .when("/user/:id",{
                templateUrl:"views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs:"model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })

            // .when("/user/user:id",{
            //     templateUrl:"views/user/profile.view.client.html",
            //     controller: "ProfileController",
            //     controllerAs:"model",
            //     resolve:{
            //         loggedIn:checkLoggedIn
            //     }
            // })

            .when("/user/:userId/home", {
                templateUrl: "views/user/userHome.view.client.html",
                controller: "UserHomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/user/:userId/title/:titleId/allReviews", {
                templateUrl: "views/title/movieReviewAllUsers.view.client.html",
                controller: "MovieAllReviewController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            

            .when("/user/:userId/title/:titleId/writeReview", {
                templateUrl: "views/title/movieWriteReviewByUser.view.client.html",
                controller: "MovieWriteReviewController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/user/:userId/title/:titleId/likes", {
                templateUrl: "views/title/movieLikedByUser.view.client.html",
                controller: "MovieLikeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })


            .when("/user/:userId/title/:titleId/director/:directorId", {
                templateUrl: "views/title/titleDirector.view.client.html",
                controller: "MovieDirectorController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/user/:userId/title/:titleId", {
                templateUrl: "views/title/titleHome.view.client.html",
                controller: "MovieHomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })


            .when("/user/:userId/:otherUserId/likes", {
                templateUrl: "views/searchUser/like.view.client.html",
                controller: "LikeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/user/:userId/:otherUserId/reviews", {
                templateUrl: "views/searchUser/reviewByUser.view.client.html",
                controller: "ReviewController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/user/:userId/:otherUserId/profile", {
                templateUrl: "views/searchUser/profile.other.view.client.html",
                controller: "ProfileOtherController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/user/:userId/:otherUserId/follows", {
                templateUrl: "views/searchUser/otherFollow.view.client.html",
                controller: "OtherFollowController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/:otherUserId/followers", {
                templateUrl: "views/searchUser/otherFollower.view.client.html",
                controller: "OtherFollowerController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/user/:userId/own/reviewsByUser", {
                templateUrl: "views/ownDetails/viewOwnReviews.view.client.html",
                controller: "OwnReviewController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/user/:userId/own/like", {
                templateUrl: "views/ownDetails/viewOwnLikes.view.client.html",
                controller: "OwnLikeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/user/:userId/own/followedBy", {
                templateUrl: "views/ownDetails/viewOwnFollowers.view.client.html",
                controller: "OwnFollowersController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/user/:userId/own/follow", {
                templateUrl: "views/ownDetails/viewWhoYouFollow.view.client.html",
                controller: "WhoYouFollowController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/user/:userId/findPeople", {
                templateUrl: "views/searchUser/findFriend.view.client.html",
                controller: "FriendSearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .otherwise({
                redirectTo:"/login"
            })


        
        
        function checkLoggedIn(UserService,$location,$q,$rootScope) {
            var deferred=$q.defer();
            UserService
                .loggedIn()
                .then(function (response) {
                    var user=response.data;
                    console.log(user);
                    if(user === '0'){
                        $rootScope.currentUser = null;
                        deferred.reject();
                        $location.url("/login");
                    }else{
                        $rootScope.currentUser=user;
                        deferred.resolve();
                    }
                },function (err) {
                    $location.url("/login");
                });
            return deferred.promise;
        }

    }
})();
