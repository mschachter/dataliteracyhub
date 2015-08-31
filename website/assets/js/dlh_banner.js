
var networkState;

initNetwork = function()
{
   var colorScale = d3.scale.category20b();

   var width = 1000;
   var height = 300;
   var svg = d3.select(".dlh_banner")
	   .attr("width", width)
	   .attr("height", height);

   var boxLen = 50;

   var nrows = height / boxLen;
   var ncols = width / boxLen;

   console.log("nrows=" + nrows + ", ncols=" + ncols);

   // initialize state matrix to random values, create
   // rectangles for each node
   networkState = math.zeros([nrows, ncols]);

   var i,j;
   for (i = 0; i < nrows; i++) {
      for (j = 0; j < ncols; j++) {
         
         networkState[i][j] = Math.floor(20*Math.random());

         svg.append("rect")
            .attr("x", j*boxLen)
            .attr("y", i*boxLen)
            .attr("width", boxLen)
            .attr("height", boxLen)
            .attr("fill", colorScale(networkState[i][j]))
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

   var maxNoise = 2;

   var i,j;
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
            stateBelow = networkState[i][j];
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
         var meanState = (stateAbove + stateBelow + stateLeft + stateRight) / 4.0;

         // make some noise
         var noise = Math.floor(maxNoise*2*Math.random()) - maxNoise;

         var newState = 0;
         // certain regions stick together
         if ((i > ncols/2) && (i > ncols/6) && (j > nrows/4) && (j < nrows/3)) {
            newState = meanState;
         } else {
            newState = math.max([0, math.min([20, networkState[i][j] + noise])]);
         }

         // be the mean state
         networkState[i][j] = newState;

         data.push([i, j]);
      }
   }   

   // update the colors
   var svg = d3.select(".dlh_banner");
   svg.selectAll("rect")
      .data(data)
      .attr("fill", function(d) { return colorScale(networkState[d[0]][d[1]]); } );
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

