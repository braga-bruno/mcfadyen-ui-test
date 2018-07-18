var tbody = document.getElementById("tbody");
var jsonData, filteredData, currentData = null;

loadJSON(function(response) {
	jsonData = JSON.parse(response);
	currentData = jsonData;
	showMoreRows();
});

// Checking for accessibility flags at session storage
if (window.sessionStorage.getItem("high-contrast") === "1") {
	document.getElementById("body").classList.add("high-contrast");
}

if (window.sessionStorage.getItem("bigger-text") === "1") {
	document.getElementById("body").classList.add("bigger-text");
}