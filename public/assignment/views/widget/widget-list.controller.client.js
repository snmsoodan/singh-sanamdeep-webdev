(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController)
    
     function WidgetListController($sce,$routeParams,WidgetService) {
        var vm=this;
         vm.id=$routeParams.uid;
         vm.websiteId=$routeParams.wid;
         vm.pageId=$routeParams.pid;
         vm.getSafeHtml=getSafeHtml;
         vm.getSafeUrl=getSafeUrl;
         vm.reorderWidget=reorderWidget;


         function getSafeHtml(widget) {
             return $sce.trustAsHtml(widget.text);

         }
         function getSafeUrl(widget) {
             var urlParts=widget.url.split("/");
             var id=urlParts[urlParts.length -1];
             var url="https://www.youtube.com/embed/"+id;
             return $sce.trustAsResourceUrl(url);

         }

         function init() {

             WidgetService.findWidgetsByPageId(vm.pageId)
                 .then(function (response) {
                     vm.widgets=response.data;
                     console.log(vm.widgets)
                 })
         }
         init();


         function reorderWidget(start, end) {
             console.log("reorder"+start+ "  " + end);
             WidgetService
                 .reorderWidget(vm.pageId, start, end)
                 .then(
                     function (response) {
                         console.log("geting called")
                         init();
                     });
         }
    }
})();
