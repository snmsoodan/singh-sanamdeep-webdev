(function () {
    angular
        .module("WebAppMaker")
        .controller("OtherFollowController", OtherFollowController);

    function OtherFollowController(UserService, FollowService, $location, $routeParams) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.otherUserId = $routeParams.otherUserId;
        console.log(vm.userId)
        console.log(vm.otherUserId)

       



        function init() {
            FollowService
                .findAllFollowedByUserId(vm.otherUserId)
                .then(function (response) {
                    vm.follows = response.data;
                    console.log(vm.follows);
                    console.log(vm.follows.length);
                    if(vm.follows.length > 0) {
                        vm.isFollowing = true;
                    }else{
                        vm.isFollowing = false;
                    }
                });
        }
        init();

    }})();


