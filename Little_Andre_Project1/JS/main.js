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
	
	// Edit and Delete Links Function
	function editDeleteLinks() {
		// Edit Link
		var editLink = createEl("a");
		editLink.href = "#";
		editLink.key = key;
		var textForEdit = "Edit Game Info";
		editLink.addEventListener("click", editInfo);
		editLink.innerHTML = textForEdit;
		linksLi.appendChild(editLink);
		// Line Break
		var breakEl = createEl("br");
		linksLi.appendChild(breakEl);
		// Delete Link
		var deleteLink = createEl("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var textForDelete = "Delete Game Info"
		deleteLink.addEventListener("click", deleteInfo);
		deleteLink.innerHTML = textForDelete;
		linksLi.appendChild(deleteLink);
	};
	
	// Edit Item Function.
	function editInfo() {
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		hideForm("off");
		// Populating the Form Field.
		getId("platform").value = items.platforms[1];
		getId("name").value = items.titles[1];
		getId("genre").value = items.genres[1];
		var radios = document.forms[0].add;
		for(var i=0;i<radios.length; i++) {
			if(radios[i].value === "NSTC" && item.regions === "NSTC") {
				radios[i].setAttribute("checked", "checked");
			} else {
				if(radios[i].value === "PAL" && item.regions === "PAL") {
				radios[i].setAttribute("checked", "checked");
			}
		};
		getId("rating").value = items.ratings[1];
		getId("condition").value = items.conditions[1];
		getId("date").value = items.releaseDates[1];
		// Remove initial listener from the submit button.
		savingData.removeEventListener("click", saveData);
		getId("submitInfo").value = "Edit Game Info";
		var editVGameInfo = getId("submitInfo");
		editVGameInfo.addEventListener("click", validate);
		editVGameInfo.key = this.key;
	};
	
	// Delete item Function. 
	function deleteInfo() {
		var ask = confirm("Are you sure want to delete this game from your vault?");
		if(ask) {
			localStorage.removeItem(this.key);
			window.location.reload();
		} else {
			alert("Game was not Deleted!")
		}
	};
	
	// Clear Data Function.
	function clearingData() {
		if(localStorage.length === 0) {
			alert("There are no games in your vault to clear.");
		} else {
			alert("All saved games in your vault has been cleared.");
			localStorage.clear();
			window.location.reload();
			return false;
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