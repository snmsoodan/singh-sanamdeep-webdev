(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController);

   

    function RegisterController($location,$routeParams,UserService) {
        
        var vm=this;
        vm.createUser=createUser;

        function createUser(username,password,rpassword) {
            var checkDuplicateUsername=UserService.findUserByUsername(username);
            if(checkDuplicateUsername){
                vm.error="Username already exists";
            }
            else{
                if(password===rpassword){
                    var newUser={
                        _id:(new Date).getTime()+"",
                        username:username,
                        password:password,
                        firstName:username,
                        lastName:username
                    };
                    var success=UserService.createUser(newUser);
                    if(success){
                        $location.url("/user/"+newUser._id)
                    }
                    else{
                        $location.url("/login");
                    }
                }
                else{
                    vm.error="Passwords do not match";
                }
                
            }
        }


    }

})();
