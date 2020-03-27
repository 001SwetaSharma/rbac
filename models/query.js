const User = require('./user');
const User_roles = require('./user_Roles');
const mongoose = require('mongoose');


//for checking if admin already exist


module.exports.checkRoles = () => {
    return Promise.resolve(checkUserRoles());
}


//checking user role for admin functionality
let checkUserRoles = () => {
    return User.find({}).count()
    .then(ctr => {
        return Promise.resolve(ctr);
    })
}

//for registering new user
module.exports.registerNewUser = (data) => {
    return checkUserRoles().then(ctr => {
        if(ctr == 0)access = 'Admin';
        else access = data.user_role;

        return User.insertMany({
            firstname: data['firstname'],
            lastname: data['lastname'],
            username: data['username'],
            password: data['password'],
            emailid: data['email_id'],
        })
        .then(result => {
            result = result[0];
            return User_roles.insertMany({
                user_id:mongoose.Types.ObjectId(result._id),
                username:result.username,
                access:access
            })
            .then(_ => {
                return Promise.resolve({status:1,msg:`Username ${data['username']} registered successfully`});
            })
        })
        .catch(err => {
            let response = {};
            if(err.errors.username && !err.errors.emailid) response = {status:0,msg:'Username is already present',faulty:'username'};
            else if(!err.errors.username && err.errors.emailid) response = {status:0,msg:'Email Id is already present',faulty:'emailid'};
            else if(err.errors.username && err.errors.emailid) response = {status:0,msg:'Email Id and Username is already present',faulty:'both'};
            return Promise.resolve(response);
        })
    })
}


//fetching all the registered users along with the access
module.exports.getUsers = () =>{
    return User.find({})
    .then(result => {
        let userDetails = {};
        result.forEach(user => {
            userDetails[user._id] = {
                firstname:user.firstname,
                lastname:user.lastname,
                username:user.username,
                emailid:user.emailid
            };
        });

        return User_roles.find({})
        .then(o => {
            o.forEach(role => {
                userDetails[role.user_id].access = role.access
            });
            return Promise.resolve(userDetails);
        })
        
    });
}