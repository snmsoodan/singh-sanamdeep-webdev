(function () {
    angular
        .module("WebAppMaker")
        .controller("AdminController", AdminController);

    function AdminController(UserService, ReviewService, $location, LikeService, FollowService) {
        var vm = this;
        vm.deleteAdminUser = deleteAdminUser;
        vm.deleteReview = deleteReview;
        vm.logout = logout;
        console.log("admin controller")

        function init() {
                            UserService
                                .findUsers()
                                .then(
                                    function (response) {
                                        if (response.data != null) {
                                            vm.allUsers = response.data;

                                            vm.users = [];

                                            for (i = 0; i < vm.allUsers.length; i++) {
                                                if (!vm.allUsers[i].isAdmin) {
                                                    vm.users.push(vm.allUsers[i]);
                                                }
                                            }
                                            if (vm.users.length > 0) {
                                                vm.hasUsers = true;
                                            } else {
                                                vm.hasUsers = false;
                                            }
                                        } else {
                                            vm.hasUsers = false;
                                        }

                                        console.log("reviews")

                                        ReviewService
                                            .allReviews()
                                            .then(
                                                function (response) {
                                                    console.log("within reviews")
                                                    if (response.data != null) {
                                                        vm.reviews = response.data;
                                                        console.log(vm.reviews);
                                                        // console.log(vm.reviews[0]._user.username);
                                                        vm.hasReviews = true;
                                                    } else {
                                                        vm.hasReviews = false;
                                                    }
                                                },
                                                function (error) {
                                                    console.log("error review")
                                                    vm.error = "some error ocurred";
                                                })
                                        
                                    }, function (error) {
                                        console.log("error whole")
                                        vm.error = "error ocurred while fetching users";
                                    }
                                );
                        
                  
        }

        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login")
                    },function (error) {
                        $location.url("/login")
                    }
                )
        }


        function deleteAdminUser(userId) {
            console.log(userId)

            LikeService
                .deleteLikeByUserId(userId)
                .then(
                    function (response) {
                        console.log("Like removed");


                        ReviewService
                            .deleteReviewByUserId(userId)
                            .then(
                                function (response) {
                                    console.log("Review removed");
                                },
                                function (error) {
                                    console.log("error ocurred in removing review");
                                }
                            );
                        FollowService
                            .deleteFollowing(userId)
                            .then(
                                function (response) {
                                    console.log("Unfollowed");
                                },
                                function (error) {
                                    console.log("error ocurred in removing follow");
                                }
                            );
                        FollowService
                            .deleteFollowedBy(userId)
                            .then(
                                function (response) {
                                    console.log("Unfollowed");
                                },
                                function (error) {
                                    console.log("error ocurred in removing follow");
                                }
                            );
                        UserService
                            .deleteUser(userId)
                            .then(
                                function (response) {
                                    vm.success = "User was successfully deleted";
                                });
                        UserService
                            .findUsers()
                            .then(
                                function (response) {
                                    if (response.data != null) {
                                        vm.allUsers = response.data;

                                        vm.users = [];

                                        for (i = 0; i < vm.allUsers.length; i++) {
                                            if (!vm.allUsers[i].isAdmin) {
                                                vm.users.push(vm.allUsers[i]);
                                            }
                                        }
                                        if (vm.users.length > 0) {
                                            vm.hasUsers = true;
                                        } else {
                                            vm.hasUsers = false;
                                        }
                                    } else {
                                        vm.hasUsers = false;
                                    }
                                },
                                function (error) {
                                    vm.error = "user could not be deleted";
                                }
                            );
                        ReviewService
                            .allReviews()
                            .then(
                                function (response) {
                                    if (response.data != null) {
                                        vm.reviews = response.data;
                                        console.log(vm.reviews);
                                        // console.log(vm.reviews[0]._user.username);
                                        vm.hasReviews = true;
                                    } else {
                                        vm.hasReviews = false;
                                    }
                                },
                                function (error) {
                                    vm.error = "some error ocurred";
                                });
                    }, function (error) {
                        vm.error = "Some error ocurred while deleting the user";
                    });
        }

        function deleteReview(reviewId) {
            ReviewService
                .deleteaReview(reviewId)
                .then(
                    function (response) {
                        vm.success = "Review was successfully deleted";
                        ReviewService
                            .allReviews()
                            .then(
                                function (response) {
                                    if (response.data != null) {
                                        vm.reviews = response.data;
                                        vm.hasReviews = true;
                                    } else {
                                        vm.hasReviews = false;
                                    }
                                },
                                function (error) {
                                    vm.error = "some error ocurred";
                                });
                    },
                    function (error) {
                        vm.error = "review could not be deleted";
                    }
                );
        }
        
    }

})();
