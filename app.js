//file system
var fs = require('fs');
//file upload için middleware
var busboy = require('connect-busboy');
//express
var express = require('express');
//logging
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//session
var session = require('express-session');
//sıkıştırma
var compress = require('compression');
//cros site json data çekmek için
var cors = require('cors');

//mongo db ayarları
require(__dirname + '/db/mongo.js');

//app
global.app = express();

//route lar
var routes = require('./routes/index');
var users = require('./routes/users');

// Set View Engine
app.engine('hjs', require('hogan-express'));
// By default, Express will use a generic HTML wrapper (a layout) to render all your pages. If you don't need that, turn it off.
app.set('view options', {layout: true});
// Set the layout page. Layout page needs {{{ yield }}}  where page content will be injected
app.set('layout', 'layouts/main_layout');
//app.enable('view cache');
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags : 'a'});
// setup the logger
app.use(morgan('combined', {stream : accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(session({ secret : '2Smy9fMSx8i0ygm3P7fXxkTpXyf5e5P3', saveUninitialized : true, resave : true, cookie : { maxAge : 60000, secure : true }}));
app.use(cors());
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

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
