(function() {
  var app = angular.module("checklist", []);

  app.controller("listView", function() {
    var shops = model.shops;
    console.log(shops);
  });
})();
