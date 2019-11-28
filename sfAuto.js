// Load all external resources.
function loadResources(){
	
	// Import Style Sheet
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://cdn.jsdelivr.net/gh/IDemixI/sfAutoRefresh@master/notifications.js';
	document.getElementsByTagName('head')[0].appendChild(script);
	
	// Import sfAuto Style Sheet
	var cssURL = "https://cdn.jsdelivr.net/gh/IDemixI/sfAutoRefresh@master/style.css";
	var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", cssURL);
	document.getElementsByTagName("head")[0].appendChild(fileref)
	
};

function setNotification(message) {
	
	const myNotification = window.createNotification({
		closeOnClick: true, // close on click
		displayCloseButton: false, // displays close button
		positionClass: 'nfc-top-right', // nfc-top-left | nfc-top-right | nfc-bottom-left | nfc-bottom-right
		onclick: false, // callback
		showDuration: 2500, // timeout in milliseconds
		theme: 'info' // success, info, warning, error, and none
	});
	
	if (message !== undefined || typeof message !== 'undefined') {
		myNotification({
			title: 'Notification',
			message: message
		});
	}
}

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
	
	// Grab current case count.
	var currentCaseCount = document.getElementById("ext-gen12").childElementCount;
	
	// If record is empty, get rid of the "empty" count.
	if (document.getElementById("ext-gen12").children[0].innerText == "No records to display.") {
		currentCaseCount = 0;
	}

	// Reload the case panel
	javascript: ListViewport.instances[uID].refreshList();
	
	// Send original count and compare new count (Gather other info and fire off message if required)
	setTimeout(function() { checkCases(currentCaseCount) }, 250);
	
	// last update time and other visual elements refresh
	setTimeout(createUpdateItem, 250);
}

// Function to create / update element on page, letting user know when the queue was last updated.
function createUpdateItem() {
	
	// Update refresh button to also display last update time when clicked manually.
	document.getElementById(uID + "_refresh").onclick = ( function() { sfUpdate() });
	var today = new Date();
	var time = today.getHours().pad(2) + ":" + today.getMinutes().pad(2) + ":" + today.getSeconds().pad(2);
	
	// If lastUpdate div and its contents doesn't exist, create and populate them.
	if (document.getElementById("lastUpdate") == null){
		var node = document.createElement("div");
		var spantext = document.createElement("span");
		var arButton = document.getElementById(uID + "_refresh").cloneNode();
		
		node.id = "lastUpdate";
		arButton.id = "toggleRefresh";
		arButton.className = "btn toggle on";
		arButton.value = "||";
		arButton.title = "Auto Refresh: On";
		arButton.onclick = ( function() { toggleStatus() });
		
		node.appendChild(spantext);
		node.appendChild(arButton);
		
		insertAfter(document.getElementById(uID + "_listButtons"), node);
	}
	
	var span = document.querySelector('#lastUpdate span');
	span.innerHTML = "Last Updated: " + time;

}

// Inactivity timer used to log the user out after a defined period of inactivity (default 4 hours).
var inactivityTime = function (x) {
    
	var activeTime;
    window.onload = resetTimer;
	var setInactiveTimeout = hours(x);
	
	
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

	function hours(ms){
		var hours = ((ms * 1000) * 60) * 60;
		return hours;
	}

	function logout() {
		window.location.replace("https://eu12.salesforce.com/secur/logout.jsp?product=www.salesforce.com");
	}

    function resetTimer() {
        clearTimeout(activeTime);
        activeTime = setTimeout(logout, setInactiveTimeout)
    }
}

// Stop & Start the auto refresh script.
function toggleStatus(){
	if (timer) {
		timer = false;
		clearInterval(loop);
		setNotification('Automatic Refresh has been paused');
		// Play button etc
		toggleRefresh = document.getElementById("toggleRefresh");
		toggleRefresh.classList.remove("on");
		toggleRefresh.classList.add("off");
		toggleRefresh.value = "►";
		toggleRefresh.title = "Auto Refresh: Off";
	} else {
		timer = true;
		loop = setInterval(sfUpdate, refresh);
		setNotification('Automatic Refresh has been started');
		// Pause button etc
		toggleRefresh = document.getElementById("toggleRefresh");
		toggleRefresh.classList.remove("off");
		toggleRefresh.classList.add("on");
		toggleRefresh.value = "||";
		toggleRefresh.title = "Auto Refresh: On";
	}
}

// Case Status Check
function checkCases(currentCaseCount) {
	
	//console.log("Original: " + currentCaseCount);
	
	// Grab new case count.
	var newCaseCount = document.getElementById("ext-gen12").childElementCount;

	//console.log("New: " + newCaseCount);
	
	/*
	// Build simple array of cases.
	
	var newCaseCount = document.getElementById("ext-gen12").childElementCount;
	var caseArray = [];

	for (i = 0; i < newCaseCount; i++) {
		caseArray[i] = document.getElementById("ext-gen12").children[i].innerText;
		caseArray[i] = caseArray[i].split("	");
		
		for (x = 0; x < caseArray[i].length; i++) {
			caseArray[i][x] = caseArray[i][x].replace(/[+()\r\n\t\f\v]/g, '');
		}
	}
	
	*/

	if (currentCaseCount > 0 && document.getElementById("ext-gen12").children[0].innerText !== "No records to display."){

		if (newCaseCount > currentCaseCount) {
			// Case number has changed. Push Desktop Notification
			notifyMe('New Case in Queue!');
			//notifyMe('A New ' + type + ' has been received.' + '\n' + 'Case: ' + caseNum + ' - ' + desc + '\n\n' + 'Total Cases in Queue: ' + totalCases);
		}
	}

	// global array? can use the console loop above in order to store the info in an array - just don't know how I'm going to compare an original to the new... where can I store original? hence global...

}

// Notification function
function notifyMe(body, name, icon) {
	
	if (name === undefined || typeof name === 'undefined') {
		var name = 'Salesforce Support Queue Notification';
	}
		
	if (icon === undefined || typeof icon === 'undefined') {
		var icon = 'https://130e178e8f8ba617604b-8aedd782b7d22cfe0d1146da69a52436.ssl.cf1.rackcdn.com/salesforce-security-alert-api-error-exposed-marketing-data-showcase_image-6-a-11278.jpg';
	}
	
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            var notify = new Notification(name, {
				body: body ,
                icon: icon
            });
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here
                    var notify = new Notification(name, {
                        body: body ,
                        icon: icon
                    });
                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}

// Checks to make sure the script isn't already running in this tab, before allowing you to run again.
if (typeof sfQueue === 'undefined' || sfQueue === null) {
	
	// Import external resources
	loadResources()
	
	// Mark the script as currently running.
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
	
	// Activate the inactivity timer with a timeout set to 4 hours.
	inactivityTime(4);
	
	// Start the loop to refresh the screen.
	var timer = true;
	var loop = setInterval(sfUpdate, refresh);
	
	// Initialise notifications
	setTimeout(setNotification, 500);
	
} else {
	console.log("Script is already running. Refresh the page to activate script again");
}