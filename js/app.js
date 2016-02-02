(function() {
  Parse.initialize("p45yej86tibQrsfKYCcj6UmNw4o7b6kxtsobZnmA", "fXSkEhDGakCYnVv5OOdAfWDmjAuQvlnFI5KOwIUO");
  var ShopData = Parse.Object.extend("ShopData");
  var shopData;
  var query = new Parse.Query(ShopData);

  var app = angular.module("checklist", ["firebase"]);

  app.controller("appCtrl", function($scope, $compile, $firebaseArray) {
    // Connects to the firebase server
    var ref = new Firebase('https://popping-torch-7294.firebaseio.com/');
    var ordersRef = new Firebase('https://popping-torch-7294.firebaseio.com/fruitWorldOrders');

    // Firebase queries ----------------------------------------------------------
    $scope.orders = $firebaseArray(ordersRef);

    // Pulls data from server for all fruit world customers
    ref.child("customers").once("value", function(snapshot) {
      var results = snapshot.val();
      for (i = 0, len = results.length; i < len; i++) {
        if (results[i].type == "Fruit World" || results[i].type == "Supa Fruit Mart") {
          results[i].clicked = false;
          self.shops.push(results[i]);
        }
      }
      sortByKey(self.shops, "name");
      $scope.$apply();
    });

    // updates the order number
    ref.child("orderNumber").on("value", function(snapshot) {
      self.orderNumber = snapshot.val();
    });

    var self = this;

    // Defines the shops variable for the user to load later
    self.shops = [];

    // Login variables
    self.userName = "";
    self.password = "";
    var currentUser = Parse.User.current();
    if (currentUser) {
      self.access = true;
      self.name = currentUser.attributes.firstName;
    } else {
      self.access = false;
      self.name = "";
    }

    // Application variables
    self.viewOrder = {
      id: "Print",
      bool: true
    };
    self.selectedBranch = {
      name: "",
      short: "",
      acc: "",
      address: "",
      city: "",
      selected: false
    };
    self.searchBox = "";
    self.viewList = false;
    self.printableShop = [];
    self.spreadsheetArray = [];
    self.checkoutItems = [];
    self.items = model.items;
    self.displayedItems = self.items;
    self.orderNumber = 0;

    // Function to log the user in so they can use the program
    self.login = function() {
      $("#loading").show();
      Parse.User.logIn(self.userName, self.password, {
        success: function(user) {
          $("#loading").hide();
          self.name = user.attributes.firstName;
          self.access = true;
          self.loadShops();
        },
        error: function(user, error) {
          $("#loading").hide();
          // The login failed. Check error to see why.
          alert("Sorry the username or password may be wrong, please try again");
        }
      });
    };

    // Function to log the user out of applciation for security
    self.logout = function() {
      Parse.User.logOut();
      self.access = false;
    };

    // Loops through items in list and if it matches what's in the search bar
    // it will display the item
    self.search = function() {
      if (self.searchBox == " ") {
        self.displayedItems = self.items;
      } else {
        self.displayedItems = [];
        for (i = 0, len = self.items.length; i < len; i++) {
          if (self.items[i].description.toLowerCase().includes(self.searchBox.toLowerCase()) || self.items[i].code.toLowerCase().includes(self.searchBox.toLowerCase())) {
            self.displayedItems.push(self.items[i]);
          }
        }
      }
    };

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

    // Appends data to the checkout list
    self.checkoutList = function() {
      var temp;
      for (i = 0, len = self.items.length; i < len; i++) {
        temp = $.inArray(self.items[i], self.checkoutItems);
        if (self.items[i].ordered > 0) {
          if (temp === -1) {
            self.checkoutItems.push(self.items[i]);
          }
        } else {
          if (temp > -1) {
            self.checkoutItems.splice(temp, 1);
          }
        }
      }
    };

    // Displays the list of shops that can be accessed
    self.showList = function() {
      if (self.viewList === false) {
        self.viewList = true;
        $("#loadedOrders").css("display", "none");
        $("#checkout").css("display", "none");
      } else {
        self.viewList = false;
        $("#loadedOrders").css("display", "inline");
        var mq = window.matchMedia( "(min-width: 1000px)" );
        if (mq.matches) {
          $("#checkout").css("display", "inline");
        }
      }
    };

    // Loads all the saved data from previous orders
    // of a branch
    self.listClick = function(data) {
      self.showList();
      self.selectedBranch.name = data.name;
      self.selectedBranch.short = data.short;
      self.selectedBranch.acc = data.acc;
      self.selectedBranch.address = data.address;
      self.selectedBranch.city = data.city;
      loadShopDataList(data, $compile, $scope);
      self.selectedBranch.selected = true;
      $('html, body').animate({ scrollTop: 0 }, 'fast');
    };

    // Submit the order data to the server for later
    // printing
    self.saveOrder = function() {
      if (self.selectedBranch.name === "") {
        alert("Please select a branch before you submit");
      } else {
        var tempJson = {};

        tempJson.name = self.selectedBranch.name;
        tempJson.short =  self.selectedBranch.short;
        tempJson.acc =  self.selectedBranch.acc;
        tempJson.address =  self.selectedBranch.address;
        tempJson.city =  self.selectedBranch.city;

        for (var i = 0; i < self.items.length; i++) {
          tempJson[self.items[i].code] = self.items[i].ordered;
        }

        var shopRef = new Firebase('https://popping-torch-7294.firebaseio.com/fruitWorldOrders');
        shopRef.push(tempJson);
        alert("Thanks, Your order has been saved for " + self.selectedBranch.name + "!");

        // Resets the view
        self.selectedBranch.name = "";
        self.selectedBranch.short = "";
        self.selectedBranch.acc = "";
        self.selectedBranch.address = "";
        self.selectedBranch.city = "";
        self.selectedBranch.selected = false;
        for (i = 0, len = self.items.length; i < len; i++) {
          self.items[i].ordered = 0;
        }
        self.checkoutItems = [];
        $('html, body').animate({ scrollTop: 0 }, 'fast');
      }
    };

    // Loads a previously saved order for user to modify and update
    self.loadOrder = function(location) {
      query = new Parse.Query(ShopData);
      query.equalTo("name", self.selectedBranch.name);
      query.find({
        success: function(results) {
          var serverItems = results[location].attributes;
          for (i = 0, len = self.items.length; i < len; i++) {
            if (self.items[i].code in serverItems) {
              self.items[i].ordered = serverItems[self.items[i].code];
            }
          }
          self.checkoutList();
          $scope.$apply();
          $('html, body').animate({ scrollTop: 0 }, 'fast');
          alert("Previous order for " + self.selectedBranch.name + " from " + results[location].updatedAt + " has been loaded");
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    };

    // Add the shop to the print list if checkbox is checked
    self.selectPrint = function(shop) {
      if (shop.clicked === false) {
        shop.clicked = true;
        self.printableShop.push(shop);
      } else {
        for (i = 0; i < self.printableShop.length; i++) {
          if (self.printableShop[i].name == shop.name) {
            shop.clicked = false;
            self.printableShop.splice(i, 1);
          }
        }
      }
    };

    // Grabs all data required and proceeds with a print preview
    self.printPreview = function() {
      if (self.printableShop.length < 1) {
        alert("Please select the shops you want to have printed");
      } else {
        //$('#loading').show();
        var spreadsheetArray = [];

        for (var i = 0, len = $scope.orders.length; i < len; i++) {
          spreadsheetArray.push($scope.orders[i]);
        }

        buildTable(spreadsheetArray);
        buildPackingSlips(spreadsheetArray, self.orderNumber);
        $("#printButton").show();
      }
    };
  });

  // Helper method for loading all previously saved data
  var loadShopDataList = function(shop, compile, scope) {
    $("#loadedOrders").empty();

    query = new Parse.Query(ShopData);
    query.equalTo("name", shop.name);
    query.limit(5);
    query.descending("updatedAt");
    query.find({
      success: function(results) {
        var temp;
        temp = '<h3 ng-show="app.selectedBranch.selected">Saved orders for ' + shop.name + '</h3>';
        $("#loadedOrders").append(temp);
        for (i = 0, len = results.length; i < len; i++) {
          temp = '<div class="oldOrders"><p>File last modified: ' +
            results[i].updatedAt +
            ' <button class="clean-gray-btn" ng-click="app.loadOrder(' +
              i +
              ')">Load</button></p></div>';
          angular.element(document.getElementById("loadedOrders")).append(compile(temp)(scope));
        }
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        console.log("Unable to load saved orders");
      }
    });
  };
})();
