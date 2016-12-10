(function() {
    angular
        .module("WebAppMaker")
        .controller("MovieMainController", MovieHomeController);

    // function MovieHomeController($location, YelpService, $routeParams, UserService, LikeService,ReviewService, CategoryService) {
    function MovieHomeController($location, MovieService, $routeParams, LikeService,UserService) {
        var vm = this;
        
        vm.userId = $routeParams.userId;
        var username = "";
        vm.titleId = $routeParams.titleId;
        var usernamesOfWhoLiked = [];
        vm.thisUserLikes = false;
        vm.likeMovie=likeMovie;

        function init() {
            console.log("in contoller");

                            MovieService
                                .searchMovieById(vm.titleId)
                                .then(function (response) {
                                    console.log("in db contoller2");
                                    vm.title = response.data;

                                }, function (error) {
                                    vm.error = "Incorrect value of title";
                                });


                        }




        init();

        function likeMovie() {
            console.log("like controller")
            alert("Oops You are not logged in. To view more information about this movie Please Login")
            $location.url("/login");
        }
        


        
    }
})();
