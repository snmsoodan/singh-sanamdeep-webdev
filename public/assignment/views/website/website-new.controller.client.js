(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController",NewWebsiteController)
    
     function NewWebsiteController($location,$routeParams,WebsiteService) {
        var vm=this;
         vm.id=$routeParams.uid;
         vm.createWebsite=createWebsite;
         function init() {
             WebsiteService.findWebsitesByUser(vm.id)
                 .then(function (response) {
                     vm.websites=response.data;
                 })
         }
         init();

         function createWebsite(name,description) {


               WebsiteService.createWebsite(name,description,vm.id)
                    .then(function (response) {
                 var newWebsite=response.data;
                 if(newWebsite){
                     $location.url("/user/"+vm.id+"/website");
                 }
                 else{
                     vm.error="unable to create website";
                 }
             })
         }
    }
})();
