(function () {
    angular
        .module("WebAppMaker")
        .controller("OtherFollowerController", OtherFollowerController);

    function OtherFollowerController(UserService, FollowService, $location, $routeParams) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.otherUserId = $routeParams.otherUserId
        console.log(vm.userId)
        console.log(vm.otherUserId)






        function init() {
            FollowService
                .findAllFollowingOtherUserId(vm.otherUserId)
                .then(function (response) {
                    if(response.data.length > 0) {
                        vm.followedBy = response.data;
                        vm.hasFollowers = true;
                    }
                    else{
                        vm.hasFollowers = false;
                    }
                },
                    function (error) {
                        vm.error = "no user follows";
                    });
        }
        init();

        
    }})();



