

//Width and height
var w = 1000;
var h = 200;

//Create SVG element
var svg = d3.select("Body")
    .append("svg")
    .attr({ width: w, height: h });

//Function called to do initial SVG Load of data
function loadSVG() {
    //Load in GeoJSON data
    d3.json("data/zzMonthlySales2.json", function (json) {

        g = svg.append('g').classed("chart", true)
          .attr("width", w)
          .selectAll(".csMove")
          .data(json, function (d) { return d.CompanyName + d.Company; })
          .enter()
          .append("g")
          .classed("csMove", true)
          .attr("transform", function (d, i) { return "translate(0, " + i * 100 + ")"; })
          .append("g")
          .classed("CustomerBox", true);

        //Create silver rows 
        g.append("rect")
          .attr("width", w)
          .attr("height", function (d) { return h / 2; })
           .style("fill", "silver");

        var SalesDot = svg.selectAll(".CustomerBox").selectAll(".Sdot")
        .data(function (d) { return d.monthlySales })
        .enter()
        .append("g")
        .classed("Sdot", true);

        //then we add the circles in the correct company group
        SalesDot
           .append("circle")
           .attr("cx", function (d) { return ((d.month - 20130001) / 2); })
           .attr("cy", function (d) { return d.sales })
           .attr("r", 5)
           .style("fill", "red");

        //Test - add dots initially

    });

}

function AddToSVG() {

    //Load in GeoJSON data
    d3.json("data/zzMonthlyBuys2.json", function (json2) {

        //add Green Circles.
        var BuysDot = svg.selectAll(".CustomerBox").selectAll(".Bdot")
        .data(json2)
        .enter()
        .append("g")
        .classed("Bdot", true);

        //then we add the circles in the correct company group
        BuysDot
           .data(function (d) {
               return d.monthlyBuys;
               //return d.monthlySales  //If You run the sales data which should not happen
           })
           .enter()
           .append("circle")
           .attr("cx", function (d) {
               return ((d.monthBuys - 20130001) / 2);
           })
           .attr("cy", function (d) { return d.buys })
           .attr("r", 5)

           .style("fill", "green");
    });

}

function AddData() {
    AddToSVG();
}

