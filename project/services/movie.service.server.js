module.exports=function (app,models) {


    var movieModel=models.movieModel;
    app.post("/api/title/:titleId",findMovieById);
    app.post("/api/movie/create",createMovie);
    app.get("/api/rating/:rating/title/:titleId",findRatings)
    app.get("/api/director/:director/title/:titleId",findDirector)


    function findDirector(req,res) {
        console.log("infind director service")
        var director=req.params.director;
        console.log(director)
        var titleId=req.params.titleId;
        console.log(titleId)
        movieModel
            .findDirector(director,titleId)
            .then(function (movies) {
                res.send(movies);
            },function (error) {
                res.sendStatus(404).send(error);
            })
    }
    
    function findRatings(req,res) {
        var rating=req.params.rating;
        var titleId=req.params.titleId;
        movieModel
            .findRatings(rating,titleId)
            .then(function (movies) {
                res.send(movies);
            },function (error) {
                res.sendStatus(404).send(error);
            })
    }
    
    function findMovieById(req,res) {
        console.log("find movie by id server")
        var id=req.params.titleId;
        var userId=req.body.userId;
        console.log(userId)
        movieModel
            .findMovieById(id,userId)
            .then(function (movie) {
                res.send(movie);
            },function (error) {
                console.log("find movie by id server error")
                 res.send("error");
                //  res.statusCode(400).send(error);
            })
    }
    
    function createMovie(req,res) {
        var newMovie=req.body;
        console.log(newMovie.titleId)
        console.log(newMovie.userId)
        movieModel
            .findMovieById(newMovie.titleId,newMovie.userId)
            .then(
                function (movie) {
                    console.log(movie);
                    if(movie==null)
                    {
                        console.log("a from model")
                        movieModel
                            .createMovie(newMovie)
                            .then(function (movie) {
                                res.send(200)
                            },function (error) {
                                res.sendStatus(404).send(error);
                            })
                    }
                    else{
                        res.send(200);
                    }
                })
    }
};