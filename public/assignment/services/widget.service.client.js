(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    

    function WidgetService($http) {
        var api={
            findWidgetsByPageId:findWidgetsByPageId,
            createWidget:createWidget,
            deleteWidget:deleteWidget,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget
        }
        return api;
        
        function updateWidget(widgetId,widget) {
            var url="/api/widget/"+widgetId;
            return $http.put(url,widget);
        }

        function findWidgetById(widgetId) {
            var url="/api/widget/"+widgetId;
            return $http.get(url);
        }

        function deleteWidget(widgetId) {
            var url="/api/widget/"+widgetId;
            return $http.delete(url);
        }

        function createWidget(pageId,newWidget) {
            var url="/api/page/"+pageId+"/widget";
            return $http.post(url,newWidget);
        }

        function findWidgetsByPageId(pageId) {
            var url="/api/page/"+pageId+"/widget";
            return $http.get(url);
        }
    }
})();
