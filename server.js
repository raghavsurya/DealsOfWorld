var express = require('express');
global.jQuery = global.$ = require('jquery'); 

var path = require('path');
var serveStatic = require('serve-static')
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
 
var index = require('./routes/index');
var departments = require('./routes/Departments');
 
var app = express();
 console.log(__dirname);

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//app.use(cookieParser());
app.use(express.static(__dirname));

app.use('/', index);

app.use('/api/v1/', departments);
 app.all('*', function (req, res) { res.status(200).sendFile(path.join(__dirname, '/index.html')); });
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var server = app.listen(80, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});
 
module.exports = app;