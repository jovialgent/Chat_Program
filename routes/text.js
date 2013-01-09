var   img_opener = '<img src="'
, img_closer = '" height="100" width="150">'
, a_open_o   = '<a href="'
, a_open_c   = '" target="_blank">'
, a_close    = '</a>'; 

var emoticons = {
	violin: 'http://www.midwestsportsfans.com/wp-content/uploads/2011/06/lebron-smallest-violin.gif',
	wtf: 'http://i.imgur.com/8QmIp.gif',
	thumbsup: 'http://i.imgur.com/ttb0r.gif',
	omg: 'http://media.tumblr.com/tumblr_lvgm1whNKs1qdlkgg.gif',
	wink: 'http://i.imgur.com/QmNDt.gif',
	coolstory: 'http://i.imgur.com/vGdg9.gif',
	goodjob: 'http://i.imgur.com/PlNN2.jpg',
	lookagain: 'http://i.imgur.com/4SsbA.gif',
	slowclap: 'http://awesomegifs.com/wp-content/uploads/cheers-slow-clap.gif',
	lol: 'http://2.bp.blogspot.com/-TfWKbN_8KkY/UCPonRwZF5I/AAAAAAAAPe8/l8FrMCReLOM/s1600/freaky_lol_gif.gif'
}

var searches = {
	google: 'https://www.google.com/search?q='
}


exports.emoticonParse = function(text){
	var parsed = text.split(' ');
	var temp = '';
	for(var i = 0; i < parsed.length; i++){
		if(parsed[i]=='/violin'){
			parsed[i] = img_opener + emoticons.violin + img_closer; 
		}
		if(parsed[i]=='/wtf'){
			parsed[i] = img_opener + emoticons.wtf + img_closer;
		}
		if(parsed[i]=='/goodjob'){
			parsed[i] = img_opener + emoticons.goodjob + img_closer;
		}
		if(parsed[i]=='/thumbsup'){
			parsed[i] = img_opener + emoticons.thumbsup + img_closer;
		}
		if(parsed[i]=='/omg'){
			parsed[i] = img_opener + emoticons.omg + img_closer;
		}
		if(parsed[i]=='/wink'){
			parsed[i] = img_opener + emoticons.wink + img_closer;
		}
		if(parsed[i]=='/coolstory'){
			parsed[i] = img_opener + emoticons.coolstory + img_closer;
		}
		if(parsed[i]=='/goodjob'){
			parsed[i] = img_opener + emoticons.goodjob + img_closer;
		}
		if(parsed[i]=='/lookagain'){
			parsed[i] = img_opener + emoticons.lookagain + img_closer;
		}
		if(parsed[i]=='/slowclap'){
			parsed[i] = img_opener + emoticons.slowclap + img_closer;
		}
		if(parsed[i]=='/lol'){
			parsed[i] = img_opener + emoticons.lol + img_closer;
		}
	}
	for(var i=0; i<parsed.length; i++){
		temp += (parsed[i] + ' ')

	}
	return temp;

}

exports.hyperTextParse = function(text){
	var parsed = text.split(' ');
	var temp = '';
	for(var i = 0; i < parsed.length; i++){
		if(parsed[i].substring(0,4) == 'http'){
			var link = parsed[i];
			parsed[i] = a_open_o + link + a_open_c + link + a_close;
		}
		if(parsed[i].substring(0,8) == "/google="){
			var temp = parsed[i].substring(8);
			parsed[i]=searches.google + temp;


		}

	}
	for(var i=0; i<parsed.length; i++){
		temp += (parsed[i] + ' ')

	}
	return temp;

}
