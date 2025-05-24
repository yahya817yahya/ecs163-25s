//===================================================//    
// ECS-163: HW2 Project
// Yahya Habibi (UC Davis)
//===================================================//
// This second script includes: dynamic bubble diagram
//===================================================//

var diameter,
	IDbyName = {},
	commaFormat = d3min.format(','),
	root,
	allOccupations = [],
	focus,
	focus0,
	k0,
	scaleFactor,
	barsDrawn = false,
	rotationText = [-14,4,23,-18,-10.5,-20,20,20,46,-30,-25,-20,20,15,-30,-15,-45,12,-15,-16,15,15,5,18,5,15,20,-20,-25]; //The rotation of each arc text	

function drawAll() {
	//===
	// Global variables
	//
	let dim = {
		'width': window.innerWidth-70,
		'height': window.innerHeight-70,
		'margin': 50,
		'x': 500,
		'y': 0,
		'id': 'chart3'
	};
	//let svgBubble = d3.select('#chart3').append('svg')  
	//	.attrs(dim);
	document.querySelector("#chart3").classList.add("right");
	const rectContainer = d3.select("#chart3"); // Assuming the SVG is within a container div

	//var width = Math.max($("#chart3").width(),350) - 20,
	//	height = (window.innerWidth < 768 ? width : window.innerHeight - 90);
	
		var width = 600,
		height = 600;

		
		//console.log(width);
		//console.log(height);

	var mobileSize = (window.innerWidth < 768 ? true : false);

	//=== 
	// SVG creation 
	//===

	let svgBubble = d3min.select("#chart3").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		 .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	//=== 
	// Scales creation 
	//===
	function getCircleColor(depth, name){
		if(depth == 0) return '	#6e7b8b';
		if(depth == 1) return '#77b5fe';
		if(depth == 2){
			if (name == "Q1")	{return '#e52b50';}
			if (name == "Q2")	{return '#9966cc';}
			if (name == "Q3")	{return '#fbceb1';}
			if (name == "Q4")	{return '#87a96b';}
			if (name == "Q5")	{return '#f4c2c2';}
			if (name == "Q6")	{return '#08e8de';}
			if (name == "Q7")	{return '#cdaa7d';}
			if (name == "Q8")	{return '#c95a49';}
			if (name == "Q9")	{return '#b2ffff';}
			if (name == "Q10")	{return '#cd9b1d';}
			if (name == "Q11")	{return '#faf0e6';}
			if (name == "Q12")	{return '#ace1af';}
		}
		else return '#1c1c1c';
	}

	
	diameter = Math.min(width*0.9, height*0.9);
	var pack = d3min.layout.pack()
		.padding(1)
		.size([diameter, diameter])
		.value(function(d) { return d.size; })
		.sort(function(d) { return d.ID; });

	
	//=== 
	// Create Bars (not enabled) 
	//===
	function drawBars() {
		
		var elementsPerBar = 7,
			barChartHeight = 0.7,
			barChartHeightOffset = 0.15;
			
		//Inside each wrapper create the complete bar chart
		d3min.selectAll(".barWrapperOuter")
			.each(function(d, i){ 	
				console.log("Before insertion point ID: ", this.id);
				console.log("Before insertion point d: ", d);
				if(this.id in dataById) {
					console.log("insertion point found: ", this.id);
					
					barsDrawn = true;
					
					//Save current circle data in separate variable	
					var current = d,
						currentId = this.id;
							  
					//Create a scale for the width of the bars for the current circle
					var barScale = d3min.scale.linear()
						//.domain([0,dataMax[dataById[this.id]].values]) //max value of bar charts in circle
						.domain([0,20]) //max value of bar charts in circle
						.range([0,(current.r)]); //don't make the max bar bigger than 0.7 times the radius minus the distance in between
					
					//Title inside circle
					d3min.select(this).append("text")
						.attr("class","innerCircleTitle")
						.attr("y", function(d, i) { 
							d.titleHeight = (-1 + 0.25) * current.r;
							return d.titleHeight; 
						})
						.attr("dy","0em")
						.text(function(d,i) { 
							console.log("d.name: ", d.name);
							return d.name; })
						.style("font-size", function(d) {
							//Calculate best font-size
							d.fontTitleSize = current.r / 4//this.getComputedTextLength() * 20;				
							return Math.round(d.fontTitleSize)+"px"; 
						});

					console.log("==> this", this);
				}//if
			});//each barWrapperOuter 
	}//drawBars

	//=== 
	// Create Legend
	//===
	var legendSizes = [10,20,30];

	function createLegend(scaleFactor) {

		d3min.select("#legendRowWrapper").style("opacity", 0);
		
		var width = $("#legendCircles").width(),
			height = legendSizes[2]*2*1.2;

		var	legendCenter = -10,
			legendBottom = height,
			legendLineLength = legendSizes[2]*1.3,
			textPadding = 5
			
		//Create SVG for the legend
		var svg = d3min.select("#legendCircles").append("svg")
			.attr("width", width)
			.attr("height", height)
		  .append("g")
			.attr("class", "legendWrapper")
			.attr("transform", "translate(" + width / 2 + "," + 0 + ")")
			.style("opacity", 0);
		
		//Draw the circles
		svgBubble.selectAll(".legendCircle")
			.data(legendSizes)
			.enter().append("circle")
			.attr('r', function(d) { return d; })
			.attr('class',"legendCircle")
			.attr('cx', legendCenter)
			.attr('cy', function(d) { return legendBottom-d; });
		//Draw the line connecting the top of the circle to the number
		svgBubble.selectAll(".legendLine")
			.data(legendSizes)
			.enter().append("line")
			.attr('class',"legendLine")
			.attr('x1', legendCenter)
			.attr('y1', function(d) { return legendBottom-2*d; })
			.attr('x2', legendCenter + legendLineLength)
			.attr('y2', function(d) { return legendBottom-2*d; });	
		//Place the value next to the line
		svgBubble.selectAll(".legendText")
			.data(legendSizes)
			.enter().append("text")
			.attr('class',"legendText")
			.attr('x', legendCenter + legendLineLength + textPadding)
			.attr('y', function(d) { return legendBottom-2*d; })
			.attr('dy', '0.3em')
			.text(function(d) { return commaFormat(Math.round(scaleFactor * d * d / 10)*10); });
			
	}//createLegend

	//=== 
	// Graphs initialization
	//===
	//Create the bars inside the circles
	function runCreateBars() {
		// create a deferred object
		var r = $.Deferred();

		var counter = 0;
		while(!barsDrawn & counter < 10) { 
			drawBars();
			counter  = counter+1;
			};

		setTimeout(function () {
			// and call `resolve` on the deferred object, once you're done
			r.resolve();
		}, 100);
		// return the deferred object
		return r;
	};

	//Call to the zoom function to move everything into place
	function runAfterCompletion() {
	  //createLegend(scaleFactor);
	  focus0 = root;
	  k0 = 1;
	  d3min.select("#loadText").remove();
	  zoomTo(root);
	};

		// Tooltip message
	function getTooltipMsg(value) {
		console.log("====> value: ", value);
	
		if (value == "Q1") return "Q1. Better Fitness Routine";
		if (value == "Q2") return "Q2. Motivation to Exercise";
		if (value == "Q3") return "Q3. Enjoyable Exercise";
		if (value == "Q4") return "Q4. Connection to Community";
		if (value == "Q5") return "Q5. Meeting Fitness Goals";
		if (value == "Q6") return "Q6. Better Overall Health";
		if (value == "Q7") return "Q7. Improved Sleep Habits";
		if (value == "Q8") return "Q8. Overall Well-being";
		if (value == "Q9") return "Q9. Exercise More";
		if (value == "Q10") return "Q10. Buy Fitness Products";
		if (value == "Q11") return "Q11. Join Gym Class";
		if (value == "Q12") return "Q12. Change Diet";
	
		return "";
	}
	//Hide the tooltip when the mouse moves away
	function removeTooltip () {
	  $('.popover').each(function() {
		$(this).remove();
	  }); 
	}
	//Show the tooltip on the hovered over slice
	function showTooltip (d) {
	  $(this).popover({
		placement: 'auto top',
		container: '#chart3',
		trigger: 'manual',
		html : true,
		content: function() { 
		  //return "<p class='nodeTooltip'>" + d.name + "</p>"; }
		  return "<p class='nodeTooltip'>" + getTooltipMsg(d.name) + "</p>"; }
	  });
	  $(this).popover('show')
	}

	//=== 
	// Readinf and formatting Data
	//===
	
	//Global variables
	var data,
		dataMax,
		dataById = {}; 
	
	data = [
		{"key": "1.1", "values": []},
		{"key": "1.2", "values": []},
		{"key": "1.3", "values": []},
		{"key": "1.4", "values": []},
		{"key": "1.5", "values": []},
		{"key": "2.1", "values": []},
		{"key": "2.2", "values": []},
		{"key": "2.3", "values": []},
		{"key": "2.4", "values": []},
		{"key": "2.5", "values": []},
		{"key": "3.1", "values": []},
		{"key": "3.2", "values": []},
		{"key": "3.3", "values": []},
		{"key": "3.4", "values": []},
		{"key": "3.5", "values": []},
		{"key": "4.1", "values": []},
		{"key": "4.2", "values": []},
		{"key": "4.3", "values": []},
		{"key": "4.4", "values": []},
		{"key": "4.5", "values": []},
		{"key": "5.1", "values": []},
		{"key": "5.2", "values": []},
		{"key": "5.3", "values": []},
		{"key": "5.4", "values": []},
		{"key": "5.5", "values": []},
		{"key": "6.1", "values": []},
		{"key": "6.2", "values": []},
		{"key": "6.3", "values": []},
		{"key": "6.4", "values": []},
		{"key": "6.5", "values": []},
		{"key": "7.1", "values": []},
		{"key": "7.2", "values": []},
		{"key": "7.3", "values": []},
		{"key": "7.4", "values": []},
		{"key": "7.5", "values": []}
	];

	dataMax = [
		{"key": "1.1", "values": 80},
		{"key": "1.2", "values": 60},
		{"key": "1.3", "values": 30},
		{"key": "1.4", "values": 20},
		{"key": "1.5", "values": 100},
		{"key": "2.1", "values": 60},
		{"key": "2.2", "values": 70},
		{"key": "2.3", "values": 50},
		{"key": "2.4", "values": 40},
		{"key": "2.5", "values": 80},
		{"key": "3.1", "values": 50},
		{"key": "3.2", "values": 90},
		{"key": "3.3", "values": 40},
		{"key": "3.4", "values": 50},
		{"key": "3.5", "values": 70},
		{"key": "4.1", "values": 80},
		{"key": "4.2", "values": 20},
		{"key": "4.3", "values": 30},
		{"key": "4.4", "values": 40},
		{"key": "4.5", "values": 50},
		{"key": "5.1", "values": 60},
		{"key": "5.2", "values": 70},
		{"key": "5.3", "values": 100},
		{"key": "5.4", "values": 80},
		{"key": "5.5", "values": 30},
		{"key": "6.1", "values": 40},
		{"key": "6.2", "values": 50},
		{"key": "6.3", "values": 60},
		{"key": "6.4", "values": 70},
		{"key": "6.5", "values": 80},
		{"key": "7.1", "values": 100},
		{"key": "7.2", "values": 70},
		{"key": "7.3", "values": 60},
		{"key": "7.4", "values": 40},
		{"key": "7.5", "values": 50}
	];
	 

	dataById = {
		"1.1": 0,
		"1.2": 1,
		"1.3": 2,
		"1.4": 3,
		"1.5": 4,
		"2.1": 5,
		"2.2": 6,
		"2.3": 7,
		"2.4": 8,
		"2.5": 9,
		"3.1": 10,
		"3.2": 11,
		"3.3": 12,
		"3.4": 13,
		"3.5": 14,
		"4.1": 15,
		"4.2": 16,
		"4.3": 17,
		"4.4": 18,
		"4.5": 19,
		"5.1": 20,
		"5.2": 21,
		"5.3": 22,
		"5.4": 23,
		"5.5": 24,
		"6.1": 25,
		"6.2": 26,
		"6.3": 27,
		"6.4": 28,
		"6.5": 29,
		"7.1": 30,
		"7.2": 31,
		"7.3": 32,
		"7.4": 33,
		"7.5": 34,
	};

	
	
	console.log("data: ",data);
	console.log("dataMax: ",dataMax);
	console.log("dataById: ",dataById);
	
	console.log("dataById: ",dataById);

	
	
	//=== 
	// Getting Data for creating the circles
	//===
	const myArray = 
        {
            name: "Top", children: [ 
                {name: "All", children: [
                { "name": "Q5", "ID": "1.1" , "size":28, "ratio": Math.round(100*(28/28).toFixed(2))},
                { "name": "Q9", "ID": "1.2" , "size":25, "ratio": Math.round(100*(25/28).toFixed(2))},
                { "name": "Q12", "ID": "1.3" , "size":25, "ratio": Math.round(100*(25/28).toFixed(2))},
                { "name": "Q1", "ID": "1.4" , "size":24, "ratio": Math.round(100*(24/28).toFixed(2))},
                { "name": "Q2", "ID": "1.5" , "size":24, "ratio": Math.round(100*(24/28).toFixed(2))}]},
                {name: "U18", children: [
                { "name": "Q1", "ID": "2.1" , "size":5, "ratio": Math.round(100*5/50) },
                { "name": "Q2", "ID": "2.2" , "size":5, "ratio": Math.round(100*5/5) },
                { "name": "Q3", "ID": "2.3" , "size":5, "ratio": Math.round(100*5/5) },
                { "name": "Q4", "ID": "2.4" , "size":5, "ratio": Math.round(100*5/5) },
                { "name": "Q6", "ID": "2.5" , "size":4, "ratio": Math.round(100*4/5) }]},
                {name: "18-24", children: [
                { "name": "Q1", "ID": "3.1" , "size":10, "ratio": Math.round(100*10/10)},
                { "name": "Q2", "ID": "3.2" , "size":9, "ratio": Math.round(100*9/10) },
                { "name": "Q3", "ID": "3.3" , "size":9, "ratio": Math.round(100*9/10) },
                { "name": "Q4", "ID": "3.4" , "size":9, "ratio": Math.round(100*9/10) },
                { "name": "Q8", "ID": "3.5" , "size":8, "ratio": Math.round(100*8/10) }]},
                {name: "25-34", children: [
                { "name": "Q1", "ID": "4.1" , "size":6, "ratio": Math.round(100*6/6) },
                { "name": "Q2", "ID": "4.2" , "size":6, "ratio": Math.round(100*6/6) },
                { "name": "Q3", "ID": "4.3" , "size":6, "ratio": Math.round(100*6/6) },
                { "name": "Q4", "ID": "4.4" , "size":6, "ratio": Math.round(100*6/6) },
                { "name": "Q6", "ID": "4.5" , "size":4, "ratio": Math.round(100*4/6) }]},
                {name: "35-44", children: [
                { "name": "Q1", "ID": "5.1" , "size":4, "ratio": Math.round(100*4/4) },
                { "name": "Q2", "ID": "5.2" , "size":3, "ratio": Math.round(100*3/4) },
                { "name": "Q3", "ID": "5.3" , "size":3, "ratio": Math.round(100*3/4) },
                { "name": "Q4", "ID": "5.4" , "size":2, "ratio": Math.round(100*2/4) },
                { "name": "Q7", "ID": "5.5" , "size":2, "ratio": Math.round(100*2/4) }]},
                {name: "45-54", children: [
                { "name": "Q1", "ID": "6.1" , "size":3, "ratio": Math.round(100*3/3) },
                { "name": "Q2", "ID": "6.2" , "size":3, "ratio": Math.round(100*3/3) },
                { "name": "Q3", "ID": "6.3" , "size":2, "ratio": Math.round(100*2/3) },
                { "name": "Q4", "ID": "6.4" , "size":2, "ratio": Math.round(100*2/3) },
                { "name": "Q9", "ID": "6.5" , "size":24, "ratio": Math.round(100*2/3)}]},
                {name: "55-64", children: [
                { "name": "Q1", "ID": "7.1" , "size":2, "ratio": Math.round(100*2/2) },
                { "name": "Q2", "ID": "7.2" , "size":2, "ratio": Math.round(100*2/2) },
                { "name": "Q3", "ID": "7.3" , "size":2, "ratio": Math.round(100*2/2) },
                { "name": "Q4", "ID": "7.4" , "size":1, "ratio": Math.round(100*1/2) },
                { "name": "Q10", "ID": "7.5" , "size":1, "ratio": Math.round(100*1/2) }]}
            ]};
            
        console.log("myArray: ", myArray);
    
        const jsonString = JSON.stringify(myArray);
        console.log("jsonString: ", jsonString);

        const jsonData = JSON.parse(jsonString);
        console.log("jsonData: ", jsonData);

	
		dataset = jsonData;
		var nodes = pack.nodes(dataset);
		root = dataset;
		focus = dataset;		

			//=== 
			// Creating the wrapper for every age group
			//===
		var plotWrapper = svgBubble.selectAll("g")
			.data(nodes)
			.enter().append("g")
			.attr("class", "plotWrapper")
			.attr("id", function(d,i) {
				allOccupations[i] = d.name;
				if (d.ID != undefined) {
					return "plotWrapper_" + d.ID;
				}
				else return "plotWrapper_node";
			});
		console.log("plotWrapper: ", plotWrapper);
		console.log("allOccupations: ", allOccupations);

		if(!mobileSize) {
			plotWrapper.filter(function(d) { return typeof d.children === "undefined"; })
					.on("mouseover", showTooltip)
					.on("mouseout", removeTooltip);
		}//if
		
			//=== 
			// Create the circles
			//===
		var circle = plotWrapper.append("circle")
				.attr("id", "nodeCircle")
				.attr("class", function(d,i) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
				//.style("fill", function(d) { return d.children ? colorCircle(d.depth) : null; })
				.style("fill", function(d) { 
					console.log("d.depth(): ", d.depth);
					console.log("d: ", d);
					//return colorCircle(d.depth);
					return getCircleColor(d.depth, d.name);
				 })
				//.style("fill", "blue")
				.attr("r", function(d) { 
					if(d.ID === "1.1.1.1") scaleFactor = d.value/(d.r*d.r); 
					return d.r; 
				})
				.on("click", function(d) { if (focus !== d) zoomTo(d); else zoomTo(root); });
						
				//=== 
				// Draw parent circle
				//===
		var overlapNode = [];
		circle
			.filter(function(d,i) { return d3min.select(this).attr("class") === "node"; })
			.each(function(d,i) {
					overlapNode[i] = {
						name: d.name,
						depth: d.depth,
						r: d.r,
						x: d.x,
						y: d.y
					}
			});
		
				//=== 
				// Create wrapper arcs and text
				//===
		var hiddenArcWrapper = svgBubble.append("g")
			.attr("class", "hiddenArcWrapper")
			.style("opacity", 0);
			//Create the arcs on which the text can be plotted - will be hidden
		var hiddenArcs = hiddenArcWrapper.selectAll(".circleArcHidden")
			.data(overlapNode)
		   .enter().append("path")
			.attr("class", "circleArcHidden")
			.attr("id", function(d, i) { return "circleArc_"+i; })
			.attr("d", function(d,i) { return "M "+ -d.r +" 0 A "+ d.r +" "+ d.r +" 0 0 1 "+ d.r +" 0"; })
			.style("fill", "none");
			//Append the text to the arcs
		var arcText = hiddenArcWrapper.selectAll(".circleText")
			.data(overlapNode)
		   .enter().append("text")
			.attr("class", "circleText")
			.style("font-size", function(d) {
					//Calculate best font-size
				d.fontSize = d.r / 6;				
				return Math.round(d.fontSize)+"px"; 
			})
		   .append("textPath")
			.attr("startOffset","50%")
			.attr("xlink:href",function(d,i) { return "#circleArc_"+i; })
			.text(function(d) { return d.name.replace(/ and /g, ' & '); });
			
			//=== 
			// Draw Bar charts (not enabled)
			//===
			//Create a wrapper for everything inside a leaf circle
		var barWrapperOuter = plotWrapper.append("g")
				.attr("id", function(d) {
					console.log("Inside barWrapperOuter d: ", d);
					console.log("Inside barWrapperOuter ID: ", d.ID);
					if (d.ID != undefined) return d.ID;
					else return "node";
				})
				.style("opacity", 0)
				.attr("class", "barWrapperOuter");
		
		//=== 
		// Create the seach box
		//===
			//Create new options
		var options = allOccupations;
		var select = document.getElementById("searchBox"); 
			//Put new options into select box
		for(var i = 0; i < options.length; i++) {
			if(	(options[i] == "All") ||
				(options[i] == "U18") ||
				(options[i] == "18-24") ||
				(options[i] == "25-34") ||
				(options[i] == "35-44") ||
				(options[i] == "45-54") ||
				(options[i] == "55-64")	
			){
				var opt = options[i];
				var el = document.createElement("option");
				el.textContent = opt;
				el.value = opt;
				select.appendChild(el);
			}
		}

			//Create combo box
		$('.combobox').combobox();
		
			// call runCreateBars and use the `done` method
			// with `runAfterCompletion` as it's parameter
		setTimeout(function() { runCreateBars().done(runAfterCompletion); }, 100);
}//drawAll

	//=== 
	// Function: search box event
	//===
function searchEvent(occupation) {	
	//If the occupation is not equal to the default - mouseover function
	if (occupation !== "" & typeof occupation !== "undefined") {
		d3min.selectAll("#nodeCircle")
			.filter(function(d,i) { return d.name === occupation; })
			.each(function(d,i) { zoomTo(d); });
	} else {
		zoomTo(root);
	}//else
}//searchEvent

	//=== 
	// Function: Zoom function
	//===
	//Change the sizes of everything inside the circle and the arc texts
function zoomTo(d) {
	
	focus = d;
	var v = [focus.x, focus.y, focus.r * 2.05],
		k = diameter / v[2]; 
		
		//Remove the tspans of all the titles
	d3min.selectAll(".innerCircleTitle").selectAll("tspan").remove();
			
		//Hide the bar charts, then update them
	d3min.selectAll(".barWrapperOuter").transition().duration(0).style("opacity",0);
	
		//Hide the node titles, update them
	d3min.selectAll(".hiddenArcWrapper")
		.transition().duration(0)
		.style("opacity",0)
		.call(endall, changeReset);

	function changeReset() {
		//Save the current ID of the clicked on circle
		//If the clicked on circle is a leaf, strip off the last ID number so it becomes its parent ID
		var currentID = 0;
		//FXIME (typeof IDbyName[d.name] !== "undefined" ? IDbyName[d.name] : d.ID.replace(/\.([^\.]*)$/, ""));
		
			//Update the arcs with the new radii	
		d3min.selectAll(".hiddenArcWrapper").selectAll(".circleArcHidden")
			.attr("d", function(d,i) { return "M "+ (-d.r*k) +" 0 A "+ (d.r*k) +" "+ (d.r*k) +" 45 0 1 "+ (d.r*k) +" 0"; })
			.attr("transform", function(d,i) { 
				return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")rotate("+ rotationText[i] +")"; 
			});
			
			//Save the names of the circle itself and first children
		var kids = [d.name];
		if(typeof d.children !== "undefined") {
			for(var i = 0; i < d.children.length; i++) {
				kids.push(d.children[i].name)
			};	
		}//if	
	
			//Update the font sizes and hide those not close the the parent
		d3min.selectAll(".hiddenArcWrapper").selectAll(".circleText")
			.style("font-size", function(d) { return Math.round(d.fontSize * k)+'px'; })
			.style("opacity", function(d) { return $.inArray(d.name, kids) >= 0 ? 1 : 0; });
					
			//The title inside the circles
		d3min.selectAll(".innerCircleTitle")
			.style("display",  "none")
			//.style("display",  "block")
			//If the font-size becomes to small do not show it or if the ID does not start with currentID
			//.filter(function(d) { return Math.round(d.fontTitleSize * k) > 4 & d.ID.lastIndexOf(currentID, 0) === 0; })
			//.style("display",  null)
			.style("display",  "block")
			.attr("y", function(d) { return d.titleHeight * k; })
			.style("font-size", function(d) { return Math.round(d.fontTitleSize * k)+'px'; })
			//.style("font-size", '24px')
			.text(function(d,i) { console.log("Ratio d:", d);
				return "(in participents top 5)" + " | "+ d.name + " : " + commaFormat(d.ratio)+"% | "; })
				//return "Overall Ratio "+commaFormat(d.size)+" (in %) | "+ d.name; })
				//return "Overall Ratio "+commaFormat(d.size)+ Math.round(d.ratio) + " (%)"; })
			.each(function(d) { wrap(this, k * d.textLength); });
			
			//Rescale the bars
		d3min.selectAll(".innerBarWrapper").selectAll(".innerBar")
			.style("display",  "none")
			//If the circle (i.e. height of one bar) becomes to small do not show the bar chart
			.filter(function(d) { return Math.round(d.height * k) > 2 & d.ID.lastIndexOf(currentID, 0) === 0; })
			.style("display",  null)
			.attr("x", function(d) { return d.totalOffset * k; })
			.attr("y", function(d) { return d.barHeight * k;})

			.attr("width", function(d)  {return d.width * k;  })
			.attr("height", function(d) {return d.height * k; });
			
			//Rescale the axis text
		d3min.selectAll(".innerBarWrapper").selectAll(".innerText")
			.style("display",  "none")
			//If the font-size becomes to small do not show it
			.filter(function(d) { return Math.round(d.fontSize * k) > 4 & d.ID.lastIndexOf(currentID, 0) === 0; })
			.style("display",  null)
			.style("font-size", function(d) { return Math.round(d.fontSize * k)+'px'; })
			.attr("dx", function(d) { return d.dx * k; })
			.attr("x", function(d) { return d.totalOffset * k; })
			.attr("y", function(d) { return d.barHeight * k; });
			
			//Rescale and position the values of each bar
		d3min.selectAll(".innerBarWrapper").selectAll(".innerValue")
			.style("display",  "none")
			//If the font-size becomes to small do not show it
			.filter(function(d) { return Math.round(d.fontSizeValue * k) > 4 & d.ID.lastIndexOf(currentID, 0) === 0; })
			.style("display",  null)
			.style("font-size", function(d) { return Math.round(d.fontSizeValue * k)+'px'; })
			.attr("x", function(d) { return d.totalOffset * k; })
			.attr("y", function(d) { return d.barHeight * k; })
			//Recalculate the left/right side location of the value because the this.getBBox().width has changed
			.each(function(d) { d.valueWidth = this.getBBox().width; })
			.attr("dx", function(d) {
				if(d.valueWidth*1.1 > (d.width - d.r * 0.03)*k) d.valuePos = "left"; 
				else d.valuePos = "right";
				
				if(d.valuePos === "left") d.valueLoc = (d.width + d.r * 0.03)*k;
				else d.valueLoc = (d.width - d.r * 0.03)*k;
				return d.valueLoc; 
			})
			.style("text-anchor", function(d) { return d.valuePos === "left" ? "start" : "end"; })
			.style("fill", function(d) { return d.valuePos === "left" ? "#333333" : "white"; }); 
		
		setTimeout(function() {
			changeLocation(d,v,k); 
		}, 50);	
	
	}//changeReset
			
}//zoomTo

	//=== 
	// Function: change location (called by the zoom function)
	//===
function changeLocation(d, v, k) {
		//Only show the circle legend when not at the leafs
	if(typeof d.children === "undefined") {
		d3min.select("#legendRowWrapper").style("opacity", 0);
		d3min.select(".legendWrapper").transition().duration(1000).style("opacity", 0);
	} else {
		d3min.select("#legendRowWrapper").style("opacity", 1);
		d3min.select(".legendWrapper").transition().duration(1000).style("opacity", 1);
	}//else
		
	
	// Overal transform and resize
		//Calculate the duration
			//If they are far apart, take longer
			//If it's a big zoom in/out, take longer
			//var distance = Math.sqrt(Math.pow(d.x - focus0.x,2) + Math.pow(d.y - focus0.y,2)),
			//	distancePerc = distance/diameter,
			//	scalePerc = Math.min(Math.max(k,k0)/Math.min(k,k0), 50)/50;
			//	duration = Math.max(1500*distancePerc + 1500, 1500*scalePerc + 1500);
	var	duration = 1750;
		
		//Transition the circles to their new location
	d3min.selectAll(".plotWrapper").transition().duration(duration)
		.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
		
		//Transition the circles to their new size
	d3min.selectAll("#nodeCircle").transition().duration(duration)
		.attr("r", function(d) {
			if(d.ID === "1.1.1.1") scaleFactor = d.value/(d.r*d.r*k*k); 
			return d.r * k; 
		})
		.call(endall, function() {
			d3min.select(".legendWrapper").selectAll(".legendText")
				.text(function(d) { return commaFormat(Math.round(scaleFactor * d * d / 10)*10); });
		});	

	setTimeout(function() {
			//Hide the node titles, update them at once and them show them again
		d3min.selectAll(".hiddenArcWrapper")
			.transition().duration(1000)
			.style("opacity",1);
			
			//Hide the bar charts, then update them at once and show the magain	
		d3min.selectAll(".barWrapperOuter")
			.transition().duration(1000)
			.style("opacity",1);
			
		focus0 = focus;
		k0 = k;
	},duration);
	
}//changeSizes

	//=== 
	// Function: wrap SVG long text for better display
	//===
function wrap(text, width) {
	//console.log(d3min.select(text));
	var text = d3min.select(text),
		words = text.text().split(/\s+/).reverse(),
		currentSize = +(text.style("font-size")).replace("px",""),
		word,
		line = [],
		lineNumber = 0,
		lineHeight = 1.2, // ems
		extraHeight = 0.2,
		y = text.attr("y"),
		dy = parseFloat(text.attr("dy")),
		//First span is different - smaller font
		tspan = text.text(null)
			.append("tspan")
			.attr("class","subTotal")
			.attr("x", 0).attr("y", y/8)
			.attr("dy", dy + "em")
			.style("font-size", (Math.round(currentSize*0.5) <= 5 ? 0 : Math.round(currentSize*0.4))+"px");
	while (word = words.pop()) {
	  line.push(word);
	  tspan.text(line.join(" "));
	  if (tspan.node().getComputedTextLength() > width | word === "|") {
		if (word = "|") word = "";
		line.pop();
		tspan.text(line.join(" "));
		line = [word];
		tspan = text.append("tspan")
					.attr("x", 0).attr("y", y)
					.attr("dy", ++lineNumber * lineHeight + extraHeight + dy + "em")
					.text(word);
	  }//if
	}//while
}//wrap

	//=== 
	// Function: end transition
	//===
	//Called only after the total transition ends
function endall(transition, callback) { 
	var n = 0; 
	transition 
		.each(function() { ++n; }) 
		.each("end", function() { if (!--n) callback.apply(this, arguments); }); 
}//endall