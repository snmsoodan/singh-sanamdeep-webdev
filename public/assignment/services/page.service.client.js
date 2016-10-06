(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

    var pages=[
        { "_id": "321", "name": "Post 1", "websiteId": "456", "title":"sanam" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ]

    function PageService() {
        var api={
            findPageByWebsiteId:findPageByWebsiteId,
            createPage:createPage,
            deletePage:deletePage,
            findPageById:findPageById,
             updatePage:updatePage
        }
        return api;
        
        function updatePage(pageId,name,title) {
            for(var i in pages){
                if(pages[i]._id===pageId){
                    pages[i]._name=name;
                    pages[i].title=title;
                    return true;
                }
            }
            return false;
        }
        
        function findPageById(pageId) {
            for(var i in pages){
                if(pages[i]._id===pageId){
                    return pages[i];
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for(var i in pages){
                if(pages[i]._id===pageId){
                    pages.splice(i,1);
                    return true;
                }
            }
            return false;
        }
        
        function createPage(websiteId,name,title) {
            var newPage={
                _id:(new Date()).getTime()+"",
                name:name,
                websiteId:websiteId,
                title:title
            };
            pages.push(newPage);
            return newPage;
        }

        function findPageByWebsiteId(websiteId) {
            var resultset=[];
            for(var i in pages){
                if(pages[i].websiteId===websiteId){
                    resultset.push(pages[i]);
                }
            }
            return resultset;
        }
    }
})();
