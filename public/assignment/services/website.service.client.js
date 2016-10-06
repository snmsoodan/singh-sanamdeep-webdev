(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);

    var websites=[
        { "_id": "123", "name": "Facebook",    "developerId": "456", description:"sanam" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ]
    function WebsiteService() {
        var api={
            findWebsitesByUser:findWebsitesByUser,
            createWebsite:createWebsite,
            deleteWebsite:deleteWebsite,
            findWebsiteById:findWebsiteById,
            updateWebsite:updateWebsite
        }
        return api;
        
        function updateWebsite(websiteId,name,desc) {
            for(var i in websites){
                if(websites[i]._id===websiteId){
                    websites[i]._name=name;
                    websites[i].description=desc;
                    return true;
                }
            }
            return false;
        }
        
        function findWebsiteById(websiteId) {
            for(var i in websites){
                if(websites[i]._id===websiteId){
                    return websites[i];
                }
            }
            return null;
        }

        function deleteWebsite(websiteId) {
            for(var i in websites){
                if(websites[i]._id===websiteId){
                    websites.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function createWebsite(name,desc,id) {
            var newWebsite={
                _id:(new Date()).getTime()+"",
                name:name,
                developerId:id,
                description:desc
            };
            websites.push(newWebsite);
            return newWebsite;
        }

        function findWebsitesByUser(id) {
            var resultset=[];
            for(var i in websites){
                if(websites[i].developerId===id){
                    resultset.push(websites[i]);
                }
            }
            return resultset;
        }
    }
})();
