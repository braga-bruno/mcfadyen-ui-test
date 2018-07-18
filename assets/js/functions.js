// Load JSON data from disk
function loadJSON(callback) {   
	var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	xobj.open('GET', './assets/dataset/people-collection.json', true); 
	xobj.onreadystatechange = function () {
	    if (xobj.readyState == 4 && xobj.status == "200") {
	    	callback(xobj.responseText);
	    }
	};
	xobj.send(null);  
}

// Reset table, removing all rows
function resetRows() {
	var tableRows = tbody.getElementsByTagName('tr');
	var rowCount = tableRows.length;
	for (var x=rowCount-1; x>=0; x--) {
	   tbody.removeChild(tableRows[x]);
	}
}

// Add more rows to the table and hide 'Show more' button if there is not any available data
function showMoreRows() {
	var currentRows = tbody.rows.length
	if (currentRows < currentData.length) {
		if (currentData.length > 5) {
			var totalRows = currentRows+5;
			showBtn();
		} else {
			var totalRows = currentData.length;
			hideBtn();
		}
		for (var i = currentRows; i < totalRows; i++) {
			var rowContent = "<tr>"
			rowContent += "<td><img src='" + currentData[i]['picture'] + "'/></td>"
			rowContent += "<td class='name' onclick='showEmployee("+i+");'>" + currentData[i]['name'] + "</td>"
			rowContent += "<td>" + currentData[i]['age'] + "</td>"
			rowContent += "<td>" + currentData[i]['isActive'] + "</td>"
			rowContent += "<td>" + currentData[i]['email'] + "</td>"
			rowContent += "<td>" + currentData[i]['phone'] + "</td>"
			rowContent += "<td>" + currentData[i]['company'] + "</td>"
			rowContent += "<td>" + currentData[i]['balance'] + "</td>"
			rowContent += "</tr>"
			var newRow = tbody.insertRow(tbody.rows.length);
			newRow.innerHTML = rowContent;
		}	
	} else {
		hideBtn();
	}
	if (currentData.length == 0) {
		showNoResultsMsg();
	} else {
		hideNoResultsMsg();
	}
}

// Show 'Show more' button
function showBtn() {
	document.getElementById("showMoreBtn").classList.remove("hidden");
}

// Hide 'Show more' button
function hideBtn() {
	document.getElementById("showMoreBtn").classList.add("hidden");
}

// Catches searchInput's length and filter the data if there are 3 or more characters
function searchEmployee() {
	resetRows();
	var value = document.getElementById('searchInput').value;
	if (value.length > 2) {
		hideSearchMsg();
		filterData();
	} else {
		showSearchMsg();
		currentData = jsonData;
		showMoreRows();
	}
}

// Show search message
function showSearchMsg() {
	document.getElementById("searchMsg").classList.remove("hidden");
}

// Hide search message
function hideSearchMsg() {
	document.getElementById("searchMsg").classList.add("hidden");
}

// Show no results message
function showNoResultsMsg() {
	document.getElementById("noResultsMsg").classList.remove("hidden");
}

// Hide no results message
function hideNoResultsMsg() {
	document.getElementById("noResultsMsg").classList.add("hidden");
}

// Filter JSON data based on searchInput's content
function filterData() {
	var value = document.getElementById('searchInput').value;
	filteredData = jsonData.filter(function (entry) {
    	return entry.name.toUpperCase().includes(value.toUpperCase());
	});
	if (filteredData) {
		currentData = filteredData;
		showMoreRows();
	} else {
		currentData = jsonData;
		showMoreRows();
	}
}

// Saves employee data at session storage and redirects user to the detail page
function showEmployee(index) {
	window.sessionStorage.setItem("employee", JSON.stringify(currentData[index]));
	window.location.href = 'chosen-employee.html';
}

// Accessibility related functions for high contrast and bigger text
function highContrastMode() {
	document.getElementById("body").classList.toggle("high-contrast");
	if (window.sessionStorage.getItem("high-contrast") === "1") {
		window.sessionStorage.setItem("high-contrast", "0");	
	} else {
		window.sessionStorage.setItem("high-contrast", "1");	
	}
}

function biggerTextMode() {
	document.getElementById("body").classList.toggle("bigger-text"); 
	if (window.sessionStorage.getItem("bigger-text") === "1") {
		window.sessionStorage.setItem("bigger-text", "0");	
	} else {
		window.sessionStorage.setItem("bigger-text", "1");	
	}
}
