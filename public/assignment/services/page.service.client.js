(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);



    function PageService($http) {
        var api={
            findPageByWebsiteId:findPageByWebsiteId,
            createPage:createPage,
            deletePage:deletePage,
            findPageById:findPageById,
             updatePage:updatePage
        }
        return api;
        
        function updatePage(pageId,name,title) {
            var page={
                _id:pageId,
                name:name,
                title:title
            };
            console.log("service client")
            console.log(page);
            var url="/api/page/"+pageId;
            return $http.put(url,page);
        }
        
        function findPageById(pageId) {
            var url="/api/page/"+pageId;
            return $http.get(url);
        }

        function deletePage(pageId) {
            var url="/api/page/"+pageId;
            return $http.delete(url);
        }
        
        function createPage(websiteId,name,title) {
            var newPage={
                // _id:(new Date()).getTime()+"",
                name:name,
                _website:websiteId,
                title:title
            };
            var url="/api/website/"+websiteId+"/page";
            return $http.post(url,newPage);
        }

        function findPageByWebsiteId(websiteId) {
            var url= "/api/website/"+websiteId+"/page";
            return $http.get(url);
        }
    }
})();
