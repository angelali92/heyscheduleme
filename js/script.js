var app = angular.module("heyScheduleMe", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebase) {
  var ref = new Firebase("https://heyscheduleme.firebaseio.com/events");
  var sync = $firebase(ref);

  $scope.data = {};
  $scope.data.text = "test";

  $scope.events = sync.$asArray();

  $scope.addEvent = function(name, location, time) {
    $scope.events.$add({name: name, location: location, time: time});
  }
});