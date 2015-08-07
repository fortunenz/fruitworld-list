(function() {
  Parse.initialize("p45yej86tibQrsfKYCcj6UmNw4o7b6kxtsobZnmA", "fXSkEhDGakCYnVv5OOdAfWDmjAuQvlnFI5KOwIUO");

  var app = angular.module("checklist", []);

  app.controller("appCtrl", function() {
    var self = this;
    self.viewOrder = {
      id: "Print",
      bool: true
    };
    self.selectedBranch = "";
    self.viewList = false;
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

    // Displays the list of shops that can be accessed
    self.showList = function() {
      if (self.viewList == false) {
        self.viewList = true;
      } else {
        self.viewList = false;
      }
    };

    // Loads all the saved data from previous orders
    // of a branch
    self.listClick = function(data) {
      self.showList();
      self.selectedBranch = data.name;
      console.log("Load the saves orders for " + data.name);
    };

    // Submit the order data to the server for later
    // printing
    self.saveOrder = function() {
      console.log("push the current order to the branch selected");
      console.log("clear the order form");
    };

    // Grabs all data required and proceeds with a print preview
    self.printPreview = function() {
      console.log("get data from server");
      console.log("construct the spreadsheet to be printed");
      console.log("show a print preview of all the pages that will be printed");
    }
  });
})();
