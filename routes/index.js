
/*
 * GET home page.
 */

 var _mysql   = require('mysql'),
 HOST     = 'localhost',
 USERNAME = 'root',
 PASSWORD = 'root',
 DATABASE = 'test',
 TABLE    = 'usernames_passwords';



 var mysql = _mysql.createConnection({
 	host: HOST,
 	port: 3306,
 	user: USERNAME,
 	password: PASSWORD

 });




 exports.home = function(req, res){
 	if(req.session.username == undefined || req.session.password == undefined || req.session.username == "NULL" || req.session.password=="NULL"){
 		res.render('index', {title: "Log in Please"});
 	}
 	else{
 		var temp = DATABASE;
 		var temp_user = req.session.username;
 		mysql.query("USE " + DATABASE);
 		mysql.query("SELECT password FROM " + TABLE + " WHERE username='"+ temp_user + "'", function(err, rows, fields){
 			if(err) res.render('index', {title:"Username/Password not found"});
 			else{
 				if(rows[0] != undefined){
 					temp = rows[0];
 					if(temp['password'] == req.session.password){
						res.redirect('/chat'); 
 					}				
 				}
 			}
 		});
 	}


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