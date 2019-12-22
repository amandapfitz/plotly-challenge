function buildMetadata(sample) {
      // console.log(sample);
    // Use `d3.json` to fetch the metadata for a sample
      // Use d3 to select the panel with id of `#sample-metadata`
      var panel = d3.select("#sample-metadata");
      // Use `.html("") to clear any existing metadata
      panel.html("");
      // Use `Object.entries` to add each key and value pair to the panel
      d3.json("samples.json").then((samplesData) => {
        // console.log(samplesData.metadata);
        samplesData.metadata.forEach((entry) => {
          // console.log(entry.id);
          if (sample == entry.id) {
            Object.entries(entry).forEach(([key,value]) => {
              panel
                .append("h6")
                .text(`${key}: ${value}`);
                // console.log(key, value);
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
  d3.json(fileName).then((data) => {
    data.samples.forEach((data) => {
    if (sample == data.id) {
    var id = data.id;
    console.log(id);
    id = id.slice(0,10);
    var otuID = data.otu_ids;
    otuID = otuID.slice(0,10);
    var sampleVal = data.sample_values;
    sampleVal = sampleVal.slice(0,10);
    // var otuLabel = unpack(data.samples, "otu_labels");
    // otuLabel = otuLabel.slice(0,10);
    
 

    
    // console.log(otuID);
    // console.log(sampleVal);
    // console.log(otuLabel);
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var trace1 = {
        labels: otuID,
        values: sampleVal,
        type: 'pie'
      };
      
      var data = [trace1];
      
      var layout = {
        title: "",
      };
      
      Plotly.newPlot("pie", data, layout);
    }
  }); 
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