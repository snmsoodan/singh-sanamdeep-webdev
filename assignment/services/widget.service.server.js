module.exports=function (app,models) {
    var widgetModel=models.widgetModel
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads'});
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

    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put("/page/:pageId/widget", reorderWidget);
    app.post ("/api/uploads", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        console.log(req.body);
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;
        if (myFile == null) {
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
            return;
        }
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;
        // res.send(200);
        // for(var i in widgets){
        //     if(widgets[i]._id===widgetId){
        //         widgets[i].url="/uploads/"+filename;
        //     }
        // }
        // res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);

        var newWidget = {
            url: "/uploads/"+filename,
            type:"IMAGE",
            _id:widgetId,
            width:width
        };

        widgetModel
            .updateWidget(newWidget.type, newWidget)
            .then(
                function (stats) {
                    res.redirect("/assignment/#/user/"+ userId+"/website/"+websiteId +"/page/"+pageId+"/widget/"+widgetId);
                },
                function (error) {
                    res.statusCode(404).send(error);

                }
            );


    }

    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.start);
        var end =  parseInt(req.query.end);
        // modifiedStart = getIndexOf(pageId,start);
        // modifiedEnd = getIndexOf(pageId,end);
        // widgets.splice(modifiedEnd,0,widgets.splice(modifiedStart,1)[0]);
        // // console.log(widgets)
        // res.send(widgets);


        widgetModel
            .reorderWidget( start, end, pageId)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400);
                });
    }

    // function getIndexOf(pid,i){
    //     resultset = [];
    //     for(var w in widgets){
    //         if(widgets[w].pageId == pid){
    //             resultset.push(w);
    //         }
    //     }
    //     return resultset[i];
    // }
    
    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;
        // for(var i in widgets){
        //     if(widgets[i]._id===widgetId){
        //         widgets.splice(i,1);
        //         res.send(true);
        //         return;
        //     }
        // }
        // res.send(false);
        // return;

        widgetModel
            .deleteWidget(widgetId)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }
    
    function updateWidget(req,res) {
        var widgetId=req.params.widgetId;
        var widget=req.body;
        var widgetType=widget.widgetType;
        // if(widget.widgetType=="HEADER"){
        //     for(var i in widgets){
        //         if(widgets[i]._id===widgetId){
        //             widgets[i].size=widget.size;
        //             widgets[i].text=widget.text;
        //             widgets[i].name=widget.name;
        //             res.send(true);
        //             return;
        //         }
        //     }
        //     return false;
        // }
        // else if(widget.widgetType=="YOUTUBE"){
        //     for(var i in widgets){
        //         if(widgets[i]._id===widgetId){
        //             widgets[i].width=widget.width;
        //             widgets[i].text=widget.text;
        //             widgets[i].name=widget.name;
        //             widgets[i].url=widget.url;
        //             res.send(true);
        //             return;
        //         }
        //     }
        //     res.send(false);
        //     return;
        // }
        // else if(widget.widgetType=="IMAGE"){
        //     for(var i in widgets){
        //         if(widgets[i]._id===widgetId){
        //             widgets[i].width=widget.width;
        //             widgets[i].text=widget.text;
        //             widgets[i].name=widget.name;
        //             widgets[i].url=widget.url;
        //             console.log("true")
        //             res.send(true);
        //             return;
        //         }
        //     }
        //     console.log("false")
        //     res.send(false);
        //     return;
        // }
        //
        // else if(widget.widgetType=="HTML"){
        //     for(var i in widgets){
        //         if(widgets[i]._id===widgetId){
        //             widgets[i].text=widget.text;
        //             res.send(true);
        //             return;
        //         }
        //     }
        //     res.send(false);
        //     return;
        // }

        widgetModel
            .updateWidget(widgetType,widget)
            .then(function (status) {
                console.log("5")
                res.send(200);
            },function (error) {
                console.log("/5")
                res.statusCode(404).send(error);
            })
    }

    function findWidgetById(req,res) {
        var widgetId=req.params.widgetId;
        // for(var i in widgets){
        //     if(widgets[i]._id===widgetId){
        //         res.send(widgets[i]);
        //         return;
        //     }
        // }
        // res.send(null);
        // return;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.send(widget);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }
    
    function createWidget(req,res) {
        var newWidget=req.body;
        // widgets.push(newWidget);
        // res.send(newWidget);
        widgetModel
            .createWidget(newWidget)
            .then(function (widget) {
                res.json(widget);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }
    
   function findAllWidgetsForPage(req,res) {
       var pageId=req.params.pageId;
       // var resultset=[];
       // for(var i in widgets){
       //     if(widgets[i].pageId===pageId){
       //         resultset.push(widgets[i]);
       //     }
       // }
       // res.send(resultset);
       // return;
       widgetModel
           .findAllWidgetsForPage(pageId)
           .then(function (widgets) {
               res.json(widgets);
           },function (error) {
               res.statusCode(404).send(error);
           })

   }
};