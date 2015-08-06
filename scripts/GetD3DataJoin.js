

//Width and height
var w = 1000;
var h = 200;

//Create SVG element
var svg = d3.select("Body")
    .append("svg")
    .attr({ width: w, height: h });

//On load we will load the initial SVG elements

function LoadSVG() {

    //First we will generate the Rows we need
    AddCustomerRows();

    //Then we will load the Sales data
    LoadSalesData();
}

function AddData() {

    //document.getElementById("SellectedYearLb").innerHTML = "Pushed";
    AddToSVG();

}

//Here are the functions where we gennerate the SVG elements

function AddCustomerRows() {

    d3.json("data/zzMonthlySales2.json", function (json) {

        g = svg.append('g').classed("chart", true)
          .attr("width", w)
          .selectAll(".csMove")
          .data(json, function (d) { return d.CompanyName + d.Company; })
          .enter()
          .append("g")
          .classed("csMove", true)
          .attr("transform", function (d, i) { return "translate(0, " + i * 100 + ")"; })

          //Here we will try to set the Data-Name Element
          .attr("id", function (d) { return d.CompanyName; })

          //Replaced the Classed Group below with this attribute so I can reference each Customer
          //.attr('class', function (d) {
              //return d.CompanyName
          //})
          .append("g");
        //.classed("CustomerBox", true);

        //Now lets generate a silver background for each row 
        g.append("rect")
          .attr("width", w)
          .attr("height", function (d) { return h / 2; })
           .style("fill", "silver");

    });

}

function AddToSVG() {

    //Load in a new Json file
    d3.json("data/zzMonthlyBuys2.json", function (json) {

        json.forEach(function (company) {
            svg.select('#' + company.CompanyName).selectAll(".Bdot")
                .data(company.monthlyBuys)
                .enter()
                .append("g")
                .classed("Bdot", true);
        });

        svg.selectAll(".Bdot")
           .append("circle")
           .attr("cx", function (d) {
               return ((d.monthBuys - 20130001) / 2);
           })
           .attr("cy", function (d) { return d.buys })
           .attr("r", 5)

           .style("fill", "green");
    });

}

function LoadSalesData() {

    d3.json("data/zzMonthlySales2.json", function (json) {

        json.forEach(function (company) {
            svg.select('#' + company.CompanyName).selectAll(".Sdot")
            //svg.select("cvMove").attr("data-name", '.' + company.CompanyName).selectAll(".Sdot")
                .data(company.monthlySales)
                .enter()
                .append("g")
                .classed("Sdot", true);
        });

        svg.selectAll(".Sdot")
           .append("circle")
           .attr("cx", function (d) {
               return ((d.month - 20130001) / 2);
           })
           .attr("cy", function (d) {
               return d.sales
           })
           .attr("r", 5)
           .style("fill", "red");
    });

}
