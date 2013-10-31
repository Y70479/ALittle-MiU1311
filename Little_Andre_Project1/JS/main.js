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
	};
	
	// Display Data Function
	function showData() {
		if(localStorage.length === 0) {
			alert("There are no Saved Games in your Vault at this time, so default data has been added.");
			defaultData();
		} else {
			hideForm("on");
			var newDiv = createEl("div");
			newDiv.setAttribute("id", "storedItems");
			document.body.appendChild(newDiv);
			var newFieldSet = createEl("fieldset");
			newFieldSet.setAttribute("id", "infoFieldSet");
			newDiv.appendChild(newFieldSet);
			var newList = createEl("ul");
			newFieldSet.appendChild(newList);
			getId("storedItems").style.display = "block";
			for(var i=0; ls=localStorage.length; i<ls; i++) {
				var newLi = createEl("li");
				var linksLi = createEl("li");
				newList.appendChild(newLi);
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var obj = JSON.parse(value);
				var newSubList = createEl("ul");
				newLi.appendChild(newSubList);
				for(var e in obj) {
					var newSubLi = createEl("li");
					newSubList.appendChild(newSubLi);
					var optSubText = obj[e][0]+" "+obj[e][1];
					newSubLi.innerHTML = optSubText;
					newSubList.appendChild(linksLi);
				}
				editDeleteLinks(localStorage.key(i), linksLi);
			}
		}
	};
	
	// Add Platform images.
	function getImage(pngName, newSubList) {
		var imageLi = createEl("li");
		newSubList.appendChild(imageLi);
		var newImage = createEl("img");
		var setSrc = newImage.setAttribute("src", "images/"+ pngName + ".png");
		imageLi.appendChild(newImage);
	};
	
	// Default Data Load Function.
	function defaultData() {
		for(var m in json) {
			var randomNumber = Math.floor(Math.random()*100000000001);
			localStorage.setItem(randomNumber, JSON.stringify(json[m]));
		}
	};
	
	
	
	
	
	
	
	
	
	// Default Variables
	var consoles = ["--Select A Platform--", "PlayStation 3", "XBox 360", "Wii U", "3DS"],
		addValue,
		errMsg = getId("errors");
		
	// Links and Click Submit Events.
	var savingData = getId("submitInfo");
	savingData.addEventListener("click", validate);
	var displayingData = getId("displayData");
	displayingData.addEventListener("click", showData);
		
};