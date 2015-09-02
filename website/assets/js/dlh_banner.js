
var networkState;

initNetwork = function()
{
   var enclosingDiv = document.getElementById("masthead-no-image-header");
   var brect = enclosingDiv.getBoundingClientRect();

   var width = brect.width;
   var height = brect.height;
   var svg = d3.select(".dlh_banner")
	   .attr("width", width)
	   .attr("height", height);

   var boxLen = 25;

   var nrows = Math.floor(height / boxLen);
   var ncols = Math.floor(width / boxLen);

   console.log("nrows=" + nrows + ", ncols=" + ncols);

   // initialize state matrix to random values, create
   // rectangles for each node
   networkState = math.zeros([nrows, ncols]);

   var i,j;
   for (i = 0; i < nrows; i++) {
      for (j = 0; j < ncols; j++) {
         
         networkState[i][j] = 0.1*Math.random();

         svg.append("rect")
            .attr("x", j*boxLen)
            .attr("y", i*boxLen)
            .attr("width", boxLen)
            .attr("height", boxLen)
            .attr("fill", mapStateToColor(networkState[i][j]))
            .attr("stroke", "#000")
            .attr("opacity", 0.75);
      }
   }
}


updateNetwork = function()
{
   var colorScale = d3.scale.category20b();

   var shape = math.size(networkState);
   var nrows = shape[0];
   var ncols = shape[1];

   // data is a list of (i,j) coordinates for each rectangle,
   // to be mapped to each rectangle on the svg
   var data = [];

   var maxNoise = 0.1;
   var timeConstant = 0.9;

   var i,j;
   var s,ds;
   var stateAbove, stateBelow, stateLeft, stateRight;
   for (i = 0; i < nrows; i++) {
      for (j = 0; j < ncols; j++) {
         // get state of neighbor above or roll to bottom
         if (i > 0) {
            stateAbove = networkState[i-1][j];
         } else {
            stateAbove = networkState[nrows-1][j];
         }
         // get state of neighbor below or roll to top
         if (i < nrows-1) {
            stateBelow = networkState[i+1][j];
         } else {
            stateBelow = networkState[nrows-1][j];
         }
         // get state of left neighbor
         if (j > 0) {
            stateLeft = networkState[i][j-1];
         } else {
            stateLeft = networkState[i][ncols-1];
         }
         // get state of right neighbor
         if (j < ncols-1) {
            stateRight = networkState[i][j+1];
         } else {
            stateRight = networkState[i][0];
         }

         // compute the average state
         var maxState = math.max([stateAbove, stateBelow, stateLeft, stateRight]);

         // make some noise
         var noise = 0.0*Math.random();
         if (Math.random() > 0.99) {
            noise = 1;   
         }

         // exponential decay plus noise plus neighbors
         var s = networkState[i][j];
         var ds = -timeConstant*s + noise + 5e-1*maxState;

         // update state using dynamics
         networkState[i][j] = math.min([1, math.max([0, s + ds])]);

         data.push([i, j]);
      }
   }   

   // update the colors
   var svg = d3.select(".dlh_banner");
   svg.selectAll("rect")
      .data(data)
      .attr("fill", function(d) { return mapStateToColor(networkState[d[0]][d[1]]); } );
}

mapStateToColor = function(s)
{
   var r,g,b;
   r = 0;
   b = Math.floor(s*255);
   g = Math.floor(s*125);
   return "rgb(" + r + "," + g + "," + b + ")";
}

startNetwork = function(frameRate)
{
   console.log("Starting network...");
   initNetwork();
   if (frameRate > 0) {
      // start the main loop   
      var refreshInterval = (1.0 / frameRate) * 1000.0;
      setInterval(updateNetwork, refreshInterval);
   }
}

