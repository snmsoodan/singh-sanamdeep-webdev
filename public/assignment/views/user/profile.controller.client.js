(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController",ProfileController);

    
    function ProfileController($location,$routeParams,UserService,$rootScope) {
        
        var vm=this;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;
        vm.logout=logout;
        // vm.id=$routeParams.uid;
        var id=$rootScope.currentUser._id;
        function init() {
            UserService.findUserById(id)
                .then(function (response) {
                    vm.user=response.data;
                });
        }
        init();
        
        function updateUser(newUser) {
            UserService.updateUser(id,newUser)
                .then(function (response) {
                    console.log(response.data);
                    vm.success="Success";
                })

            
        }

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

        function deleteUser() {
            UserService
                .deleteUser(id)
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
