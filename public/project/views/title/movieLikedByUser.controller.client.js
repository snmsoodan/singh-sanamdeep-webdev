(function() {
    angular
        .module("WebAppMaker")
        .controller("MovieLikeController", MovieLikeController);

    // function MovieHomeController($location, YelpService, $routeParams, UserService, LikeService,ReviewService, CategoryService) {
    function MovieLikeController($location, MovieService, $routeParams, LikeService,UserService) {
        var vm = this;
        
        vm.userId = $routeParams.userId;
        var username = "";
        vm.titleId = $routeParams.titleId;
        var usernamesOfWhoLiked = [];
        vm.thisUserLikes = false;
        vm.likeMovie=likeMovie;
        vm.unlikeMovie=unlikeMovie;

        function init() {
            console.log("in contoller");
            MovieService
                .findMovieById( vm.titleId,vm.userId)
                .then(
                    function (response) {
                        console.log("in db contoller1");

                        if (response.data != "error") {
                            MovieService
                                .searchMovieById(vm.titleId)
                                .then(function (response) {
                                    console.log("in db contoller2");
                                    vm.title = response.data;
                                    LikeService
                                        .findThisLikedByUserId(vm.userId, vm.titleId)
                                        .then(
                                            function (response) {
                                                if (response.data) {
                                                    console.log("user liked this movie before");
                                                    vm.thisUserLikes = true;
                                                    console.log(vm.userId+"  "+vm.titleId)
                                                    LikeService
                                                        .findUsers(vm.userId,vm.titleId)
                                                        .then(function (response) {
                                                            console.log("here1")
                                                           vm.users=response.data;
                                                            console.log(vm.users)
                                                            if(vm.users.length==0){
                                                                vm.hasLiked=false;
                                                            }
                                                            else{
                                                                vm.hasLiked=true;
                                                            }

                                                        },function (error) {
                                                            console.log("here12")
                                                            vm.hasLiked=false;
                                                        })
                                                }
                                                else {
                                                    console.log("user didnt liked this movie before");
                                                    vm.thisUserLikes = false;
                                                    LikeService
                                                        .findUsers(vm.userId,vm.titleId)
                                                        .then(function (response) {
                                                            console.log("here2")
                                                            vm.users=response.data;
                                                            if(vm.users.length==0){
                                                                vm.hasLiked=false;
                                                            }
                                                            else{
                                                                vm.hasLiked=true;
                                                            }
                                                        },function (error) {
                                                            console.log("here22")
                                                            vm.hasLiked=false;
                                                        })
                                                }
                                            }, function (error) {
                                                vm.error = error
                                            });
                                }, function (error) {
                                    vm.error = "Incorrect value of title";
                                });


                        }
                        else {
                            MovieService
                                .searchMovieById(vm.titleId)
                                .then(function (response) {
                                    console.log("in db contoller3");
                                    vm.title = response.data;
                                    console.log(vm.title.imdbID)
                                    LikeService
                                        .findUsers(vm.userId,vm.titleId)
                                        .then(function (response) {
                                            console.log("here3")
                                            vm.users=response.data;
                                            if(vm.users.length==0){
                                                vm.hasLiked=false;
                                            }
                                            else{
                                                vm.hasLiked=true;
                                            }
                                        },function (error) {
                                            console.log("here33")
                                            vm.hasLiked=false;
                                        })
                                }, function (error) {
                                    vm.error = "Incorrect value of title";
                                });
                        }
                    },
             function (error) {
                         vm.error = "Incorrect value of title";
                    }
                );
        }
        init();

        function likeMovie() {
            console.log("like controller")
            UserService
                .findUserById(vm.userId)
                .then(function (response) {
                    var username=response.data.username;
                    console.log("username client like: "+username)
                    var newMovie={
                        rating: vm.title.Rated,
                        director: vm.title.Director,
                        titleId: vm.title.imdbID,
                        userId:vm.userId,
                        username: username,
                        title: vm.title.Title
                    }
                    MovieService
                        .createMovie(newMovie)
                        .then(function (response) {
                            var movie = {
                                userId:vm.userId,
                                titleId:vm.titleId,
                                title:vm.title.Title,
                                status:"true",
                                username:username
                            };
                            LikeService
                                .likeCreate(movie)
                                .then(function (response) {
                                    var user=response.data;
                                    if(user){
                                        console.log("like db success controller")
                                        vm.thisUserLikes=true;
                                    }
                                    else{
                                        $location.url("/user/"+vm.userId+"/title/"+vm.titleId);
                                    }})
                        },function (error) {
                            vm.error="could not add like entry";
                        })
                }
                )}
        
        
        function unlikeMovie() {
            var movie = {
                userId : vm.userId,
                titleId : vm.titleId,
                status:"false"
            };
           console.log("a");

            LikeService
                .likeDelete(movie)
                .then(
                    function (response) {
                        vm.thisUserLikes=false;
                    },
                    function (error) {
                        vm.error="unable to update user";
                    })

            
        }

        
    }
})();
