(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController",NewWebsiteController)
    
     function NewWebsiteController($location,$routeParams,WebsiteService) {
        var vm=this;
         vm.id=$routeParams.uid;
         vm.createWebsite=createWebsite;
         function init() {
             vm.websites=WebsiteService.findWebsitesByUser(vm.id);
         }
         init();

         function createWebsite(name,description) {
           var newWebsite=WebsiteService.createWebsite(name,description,vm.id);
            if(newWebsite){
                $location.url("/user/"+vm.id+"/website");
            }
             else{
                vm.error="unable to create website";
            }
         }
    }
})();
