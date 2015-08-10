(function() {
  Parse.initialize("p45yej86tibQrsfKYCcj6UmNw4o7b6kxtsobZnmA", "fXSkEhDGakCYnVv5OOdAfWDmjAuQvlnFI5KOwIUO");
  var ShopData = Parse.Object.extend("ShopData");
  var shopData = new ShopData();
  var query = new Parse.Query(ShopData);

  var app = angular.module("checklist", []);

  app.controller("appCtrl", function($scope, $compile) {
    var self = this;
    self.viewOrder = {
      id: "Print",
      bool: true
    };
    self.selectedBranch = {
      name: "",
      selected: false
    };
    self.viewList = false;
    self.printableShop = [];
    self.spreadsheetArray = [];
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
    };

    // Displays the list of shops that can be accessed
    self.showList = function() {
      if (self.viewList === false) {
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
      loadShopDataList(data, $compile, $scope);
      self.selectedBranch.selected = true;
    };

    // Submit the order data to the server for later
    // printing
    self.saveOrder = function(data) {
      if (self.selectedBranch.name === "") {
        alert("Please select a branch before you submit");
      } else {
        saveShopData(data);
        self.selectedBranch.name = "";
        self.selectedBranch.selected = false;
        $("#orderForm")[0].reset();

      }
    };

    self.loadOrder = function(location) {
      console.log("Loads the previously saved values on the form");
    };

    // Add the shop to the print list if checkbox is checked
    self.selectPrint = function(shop) {
      if (shop.clicked === false) {
        shop.clicked = true;
        self.printableShop.push(shop);
      } else {
        shop.clicked = false;
        for (i = 0; i < self.printableShop.length; i++) {
          if (self.printableShop[i].name == shop.name) {
            self.printableShop.pop(i);
          }
          console.log(self.printableShop.length);
        }
      }
    };

    // Grabs all data required and proceeds with a print preview
    self.printPreview = function() {
      if (self.printableShop.length < 1) {
        alert("Please select the shops you want to have printed");
      } else {
        $('#loading').show();

        // Waits for ajax request to complete before building spreadsheet data
        setTimeout(function() {
          $('#loading').hide();
          $scope.$apply()
          //buildTable(self.spreadsheetArray);
          //window.print();
        }, 3000);

        query.descending("updatedAt");

        // Gets all the data from the server and pushes it into a temp
        // array which will be used to build a spreadsheet
        for (i = 0, len = self.printableShop.length; i < len; i++) {
          query.equalTo("name", self.printableShop[i].name);
          query.first({
            success: function(results) {
              self.spreadsheetArray.push(results);
            },
            error: function(object, error) {
              // The object was not retrieved successfully.
              // error is a Parse.Error with an error code and message.
              console.log("Unable to get saved data");
            }
          });
        }
      }
    };
  });

  // Helper method for saving shop orders to the Parse cloud
  var saveShopData = function(shop) {
    shopData.set("name", shop.selectedBranch.name);
    for (i = 0, len = shop.items.length; i < len; i++) {
      shopData.set(shop.items[i].code, parseInt(shop.items[i].ordered));
    }
    shopData.save(null, {
      success: function(shopData) {
        console.log('New object created with objectId: ' + shopData.id);
      },
      error: function(shopData, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  }

  // Helper method for loading all previously saved data
  var loadShopDataList = function(shop, compile, scope) {
    $("#loadedOrders").empty();
    query.equalTo("name", shop.name);
    query.limit(5);
    query.descending("updatedAt");
    query.find({
      success: function(results) {
        var temp;
        for (i = 0, len = results.length; i < len; i++) {
          temp = '<div class="oldOrders" ng-click="app.loadOrder(' +
            i +
            ')"><p>File last modified: ' +
            results[i].updatedAt +
            '</p></div>';
          angular.element(document.getElementById("loadedOrders")).append(compile(temp)(scope));
        }
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        console.log("Unable to load saved orders");
      }
    });
  }

  var buildTable = function(spreadsheetArray) {
    console.log(spreadsheetArray);
    console.log("append a table to the view");

  }
})();
