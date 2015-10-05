// Checks the height of the browser to create height of item list
var adjustCheckoutSize = function() {
  $("#checkoutItems").css("height", $("#checkout").height() - $("#checkoutHeader").height());
  $("#loadedOrders").css("height", window.innerHeight-80);
};

$(window).resize(function() {
  adjustCheckoutSize();
});

// Hides the loading gif on load of the application
window.onload = function() {
  $("#loading").hide();
  adjustCheckoutSize();
};
