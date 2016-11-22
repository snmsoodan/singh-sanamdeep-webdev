module.exports=function () {

    var mongoose=require("mongoose");
    var WebsiteSchema=require("./website.schema.server.js")();
    var Website=mongoose.model("Website",WebsiteSchema);
    var api={
        findAllWebsitesForUser:findAllWebsitesForUser,
        createWebsite:createWebsite,
        findWebsiteById:findWebsiteById,
        updateWebsite:updateWebsite,
        deleteWebsite:deleteWebsite
    };
    return api;

    function findAllWebsitesForUser(userId) {
        return Website.find({"_user":userId});
    }

    function createWebsite(userId,website) {
        return Website.create(website);
    }

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }

    function updateWebsite(id,website) {
        return Website
            .update({_id:id},{$set:{
                name:website.name,
                description:website.description
            }})
    }

    function deleteWebsite(id) {
        return Website.remove({_id:id});
    }
}