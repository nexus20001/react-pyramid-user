var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var app = express();

app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './Sourse/views'));

app.use('/', express.static(path.join(__dirname, 'Publish')));

app.get('/', function(req, res, next) {
  var users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  res.render('index', { users: safeStringify(users) });
});

app.use('/users', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    var stream = fs.createReadStream('./users.json');
    stream.pipe(res);
});

app.use(express.errorHandler());

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
