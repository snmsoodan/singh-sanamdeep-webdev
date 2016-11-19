module.exports=function () {
    var mongoose=require("mongoose")
    var PageSchema=require("./page.schema.server.js")();
    var Page=mongoose.model("Page",PageSchema);

    var api={
        createPage:createPage,
        findAllPagesForWebsite:findAllPagesForWebsite,
        findPageById:findPageById,
        updatePage:updatePage,
        deletePage:deletePage
    }
    return api;

    function createPage(page) {
        return Page.create(page);
    }
    function findAllPagesForWebsite(websiteId){
        return Page.find({_website:websiteId});
    }

    function findPageById(id){
        return Page.findById(id);
    }
    function updatePage(page,id){
        return Page
            .update({_id:id},{
                $set:{
                    name:page.name
                }
            })
    }
    function deletePage(id){
        return Page.remove({_id:id});
    }

};