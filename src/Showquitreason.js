angular.module("Module", [])
.controller("Controller", function ($scope, $http) {
	$scope.init = function () {
		$http({
			url: "http://localhost:3001/data3",
			method: "GET",
		}).then(function (response) {
			console.log(response.data);
			var data = response.data;
			$scope.reason = response.data[0].reason ;
		});
		
	}
});
