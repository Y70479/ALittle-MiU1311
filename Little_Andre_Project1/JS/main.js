/*
Andre Little
Class: MiU
Term: 1311
Instructor: Ms. Alarcon
Completed Date: 10/31/2013
Project 1 - Gaming Vault - JScript
*/

// The beginning of the DOM.
window.addEventListener("DOMContentLoaded", function()) {
	
	/*------ Shortcuts ------*/
	// This will get my Element by Id.
	var getId = function(x) {
		var elId = document.getElementById(x);
		return elId;
	};
	// This will get my Element by Tag Name.
	var getTag = function(x) {
		var elTag = document.getElementsByTagName(x);
		return elTag;
	};
	// This will help me create a new Element.
	var createEl = function(x) {
		var makeEl = document.createElement(x);
		return makeEl;
	};
	/*------ End of Shortcuts ------*/
	
	// Find Value of Selected Radio Buttons.
	function getSelectedRadio() {
		var radios = document.forms[0].add
		for var i=0; i<radios.length; i++) {
			if (radios[i].checked) {
				addValue = radios[i].value
			}
		}
	};
	// Hide Form Data.
	function hideForm(f) {
		switch(f) {
			case "on":
				getId("docForm").style.display = "none";
				getId("clearData").style.display = "inline";
				getId("displayData").style.display = "none";
				getId("addNewGame").style.display = "inline";
				break; 
			case "off":
				getId("docForm").style.display = "block";
				getId("clearData").style.display = "inline";
				getId("displayData").style.display = "inline";
				getId("addNewGame").style.display = "none";
				getId("storedItems").style.display = "none";
				break;
			default:
				return false;
		}
	};
	// Save Data Function
	function saveData(key) {
		if(!key) {
			var randomNumber = Math.floor(Math.random()*100000000001);
		} else {
			randomNumber = key;
		}
		// Get all Form Data
		getSelectedRadio();
		var item = {};
			item.platforms = ["Platform: ", getId("platform").value];
			item.titles = ["Title: ", getId("name").value];
			item.genres = ["Genre: ", getId("genre").value];
			item.regions = ["Region: ", addValue];
			item.ratings = ["ESRB Rating: ", getId("rating").value];
			item.conditions = ["Condition of the Game: ", getId("condition").value];
			item.releaseDates = ["Release Date: ", getId("date").value];
			item.addInfo = ["Additional Info: ", getId("infoBox").value];
			// Save Data to local Storage.
			localStorage.setItem(randomNumber, JSON.stringify(item));
			alert("The Game has been Saverd to your Vault!");
			window.location.reload();
			
			// Links and Click Submit Events.
			var savingData = getId("submitInfo");
			savingData.addEventListener("click", validate);
	};
	
	
	
	
	
	
	
	
	
}