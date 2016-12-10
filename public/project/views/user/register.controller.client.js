(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController)


    function RegisterController($location,UserService) {
        var vm=this;
        vm.createUser = createUser;
        console.log("reached register controller");


        function createUser(username,password,verifyPassword) {
            UserService
                .register(username,password,verifyPassword)
                .then(function (response) {
                    var user=response.data;
                    if(user){
                        $location.url("/user/"+user._id);
                    }
                    else{
                        $location.url("/register");
                    }
                },function (error) {
                    vm.error="Username already taken";
                })

        };


    }


})();
