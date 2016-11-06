(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController",WidgetChooserController)
    
     function WidgetChooserController($location,$routeParams,WidgetService) {
        var vm=this;
         vm.id=$routeParams.uid;
         vm.websiteId=$routeParams.wid;
         vm.pageId=$routeParams.pid;
         vm.createWidget=createWidget;

         function init() {

             WidgetService.findWidgetsByPageId(vm.pageId)
                 .then(function (response) {
                     vm.widgets=response.data;
                 })
         }
         init();


         function createWidget(type) {
             var order=vm.widgets.length;
             console.log(order);

             if(type==="HEADER"){
                var  newWidget={
                     _id:(new Date()).getTime()+"",
                     widgetType:"HEADER",
                     pageId:vm.pageId,
                     size:2,
                     text:"Default",
                     order:order
                 }
             }
             else if(type==="IMAGE"){
                 var  newWidget={
                     _id:(new Date()).getTime()+"",
                     widgetType:"IMAGE",
                     pageId:vm.pageId,
                     width:"100%",
                     url:"http://lorempixel.com/400/200/",
                     order:order
                 }
             }
             else if(type==="YOUTUBE"){
                 var  newWidget={
                     _id:(new Date()).getTime()+"",
                     widgetType:"YOUTUBE",
                     pageId:vm.pageId,
                     width:"100%",
                     url:"https://youtu.be/C3DbrYx-SN4",
                     order:order
                 }
             }
             else if(type==="HTML"){
                 var  newWidget={
                     _id:(new Date()).getTime()+"",
                     widgetType:"HTML",
                     pageId:vm.pageId,
                     text:"<p>Lorem ipsum</p>",
                     order:order
                 }
             }
             
                 WidgetService.createWidget(vm.pageId,newWidget)
                     .then(function (response) {
                         var success=response.data;
                         if(success){
                             var widgetId=newWidget._id;
                             $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widgetId);
                         }
                         else{
                             vm.error="unable to update widget";
                         }
                     })
             
         }
    }
})();
