(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController",PageEditController)
    
     function PageEditController($location,$routeParams,PageService) {
        var vm=this;
         vm.id=$routeParams.uid;
         vm.websiteId=$routeParams.wid;
         vm.pageId=$routeParams.pid;
         vm.updatePage=updatePage;
         vm.deletePage=deletePage;
         function init() {
             vm.pages=PageService.findPageByWebsiteId(vm.websiteId);
             vm.page=PageService.findPageById(vm.pageId);
         }
         init();
         
         function updatePage(name,title) {
             var success=PageService.updatePage(vm.pageId,name,title);
             if(success){
                 $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");
             }
             else{
                 vm.error="Unable to update page";
             }
         }
         
         function deletePage() {
             var success=PageService.deletePage(vm.pageId);
             if(success){
                 $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");
             }
             else{
                 vm.error="Unable to delete page";
             }
         }


    }
})();
