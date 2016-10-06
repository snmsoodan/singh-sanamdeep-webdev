(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    var widgets=[
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ]

    function WidgetService() {
        var api={
            findWidgetsByPageId:findWidgetsByPageId,
            createWidget:createWidget,
            deleteWidget:deleteWidget,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget
        }
        return api;
        
        function updateWidget(widgetId,widget) {
            if(widget.widgetType=="HEADER"){
                for(var i in widgets){
                    if(widgets[i]._id===widgetId){
                        widgets[i].size=widget.size;
                        widgets[i].text=widget.text;
                        widgets[i].name=widget.name;
                        return true;
                    }
                }
                return false;
            }
            else if(widget.widgetType=="YOUTUBE"){
                for(var i in widgets){
                    if(widgets[i]._id===widgetId){
                        widgets[i].width=widget.width;
                        widgets[i].text=widget.text;
                        widgets[i].name=widget.name;
                        widgets[i].url=widget.url;
                        return true;
                    }
                }
                return false;
            }
            else if(widget.widgetType=="IMAGE"){
                for(var i in widgets){
                    if(widgets[i]._id===widgetId){
                        widgets[i].width=widget.width;
                        widgets[i].text=widget.text;
                        widgets[i].name=widget.name;
                        widgets[i].url=widget.url;
                        return true;
                    }
                }
                return false;
            }


        }

        function findWidgetById(widgetId) {
            for(var i in widgets){
                if(widgets[i]._id===widgetId){
                    return widgets[i];
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for(var i in widgets){
                if(widgets[i]._id===widgetId){
                    widgets.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function createWidget(pageId,newWidget) {

            

            widgets.push(newWidget);
            return newWidget;
        }

        function findWidgetsByPageId(pageId) {
            var resultset=[];
            for(var i in widgets){
                if(widgets[i].pageId===pageId){
                    resultset.push(widgets[i]);
                }
            }
            return resultset;
        }
    }
})();
