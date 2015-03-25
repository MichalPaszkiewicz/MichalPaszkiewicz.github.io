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
		date: new Date()
	};
	
	//hands settings
	self.hands = {
		secondHand:{
			length: 1, 
			width: 1, 
			percentile:function(){
				return (self.options.date.getSeconds() + self.options.date.getMilliseconds() / 1000) / 60;
			}},
		minuteHand:{
			length: 0.9, 
			width: 5, 
			percentile:function(){
				return (self.options.date.getMinutes() + self.options.date.getSeconds() / 60) / 60;
			}},
		hourHand:{
			length: 0.5, 
			width: 10, 
			percentile:function(){
				return (self.options.date.getHours() + self.options.date.getMinutes() / 60) / 12;
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
		if(name == null)
		{
			if(defaultName == null)
			{
				throw new Error("No value set for this option.");
			}
			return (typeof self.options[defaultName] == "function") ? self.options[defaultName]() : self.options[defaultName];
		}
		return (typeof self.options[name] == "function") ? self.options[name]() : self.options[name];
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
		
		self.options.date = new Date();
		
		var directionCoefficient = 1;
	
		//draw all hands
		for (var key in self.hands) {
			if (self.hands.hasOwnProperty(key)) {
				var tempTheta = directionCoefficient * self.hands[key].percentile() * 2 * Math.PI - Math.PI / 2;
				var tempRadius = radius * self.hands[key].length;
				drawHand(x, y, tempRadius, tempTheta, self.hands[key].width);
			}
		}
			
		//centerDot
		self.context.beginPath();
		self.context.arc(x,y,20,0,2*Math.PI);
		self.context.fill();
		self.context.stroke();
	
		self.context.beginPath();
		self.context.arc(x,y,5,0,2*Math.PI);
		self.context.clip();
		self.context.clearRect(0,0,canvas.width, canvas.height);
	
		window.requestAnimationFrame(self.update);
	};

	self.start = function(){
		self.update();
	};
	
	return self;
}
		