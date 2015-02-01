var app = angular.module("heyScheduleMe", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebase) {
	var ref = new Firebase("https://heyscheduleme.firebaseio.com/events");
	var sync = $firebase(ref);

	$scope.events = sync.$asArray();
	$scope.show = false;
	$scope.upcomingEvent = {name: 'test', location: 'test', time: Date.parse('9/31/99 ,12:59:59 PM')};


	$scope.addEvent = function(name, location, date, time) {
		var dateTime = Date.parse(date + ' ,' + time);
		$scope.events.$add({name: name, location: location, time: dateTime});
	};

	$scope.checkUpcomingEvent = function() {
		angular.forEach($scope.events, function(value, time) {
			if ($scope.upcomingEvent.time > value.time) {
				$scope.upcomingEvent = value;
			}
		});
		$scope.show = true;
	};	

	$scope.dateTime = "test";
	$scope.format = 'M/d/yy h:mm:ss a';

});

app.directive("myCurrentTime", function(dateFilter){
	return function(scope, element, attrs){
		var format;

		scope.$watch(attrs.myCurrentTime, function(value) {
			format = value;
			updateTime();
		});
		
		function updateTime(){
			var dt = dateFilter(new Date(), format);
			output = element.text(dt);
			scope.dateTime = dt;
			
			
		}
		
		function updateLater() {
			setTimeout(function() {
			  updateTime(); // update DOM
			  updateLater(); // schedule another update
			}, 1000);
		}
		
		updateLater();
	}
});

