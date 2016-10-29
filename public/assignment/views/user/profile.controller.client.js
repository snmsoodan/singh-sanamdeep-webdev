(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController",ProfileController);

    
    function ProfileController($location,$routeParams,UserService) {
        
        var vm=this;
        vm.updateUser=updateUser;
        vm.id=$routeParams.uid;
        function init() {
            
            UserService.findUserById(vm.id)
                .then(function (response) {
                    vm.user=response.data;
                });
        }
        init();
        
        function updateUser(newUser) {
            UserService.updateUser(vm.id,newUser)
                .then(function (response) {
                    console.log(response.data);
                    vm.success="Success";
                })

            
        }


    }

})();
