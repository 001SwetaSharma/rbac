let express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    morgan = require('morgan');

    
    let register = require("./routes/register");
    let config = require('./config/config.json')
    let app = express();
    let port = config.port; // you can give your choice of port number

    //------------------ logger setup --------------------------//
    
    morgan.token('host',function(req,res){
        return req.hostname;
    });

    app.use(morgan(':method :remote-addr :host :url HTTP/:http-version :status :response-time ms'));

    //------------------ logger setup --------------------------//


    //MongoDb
    var mongoDB = config.dburl;
    mongoose.connect(mongoDB,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(db => {
        console.log('MongoDB Connected !!')
    })
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console,'MongoDB connection error'));
    //MongoDb

    
    app.set('views', __dirname + '/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use('/register', register);
    app.get('/',(req,res) => {
        res.redirect('/register');
    });

    //create server
    http.createServer(app).listen(port, () => {
        console.log(`server running on port:${port}`);
    });