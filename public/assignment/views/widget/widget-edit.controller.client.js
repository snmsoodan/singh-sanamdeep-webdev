(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController",EditWidgetController)
    
     function EditWidgetController($location,$routeParams,WidgetService) {
        var vm=this;
         vm.id=$routeParams.uid;
         vm.websiteId=$routeParams.wid;
         vm.pageId=$routeParams.pid;
         vm.widgetId=$routeParams.wgid;
         vm.updateWidget=updateWidget;
         vm.deleteWidget=deleteWidget;
         
         function init(){
             vm.widget=WidgetService.findWidgetById(vm.widgetId);
             console.log(vm.widget.widgetType)
         }
         init();
         
         function deleteWidget() {
             var success=WidgetService.deleteWidget(vm.widgetId);
             if(success){
                 $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
             }
             else{
                 vm.error="unable to delete widget";
             }
         }

         function updateWidget(widget) {
             var success=WidgetService.updateWidget(vm.widgetId,widget);
             if(success){
                 $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
             }
             else{
                 vm.error="unable to update widget";
             }
         }
    }
})();
