(function () {
    angular
        .module("WebAppMaker")
        .factory("FollowService",FollowService)

    function FollowService($http) {
        
        var api = {
            addFollow: addFollow,
            unfollowUser:unfollowUser,
            checkFollowing:checkFollowing,
            findAllFollowedByUserId:findAllFollowedByUserId,
            findAllFollowingOtherUserId:findAllFollowingOtherUserId,
            deleteFollowing:deleteFollowing,
            deleteFollowedBy:deleteFollowedBy

        };

        return api;
        
        function deleteFollowedBy(userId) {
            var url="/api/deleteFollowedBy/"+userId;
            return $http.delete(url);
        }
        
        function deleteFollowing(userId) {
            var url="/api/deleteFollowing/"+userId;
            return $http.delete(url);
        }

        function findAllFollowingOtherUserId(userId) {
            var follow={
                userId:userId
            }
            var url="/api/follow/followed";
            return $http.put(url,follow);
        }

        function findAllFollowedByUserId(userId) {
            var follow={
                userId:userId
            }
            var url="/api/follow/follows";
            return $http.put(url,follow);
        }
        
        

        function addFollow(follow) {
            console.log("follow create client")
            var url="/api/follow/create"
            return $http.post(url,follow);
        }

        function unfollowUser(follow) {
            var url="/api/follow/delete";
            return $http.put(url,follow);
        }
        
        function checkFollowing(follow) {
            var url="/api/follow/check";
            return $http.put(url,follow);
        }

    }

})();