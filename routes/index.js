//file system
var fs = require('fs');
var express = require('express');
var uuid = require('node-uuid');
//extension almak için kullandık
var path = require('path');
//strict : true /foo == /foo/
var router = express.Router({strict : true});

//http://scotch.io/tutorials/javascript/learn-to-use-the-new-router-in-expressjs-4
// route middleware that will happen on every request
/*router.use(function (req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});*/

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title : 'Express : Hello',
        partials                : {//partial include
            part : 'partials/part'
        }
    });
});

router.get('/hello/:name', function (req, res) {
    res.send('hello ' + req.params.name + '!');
});

router.post('/deneme', function (req, res) {
    var name = req.body.name,//post data alma
        color = req.body.color;
    res.send(name + " " + color);
});

//file upload
router.post('/fileupload', function (req, res) {
    var fstream, newFile, ext;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        //get extension
        ext = path.extname(filename);
        newFile = uuid.v4() + ext;
        fstream = fs.createWriteStream(appRoot + '/uploaded/' + newFile);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});

//route gruplama
router.route('/login')
    // show the form (GET http://localhost:8080/login)
    .get(function (req, res) {
        res.send('this is the login form');
    })

    // process the form (POST http://localhost:8080/login)
    .post(function (req, res) {
        console.log('processing');
        res.send('processing the login form!');
    });

module.exports = router;
