
/*
 * GET home page.
 */

 var _mysql   = require('mysql')
   , HOST     = 'localhost'
   , USERNAME = 'root'
   , PASSWORD = 'root'
   , DATABASE = 'test'
   , TABLE    = 'usernames_passwords';


//Configure the mySQL database call
// var mysql = _mysql.createConnection({
// 	host: HOST,
// 	port: 3306,
// 	user: USERNAME,
// 	password: PASSWORD
//
//});

var mock_database = {
  "users" : [{  "username": "test123", "password": "blah", "level": "USER"},
             {  "username": "test234", "password": "blah", "level": "USER"}]

};



 //This method will be invoke when you go ./
 exports.home = function(req, res){
 	//If the username is undefined or set to the default NULL then it will ask to login
 	if(req.session.username == undefined || req.session.password == undefined || req.session.username == "NULL" || req.session.password=="NULL"){
 		res.render('index', {title: "Log in Please"});
 	}
 	//If you typed in an address then it will test to see if it works.
 	else{
 		var temp = DATABASE;
 		var temp_user = req.session.username;
 		var temp_data = mock_database.users;
 		for (var i = 0; i < temp_data.length ; i++) {
 			if(temp_data[i].username == req.session.username && temp_data[i].password == req.session.password){
 				res.redirect('/chat');
 			}
 		};
 		res.render('index', {title:"Log in Please"});

 	    //mysql.query("USE " + DATABASE);
 		//mysql.query("SELECT password FROM " + TABLE + " WHERE username='"+ temp_user + "'", function(err, rows, fields){
 		//	if(err) res.render('index', {title:"Username/Password not found"});
 		//	else{
 		//		//If there is something found it will see if the password is correct
 		//		if(rows[0] != undefined){
 		//			temp = rows[0];
 		//			//If the password matches with the user name then it will go through
 		//			if(temp['password'] == req.session.password){
		//				res.redirect('/chat'); 
 		//			}				
 		//		}
 		//	}
 		//});
 	}


 };

 exports.chat = function(req,res){
 	if(typeof req.session.username == 'undefined' || typeof req.session.password == 'undefined' 
 		|| req.session.password == "NULL" || req.session.username == "NULL"){
 		res.redirect('/');
 	}
 	res.render('chat', {title: "Chat Room", username: req.session.username});

 };

 exports.home_post_handler = function(req, res){
 	username = req.body.username || "NULL";
 	password = req.body.password || "NULL";
 	req.session.username = username;
 	req.session.password = password;
 	res.redirect('/');
 };


 exports.success = function(req, res){
 	res.render('successful', {title: "SUCCESS!"});
 }
