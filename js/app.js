(function() {
  var app = angular.module("checklist", []);

  app.controller("appCtrl", function() {
    var self = this;
    self.viewOrder = {
      id: "Print",
      bool: true
    };
    self.shops = model.shops;
    self.items = model.items;

    // Changed the viewOrder value when clicked
    self.changeView = function() {
      if (self.viewOrder.bool === true) {
        self.viewOrder.id = "Order";
        self.viewOrder.bool = false;
      } else {
        self.viewOrder.id = "Print";
        self.viewOrder.bool = true;
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
    };
  });
})();
