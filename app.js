
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


//All the GET Routes
app.get('/', routes.home);
app.get('/users', user.list);
app.get('/success', routes.success);
app.get('/chat', routes.chat);

//All the POST Routes
app.post('/', routes.home_post_handler);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


/*
 * Code taken from:
 * http://psitsmike.com/2011/09/node-js-and-socket-io-chat-tutorial/
 */

var io = require('socket.io').listen(server);
var usernames = [];
var num_users = 0;
var mock_database = {
  "users" : [{  "username": "test123", "password": "blah", "level": "USER"},
             {  "username": "test234", "password": "blah", "level": "USER"}]

};
var num_users = 0;
io.sockets.on('connection', function(socket){
  socket.on('sendchat', function(data){
    io.sockets.emit('updatechat', usernames[0], data);
  });
  socket.on('adduser', function(username, password){
    console.log("USERNAME: " + username + " WAS SENT!");
    var temp_data = mock_database.users;
    for (var i = 0; i < temp_data.length ; i++) {
      if(temp_data[i].username == username && temp_data[i].password == password){
        usernames.push(username);
        console.log("Username: " + username + " Password: " + password + " Users:" + usernames.length);
        socket.emit('updatechat', 'SERVER', username + ' has been connected');
      }
    };
    
  });
  socket.on('init', function(){
    socket.emit('updateusers', usernames[usernames.length-1]);
  })
 });

