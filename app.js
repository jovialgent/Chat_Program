
/**
 * Module dependencies.
 */

 var express = require('express')
 , routes = require('./routes/index')
 , user = require('./routes/user')
 , http = require('http')
 , path = require('path')
 , text = require('./routes/text');

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

 var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

 var io = require('socket.io').listen(server);
 var usernames = [];
 var num_users = 0;
 var mock_database = {
  "users" : [{  "username": "test123", "password": "blah", "level": "USER"},
  {  "username": "test234", "password": "blah", "level": "USER"},
  {  "username": "test345", "password": "blah", "level": "USER"}]

};
var num_users = 0;

//All the GET Routes
app.get('/', routes.home);
app.get('/users', user.list);
app.get('/success', routes.success);
app.get('/chat', routes.chat);
app.get('/logout', function(req, res){
  delete req.session.username;
  res.render('log_out', {title: "You've been logged off"});
});

//All the POST Routes
app.post('/', routes.home_post_handler);



/*
 * Code taken from:
 * http://psitsmike.com/2011/09/node-js-and-socket-io-chat-tutorial/
 */

 io.sockets.on('connection', function(socket){
  socket.on('sendchat', function(msg){
    if(msg != ""){
     socket.get('nickname', function (err, name) {
      for(var i = 0; i < usernames.length; i++){
        
        if(name == usernames[i]){
          var temp_text = msg;
          temp_text = text.emoticonParse(msg);
          temp_text = text.hyperTextParse(temp_text);
          console.log("PARSED: " + temp_text);
          io.sockets.emit('updatechat', name, temp_text);
        }
      }
    });
   }
 });
  socket.on('log_out', function(){
    socket.get('nickname', function (err, name){
      for(var i = 0; i < usernames.length; i++){
        console.log(name);
        if(name == usernames[i]){
          console.log("THIS USER HAS BEEN LOGGED OFF: " + name);
          usernames.splice(i, 1);
          console.log("USER: " + name + " has disconnected Users: " + usernames.length );
          io.sockets.emit('updateusers', usernames);
        }
      }
    });
    socket.disconnect();
  });

  socket.on('set nickname', function () {
    socket.set('nickname', usernames[usernames.length-1], function () {
      io.sockets.emit('updateusers', usernames);
    });
    
  });
  
  socket.on('adduser', function(username, password){
    console.log("USERNAME: " + username + " WAS SENT!");
    var temp_data = mock_database.users;
    for (var i = 0; i < temp_data.length ; i++) {
      if(temp_data[i].username == username && temp_data[i].password == password){
        usernames.push(username);
        console.log("Username: " + username + " Users:" + usernames.length);
        io.sockets.emit('updatechat', 'SERVER', username + ' has been connected');
        
      }
    };    
  });
});

