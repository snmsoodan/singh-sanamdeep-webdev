module.exports=function () {

    var mongoose=require("mongoose");
    var UserSchema=require("./user.schema.server")();
    // var User=mongoose.model("User",UserSchema);
    var User=mongoose.model("projectUser",UserSchema);
    var api={
        // findFacebookUser:findFacebookUser,
        findUserByGoogleId:findUserByGoogleId,
        createUser:createUser,
        findUserById:findUserById,
        findUserByCredentials:findUserByCredentials,
        findUserByUsername:findUserByUsername,
        deleteUser:deleteUser,
        updateUser:updateUser,
        findUsersByUsername:findUsersByUsername,
        findAllUsers:findAllUsers
    };
    return api;

    function findUserByGoogleId(id){
        return User.findOne({"google.id":id});
    }
    
    function findAllUsers() {
        return User.find();
    }
    
    
    function findUsersByUsername(username) {
        // return User.find({username:username});
        return User.find({username:username});
    }



    function findFacebookUser(id) {
        return User.findOne({"facebook.id":id})
    }
    
    function createUser(user) {
        console.log("user.model.server.createUser()");
        console.log(user);
        return User.create(user);
    }
    
    function findUserById(userId) {
        console.log(userId);
        return User.findById(userId);
    }

    function findUserByCredentials(username,password) {
        return User.findOne({username:username,password:password});

    }

    function findUserByUsername(username) {
        return User.findOne({username:username})
    }
    function deleteUser(id) {
        return User.remove({_id:id});
    }

    function updateUser(id,newUser) {
      //  delete newUser._id;
        console.log(newUser.firstName)
        return User
            .update({_id:id},{
                $set: {
                    firstName:newUser.firstName,
                    lastName:newUser.lastName,
                    email:newUser.email
                }
            });
    }
}