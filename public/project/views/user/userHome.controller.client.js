(function () {
    angular
        .module("WebAppMaker")
        .controller("UserHomeController",UserHomeController);

    function UserHomeController(MovieService, $location, $routeParams) {
        var vm = this;

        vm.userId = $routeParams.userId;


        vm.findMovie = findMovie;


        function findMovie(searchMovie) {
            console.log(searchMovie);
            MovieService
                .findMovie(searchMovie)
                .then(function (response) {
                    if(response.data != null) {
                        console.log("data found controller");
                        console.log(response.data);
                        vm.movies = response.data;
                        vm.nameExist = true;
                    }else{
                        vm.nameExist = false;
                    }

                }, function (error) {
                    vm.error = "Incorrect values for search";
                });
        }




    }
})();

