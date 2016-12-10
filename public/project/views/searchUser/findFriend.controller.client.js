(function () {
    angular
        .module("WebAppMaker")
        .controller("FriendSearchController", FriendSearchController);

    function FriendSearchController(UserService, $location, $routeParams) {
        var vm = this;
        vm.userId = $routeParams.userId;

        vm.findFriend = findFriend;


        function findFriend(username) {
            UserService
                .findUsersByUsername(username)
                .then(
                    function (response) {
                        vm.friends = response.data;
                        console.log(vm.friends)
                        if(vm.friends.length>0){
                            vm.noUser=false;
                        }
                        else{
                            vm.noUser=true;
                        }
                        
                    }, function (error) {
                        vm.noUser=true;
                        vm.error = "could not fetch any profile with given name";
                    }
                );


        }
    }
})();

       

