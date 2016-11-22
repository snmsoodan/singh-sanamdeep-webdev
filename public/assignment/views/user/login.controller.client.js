(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);

    function LoginController($location,UserService) {
        
        var vm=this;
        

        
        vm.login=function (username,password) {
        UserService
            .findUserByCredentials(username,password)
            .then(function (response) {
                var user=response.data;
                console.log("controller")
                console.log(user)
                if(user){

                    $location.url("/user/"+user._id);
                }
                else{
                    vm.error="User not found";
                }
            });


        }
    }

})();
