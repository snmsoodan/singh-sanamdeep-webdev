(function(){
    angular
        .module("WebAppMaker")
        .controller("OwnLikeController", OwnLikeController);



    function OwnLikeController($routeParams, LikeService) {
        var vm = this;
        vm.userId =$routeParams.userId;
        
        
        function init() {
            LikeService
                .findAllLikedByUserId(vm.userId)
                .then(
                    function (response) {
                        console.log(response.data.length)
                        if(response.data.length>0){
                            vm.hasLiked = true;
                            vm.likes = response.data;
                        }else{
                            vm.hasLiked = false;
                        }
                    }, function error() {
                        vm.error = "some error ocurred while fetching like data";
                    });
        } init();

    }})();
        
        




