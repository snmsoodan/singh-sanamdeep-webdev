(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    

    function UserService($http) {
        var api={
            createUser:createUser,
            findUserByCredentials:findUserByCredentials,
            findUserById:findUserById,
            updateUser:updateUser,
            deleteUser:deleteUser,
            findUserByUsername:findUserByUsername,
            login:login,
            logout:logout,
            loggedIn:loggedIn,
            register:register
        }
        return api;


        function loggedIn() {
            return $http.get("/api/loggedIn");
        }

        function register(newUser) {
                return $http.post("/api/register/", newUser);
        }

        function login(username,password) {
            var user ={
                username:username,
                password:password
            };
            return $http.post("/api/login",user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function findUserByUsername(username) {
            var url="/api/user?username="+username;
            return $http.get(url);
        }
        
        function createUser(newUser) {
            var url="/api/user";
            return $http.post(url,newUser);
        }

        
        function deleteUser(userId) {
            var api="/api/user/"+userId;
            return $http.delete(api);
        }

        
        function findUserByCredentials(username,password) {
            var url="/api/user?username="+username+"&password="+password;
            return $http.get(url);
             
        }
    
        function findUserById(id) {
            var url="/api/user/"+id;
            return $http.get(url);
        }
        
        function updateUser(id,newUser) {
           var url="/api/user/"+id;
            return $http.put(url,newUser);
        }


    }
})();
