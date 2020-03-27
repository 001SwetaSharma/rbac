var mongoose= require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

mongoose.Promise = global.Promise

var Schema= mongoose.Schema;

var UserSchema=  new Schema({
    firstname: {type: String, required:true, max:100},
    lastname:  {type: String, required:true, max:100},
    username: {type: String, required:true, max:100, index: true,unique : true, uniqueCaseInsensitive: true},
    password: String,
    emailid: {type: String, required:true, max:100, index: true,unique : true, uniqueCaseInsensitive: true}
},{timestamps: true});


UserSchema.plugin(uniqueValidator, {message: 'Username is already taken.'});

UserSchema.methods.setPassword = function(password){

    this.password = password;
};

UserSchema.methods.validPassword = function(password) {
    return this.password === password;
};


module.exports= mongoose.model('User', UserSchema);

