(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);

    
    function WebsiteService($http) {
        var api={
            findWebsitesByUser:findWebsitesByUser,
            createWebsite:createWebsite,
            deleteWebsite:deleteWebsite,
            findWebsiteById:findWebsiteById,
            updateWebsite:updateWebsite
        }
        return api;
        
        function updateWebsite(website) {
            var url="/api/website/"+website._id;
            return $http.put(url,website);
        }
        
        function findWebsiteById(websiteId) {
            var url="/api/website/"+websiteId;
            return $http.get(url);
        }

        function deleteWebsite(websiteId) {
            var url="/api/website/"+websiteId;
            return $http.delete(url);
        }

        function createWebsite(name,desc,id) {
            var newWebsite={
                // _id:(new Date()).getTime()+"",
                name:name,
                _user:id,
                description:desc
            };
            var url="/api/user/"+id+"/website";
            return $http.post(url,newWebsite);
        }

        function findWebsitesByUser(id) {
            var url="/api/user/"+id+"/website";
            return $http.get(url);
        }
    }
})();
