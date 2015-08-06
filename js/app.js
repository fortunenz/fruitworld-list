(function() {
  var app = angular.module("checklist", []);

  app.controller("listView", function() {
    this.shops = model.shops;
  });
})();
