(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController",FlickrImageSearchController)

    function FlickrImageSearchController(FlickrService, $location, $routeParams, WidgetService) {
        var vm=this;
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.pageId=$routeParams.pageId;
        vm.widgetId=$routeParams.widgetId;
        vm.searchPhotos=searchPhotos;
        vm.selectPhoto=selectPhoto;


        function init() {

            WidgetService.findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets=response.data;
                })
        }
        init();

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;

                })


        }

        function selectPhoto(photo) {
            var order=vm.widgets.length;
            console.log(order);
            var url="https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg";
            var newWidget={
                url:url,
                _id:vm.widgetId,
                pageId:vm.pageId,
                type:"IMAGE",
                width:"100%",
                widgetType:"IMAGE",
                order:order,
            };
            console.log("1")
            WidgetService
                .updateWidget(vm.widgetId,newWidget)
                .then(function (response) {
                    var result=response.data;
                    if(result){
                        console.log("2")
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
                    }
                    else{
                        console.log("3")
                        vm.error="Flick not working";
                    }
                })

        }

    }
})();