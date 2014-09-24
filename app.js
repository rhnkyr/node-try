//file system
var fs = require('fs');
//file upload için middleware
var busboy = require('connect-busboy');
//express
var express = require('express');
//logging
var winston = require('winston');
//file path işlemleri için
var path = require('path');
//favicon
var favicon = require('serve-favicon');
//sessino için
var cookieParser = require('cookie-parser');
//form data okuma
var bodyParser = require('body-parser');
//session
var session = require('express-session');
//redis
var redis = require('redis');
var rds = redis.createClient();
//sıkıştırma
var compression = require('compression');
//cros site json data çekmek için
var cors = require('cors');
//mailer
//https://github.com/andris9/Nodemailer
var mailer = require('nodemailer');
//amazon ses
var amazonSes = require('nodemailer-ses-transport');

//app global
global.app = express();

//app path
global.appRoot = path.resolve(__dirname);

//mongo db ayarları
require(appRoot + '/db/mongo.js');

//redis check
rds.on("error", function (err) {
    console.log("Error " + err);
});

// Set View Engine
app.engine('hjs', require('hogan-express'));
// By default, Express will use a generic HTML wrapper (a layout) to render all your pages. If you don't need that, turn it off.
app.set('view options', {layout : true});
// Set the layout page. Layout page needs {{{ yield }}}  where page content will be injected
app.set('layout', 'layouts/main_layout');
//app.enable('view cache');
app.set('views', appRoot + '/views');
app.set('view engine', 'hjs');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

winston.handleExceptions(new winston.transports.File({ filename : appRoot + '/logs/error.log' }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(session({  secret : '2Smy9fMSx8i0ygm3P7fXxkTpXyf5e5P3',
    saveUninitialized     : true,
    resave                : true,
    cookie                : { maxAge : 60000  }
}));
app.use(cors());
app.use(busboy());
app.use(compression());
app.use(express.static(path.join(appRoot, 'public')));

//route lar
var routes = require(appRoot + '/routes/index');
var users = require(appRoot + '/routes/users');

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message : err.message,
            error   : err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message : err.message,
        error   : {}
    });
});

module.exports = app;
