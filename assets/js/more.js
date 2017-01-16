$(document).ready(function() {
	var skills = $("#skills");
	var info = JSON.parse(data);
	for(var i in info) {
		var skill = "<p>" + info[i].tool + "</p>";
		var level = info[i].level;
		var aux = "<p>";
		
		for (var j = 1; j <= level; j++) {
			aux += "<span class='icon fa-star'>";
		}

		for (j; j <= 5; j++) {
			aux += "<span class='icon fa-star-o'>";
		}
		skill += aux + "</span></p><br>"
		skills.append(skill);
	}
});