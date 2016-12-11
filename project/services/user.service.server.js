var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports=function (app,models) {

    var userModel=models.projectModel;

    var users=[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.put("/api/projectuser/admin/:userId/delete/user", deleteAdmin);
    app.put("/api/projectuser/admin/user/:userId", makeAdmin);
    app.get("/api/projectuser/admin/users", getAdmins);
    
    app.post("/api/user",createUser);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.post("/api/logout",logout);
    app.post("/api/register",register);
    app.get("/api/loggedIn",loggedIn);
    app.get("/api/user",getUsers);
    app.get("/api/allUsers",allUsers);
    app.get("/api/finduser/:username",findUsersByUsername);
    app.get("/api/user/:userId",findUserById);
    // app.get("/auth/facebook",passport.authenticate('facebook'));
    // app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    //         successRedirect: '/project/#/user',
    //         failureRedirect: '/project/#/login'
    //     }));
    app.get("/auth/google", passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get("/auth/google/callback",
        passport.authenticate('google', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));
    
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

    passport.use('wam',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // var facebookConfig = {
    //     clientID     : process.env.FACEBOOK_CLIENT_ID,
    //     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    //     callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    // };
    // passport.use('facebook',new FacebookStrategy(facebookConfig,facebookLogin));

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };
    passport.use('google',new GoogleStrategy(googleConfig, googleStrategy));

    
    
    function findUsersByUsername(req,res) {
        var username=req.params.username;
        userModel
            .findUsersByUsername(username)
            .then(function (users) {
                res.send(users);
            },function (error) {
                res.sendStatus(404).send(error);
            })
    }


    function loggedIn(req,res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send('0');
        }
    }

    // function facebookLogin(token, refreshToken, profile, done) {
    //     console.log(profile);
    //     userModel
    //         .findFacebookUser(profile.id)
    //         .then(function (facebookUser) {
    //             if(facebookUser){
    //                 return done(null,facebookUser);
    //             }
    //             else{
    //                 facebookUser={
    //                     username:profile.displayName.replace(/ /g,''),
    //                     facebook:{
    //                     token:token,
    //                     id:profile.id,
    //                     displayName:profile.displayName
    //                     }
    //                 }
    //                 userModel
    //                     .createUser(facebookUser)
    //                     .then(function (user) {
    //                     done(null,user);
    //                 })
    //             }
    //         })
    //
    // }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    }
                    else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }
    
    

    function register(req, res) {
        var username = req.body.username;
             console.log("username service 1"+username)
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.status(400).send("username already in use");
                        return;
                    }else{
console.log("service creating user after model call")
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

    }

    function createUser(req,res) {
        var user=req.body;
        console.log(user);
        console.log("username service "+user.username);

        userModel
            .createUser(user)
            .then(function (user) {
                console.log(user);
                res.json(user);
        },function (error) {
                res.statusCode(400).send(error);
            })

        // user._id=(new Date()).getTime()+"";
        // users.push(user);
        // res.send(user);
    }

    function updateUser(req,res) {
        var id=req.params.userId;
        var newUser=req.body;

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
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function allUsers(req,res) {
        userModel
            .findAllUsers()
            .then(function (user) {
                    res.send(user);
                },function (error) {
                    res.statusCode(404).send(error);
                })
    }

    function findUserById(req,res) {
        //console.log("a")
        var id=req.params.userId;
        console.log("client server "+id);
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
        // res.send(403);
    }

    function getUsers(req,res) {
        var username=req.query.username;
        var password=req.query.password;
        if(username&&password){
            findUserByCredentials(username,password,req,res);
        }else if(username){
            findUserByUsername(username,res);
        }else{
            res.send(users);
        }
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
        //     if(users[i].username===username&&users[i].password===password){
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send(403);

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
        // res.send({})

    }

    function getAdmins(req, res) {
        userModel
            .getAdmins()
            .then(
                function (adminObj) {
                    res.json(adminObj);
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }


    function makeAdmin(req, res) {
        userModel
            .makeAdmin(req.params.userId)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);

                }
            );

    }

    function deleteAdmin(req, res) {
        userModel
            .deleteAdmin(req.params.userId)
            .then(
                function (adminRemObj) {
                    res.json(adminRemObj);
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

};