			var w = 700;
			var h = 300;
			var padding = 50;
			
			var dataset, xScale, yScale, xAxis, yAxis, line, dangerLine;  //Empty, for now

			//For converting Dates to strings
			var formatTime = d3.timeFormat("%Y");

			//Function for converting CSV values from strings to Dates and numbers
			// var rowConverter = function(d) {
			// 	return {
			// 		// date: new Date(+d.year, (+d.month - 1)),  //Make a new Date object for each year + month
			// 		Phoenix: parseFloat(d.Phoenix),  //Convert from string to float
			// 		value: parseFloat(d.value)
			// 	};
			// }

			//Load in data
			
			function drawChart(city) { 
			d3.csv("Air-Quality.csv") .then(function(data) {
				// console.log(data)
// console.log(data)
				d3.selectAll(".chart")
							 .remove()
				var dataset = data;

				//Print data to console as table, for verification
				//console.table(dataset, ["date", "average"]);

				//Create scale functions
				xScale = d3.scaleLinear()
							   .domain([0,dataset.length])
							   .range([padding, w-padding]);
							   
				

				yScale = d3.scaleLinear()
								.domain([
									d3.min(dataset, function(d) 
									{ return parseFloat(d[city]) }),
									d3.max(dataset, function(d) 
									{ return parseFloat(d[city]); })
								])
								.range([h - padding, 20]);
								
				xLabel = d3.scalePoint()
								.domain(["January","February","March", 
								"April", "May", "June", "July", "August",
							"September", "October", "November", "December", " "])
								.range([padding, w-padding])
								
								
								


				//Define axes
				xAxis = d3.axisBottom()
						   .scale(xLabel)
						   

								
				
						   // .tickFormat(formatTime);

				//Define Y axis
				yAxis = d3.axisLeft()
						   .scale(yScale)
						   .ticks(10);

				//Define line generators
				line = d3.line()
							.defined(function(d) { return parseFloat(d[city]) })
							.x(function(d,i) { return xScale(i); })
							.y(function(d) {  return yScale(parseFloat(d[city]));
							
							 });



				//Create SVG element
				var svg = d3.select("body")
							.append("svg")
							 .attr("class", "chart")
							.attr("width", w)
							.attr("height", h);
							
				var months = [1,2,3,4,5,6,7,8,9,10,11,12]

				//Create lines
				svg.append("path")
					.datum(dataset)
					.attr("class", "line")
					.attr("d", line)
					.attr("fill", "none")
					.attr("stroke", "#3A506B")
					.attr("stroke-width",.5)
;



				//Create axes
				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(0," + (h - padding) + ")")
					.call(xAxis)
					;

				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(" + padding + ",0)")
					.call(yAxis);

					
					svg.selectAll("rect")
						.data(months)
						.enter()
						.append("rect")
						.attr("x", function(d){
							
							return (d*51.6)-11;
						})
						.attr("y", 0)
						.attr("width", 51.6)
						.attr("height", 260)
						.attr("opacity", 0)
						.attr("class", function(d){
							return "month_"+ d
						})
						.on("mouseover", function(d){
							var monthSelect = d3.select(this).attr("class")
							
							d3.selectAll("."+monthSelect).filter("circle")
							// .attr("fill", function(){
// 								if ("fill" == "blue")
// 									{return "black"}
// 								else {return "orange"}
// 							})
						.attr("opacity", .9)
							
						})
						
						.on("mouseout", function(d){
							var monthSelect = d3.select(this).attr("class")
							d3.selectAll("."+monthSelect).filter("circle")
							// .attr("fill", function(){
	// 							if ("fill" == "black")
	// 								{return "blue"}
	// 							else {return "#A72608"}
	// 						})
							.attr("opacity",.4)
							
						})
						

				//Draw 350 ppm line
				svg.append("line")
					.attr("class", "line safeLevel")
					.attr("x1", w-padding)
					.attr("x2", padding)
					.attr("y1", yScale(100))
					.attr("y2", yScale(100))
					.attr("stroke", "red")
					.attr("stroke-width", ".25")
;

				svg.append("text")
					.attr("x", 55)
					.attr("y", 12)
					.text(city + " Air Quality, 2016")
					.attr("font-family", "sans-serif")
					.attr("font-style", "italic")
					.attr("fill", "#565656")

				svg.append("text")
					.attr("x", 55)
					.attr("y", 28)
					.attr("font-size", 10)
					.text("Roll over the graph to highlight each month's fires on the map.")
					.attr("font-family", "sans-serif")
					.attr("font-style", "italic")
					.attr("fill", "#565656")
				
				//Label 350 ppm line
				svg.append("text")
					.attr("class", "dangerLabel")
					.attr("x", padding + 20)
					.attr("y", yScale(100) - 7)
					.text("Unhealthy Air Quality Index")
					.attr("font-family", "sans-serif")
					.attr("font-size", "10")
					.attr("fill", "red");


			});
		}
			