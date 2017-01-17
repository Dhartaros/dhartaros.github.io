$(document).ready(function() {
	var easter_egg = new Konami('https://www.youtube.com/watch?v=teMdjJ3w9iM');
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

});var Konami = function (callback) {
		var konami = {
			addEvent: function (obj, type, fn, ref_obj) {
				if (obj.addEventListener)
					obj.addEventListener(type, fn, false);
				else if (obj.attachEvent) {
					// IE
					obj["e" + type + fn] = fn;
					obj[type + fn] = function () {
						obj["e" + type + fn](window.event, ref_obj);
					}
					obj.attachEvent("on" + type, obj[type + fn]);
				}
			},
			input: "",
			pattern: "38384040373937396665",
			load: function (link) {
				this.addEvent(document, "keydown", function (e, ref_obj) {
					if (ref_obj) konami = ref_obj; // IE
					konami.input += e ? e.keyCode : event.keyCode;
					if (konami.input.length > konami.pattern.length)
						konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
					if (konami.input == konami.pattern) {
						konami.code(link);
						konami.input = "";
						e.preventDefault();
						return false;
					}
				}, this);
				this.iphone.load(link);
			},
			code: function (link) {
				window.location = link
			},
			iphone: {
				start_x: 0,
				start_y: 0,
				stop_x: 0,
				stop_y: 0,
				tap: false,
				capture: false,
				orig_keys: "",
				keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
				code: function (link) {
					konami.code(link);
				},
				load: function (link) {
					this.orig_keys = this.keys;
					konami.addEvent(document, "touchmove", function (e) {
						if (e.touches.length == 1 && konami.iphone.capture == true) {
							var touch = e.touches[0];
							konami.iphone.stop_x = touch.pageX;
							konami.iphone.stop_y = touch.pageY;
							konami.iphone.tap = false;
							konami.iphone.capture = false;
							konami.iphone.check_direction();
						}
					});
					konami.addEvent(document, "touchend", function (evt) {
						if (konami.iphone.tap == true) konami.iphone.check_direction(link);
					}, false);
					konami.addEvent(document, "touchstart", function (evt) {
						konami.iphone.start_x = evt.changedTouches[0].pageX;
						konami.iphone.start_y = evt.changedTouches[0].pageY;
						konami.iphone.tap = true;
						konami.iphone.capture = true;
					});
				},
				check_direction: function (link) {
					x_magnitude = Math.abs(this.start_x - this.stop_x);
					y_magnitude = Math.abs(this.start_y - this.stop_y);
					x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
					y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
					result = (x_magnitude > y_magnitude) ? x : y;
					result = (this.tap == true) ? "TAP" : result;

					if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
					if (this.keys.length == 0) {
						this.keys = this.orig_keys;
						this.code(link);
					}
				}
			}
		}

		typeof callback === "string" && konami.load(callback);
		if (typeof callback === "function") {
			konami.code = callback;
			konami.load();
		}

		return konami;
	};