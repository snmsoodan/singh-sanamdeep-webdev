module.exports=function () {
    var mongoose=require("mongoose")
    var WidgetSchema=mongoose.Schema({
        order:Number,
        _page:{type:mongoose.Schema.ObjectId,ref:"Page"},
        type:String,
        name:String,
        text:String,
        placeholder:String,
        description:String,
        url:String,
        width:String,
        height:String,
        rows:Number,
        size:Number,
        class:String,
        icon:String,
        deletetable:Boolean,
        formatted:Boolean,
        dateCreated:{type:Date,default:Date.now}
    },{collection:"assignment.widget"});
    return WidgetSchema;
};
