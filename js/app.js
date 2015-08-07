(function() {
  var app = angular.module("checklist", []);

  app.controller("orderCtrl", function() {
    var self = this;
    self.view = "Print";
    self.shops = model.shops;
    self.items = model.items;

    // Changes view from order mode or print ready mode
    self.changeView = function() {
      if (self.view === "Orders") {
        self.view = "Print";
        $(".orderForm").css("display", "inline");
        $(".print").css("display", "none");
      } else {
        self.view = "Orders";
        $(".orderForm").css("display", "none");
        $(".print").css("display", "inline");
      }
    }

    // Loads all the saved data from previous orders
    // of a branch
    self.listClick = function(data) {
      console.log("Load the saves orders for " + data);
    };

    // Submit the order data to the server for later
    // printing
    self.saveOrder = function() {
      console.log("push the current order to the branch selected");
      console.log("clear the order form");
    }
  });
})();
