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

                 PageService.findPageByWebsiteId(vm.websiteId)
                     .then(function (response) {
                         vm.pages=response.data;
                     })


                 PageService.findPageById(vm.pageId)
                     .then(function (response) {
                         vm.page=response.data;
                     })
         }
         init();
         
         function updatePage(name,title) {
             console.log(name+"   "+title);

                 PageService.updatePage(vm.pageId,name,title)
                     .then(function (response) {
                         var success=response.data;
                         if(success){
                             $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");
                         }
                         else{
                             vm.error="Unable to update page";
                         }
                     })

         }
         
         function deletePage() {

                 PageService.deletePage(vm.pageId)
                     .then(function (response) {
                         var success=response.data;
                         if(success){
                             $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");
                         }
                         else{
                             vm.error="Unable to delete page";
                         }
                     })
         }
    }
})();
