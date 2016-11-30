(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider


            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/flickr", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })

            .when("/",{
                templateUrl:"views/home.html"
            })
            .when("/home",{
                templateUrl:"views/home.html"
            })
            .when("/login",{
                templateUrl:"views/user/login.view.client.html",
                controller:"LoginController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl:"views/user/register.view.client.html",
                controller:"RegisterController",
                controllerAs: "model"
            })
            // .when("/user/:uid",{
            .when("/user",{
                templateUrl:"views/user/profile.view.client.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })

            .when("/user/:uid",{
                templateUrl:"views/user/profile.view.client.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })

            .when("/user/:uid/website",{
                templateUrl:"views/website/website-list.view.client.html",
                controller:"WebsiteListController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/new",{
                templateUrl:"views/website/website-new.view.client.html",
                controller:"NewWebsiteController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid",{
                templateUrl:"views/website/website-edit.view.client.html",
                controller:"EditWebsiteController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page",{
                templateUrl:"views/page/page-list.view.client.html",
                controller:"PageListController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/new",{
                templateUrl:"views/page/page-new.view.client.html",
                controller:"NewPageController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid",{
                templateUrl:"views/page/page-edit.view.client.html",
                controller:"PageEditController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl:"views/widget/widget-list.view.client.html",
                controller:"WidgetListController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl:"views/widget/widget-chooser.view.client.html",
                controller:"WidgetChooserController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl:"views/widget/widget-edit.view.client.html",
                controller:"EditWidgetController",
                controllerAs:"model"
            })
            .otherwise({
                redirectTo:"/login"
            })

        function checkLoggedIn(UserService,$location,$q,$rootScope) {
            var deferred=$q.defer();
            UserService
                .loggedIn()
                .then(function (response) {
                    var user=response.data;
                    console.log(user);
                    if(user === '0'){
                        $rootScope.currentUser = null;
                        deferred.reject();
                        $location.url("/login");
                    }else{
                        $rootScope.currentUser=user;
                        deferred.resolve();
                    }
                },function (err) {
                    $location.url("/login");
                });
            return deferred.promise;
        }

    }
})();
