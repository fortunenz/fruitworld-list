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

// Loops through each shop in spreadsheet and builds a packing slip
// to be printed
var buildPackingSlips = function(spreadsheetArray) {
  $("#packingSlip").empty();
  var packingSlip;
  for (i = 0; i < spreadsheetArray.length; i++) {
    packingSlip = "";
    packingSlip += '<div class="packingSlips">';
    // Header
    packingSlip += '<div class="row">';
    packingSlip += '<h1 class="col-10 packingTitle"><img class="logo"src="images/logo.png"> FORTUNE ENTERPRISES CO (NZ) LTD</h1>';
    packingSlip += '<strong class="col-2 packingName">Packing Slip</strong>';
    packingSlip += '</div>';
    // Left column of subheading
    packingSlip += '<div class="row packingRow"><div class="col-6">';
    packingSlip += '<p class="packingP">73 Huia Road, Otahuhu, Auckland</p>';
    packingSlip += '<p class="packingP">PO Box 9511 New Market, Auckland</p>';
    packingSlip += '<p class="packingP">Email: <a href="#">feltd@xtra.co.nz</a></p></div>';
    // Right column of subheading
    packingSlip += '<div class="col-6">';
    packingSlip += '<p class="packingP right">Phone:    (09) 276-2681</p>';
    packingSlip += '<p class="packingP right">Fax:      (09) 276-2682</p>';
    packingSlip += '<p class="packingP right">Website:  <a href="#">www.fortunenz.com </a></p></div>';
    packingSlip += '</div>';
    // Left side shop details
    packingSlip += '<div class="row packingRow"><div class="col-6">';
    packingSlip += '<p class="packingP">';
    packingSlip += spreadsheetArray[i].attributes.name;
    packingSlip += '</p>';
    packingSlip += '<p class="packingP">';
    packingSlip += spreadsheetArray[i].attributes.address;
    packingSlip += '</p>';
    packingSlip += '<p class="packingP">';
    packingSlip += spreadsheetArray[i].attributes.city;
    packingSlip += '</p></div>';
    // Right side date + packing slip number
    packingSlip += '<div class="col-6">';
    packingSlip += '<p class="packingP">Account no.: ';
    packingSlip += spreadsheetArray[i].attributes.acc;
    packingSlip += '</p>';
    packingSlip += '<p class="packingP">Packing slip no.: XXXXXXX</p>';
    packingSlip += '<p class="packingP">Date: ' + new Date().toJSON().slice(0,10) + '</p>';
    packingSlip += '</div></div>';
    // Item details with table
    var table = '';

    table += '<table class="packingTable"><tr><th>Code</th><th>Description</th><th>Packaging</th><th>Quantity</th><th>Carton</th></tr>';
    table += buildPackingRow(spreadsheetArray[i]);
    table += '</table>';

    packingSlip += table;
    // Name and signature
    packingSlip += '<div class="packingSign">';
    packingSlip += '<p>Name: _________________________________</p>';
    packingSlip += '<p>Signature: _____________________________</p>';

    $("#packingSlip").append(packingSlip);
  }
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

var buildPackingRow = function(spreadsheetArray) {
  var table = "";
  var items = model.items;

  console.log(spreadsheetArray);
  for (k = 0; k < items.length; k++) {
    if (items[k].code in spreadsheetArray.attributes) {
      if (spreadsheetArray.attributes[items[k].code] > 0) {
        table += '<tr><td>';
        table += items[k].code;
        table += '</td>';
        table += '<td>'
        table += items[k].desription;
        table += '</td>'
        table += '<td>'
        table += items[k].packaging;
        table += '</td>'
        table += '<td>'

        if (items[k].unit == "Ctn" || items[k].unit == "Pack") {
          table += spreadsheetArray.attributes[items[k].code] + ' ' + items[k].orderAs;
        }

        table += '</td>'
        table += '<td>'
        table += spreadsheetArray.attributes[items[k].code] + ' ' + items[k].orderAs;
        table += '</td>';
        table += '</tr>';
      }
    }
  }

  return table;
};
