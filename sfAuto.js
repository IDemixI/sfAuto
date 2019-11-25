// Prototype to pad time (if < 10 seconds pads with a 0)
Number.prototype.pad = function (len) {
	return (new Array(len+1).join("0") + this).slice(-len);
}

// Function to insert an element after another by using "nextSibling".
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Function to refresh the list and update the last update timestamp.
function sfUpdate() {
	javascript: ListViewport.instances[uID].refreshList();
	setTimeout(createUpdateItem, 250);
}

// Function to create / update element on page, letting user know when the queue was last updated.
function createUpdateItem() {
	
	// Update refresh button to also display last update time when clicked manually.
	document.getElementById(uID + "_refresh").onclick = ( function() { sfUpdate() });
	var today = new Date();
	var time = today.getHours().pad(2) + ":" + today.getMinutes().pad(2) + ":" + today.getSeconds().pad(2);
	
	// If lastUpdate doesn't exist, create and populate it.
	if (document.getElementById("lastUpdate") == null){
		var node = document.createElement("DIV");
		var spantext = document.createElement("SPAN");
		var arButton = document.getElementById(uID + "_refresh").cloneNode();
		
		node.appendChild(spantext);
		node.style.lineHeight = "25px";
		node.style.fontStyle = "italic";
		node.style.position = "absolute";
		node.style.display = "inline-block";
		node.id = "lastUpdate";
		
		arButton.class = "";
		arButton.setAttribute("style", "position: relative; top: 2px; float: left; margin-right: 6px; width: 22px; height: 20px; background: #dbcfcf; color:white; font-weight:bold;");
		arButton.value = "||";
		arButton.title = "Auto Refresh: On";
		arButton.onclick = ( function() { toggleStatus() });
		
		node.appendChild(arButton);
		insertAfter(document.getElementById(uID + "_listButtons"), node);
	}
	
	var span = document.querySelector('#lastUpdate span');
	span.innerHTML = "Last Updated: " + time;

}

// Simple function to log the user out (Used in conjunction with inactivity timer).
function logout() {
	window.location.replace("https://eu12.salesforce.com/secur/logout.jsp?product=www.salesforce.com");
}

// Stop & Start the auto refresh script.
function toggleStatus(){ //NEED TO STYLE BETWEEN ON AND OFF IN HERE & CHANGE PLAY TO PAUSE, ETC!!!
	if (timer) {
		timer = false;
		clearInterval(loop);
		console.log("Automatic Refresh has been paused");
	} else {
		timer = true;
		loop = setInterval(sfUpdate, refresh);
		console.log("Automatic Refresh has been started");
	}
}

// Checks to make sure the script isn't already running in this tab, before allowing you to run again.
if (typeof sfQueue === 'undefined' || sfQueue === null) {
	var sfQueue = true;
	
	// Grab the uID of the current view from the URL string.
	var uID = window.location.search.split('=')[1];
	
	// Remove any parameters picked up after the uID (Can occur with pagination, etc).
	if (uID.indexOf("&") != -1) { 
		uID = uID.slice(0,uID.indexOf("&"));
	};
	
	// Prompt the user to enter a refresh value (seconds).
	var refresh = prompt("Enter refresh interval (Seconds)", 30);
	
	// Set refresh from seconds to milliseconds (* 1000)
	refresh = refresh * 1000;
	
	// Build the elements on the page (Stop/Start button & last updated text).
	createUpdateItem();
	
	// Start the loop to refresh the screen.
	var timer = true;
	var loop = setInterval(sfUpdate, refresh);
	
} else {
	console.log("Script is already running. Refresh the page to activate script again");
}
