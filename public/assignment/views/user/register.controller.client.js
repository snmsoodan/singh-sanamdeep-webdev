(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController);

   

    function RegisterController($location,UserService) {
        
        var vm=this;
        vm.createUser=createUser;

        function createUser(username,password,rpassword) {
            // var checkDuplicateUsername=UserService.findUserByUsername(username);

            UserService.findUserByUsername(username)
                .then(function (response) {
                    var checkDuplicateUsername=response.data;
                    if(checkDuplicateUsername){
                        vm.error="Username already exists";
                    }
                    else{
                        if(password===rpassword){
                            var newUser={
                                // _id:(new Date).getTime()+"",
                                username:username,
                                password:password,              
                                firstName:username,
                                lastName:username
                            };
                            UserService.register(newUser)
                                .then(function (response) {
                                    var success=response.data;
                                    if(success){
                                        $location.url("/user/"+success._id)
                                    }
                                    else{
                                        $location.url("/login");
                                    }
                                })
                        }
                        else{
                            vm.error="Passwords do not match";
                        }

                    }
                })
        }


    }

})();
