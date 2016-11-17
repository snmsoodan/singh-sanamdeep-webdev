(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService)

    var key = "7167803b0639b8e69bc67cdc3e19c001";
    var secret = "4963e252dfc5083b";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";


    function FlickrService($http) {
        var api={
            searchPhotos:searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }

})();