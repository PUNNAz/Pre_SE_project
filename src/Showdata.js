
angular.module("Module", [])
.controller("Controller", function ($scope, $http) {
	$scope.init = function () {
		$http({
			url: "http://localhost:3001/data2",
			method: "GET",
		}).then(function (response) {
			console.log(response.data);
			var data = response.data;
			$scope.namet = response.data[0].prefix ;
			$scope.fname = response.data[0].name ;
			$scope.lname = response.data[0].surname ;
			$scope.stdID = response.data[0].studentID ;
			$scope.Grade = response.data[0].year ;
			$scope.major = response.data[0].major ;
			$scope.advisor = response.data[0].teacherName ;
			$scope.num = response.data[0].houseNo ;
			$scope.moo = response.data[0].moo ;
			$scope.Tambon = response.data[0].tambon ;
			$scope.Amphoe = response.data[0].amphoe ;
			$scope.Province = response.data[0].changwat ;
			$scope.PostalCode = response.data[0].postalCode ;
			$scope.numPhone = response.data[0].phone ;
			$scope.numHouse = response.data[0].homePhone ;
		});
		
	}
});
