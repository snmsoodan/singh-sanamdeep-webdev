module.exports=function () {

    var mongoose=require("mongoose");
    var MovieSchema=require("./movie.schema.server")();
    var Movie=mongoose.model("Movie",MovieSchema);

    var api={
        findMovieById:findMovieById,
        createMovie:createMovie,
        findRatings:findRatings,
        findDirector:findDirector
        
    };
    return api;

    function findDirector(director,titleId) {
        console.log(director);
        console.log(titleId)
        return Movie.find({director:director,titleId:{$ne:titleId}})
    }

    function findRatings(rating,titleId) {
        return Movie.find({rating:rating,titleId:{$ne:titleId}})
    }

    
    function findMovieById(titleId,userId) {
        return Movie.findOne({titleId:titleId,userId:userId})
    }
    
    function createMovie(newMovie) {
        return Movie.create(newMovie);
    }
    

    
}