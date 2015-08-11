// Function to build the table to be printed
var buildTable = function(spreadsheetArray) {
  $("#print").empty();
  var tempTotal;

  var table = "<table>";
  table += "<tr>";
  table += "<th></th>";
  for (i = 0, len = spreadsheetArray.length; i < len; i++) {
    table += "<th>" + spreadsheetArray[i].attributes.short + "</th>";
  }
  table += "<th>Total</th>";
  table += "</tr>";

  table += buildRow(spreadsheetArray);

  table += "</table>";

  $("#print").append(table);
};

// Builds all the rows
var buildRow = function(spreadsheetArray) {
  var table = "";
  var tempTotal;
  var items = model.items;

  for (k = 0; k < items.length; k++) {
    tempTotal = 0;
    for (i = 0, len = spreadsheetArray.length; i < len; i++) {
      tempTotal += spreadsheetArray[i].attributes[items[k].code];
    }

    if (tempTotal > 0) {
      table += "<tr><th>" + items[k].desription + "</th>";
      for (i = 0, len = spreadsheetArray.length; i < len; i++) {
        table += "<td>";
        if (spreadsheetArray[i].attributes[items[k].code] > 0) {
          table += spreadsheetArray[i].attributes[items[k].code];
        }
        table += "</td>";
      }
      table += "<td>" + tempTotal + "</td><td>" + items[k].orderAs + "</td>";
      table += "</tr>";
    }
  }

  return table;
};
