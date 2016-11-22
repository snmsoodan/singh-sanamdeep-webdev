module.exports=function () {

    var mongoose=require("mongoose");
    var UserSchema=require("./user.schema.server")();
    var User=mongoose.model("User",UserSchema);

    var api={
        findFacebookUser:findFacebookUser,
        createUser:createUser,
        findUserById:findUserById,
        findUserByCredentials:findUserByCredentials,
        findUserByUsername:findUserByUsername,
        deleteUser:deleteUser,
        updateUser:updateUser
    };
    return api;

    function findFacebookUser(id) {
        return User.findOne({"facebook.id":id})
    }

    function createUser(user) {
        // console.log("user.model.server.createUser()");
        // console.log(user);
        return User.create(user);
    }

    function findUserById(userId) {
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
                    email:newUser.email,
                }
            });
    }
}
