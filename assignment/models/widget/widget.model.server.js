module.exports=function () {
    var mongoose=require("mongoose");
    var WidgetSchema=require("./widget.schema.server")();
    var Widget=mongoose.model("Widget",WidgetSchema);

    var api={
        createWidget:createWidget,
        findAllWidgetsForPage:findAllWidgetsForPage,
        findWidgetById:findWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget,
        reorderWidget: reorderWidget
    }
    return api;

    function reorderWidget(start, end, pageId) {
        console.log("model")
        return Widget
            .find({_page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    if(start< end){

                        if(widget.order === start){
                            widget.order = end;
                            widget.save();
                        }
                        else if(widget.order > start && widget.order <= end){
                            widget.order--;

                            widget.save();

                        }
                    } else{
                        if(widget.order === start){

                            widget.order = end;
                            widget.save();

                        }

                        else if(widget.order < start && widget.order >= end){

                            widget.order++;

                            widget.save();

                        }
                    }
                });
            });
    }

    function createWidget(widget) {
        // widget.order = widget.length;
        // console.log(widget.order);
        // return Widget.create(widget);

        return Widget
            .find({_page: widget._page})
            .then(
                function (widgets) {
                    console.log("widget:length"+widgets.length);
                    widget.order = widgets.length;
                    return Widget.create(widget);
                },
                function (error) {
                    return null;
                });
    }

    function findAllWidgetsForPage(pageId){
        return Widget.find({_page:pageId});
    }

    function findWidgetById(id){
        return Widget.findById(id);
    }

    function updateWidget(type,widget){
        if(widget.type==="HEADER") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text:widget.text,
                        size:widget.size
                    }
                })
        }
        else if(widget.type==="HTML") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text:widget.text
                    }
                })
        }

        else if(widget.type==="IMAGE") {
            console.log("4")
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text :widget.text,
                        width :widget.width,
                        url :widget.url
                    }
                })
        }

        else if(widget.type==="YOUTUBE") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text :widget.text,
                        width :widget.width,
                        url :widget.url
                    }
                })
        }



    }

    function deleteWidget(id){
        return Widget.remove({_id:id})
    }

};