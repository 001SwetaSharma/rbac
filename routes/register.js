let express = require('express');
let path = require('path');
let registerRouter = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const query = require('../models/query');
const config = require('../config/config');


//middleware for rendering html file.
registerRouter.get('/',(req,res) => {
    res.render(path.dirname(__dirname)+'/views/register.html')
});


//checking role for admin functionality
//if no role is there then dont show the user role dropdown in front end
// else show some other users roles if already admin is there.
registerRouter.get('/checkRoles',(req,res) => {
    let roles = [];
    query.checkRoles()
    .then(ctr => {
        if(ctr > 0) roles = config.userRoles;
        res.send(roles);
    })
});


//register new user
registerRouter.post('/registerNewUser',urlencodedParser,(req,res) => {
    query.registerNewUser(req.body)
    .then(result => {
        res.send(result);
    })
});


//fetching already registered users
registerRouter.get('/getUsers',urlencodedParser,(req,res) => {
    query.getUsers(req.body)
    .then(result => {
        res.send(result);
    })
});

module.exports = registerRouter;