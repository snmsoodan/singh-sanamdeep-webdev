(function(){
    angular
        .module("WebAppMaker")
        .controller("WhoYouFollowController", WhoYouFollowController);



    function WhoYouFollowController($routeParams, FollowService) {
        var vm = this;
        vm.userId =$routeParams.userId;


        function init() {
            FollowService
                .findAllFollowedByUserId(vm.userId)
                .then(
                    function (response) {
                        if(response.data.length>0){
                            vm.isFollowing = true;
                            vm.following = response.data;
                        }else{
                            vm.isFollowing = false;
                        }
                    }, function error() {
                        vm.error = "some error ocurred while fetching following data";
                    });
        } init();

    }})();
