(function() {
    angular
        .module("WebAppMaker")
        .controller("LikeController", LikeController);


    function LikeController($location, UserService, $routeParams, LikeService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.otherUserId =$routeParams.otherUserId;
        console.log(vm.userId+"   "+vm.otherUserId)
        
        function init() {
            LikeService
                .findAllLikedByUserId(vm.otherUserId)
                .then
                    (function (response) {
                        if(response.data.length>0) {
                            vm.likedMovies = response.data;
                            vm.hasLiked = true;
                        }else{
                            vm.hasLiked=false;
                        }
           
                }, function (error) {
                        vm.error = error;
                    }
                );


            // UserService
            //     .findUserById(vmotherUserId)
            //     .then(
            //         function (response) {
            //             vm.otherUser = response.data;
            //           
            //         }, function (error) {
            //             vm.error = error;
            //         }
            //     )
        }
        init();
        
        
        
        
    }

})();
