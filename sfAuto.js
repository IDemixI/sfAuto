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
		
		arButton.id = "toggleRefresh";
		arButton.class = "";
		arButton.setAttribute("style", "position: relative; top: 2px; float: left; margin-right: 6px; width: 22px; height: 20px; background: rgb(240, 240, 244); color:black; font-weight:bold;");
		arButton.value = "||";
		arButton.title = "Auto Refresh: On";
		arButton.onclick = ( function() { toggleStatus() });
		
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
		console.log("Automatic Refresh has been paused");
		// Play button etc
		toggleRefresh = document.getElementById("toggleRefresh");
		toggleRefresh.style.background = "#32cc32";
		toggleRefresh.style.color = "white";
		toggleRefresh.value = "►";
		toggleRefresh.title = "Auto Refresh: Off";
	} else {
		timer = true;
		loop = setInterval(sfUpdate, refresh);
		console.log("Automatic Refresh has been started");
		// Pause button etc
		toggleRefresh = document.getElementById("toggleRefresh");
		toggleRefresh.style.background = "rgb(240, 240, 244)";
		toggleRefresh.style.color = "black";
		toggleRefresh.value = "||";
		toggleRefresh.title = "Auto Refresh: On";
	}
}

// Notification function
function notifyMe() {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            var notify = new Notification('Hi there!', {
                body: 'How are you doing?',
                icon: 'https://image.shutterstock.com/image-vector/notification-icon-vector-material-design-260nw-759841507.jpg',
            });
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here
                    var notify = new Notification('Hi there!', {
                        body: 'How are you doing?',
                        icon: 'https://image.shutterstock.com/image-vector/notification-icon-vector-material-design-260nw-759841507.jpg',
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
	
} else {
	console.log("Script is already running. Refresh the page to activate script again");
}
