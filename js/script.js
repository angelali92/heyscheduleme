var app = angular.module("heyScheduleMe", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebase) {
	var ref = new Firebase("https://heyscheduleme.firebaseio.com/events");
	var sync = $firebase(ref);

	$scope.events = sync.$asArray();
	$scope.show = false;
	$scope.upcomingEvent = {name: 'test', value: 'test', time: 9999};


	$scope.addEvent = function(name, location, time) {
		$scope.events.$add({name: name, location: location, time: time});
	};

	$scope.checkUpcomingEvent = function() {
		angular.forEach($scope.events, function(value, time) {
			if (Number($scope.upcomingEvent.time) > Number(value.time)) {
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

