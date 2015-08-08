(function() {
  Parse.initialize("p45yej86tibQrsfKYCcj6UmNw4o7b6kxtsobZnmA", "fXSkEhDGakCYnVv5OOdAfWDmjAuQvlnFI5KOwIUO");
  var ShopData = Parse.Object.extend("ShopData");
  var shopData = new ShopData();
  var query = new Parse.Query(ShopData);

  var app = angular.module("checklist", []);

  app.controller("appCtrl", function() {
    var self = this;
    self.viewOrder = {
      id: "Print",
      bool: true
    };
    self.selectedBranch = {
      name: ""
    };
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
      self.selectedBranch.name = data.name;
      loadShopData(data);
    };

    // Submit the order data to the server for later
    // printing
    self.saveOrder = function(data) {
      console.log(data);
      if (self.selectedBranch.name == "") {
        alert("Please select a branch before you submit");
      } else {
        saveShopData(data);
        self.selectedBranch.name = "";
        $("#orderForm")[0].reset();
      }
    };

    // Grabs all data required and proceeds with a print preview
    self.printPreview = function() {
      console.log("get data from server");
      console.log("construct the spreadsheet to be printed");
      console.log("show a print preview of all the pages that will be printed");
    }
  });

  // Helper method for saving shop orders to the Parse cloud
  var saveShopData = function(shop) {
    shopData.set("name", shop.selectedBranch.name);
    for (i = 0, len = shop.items.length; i < len; i++) {
      shopData.set(shop.items[i].code, parseInt(shop.items[i].ordered));
    }
    shopData.save(null, {
      success: function(shopData) {
      },
      error: function(shopData, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  }

  // Helper method for loading all previously saved data
  var loadShopData = function(shop) {
    query.equalTo("name", shop.name);
    query.limit(10);
    query.find({
      success: function(results) {
        console.log(results);
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        console.log("nope");
      }
    });
  }
})();
