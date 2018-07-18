// Get employee data from sessino storage and set to its placeholders
function getEmployeeData() {
	document.getElementById("#employeePicture").innerHTML = "<img src='" + employee['picture'] + "' width='120px' height='120px' />";
	document.getElementById("#employeeName").innerHTML = employee['name'];
	document.getElementById("#employeeFullName").innerHTML = employee['name'];
	document.getElementById("#employeeGender").innerHTML = employee['gender'];
	document.getElementById("#employeePhoneNumber").innerHTML = employee['phone'];
	document.getElementById("#employeeCompany").innerHTML = employee['company'];
	document.getElementById("#employeeAddress").innerHTML = employee['address'];
	document.getElementById("#employeeAbout").innerHTML = employee['about'];
	document.getElementById("#employeeRegistered").innerHTML = employee['registered'];	
}

var employee = JSON.parse(sessionStorage.getItem("employee"));
getEmployeeData();

// Set map lat and long using employee data
var mapProp= {
    center: {lat: employee["latitude"], lng: employee["longitude"]},
    zoom:5,
};

// Renders map
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

var marker = new google.maps.Marker({
  position: {lat: employee["latitude"], lng: employee["longitude"]},
  map: map,
});

// Checking for accessibility flags at session storage
if (window.sessionStorage.getItem("high-contrast") === "1") {
	document.getElementById("body").classList.add("high-contrast");
}

if (window.sessionStorage.getItem("bigger-text") === "1") {
	document.getElementById("body").classList.add("bigger-text");
}