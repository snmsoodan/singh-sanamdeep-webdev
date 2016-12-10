(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController",ProfileController);
    
    function ProfileController($location,$routeParams,UserService,$rootScope) {
         var vm=this;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;
        vm.logout=logout;


       // var id=$routeParams.id;
        var id=$rootScope.currentUser._id;
        //console.log($rootScope.currentUser._id)
        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user=response.data;
                })
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login")
                    },function (error) {
                        $location.url("/login")
                    }
                )
        }

        function updateUser(newUser) {
            UserService
                .updateUser(id,newUser)
                .then(
                    function (response) {
                        vm.success="updated successfully";
                    },
                    function (error) {
                        vm.error="unable to update user";
                    });
        }
        
        function deleteUser() {
            var id=$routeParams.id;
            console.log(vm.user._id);
            UserService
                .deleteUser(vm.user._id)
                .then(
                function () {
                    $location.url("/login");
            },
            function (error) {
                vm.error="unable to update user";
            })
        };

    }
})();
