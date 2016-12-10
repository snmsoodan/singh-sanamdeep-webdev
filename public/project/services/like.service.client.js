(function () {
    angular
        .module("WebAppMaker")
        .factory("LikeService",LikeService)

    function LikeService($http) {
        
        var api = {
            findThisLikedByUserId: findThisLikedByUserId,
            likeCreate:likeCreate,
            likeDelete:likeDelete,
            findUsers:findUsers,
            findAllLikedByUserId:findAllLikedByUserId,
            deleteLikeByUserId:deleteLikeByUserId
           
        };

        return api;
        
        function deleteLikeByUserId(userId) {
            var url="/api/like/deletebyAdmin/"+userId;
            console.log("service  " +userId)
            return $http.delete(url);
        }
        
        function findAllLikedByUserId(userId) {
            console.log(userId);
            var url="/api/findlikes/"+userId;
            return $http.get(url);
        }

        function findUsers(userId,titleId) {
            console.log("client user")
            console.log(userId)
            console.log(titleId)
            var url="/api/user/"+userId+"/title/"+titleId;
            return $http.get(url);
        }



            function findThisLikedByUserId(userId,titleId) {
            var url="/api/checkLike/"+titleId+"/user/"+userId;
            return $http.get(url);
        }
        

        function likeCreate(movie) {
            console.log("like create client")
            var url="/api/like/create"
            return $http.post(url,movie);
        }

        function likeDelete(movie) {
            var url="/api/like/delete";
            return $http.put(url,movie);
        }

    }

})();