(function () {
  angular
      .module("WebAppMaker")
      .factory("UserService",UserService);




    function UserService($http) {

        var api= {
            deleteUser:deleteUser,
            createUser:createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById:findUserById,
            updateUser:updateUser,
            login:login,
            logout:logout,
            loggedIn:loggedIn,
            register:register,
            findUsersByUsername:findUsersByUsername,
            findUsers: findUsers

        };
        return api;

        function findUsers() {
            var url = "/api/allUsers";
            return $http.get(url);
        }
        
        function findUsersByUsername(username) {
            var url="/api/finduser/"+username;
            return $http.get(url);
        }
        
        

        function loggedIn() {
            return $http.get("/api/loggedIn");
        }

        function register(username,password,verifyPassword) {
            if (password === verifyPassword) {
                var newUser = {
                    username: username,
                    password: password,
                    firstName: username,
                    lastName: username
                }
                console.log(newUser)
                return $http.post("/api/register/", newUser);
            }
            else {
                return null;
            }
        }

        function login(username,password) {
            var user ={
                username:username,
                password:password
            };
            return $http.post("/api/login",user);
            console.log("login client")
        }
        
        function logout() {
            return $http.post("/api/logout");
        }

        function updateUser(id, newUser) {

            var url="/api/user/"+id;
            return $http.put(url,newUser)

        }

        function findUserById(id) {
           var url="/api/user/"+id;
            return $http.get(url);
        }

        function findUserByCredentials(username,password){
            var url="/api/user?username="+username+"&password="+password;
            return $http.get(url);

        }

        function createUser(username,password,verifyPassword) {
            if(password===verifyPassword){
                var newUser= {
                    username:username,
                    password:password,
                    firstName:username,
                    lastName:username
                };

                return $http.post("/api/user/",newUser);
            }
            else{
                return null;
            }

        }

        function deleteUser(id) {

            var url="/api/user/"+id;
            return $http.delete(url);
            
        }

    }
})();