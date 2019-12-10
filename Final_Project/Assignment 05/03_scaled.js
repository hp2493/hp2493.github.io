
			//Width and height
			// var w = 700;
			// var h = 700;

			//Define map projection
			var projection = d3.geoAlbers()
							.center([0,40.694])
							.rotate([74.0,0])
							.parallels([39,41])
							.translate([w/2,h/2])
							.scale(80000) // scale factor
			
			// d3.geoAlbersUsa()
// 							   .translate([-4000, 1100])
// 							   .scale([15000]);
//


			//Define path generator
			var path = d3.geoPath()
							 .projection(projection);
							 
		//Define quantize scale to sort data values into buckets of color
		var color = d3.scaleOrdinal()
							.domain(["01", "02", "03", "10", "11", "12", "20", "21", "22"])
							.range(["#e8e8e8", "#b5c0da", "#6c83b5",
      "#b8d6be", "#90b2b3", "#567994",
      "#73ae80", "#5a9178", "#2a5a5b"]);

			//Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h)
	.call(d3.zoom().on("zoom", function () {
	    svg.attr("transform", d3.event.transform)

	 }))
	 // .on("wheel.zoom", null)
	 .append("g")
	

						
				    var tooltip = d3.select("body").append("div") 
				        .attr("class", "tooltip")       
				        .style("opacity", 0);
						
						var f = d3.format(".1f");
						// var p = d3.format("%")



			//Load in GeoJSON data
			d3.json("ct_bike.json", function(json) {
				
				
				
				//Bind data and create one path per GeoJSON feature
				svg.selectAll("path")
				   .data(json.features)
				   .enter()
				   .append("path")
				   .attr("d", path)
			   .style("fill", function(d) {
			   		//Get data value
			   		var value = d.properties.lane_biker;
			   		
				   		{return color(value);

			   		}
			   })

			
			   .on("mouseover", function(d) {    
			               tooltip.transition()    
			               .duration(200)    
			               .style("opacity", .9);    
			               tooltip.html( " <strong>" + 						d.properties.boro_name + " Census Tract "
						   + d.properties.ctlabel + "</strong><br/>" + 
							   " <strong> Lane Change: </strong>" + f(d.properties.lane_change) + " ft/ac" + 
							 "<br/>"  + "<strong> Biker Change: </strong>" + (d.properties.biker_change) + "%" 
						   )  
			               
			               .style("left", (d3.event.pageX + 10) + "px")   
			               .style("top", (d3.event.pageY - 45) + "px");  
			             })          
			             .on("mouseout", function(d) {   
			               tooltip.transition()    
			               .duration(500)    
			               .style("opacity", 0); 
			             });
    
		                 d3.select("#button0")
		                 .on("click",function(){//when it is clicked
		                     updateChart(data,"c1")//we update the data in the chart to column c3
		                     d3.selectAll("circle")
		                     .attr("fill","#197EC4")
		                     d3.selectAll("text")
		                     .attr("fill","#197EC4")
		                 })
		
			});
			
