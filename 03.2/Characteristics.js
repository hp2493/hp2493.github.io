//Referenced Mike Bostock's code https://observablehq.com/@d3/grouped-bar-chart
(function() {
  const chart2 = d3.select('#area2');

const g2 = chart2.append('g'); 

var svg = d3.select("#area2"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);
var x1 = d3.scaleBand()
    .padding(0.05);
var y = d3.scaleLinear()
    .rangeRound([height, 0]);
var z = d3.scaleOrdinal()
    .range(["#1d5472", "#870426"]);
//Define axes
var yAxis = d3.axisLeft()
		   .scale(y)
	.ticks(9);
	
d3.csv("data/Characteristics.csv", function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data) {
  if (error) throw error;
  var keys = data.columns.slice(1);
  x0.domain(data.map(function(d) { return d.State; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
  g2.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return x1(d.key)+40; })
      .attr("y", function(d) { return y(d.value)+5; })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return z(d.key); });

//percent labels
  g2.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
	        .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; })
    .selectAll("text")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("text")
      .attr("x", function(d) { return x1(d.key)+60; })
      .attr("y", function(d) { return y(d.value)+20; })
  .attr("font-family", "sans-serif")
  .attr("font-size", "15px")
      .attr("text-anchor", "start")
  .attr("fill", "white")
   
  .text(function(d)  {return (d.value*100 + "%")} )
   
 
//x axis
  g2.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(40," + height + ")")

      .call(d3.axisBottom(x0));
	  
	  //y axis
g2.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(40,5)")
	.call(yAxis);
	

	
  var legend = g2.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 11)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
  legend.append("rect")
      .attr("x", 160)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);
  legend.append("text")
      .attr("x", 150)
      .attr("y", 9)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});
}) ()