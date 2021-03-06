// Checks the height of the browser to create height of item list
var adjustCheckoutSize = function() {
  $("#checkoutItems").css("height", window.innerHeight - $("#checkoutHeader").height());
  $("#loadedOrders").css("height", window.innerHeight-80);
};

$(window).resize(function() {
  adjustCheckoutSize();
});

$("document").ready(function() {
  stopScroll();
});

// Hides the loading gif on load of the application
window.onload = function() {
  $("#loading").hide();
  $("#printButton").hide();
  adjustCheckoutSize();
};

var sortByKey = function(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
};

// Disable mousewheel on a input number field when in focus so the user
// doesn't accidently scroll values by incemrent of 0.01
var stopScroll = function() {
  $("form").on("focus", "input[type=number]", function (e) {
    $(this).on("mousewheel.disableScroll", function (e) {
      e.preventDefault();
    });
  });
  $("form").on("blur", "input[type=number]", function (e) {
    $(this).off("mousewheel.disableScroll");
  });
};
