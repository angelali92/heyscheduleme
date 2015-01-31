var app = angular.module("heyScheduleMe", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebase) {
  var ref = new Firebase("https://heyscheduleme.firebaseio.com/messages");
  var sync = $firebase(ref);

  $scope.data = {};
  $scope.data.text = "test";

  $scope.messages = sync.$asArray();

  $scope.addMessage = function(text) {
    $scope.messages.$add({text: text});
  }
});