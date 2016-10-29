module.exports=function (app) {
    var websites=[
        { "_id": "123", "name": "Facebook",    "developerId": "456", description:"sanam" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ]

    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);
    
    function deleteWebsite(req,res) {
        var websiteId=req.params.websiteId;
        for(var i in websites){
            if(websites[i]._id===websiteId){
                websites.splice(i,1);
                res.send(true);
                return;
            }
        }
        res.send(false)
        return;
    }
    
    function updateWebsite(req,res) {
        var website=req.body;
        for(var i in websites){
            if(websites[i]._id===website._id){
                websites[i].name=website.name;
                websites[i].description=website.description;
                res.send(true);
                return;
            }
        }
        res.send(false);
    }
    
    function findWebsiteById(req,res) {
        var websiteId=req.params.websiteId;
        for(var i in websites){
            if(websites[i]._id===websiteId){
                res.send(websites[i]);
                return;
            }
        }
        res.send(null);
        return;
    }
    
    function createWebsite(req,res) {
        var newWebsite=req.body;
        websites.push(newWebsite);
        res.send(newWebsite);
        return;
    }

   function findAllWebsitesForUser(req,res) {
       var id=req.params.userId;
       var resultset=[];
       for(var i in websites){
           if(websites[i].developerId===id){
               resultset.push(websites[i]);
           }
       }
       res.send(resultset);
       return;
   }
};