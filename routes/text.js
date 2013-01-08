var emoticons = {
	violin: '<img src="http://www.midwestsportsfans.com/wp-content/uploads/2011/06/lebron-smallest-violin.gif"/>'
}

exports.emoticonParse = function(text){
	var parsed = text.split(' ');
	var temp = '';
		for(var i = 0; i < parsed.length; i++){
			console.log("EACH PIECE SPLIT: " + parsed[i]);
			if(parsed[i]=='/violin'){
				parsed[i]= emoticons.violin;
			}
		}
		for(var i=0; i<parsed.length; i++){
			temp += (parsed[i] + ' ')

		}
		return temp;

}
