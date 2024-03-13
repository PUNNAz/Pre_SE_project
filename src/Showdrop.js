
angular.module("Module", [])
.controller("Controller", function ($scope, $http) {
	$scope.init = function () {
		$http({
			url: "http://localhost:3001/data3",
			method: "GET",
		}).then(function (response) {
			console.log(response.data);
			var data = response.data;
			for(var i=0; i<data.length; i++){
				var row = formList.insertRow(-1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
				var cell7 = row.insertCell(6);
				var cell8 = row.insertCell(7);

				cell1.innerHTML = data[i].number;
				cell2.innerHTML = data[i].subjectCode;
                cell3.innerHTML = data[i].subject;
                cell4.innerHTML = data[i].section;
                cell5.innerHTML = data[i].credit;
                cell6.innerHTML = data[i].time;
                cell7.innerHTML = data[i].Instructor;
                cell8.innerHTML = data[i].allow;
			}
			$scope.reason = response.data[0].reason ;
		});
		
	}
});
