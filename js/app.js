(function() {
  var app = angular.module("checklist", []);

  app.controller("listView", function() {
    var self = this;
    self.shops = model.shops;

    self.listClick = function(data) {
      console.log(data);
    };
  });
})();
