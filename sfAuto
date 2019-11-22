// Prototype to pad time (if < 10 seconds pads with a 0)
Number.prototype.pad = function (len) {
	return (new Array(len+1).join("0") + this).slice(-len);
}

// Checks to make sure the script isn't already running in this tab, before allowing you to run again.
if (typeof sfQueue === 'undefined' || sfQueue === null) {
	var sfQueue = true;
	var uID = window.location.search.split('=')[1];
	var refresh = prompt("Enter refresh interval (Seconds)", 30);
	// Set refresh from seconds to milliseconds ( * 1000)
	refresh = refresh * 1000;
	createUpdateItem();
	setInterval(sfUpdate, refresh);
} else {
	console.log("Script is already running. Refresh the page to activate script again");
}

// Function to refresh the list and update the last update timestamp.
function sfUpdate() {
	javascript: ListViewport.instances[uID].refreshList();
	setTimeout(createUpdateItem, 250);
}

// Function to create element on page, letting user know when the queue was last updated.
function createUpdateItem() {
	// Update refresh button to also display last update time when clicked manually.
	document.getElementById(uID + "_refresh").onclick = ( function() { sfUpdate() });
	var today = new Date();
	var time = today.getHours().pad(2) + ":" + today.getMinutes().pad(2) + ":" + today.getSeconds().pad(2);
	var node = document.createElement("LI");
	var textnode = document.createTextNode("Last Updated: " + time);
	node.appendChild(textnode);
	node.style.lineHeight = "22px";
	node.style.fontStyle = "italic";
	node.id = "lastUpdate";
	node.className = "lastItem";
	document.getElementById(uID + "_listButtons").lastChild.appendChild(node);
}