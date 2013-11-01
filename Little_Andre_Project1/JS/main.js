/*
Andre Little
Class: MiU
Term: 1310
Completed Date: 10/03/2013
Project 1: Mega Weight Lost Project - Feature, Search, Browse

*/

// The beginning of the Dom.
window.addEventListener("DOMContentLoaded", function(){
        
        /* ------ Shortcuts ------ */
        // This will get the Element by Id.
        var getId = function (x){
                var elId = document.getElementById(x);
                return elId;
        };
        
        var getTag = function (x){
                var elTag = document.getElementsByTagName(x);
                return elTag;
        };
        
        var createEl = function (x){
                var makeEl = document.createElement(x);
                return makeEl;
        }
        /* ------ End of the Shortcuts ------ */
        
        // Find Value of Picked Radio.
        function getSelectedRadio (){
                var radio = document.forms[0].add
                for (var i=0; i<radio.length; i++){
                        if (radio[i].checked){
                                addValue = radio[i].value
                        }
                }
        };
        
         // Hide Form Data.
        function hideForm(f){
                switch(f){
                        case "on":
                                getId("docForm").style.display = "none";
                                getId("clearInfo").style.display = "inline";
                                getId("displayInfo").style.display = "none";
                                getId("addNewMeal").style.display = "inline";
                                break;
                        case "off":
                                getId("docForm").style.display = "block";
                                getId("clearInfo").style.display = "inline";
                                getId("displayInfo").style.display = "inline";
                                getId("addNewMeal").style.display = "none";
                                getId("storedItems").style.display = "none";
                                break;
                        default:
                                return false;
                
                }
        };
        
        
        
        // Save Data Function
        function dataSaved(key){
                if (!key){
                        var randomNum = Math.floor(Math.random()*1000000001);
                } else {
                        randomNum = key;
                }
                // Get all Form data.
                getSelectedRadio ();
                var item = {};
                        item.platforms = ["PlatForm:", getId("platform").value];
                        item.times = ["Title:", getId("name1").value];
                        item.genres = ["Genre:", getId("genre").value];
                        item.rating = ["ESRB Rating:", getId("ratings").value];
                        item.date = ["Release Date:", getId("dates").value];
                        item.conditions = ["Condition of the Game:", getId("condition").value];
                        item.regions = ["Region:", addValue];
                        item.infoAdd = ["Additional Info:", getId("addInfo").value];
                        // Save Data to local Storage.
                        localStorage.setItem(randomNum, JSON.stringify(item));
                        alert("Game has been Saved!");
                        window.location.reload();        
        };
        
        // Display Data Funtion
        function gotData() {
                if (localStorage.length === 0){
                        alert("There is no User Data saved at this time, so default data has been added.");
                        hideForm("on");
                        defaultData();
                };
                        hideForm("on");
                        var newDiv = createEl("Div");
                        newDiv.setAttribute("id", "storedItems");
                        document.body.appendChild(newDiv);
                        var newFieldSet = createEl("fieldset");
                        newFieldSet.setAttribute("id", "infoFieldSet");
                        newDiv.appendChild(newFieldSet);
                        var newList = createEl("ul");
                        newFieldSet.appendChild(newList);
                        getId("storedItems").style.display = "block"; 
                        for (var i=0, d=localStorage.length; i<d; i++){
                                var newLi = createEl("li");
                                var linksLi = createEl("li"); // This is new
                                newList.appendChild(newLi);
                                var key = localStorage.key(i);
                                var value = localStorage.getItem(key);
                                var obj = JSON.parse(value);
                                var newSubList = createEl("ul");
                                newLi.appendChild(newSubList);
                                getImage(obj.times[1], newSubList);
                                for (var e in obj){
                                        var newSubLi = createEl("li");
                                        newSubList.appendChild(newSubLi);
                                        var optSubText = obj[e][0]+" "+obj[e][1];
                                        newSubLi.innerHTML = optSubText;
                                        newSubList.appendChild(linksLi); // This is New
                                }
                                editDeleteLinks(localStorage.key(i), linksLi); // This is new.
                        }
        };
        
        //Add Meal Time Images
        function getImage(pngName, newSubList){
                var imageLi = createEl("li");
                newSubList.appendChild(imageLi);
                var newImage = createEl("img");
                var setSrc = newImage.setAttribute("src", "images/"+ pngName + ".png");
                imageLi.appendChild(newImage);
                
        }
        
        
        //Default Data Load Function
        function defaultData(){
                for(var m in json){
                        var randomNum = Math.floor(Math.random()*1000000001);
                        localStorage.setItem(randomNum, JSON.stringify(json[m]));
                }
        }
        

        //Edit and Delete Links Function // This is new 
                // Edit Function
        function editDeleteLinks(key, linksLi){
                var editLink = createEl("a");
                editLink.href = "#";
                editLink.key = key;
                var textForEdit = "Edit Game Info";
                editLink.addEventListener("click", editItem);
                editLink.innerHTML = textForEdit;
                linksLi.appendChild(editLink);
                
                // Line Break
                var breakEl = createEl("br");
                linksLi.appendChild(breakEl);
                
                //Delete Function
                var deleteLink = createEl("a");
                deleteLink.href = "#";
                deleteLink.key = key;
                var textForDelete = "Delete Meal";
                deleteLink.addEventListener("click", deleteItem);
                deleteLink.innerHTML = textForDelete;
                linksLi.appendChild(deleteLink);        
        };
        
        function editItem(){
                var value = localStorage.getItem(this.key);
                var item = JSON.parse(value);
                
                hideForm("off");

                // Populating the Form field
                getId("platform").value = item.platforms[1];
                getId("name1").value = item.times[1];
                getId("genre").value = item.genres[1];
                getId("rating").value = item.ratings[1];
                getId("date").value = item.dates[1];
                getId("addInfo").value = item.infoAdd[1];
                getId("condition").value = item.conditions[1];
                var radio = document.forms[0].add
                for (var i=0; i<radio.length; i++){
                        if (radio[i].value == "NTSC" && item.regions == "NTSC"){
                                radio[i].setAttribute("checked", "checked");
                        } else
                        if (radio[i].value == "PAL" && item.regions == "PAL"){
                                radio[i].setAttribute("checked", "checked");
                        }
                };                
        
                // Remove Initial listener from the submit button..
                saveData.removeEventListener("click", dataSaved);
                getId("submitInfo").value = "Edit Game Info";
                var editMeal = getId("submitInfo");
                editMeal.addEventListener("click", validate);
                editMeal.key = this.key;
                
                
        };
        
        //Delete Item
        function deleteItem(){
                var ask = confirm("Are you sure you want to delete this Game?");
                if (ask){
                        localStorage.removeItem(this.key);
                        window.location.reload();
                } else {
                        alert("Game was not deleted.")
                }
        }

        //Clear Data Function
        function dataCleared(){
                if (localStorage.length === 0){
                        alert("There is no data to be cleared in your Vault.")
                } else {
                        alert("Your Vault has been Cleared.")
                        localStorage.clear();
                        window.location.reload();
                        return false;
                }
        };
        
        function validate(e){
                var getPlatforms = getId("platform");
                var getTitles = getId("name1");
                var getGenres = getId("genre");
                var getRegion = getId("region");
                var getRating = getId("rating");
 
                errMsg.innerHTML = "";
                getPlatforms.style.border = "1px solid black";
                getTitles.style.border = "1px solid black";
                getGenres.style.border = "1px solid black";
                getRegion.style.border = "1px solid black";
                getRating.style.border = "1px solid black";
                
                //Error Message
                var messageAry = [];
                if (getPlatforms.value == "--Select A Platform--"){
                        var platformError = "Please Select a Platform";
                        getPlatforms.style.border = "1px solid red";
                        messageAry.push(platformError);
                }
                if (getTitles.value == ""){
                        var titleError = "Please Enter the Title of the Game";
                        getTitles.style.border = "1px solid red";
                        messageAry.push(titleError);
                }
                if (getGenres.value == "--Select a Genre--"){
                        var genreError = "Please Select a Genre";
                        getGenres.style.border = "1px solid red";
                        messageAry.push(genreError);
                }
                if (getRegion.value == ""){
                        var regionError = "Pleae Select a Region.";
                        getRegion.style.border = "1px solid red";
                        messageAry.push(regionError);
                }
                if (getRating.value == "--Game ESRB Rating--"){
                        var ratingError = "Please Select the right ESRB Rating.";
                        getRating.style.border = "1px solid red";
                        messageAry.push(ratingError);
                }

                // If any Errors..
                if (messageAry.length >= 1){
                        for (var i=0, j=messageAry.length; i<j; i++){
                                var text = createEl("li");
                                text.innerHTML = messageAry[i];
                                errMsg.appendChild(text);
                        }
                        e.preventDefault();
                        return false;
                } else {
                        dataSaved(this.key);
                }
                
        }
        
        // Default Variables
        var mealTimes = ["--Select A Platform--", "PlayStation 3", "XBox 360", "Wii U"],
                addValue,
                errMsg = getId("errors");
        //Links and Click Submit Events.
        var displayData = getId("displayInfo");
        displayData.addEventListener("click", gotData);
        var clearData =        getId("clearInfo");
        clearData.addEventListener("click", dataCleared);
        var saveData = getId("submitInfo");
        saveData.addEventListener("click", validate);        
});