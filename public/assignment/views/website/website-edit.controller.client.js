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

                 WebsiteService.findWebsiteById(vm.websiteId)
                     .then(function (response) {
                         vm.website=response.data;
                     })

                 WebsiteService.findWebsitesByUser(vm.id)
                     .then(function (response) {
                         vm.websites=response.data;
                     })

         }init();
         
         function updateWebsite() {
                 WebsiteService.updateWebsite(vm.website)
                    .then(function (response) {
                        var result=response.data;
                 if(result){
                     $location.url("/user/"+vm.id+"/website");
                 }
                 else{
                     vm.error="website could not be updated";
                 }
             })

         }

         
         function deleteWebsite(websiteId) {
           var result=
               WebsiteService.deleteWebsite(websiteId)
                .then(function (response) {
                 var result=response.data;
                 if(result){
                     $location.url("/user/"+vm.id+"/website");
                 }
                 else{
                     vm.error="unable to delete website";
                 }
             })

         }
    }
})();
