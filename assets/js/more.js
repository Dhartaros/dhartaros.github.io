$(document).ready(function() {
	var skills = $("#skill_list");
	var info = JSON.parse(skillsJson);
	for(var i in info) {
		var skill = "<p>" + info[i].tool + "</p>";
		skills.append(skill);
	}
	for(var i in info) {
		var level = info[i].level;
		var aux = "<p>";
		
		for (var j = 1; j <= level; j++) {
			aux += "<span class='icon fa-star'></span>";
		}

		for (j; j <= 5; j++) {
			aux += "<span class='icon fa-star-o'></span>";
		}
		aux += "</p>";
		skills.append(aux);
	}
	var projects = $("#work");
	info = JSON.parse(workJson);
	for(var i in info) {
		var title = "";
		var image = "";
		if (info[i].url === undefined)
			title += "<h3>" + info[i].name + "</h3>";
		else
			title += "<h3><a href='" + info[i].url + "' target='_blank'>Java Sensei</a></h3>";
		if (info[i].imageUrl !== undefined)
			image += "<span class='image main'><img src='" + info[i].imageUrl + "' alt='" + info[i].name + "Image' /></span>";
		var description = "<p>" + info[i].description + "</p>";
		var project = title + image + description;
		projects.append(project);
	}
});