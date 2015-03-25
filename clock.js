Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

Date.prototype.addMinutes = function(m){
	this.setMinutes(this.getMinutes()+m);
	return this;
}

Date.prototype.addSeconds = function(s){
	this.setSeconds(this.getSeconds()+s);
	return this;
}

var clock = function(id, options){
	var self = this;

	//initialise canvas && context
	self.canvas = document.getElementById(id);
	self.context = canvas.getContext("2d");

	//default options
	self.options = {
		radius: function(){ return Math.min(canvas.height, canvas.width) / 2 },
		x: function(){ return canvas.width / 2 },
		y: function(){ return canvas.height / 2 },
		colour: "red",
		lineColour: function(){ return self.options.colour; },
		fillColour: function(){  return self.options.colour; },
		centreCircle: 20,
		centreCircleColour: "red",
		centreCircleCutout: 5,
		date: new Date(),
		addHours: 0,
		addMinutes: 0,
		addSeconds: 0,
		directionCoefficient: 1
	};
	
	//hands settings
	self.hands = {
		secondHand:{
			length: 1, width: 1, 
			percentile:function(){
				return (getValue("date", function(){return new Date()} ).getSeconds() + getValue("date").getMilliseconds() / 1000) / 60;
			}},
		minuteHand:{
			length: 0.9, width: 5, 
			percentile:function(){
				return (getValue("date", function(){return new Date()} ).getMinutes() + getValue("date").getSeconds() / 60) / 60;
			}},
		hourHand:{
			length: 0.5, width: 10, 
			percentile:function(){
				return (getValue("date", function(){return new Date()} ).getHours() + getValue("date").getMinutes() / 60) / 12;
			}}
	}
	
	//set specified options
	for (var key in options) {
		if (options.hasOwnProperty(key)) {
			self.options[key] = options[key];
		}
	}
	
	//get function - gets a function, otherwise value.
	var getValue = function(name, defaultName){
		if(name == null){
			if(defaultName == null){
				throw new Error("No value set for this option.");
			}
			if(typeof defaultName == "function"){
				return defaultName();
			}
			return (typeof self.options[defaultName] == "function") ? self.options[defaultName]() : self.options[defaultName];
		}
		if(self.options == null){
			throw new Error("Someone has deleted the clock's options. Uh-oh!");
		}
		if(typeof self.options[name] == "function"){
			var result = self.options[name]();
			if(result != null){
				return result;
			}
			if(typeof defaultName == "function"){
				return defaultName();
			}
			return (typeof self.options[defaultName] == "function") ? self.options[defaultName]() : self.options[defaultName];
		}
		else {
			return self.options[name];
		}
	}
	
	//for drawing a handleEvent
	var drawHand = function(x, y, radius, theta, lineWidth){
		self.context.lineWidth = (lineWidth != null) ? lineWidth : 1;
		self.context.beginPath();
		self.context.moveTo(x,y);			
		self.context.lineTo(x + radius * Math.cos(theta),y + radius * Math.sin(theta));
		self.context.stroke();
		self.context.lineWidth = 1;	
	}
	
	//update the date, change time zone etc.
	var updateDate = function(){
		//update date;		
		self.options.date = new Date();
		self.options.date.addHours(getValue("addHours", function(){return 0;}));
		self.options.date.addMinutes(getValue("addMinutes", function(){return 0;}));
		self.options.date.addSeconds(getValue("addSeconds", function(){return 0;}));
	}
	
	//updates and draws clock			
	self.update = function(){
		self.canvas.height = self.canvas.parentNode.offsetHeight;
		self.canvas.width = canvas.parentNode.offsetWidth;
		
		var radius = getValue("radius");
		var x = getValue("x");
		var y = getValue("y");
		self.context.strokeStyle = getValue("lineColour");
		self.context.fillStyle = getValue("fillColour");
		
		self.context.clearRect(0,0, canvas.width, canvas.height);

		//outer circle
		self.context.beginPath();
		self.context.arc(x,y,radius,0,2*Math.PI);
		self.context.stroke();
		
		//
		
		updateDate();
		
		var directionCoefficient = getValue("directionCoefficient", function(){return 1;});
	
		//draw all hands
		for (var key in self.hands) {
			if (self.hands.hasOwnProperty(key)) {
				var tempTheta = directionCoefficient * self.hands[key].percentile() * 2 * Math.PI - Math.PI / 2;
				var tempRadius = radius * self.hands[key].length;
				drawHand(x, y, tempRadius, tempTheta, self.hands[key].width);
			}
		}
			
		//centreCircle
		self.context.fillStyle = getValue("centreCircleColour", "colour");
		self.context.beginPath();
		self.context.arc(x,y,getValue("centreCircle"),0,2*Math.PI);
		self.context.fill();
		self.context.stroke();
	
		self.context.beginPath();
		self.context.arc(x,y,getValue("centreCircleCutout"),0,2*Math.PI);
		self.context.clip();
		self.context.clearRect(0,0,canvas.width, canvas.height);
	
		window.requestAnimationFrame(self.update);
	};

	self.start = function(){
		self.update();
	};
	
	return self;
}
		