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
  table += "<th>Total</th>"
  table += "</tr>";

  tempTotal = 0;
  for (i = 0, len = spreadsheetArray.length; i < len; i++) {
    tempTotal += spreadsheetArray[i].attributes.FW001;
  }

  if (tempTotal > 0) {
    table += "<tr><th>Fruit World singlet bag (Large)</th>";
    for (i = 0, len = spreadsheetArray.length; i < len; i++) {
      table += "<td>";
      if (spreadsheetArray[i].attributes.FW001 > 0) {
        table += spreadsheetArray[i].attributes.FW001;
      }
      table += "</td>";
    }
    table += "<td>" + tempTotal + "</td>"
    table += "</tr>";
  }

  tempTotal = 0;
  for (i = 0, len = spreadsheetArray.length; i < len; i++) {
    tempTotal += spreadsheetArray[i].attributes.FW002;
  }
  if (tempTotal > 0) {
    table += "<tr><th>Fruit World singlet bag (Small)</th>";
    for (i = 0, len = spreadsheetArray.length; i < len; i++) {
      table += "<td>";
      if (spreadsheetArray[i].attributes.FW002 > 0) {
        table += spreadsheetArray[i].attributes.FW002;
      }
      table += "</td>";
    }
    table += "<td>" + tempTotal + "</td>"
    table += "</tr>";
  }

  tempTotal = 0;
  for (i = 0, len = spreadsheetArray.length; i < len; i++) {
    tempTotal += spreadsheetArray[i].attributes.FW003;
  }
  if (tempTotal > 0) {
    table += "<tr><th>Fruit World roll bag (300x450mm) 3kg</th>";
    for (i = 0, len = spreadsheetArray.length; i < len; i++) {
      table += "<td>";
      if (spreadsheetArray[i].attributes.FW003 > 0) {
        table += spreadsheetArray[i].attributes.FW003;
      }
      table += "</td>";
    }
    table += "<td>" + tempTotal + "</td>"
    table += "</tr>";
  }

  tempTotal = 0;
  for (i = 0, len = spreadsheetArray.length; i < len; i++) {
    tempTotal += spreadsheetArray[i].attributes.PRB01;
  }
  if (tempTotal > 0) {
    table += "<tr><th>Produce bag (150x300mm) 0.5kg</th>";
    for (i = 0, len = spreadsheetArray.length; i < len; i++) {
      table += "<td>";
      if (spreadsheetArray[i].attributes.PRB01 > 0) {
        table += spreadsheetArray[i].attributes.PRB01;
      }
      table += "</td>";
    }
    table += "<td>" + tempTotal + "</td>"
    table += "</tr>";
  }

  tempTotal = 0;
  for (i = 0, len = spreadsheetArray.length; i < len; i++) {
    tempTotal += spreadsheetArray[i].attributes.ROLL05;
  }
  if (tempTotal > 0) {
    table += "<tr><th>Roll bag (300x450mm) 3kg</th>";
    for (i = 0, len = spreadsheetArray.length; i < len; i++) {
      table += "<td>";
      if (spreadsheetArray[i].attributes.ROLL05 > 0) {
        table += spreadsheetArray[i].attributes.ROLL05;
      }
      table += "</td>";
    }
    table += "<td>" + tempTotal + "</td>"
    table += "</tr>";
  }

  tempTotal = 0;
  for (i = 0, len = spreadsheetArray.length; i < len; i++) {
    tempTotal += spreadsheetArray[i].attributes.SINGN_M;
  }
  if (tempTotal > 0) {
    table += "<tr><th>Natural singlet bag (Medium)</th>";
    for (i = 0, len = spreadsheetArray.length; i < len; i++) {
      table += "<td>";
      if (spreadsheetArray[i].attributes.SINGN_M > 0) {
        table += spreadsheetArray[i].attributes.SINGN_M;
      }
      table += "</td>";
    }
    table += "<td>" + tempTotal + "</td>"
    table += "</tr>";
  }

  table += "</table>";

  $("#print").append(table);
  console.log(spreadsheetArray);
  console.log("append a table to the view");

}

// Future feature to work on to add separtion of concern
var buildRow = function() {
  var tempTotal = 0;
  var items = model.items;

  for (i = 0, len = spreadsheetArray.length; i < len; i++) {
    tempTotal += spreadsheetArray[i].attributes.FW001;
  }

  if (tempTotal > 0) {
    table += "<tr><th>Fruit World singlet bag (Large)</th>";
    for (i = 0, len = spreadsheetArray.length; i < len; i++) {
      table += "<td>";
      if (spreadsheetArray[i].attributes.FW001 > 0) {
        table += spreadsheetArray[i].attributes.FW001;
      }
      table += "</td>";
    }
    table += "<td>" + tempTotal + "</td>"
    table += "</tr>";
  }
}
