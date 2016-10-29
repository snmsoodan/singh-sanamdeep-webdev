module.exports=function (app) {
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

    function deleteUser(req,res) {
        var userId=req.params.userId;
        for(var i in users){
            if(users[i]._id===userId){
                users.splice(i,1);
                return true;
            }
        }
        return false;
    }

    function updateUser(req,res) {
        var newUser=req.body;
        var id=req.params.userId;

        for(var i in users){
            if(users[i]._id===id){
                users[i].firstName=newUser.firstName;
                users[i].lastName=newUser.lastName;
                users[i].username=newUser.username;
                res.send(newUser);
                return;
            }
        }
        res.send(null);
        return;
    }
    
    
    function createUser(req,res) {
        var newUser=req.body;
        users.push(newUser);
        res.send(newUser);
    }

    function getUsers(req,res) {
        var username=req.query.username;
        var password=req.query.password;
        if(username&&password){
            findUserByCredentials(username,password,res);
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
        for(var i in users){
            if(users[i]._id===id){
                res.send(users[i]);
                return;
            }
        }
        res.send(null);
    }

    function findUserByCredentials(username,password,res) {
        for(var i in users){
            if(users[i].username === username && users[i].password === password){

                res.send(users[i]);
                return;
            }
        }
        res.send(null);
    }

    function findUserByUsername(username,res) {
        for(var i in users){
            if(users[i].username===username){
                res.send(users[i]);
                return;
            }
        }
        res.send(null);
    }
};