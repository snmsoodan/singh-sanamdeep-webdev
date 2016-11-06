(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController)
    
     function NewPageController($location,$routeParams,PageService) {
        var vm=this;
         vm.id=$routeParams.uid;
         vm.websiteId=$routeParams.wid;
         vm.createPage=createPage;
         function init() {
             PageService.findPageByWebsiteId(vm.websiteId)
                 .then(function (response) {
                     vm.pages=response.data;
                 })
         }
         init();
         
         function createPage(name,title) {
             var success=
                 PageService.createPage(vm.websiteId,name,title)
                     .then(function (response) {
                         var success=response.data;
                         if(success){
                             $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");
                         }
                         else{
                             vm.error="Unable to create new page";
                         }
                     })
         }


    }
})();
