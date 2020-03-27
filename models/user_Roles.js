var mongoose= require('mongoose');
mongoose.Promise = global.Promise

var Schema= mongoose.Schema;

var UserSchema=  new Schema({
    user_id:{type: Schema.ObjectId, ref: 'User'},
    username: {type: String, required:true, max:100},
    access: {type: String, required: true},
});

module.exports= mongoose.model('user_Role', UserSchema);