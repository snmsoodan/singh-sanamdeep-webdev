(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController)


    function LoginController($location,UserService) {
         var vm=this;
         
         vm.login=function (username,password) {
             console.log("username"+username)
             console.log("password"+password)

             if(username==="bob"&&password==="bob"){
                 console.log("admin")
                 $location.url("/user/admin");
             }
             else {
                 UserService
                     .login(username, password)
                     .then(function (response) {
                         console.log("reached login controller")
                         var user = response.data;
                         console.log(user._id)
                         $location.url("/user/" + user._id);
                     }, function (error) {
                         console.log("login controller error")
                         vm.error = "User not found";
                     });
             }



         }
            

    }
})();