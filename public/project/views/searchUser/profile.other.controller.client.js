(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileOtherController", ProfileOtherController);


    function ProfileOtherController($location, UserService, $routeParams, LikeService,FollowService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.otherUserId =$routeParams.otherUserId;
        vm.addFollow=addFollow;
        vm.unfollowUser=unfollowUser;
        console.log(vm.userId+"   "+vm.otherUserId)
        
        function init() {
            UserService
                .findUserById(vm.otherUserId)
                .then(
                    function (response) {
                        vm.user = response.data;
                        console.log(vm.user);
                        if(vm.user.username) {
                            console.log("here")
                            vm.profileExist = true;
                            var follow={
                                userId:vm.userId,
                                otherUserId:vm.otherUserId,
                            }

                            FollowService
                                .checkFollowing(follow)
                                .then(function (response) {
                                    var result=response.data;
                                    if(result.followed){
                                        vm.userFollows = true;
                                        console.log("following")
                                    }
                                    else{
                                        vm.userFollows = false;
                                        console.log("Not following")
                                    }
                                    
                                },function (error) {
                                    vm.userFollows = false;
                                })
                            
                        }
                        else{
                            vm.profileExist = false;
                        }
                      
                    }, function (error) {
                        vm.profileExist=false;
                        vm.error = error;
                    }
                )
        }
        init();
        
        function addFollow() {


            UserService
                .findUserById(vm.userId)
                .then(
                    function (response) {
                        vm.currentUser = response.data;
                        var follow={
                            userId:vm.userId,
                            otherUserId:vm.otherUserId,
                            followed:vm.user.username,
                            followedBy:vm.currentUser.username
                        }
                        
                        FollowService
                            .addFollow(follow)
                            .then(function () {
                                vm.userFollows=true;
                            },function (error) {
                                vm.userFollows = false;
                            })
                        
                    })
            
        }
        
        function unfollowUser() {
        var follow={
            userId:vm.userId,
            otherUserId:vm.otherUserId,
        }
        
            FollowService
                .unfollowUser(follow)
                .then(function () {
                    vm.userFollows = false;
                },function (error) {
                    vm.userFollows = true;
                })
        }
        
        
        
        
        
        
    }

})();
