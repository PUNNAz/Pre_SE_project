



angular.module("Module", [])
.controller("Controller", function ($scope, $http) {
	$scope.init = function () {
		$http({
			url: "http://localhost:3001/data",
			method: "GET",
		}).then(function (response) {
			console.log(response.data);
			var data = response.data;
			$scope.test = response.data;

			for(var i=0; i<data.length; i++){
				var row = formList.insertRow(-1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				
				cell1.innerHTML = data[i].username;

				console.log(data);
				if(data[i].type == '0') cell2.innerHTML = 'คำร้องเพิ่มรายวิชา';
				else if(data[i].type == '1') cell2.innerHTML = 'คำร้องถอนรายวิชา';
				else cell2.innerHTML = 'คำร้องลาออก';

				if(data[i].status == '0') cell3.innerHTML = 'เจ้าหน้าที่ตรวจสอบ';
				else if(data[i].status == '1') cell3.innerHTML = 'อาจารย์ที่ปรึกษาตรวจสอบ';
				else if(data[i].status == '2') cell3.innerHTML = 'คณบดีตรวจสอบ';
				else if(data[i].status == '2') cell3.innerHTML = 'อนุมัติแล้ว';
				else cell3.innerHTML = 'ไม่อนุมัติ';

				cell4.innerHTML = data[i].teacherName;
			}
		});
	}
});
