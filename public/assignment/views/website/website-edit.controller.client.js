(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController)
    
     function EditWebsiteController($location,$routeParams,WebsiteService) {
        var vm=this;
         vm.id=$routeParams.uid;
         vm.websiteId=$routeParams.wid;
         vm.deleteWebsite=deleteWebsite;
         vm.updateWebsite=updateWebsite;

         function init() {
             vm.website=WebsiteService.findWebsiteById(vm.websiteId);
             vm.websites=WebsiteService.findWebsitesByUser(vm.id);
         }init();
         
         function updateWebsite(name,desc) {
             var result=WebsiteService.updateWebsite(vm.websiteId,name,desc);
             if(result){
                 $location.url("/user/"+vm.id+"/website");
             }
             else{
                 vm.error="website could not be updated";
             }
         }

         
         function deleteWebsite(websiteId) {
             console.log(websiteId)
           var result=WebsiteService.deleteWebsite(websiteId);
            if(result){
                $location.url("/user/"+vm.id+"/website");
            }
             else{
                vm.error="unable to delete website";
            }
         }
    }
})();
