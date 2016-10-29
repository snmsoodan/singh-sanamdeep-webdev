module.exports=function (app) {
    var pages=[
        { "_id": "321", "name": "Post 1", "websiteId": "456", "title":"sanam" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ]

    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);
    
    
    function deletePage(req,res) {
        var pageId=req.params.pageId;
        for(var i in pages){
            if(pages[i]._id===pageId){
                pages.splice(i,1);
                res.send(true);
                return;
            }
        }
        res.send(false);
        return;
    }
   

   function findAllPagesForWebsite(req,res) {
       var websiteId=req.params.websiteId;
       var resultset=[];
       for(var i in pages){
           if(pages[i].websiteId===websiteId){
               resultset.push(pages[i]);
           }
       }
       res.send(resultset);
       return;
   }
    
    function createPage(req,res) {
        var newPage=req.body;
        pages.push(newPage);
        res.send(newPage);
        return;
    }
    
    function findPageById(req,res) {
        var pageId=req.params.pageId;
        for(var i in pages){
            if(pages[i]._id===pageId){
                res.send(pages[i]);
                return;
            }
        }
        res.send(null);
        return;
    }
    
    function updatePage(req,res) {
        var page=req.body;
        console.log("service")
        console.log(page);
        for(var i in pages){
            if(pages[i]._id===page._id){
                pages[i].name=page.name;
                pages[i].title=page.title;
                res.send(true);
                return;
            }
        }
        res.send(false);
        return;
    }
};