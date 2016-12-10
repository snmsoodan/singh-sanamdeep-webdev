(function() {
    angular
        .module("WebAppMaker")
        .controller("ReviewController", ReviewController);


    function ReviewController($location, UserService, $routeParams, ReviewService) {
    
        var vm = this;
        vm.userId = $routeParams.userId;
     
        vm.otherUserId = $routeParams.otherUserId;



        function init() {
            ReviewService
                .findAllReviewsByUserId(vm.otherUserId)
                .then(
                    function (response) {
                        if(response.data.length>0) {
                            vm.reviewsByUser = response.data;
                            console.log(vm.reviewsByUser);
                            vm.reviewsPresent = true;
                        }else{
                            vm.reviewsPresent = false;
                        }
                        
                    },
                    function (error) {
                        vm.error = "some error ocurred";
                    }
                );

        }
        init();


      
    }
        
    })();
