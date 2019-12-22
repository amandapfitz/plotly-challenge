function buildMetadata(sample) {
      // console.log(sample);
      var panel = d3.select("#sample-metadata");
      panel.html("");
      d3.json("samples.json").then((samplesData) => {
        // console.log(samplesData.metadata);
        samplesData.metadata.forEach((entry) => {
          // console.log(entry.id);
          if (sample == entry.id) {
            Object.entries(entry).forEach(([key,value]) => {
              panel
                .append("h6")
                .text(`${key}: ${value}`);
                console.log(key, value);
            });
          }
        });
      });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

}


function buildCharts(sample) {

  function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var fileName = "samples.json"
  d3.json(fileName).then(function(data) {
    var id = unpack(data.samples, "id");
    var otuID = unpack(data.samples, "otu_ids");
    var sampleVal = unpack(data.samples, "sample_values");
    var otuLabel = unpack(data.samples, "otu_labels");

    // console.log(id);
    // console.log(otuID);
    // console.log(sampleVal);
    // console.log(otuLabel);
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    // Plotly.newPlot("pie",data,layout)
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  var fileName = "samples.json"
  d3.json(fileName).then(function(data) {
    var allNames = data.names;
    allNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = allNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();