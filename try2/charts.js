			var w = 700;
			var h = 300;
			var padding = 40;
			
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
				console.log(data)
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
								.range([h - padding, 0]);
								
				xLabel = d3.scalePoint()
								.domain(["January","February","March", 
								"April", "May", "June", "July", "August",
							"September", "October", "November", "December", " "])
								.range([padding, w-padding])


				//Define axes
				xAxis = d3.axisBottom()
						   .scale(xLabel)
						   .ticks(11)

								
				
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
					.call(xAxis);

				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(" + padding + ",0)")
					.call(yAxis);

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

				// svg.append("text")
				// 	.attr("x", 20)
				// 	.attr("y", padding)
				// 	.text(function(row){
				// 		console.log(Object.keys(row))
				// 		// return d[city]
				// 	})
				
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
			