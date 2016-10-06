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
             vm.pages=PageService.findPageByWebsiteId(vm.websiteId);
         }
         init();
         
         function createPage(name,title) {
             var success=PageService.createPage(vm.websiteId,name,title);
             if(success){
                 $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");
             }
             else{
                 vm.error="Unable to create new page";
             }
         }


    }
})();
