(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);

    function LoginController($location,UserService) {
        
        var vm=this;
        

        
        vm.login=function (username,password) {
        UserService
            .login(username,password)
            .then(function(response) {
                var user=response.data;
                console.log(user)
                $location.url("/user/"+user._id);
            },function (error) {
                console.log("login controller error")
                vm.error="User not found";
            });


            // .then(function (response) {
            //     var user=response.data;
            //     console.log("controller")
            //     console.log(user)
            //     if(user){
            //
            //         $location.url("/user/"+user._id);
            //     }
            //     else{
            //         console.log("user not found")
            //         vm.error="User not found";
            //     }
            // });


        }
    }

})();
