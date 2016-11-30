var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports=function (app,models) {
    var userModel=models.userModel;
    var users=[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ]

    app.get("/api/user",getUsers);
    app.get("/api/user/:userId",findUserById);
    app.post("/api/user",createUser);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

    app.post("/api/login", passport.authenticate('wam'), login);
    app.post("/api/logout",logout);
    app.post("/api/register",register);
    app.get("/api/loggedIn",loggedIn);
    app.get("/auth/facebook",passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/assignment/#/user',
        failureRedirect: '/assignment/#/login'
    }));

    passport.use('wam',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    passport.use('facebook',new FacebookStrategy(facebookConfig,facebookLogin));

    function loggedIn(req,res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send('0');
        }
    }

    function facebookLogin(token, refreshToken, profile, done) {
        console.log(profile);
        userModel
            .findFacebookUser(profile.id)
            .then(function (facebookUser) {
                if(facebookUser){
                    return done(null,facebookUser);
                }
                else{
                    facebookUser={
                        username:profile.displayName.replace(/ /g,' '),
                        facebook:{
                            token:token,
                            id:profile.id,
                            displayName:profile.displayName
                        }
                    }
                    userModel
                        .createUser(facebookUser)
                        .then(function (user) {
                            done(null,user);
                        })
                }
            })

    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.status(400).send("username already in use");
                        return;
                    }else{

                        req.body.password = bcrypt.hashSync(req.body.password);
                        return  userModel
                            .createUser(req.body)
                    }
                },
                function (error) {
                    res.status(400).send(error);
                })
            .then(
                function (user) {
                    if(user){
                        req.login(user, function (err) {
                            if(err){
                                res.status(400).send(err);
                            }
                            else{
                                res.json(user);
                            }
                        });
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )


    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function(err) {
                    done(err);
                }
            );
    }


    function serializeUser(user, done) {
        console.log("searealizable")
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    console.log("desearealizable")
                    done(null, user);
                },
                function(err){
                    console.log("just error local desearealizable")
                    done(err, null);
                }
            );
    }

    function logout(req,res) {
        req.logOut();
        res.send(200);
    }
    function login(req,res) {
        console.log("login service")
        var user=req.user;
        console.log(user)
        res.json(user);
    }



    function deleteUser(req,res) {
        var id=req.params.userId;
        userModel
            .deleteUser(id)
            .then(function (stat) {
                console.log(stat);
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
        // var userId=req.params.userId;
        // for(var i in users){
        //     if(users[i]._id===userId){
        //         users.splice(i,1);
        //         return true;
        //     }
        // }
        // return false;
    }

    function updateUser(req,res) {
        var newUser=req.body;
        var id=req.params.userId;

        userModel
            .updateUser(id,newUser)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })

        // for(var i in users){
        //     if(users[i]._id===id){
        //         users[i].firstName=newUser.firstName;
        //         users[i].lastName=newUser.lastName;
        //         users[i].username=newUser.username;
        //         res.send(newUser);
        //         return;
        //     }
        // }
        // res.send(null);
        // return;
    }
    
    
    function createUser(req,res) {
        var user=req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            },function (error) {
                res.statusCode(400).send(error);
            })
        // users.push(newUser);
        // res.send(newUser);
    }

    function getUsers(req,res) {
        var username=req.query.username;
        var password=req.query.password;
        if(username&&password){
            findUserByCredentials(username,password,req,res);
        }
        else if(username){
            findUserByUsername(username,res);
        }
        else {
            res.send(users);
        }
    }
    function findUserById(req,res) {
        var id=req.params.userId;
        userModel
            .findUserById(id)
            .then(function (user) {
                res.send(user);
            },function (error) {
                res.statusCode(404).send(error);
            })

        // for(var i in users){
        //     if(users[i]._id===id){
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send(null);
    }

    function findUserByCredentials(username,password,req,res) {

        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                console.log(req.session);
                req.session.currentUser=user;
                res.json(user);
            },function (error) {
                res.statusCode(404).send(error);
            })

        // for(var i in users){
        //     if(users[i].username === username && users[i].password === password){
        //
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send(null);
    }

    function findUserByUsername(username,res) {

        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            },function (error) {
                res.statusCode(404).send(error);
            })

        // for(var i in users){
        //     if(users[i].username===username){
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send(null);
    }
};