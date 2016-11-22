(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController",ProfileController);

    
    function ProfileController($location,$routeParams,UserService) {
        
        var vm=this;
        vm.updateUser=updateUser;
        vm.id=$routeParams.uid;
        function init() {
            console.log("controller in");
            console.log(vm.id);
            UserService.findUserById(vm.id)
                .then(function (response) {
                    vm.user=response.data;
                    console.log("controller")
                    console.log(vm.user)
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
