(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)
    
     function WebsiteListController($routeParams,WebsiteService) {
        var vm=this;
         vm.id=$routeParams.uid;
         function init() {

             // vm.websites=WebsiteService.findWebsitesByUser(vm.id);
             WebsiteService.findWebsitesByUser(vm.id)
                 .then(function (response) {
                     vm.websites=response.data;
                 })
         }
         init();
    }
})();
