let sfURL = 'https://eu12.salesforce.com/500/e?retURL=%2F500%2Fo&RecordType=012200000000Ovb&ent=Case';

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
	var urlparameter = defaultvalue;
	if(window.location.href.indexOf(parameter) > -1){
		urlparameter = getUrlVars()[parameter];
	}
	return urlparameter;
}

if (getUrlParam('FME')) {
	
	if (document.readyState === "complete") { // Wait for the page to finish loading
		// If FME Param = 1 then submit the case instantly.
		if (getUrlParam('FME') == 1) {
			document.getElementsByName("save")[0].click();
		}
	}

} else { // If we're on the FME License Planner:
	
	if (document.readyState === "complete") { // Wait for the page to finish loading
		
		// Add button to planner which will create a new Salesforce Case with the license information contained within the Task.

		let newLicenseBucket = document.getElementById("d6XaWuEKZUOrtfg-X6_b_ZYAHwSx"); // ID of 'New Licensing' Bucket on FME Planner.
		let urlID = newLicenseBucket.getElementsByClassName("taskBoardCard");
		let customerName = newLicenseBucket.getElementsByClassName("title");
		let style = document.createElement('style');
		style.innerHTML =
			'.caseButton {' +
				'font-size: 12px;' +
				'border-radius: 6px;' +
				'background-color: rgb(170, 227, 131);' +
				'padding: 3px;' +
				'cursor: pointer;' +
				'position: absolute;' +
				'top: 8px;' +
				'right: 5px;' +
				'border: solid thin silver;' +
				'z-index: 99;' +
			'}';

		// Get the first script tag
		let ref = document.querySelector('script');

		// Insert our new styles before the first script tag
		ref.parentNode.insertBefore(style, ref);

		for (let i = 0; i < urlID.length; i++) {

			let checklistItems = urlID[i].getElementsByClassName("checklistItem");
			let caseStatus = true;

			for (let x = 0; x < checklistItems.length; x++) {
				try {
					if (checklistItems[x].firstChild.title == 'Support Case Created - Support') { caseStatus = false };
				} catch(err) {
					console.log("Error: " + err.message);
				}
			}

			//FOR TEST PURPOSES:
			//caseStatus = false;

			if (urlID[i].id && caseStatus == false){

				//console.log(customerName[i].innerHTML + " - " + "https://tasks.office.com/1spatial.com/en-gb/Home/Task/" + urlID[i].id);

				var caseDiv = document.createElement('div');
				var caseButton = document.createElement('span'); 

				let cName = customerName[i].innerHTML;

				caseButton.innerHTML = "Create Case";
				caseButton.onclick = function() {setTimeout(function(){genCase(cName)},1000)};
				caseButton.classList.add("caseButton");
				caseDiv.appendChild(caseButton);

				try {
					urlID[i].prepend(caseDiv);
				} catch(err) {
					console.log("Error: " + err.message);
				}

			}

		}

		function genCase(cName) {

			// Grab License Information from the relevant Task via Planner.
			let licenseInfo = '';
			
			let type = '&' + encodeURIComponent('cas5=Licence Request');
			let status = '&' + encodeURIComponent('cas7=Acknowledged');
			let application = '&' + encodeURIComponent('00N20000000smEB=FME');
			let subject = '&' + encodeURIComponent('cas14=FME License Request - ' + cName);
						
			if (document.getElementsByClassName("ms-TextField-field")[3].placeholder != "Add an item") {
				licenseInfo = document.getElementsByClassName("ms-TextField-field")[3].value;
			} else {
				licenseInfo = document.getElementsByClassName("description-hyperlinks isDialogStyle")[0].innerText;
			}
			
			console.log(licenseInfo.indexOf('Product:') > 1 ? licenseInfo.substring(licenseInfo.indexOf('Product:')) : 'No License Information Available');
			console.log(licenseInfo.substring(licenseInfo.indexOf('mailto:')).substring(7,licenseInfo.substring(licenseInfo.indexOf('mailto:')).indexOf('"')).match(/^([^@]*)@/)[1].replace("."," "));
			
			let customer = '&' + encodeURIComponent('cas3=TEST');
			let description = '&' + encodeURIComponent(licenseInfo.substring(licenseInfo.indexOf('Product:')));

			this.document.location.href = sfURL + "&FME=0" + customer + type + status + application + subject + description;

		}
	}
} 


// Notes & such.

//window.location.href = 'https://eu12.salesforce.com/500/e?retURL=%2F500%2Fo&RecordType=012200000000Ovb&ent=Case'; - URL to open New UK Support Case
//this.document.location.href = URL;
//https://www.koskila.net/form-links-planner-tasks/
//https://tasks.office.com/1spatial.com/en-GB/Home/Planner#/plantaskboard?groupId=aa41d79b-7cbb-4b64-b094-4ea3b6a3091a&planId=l2pbPkT0JkShbOl7FHfvFpYAAFjs - URL to FME Planner
//http://writeforce.blogspot.com/2012/12/prepopulating-fields-using-url-hacking.html


//Logic will be... On planner, click create case button if there is a case to create. It looks to see if License info exists.. if not it will stop.
//If license info exists it will grab the relevant info (Customer Name & License Details) and redirect to Salesforce UK Case Creation Page
//This info will be pulled into the relevant fields and the case opened. This means GM needs to be running on the new case URL with "&FME" as part of the url, so it only reads from that point!
//Need to create a new git repo for this and upload the completed scrip there.

//TODO:

// Grab any email addresses within the license and let user select which one to use (simple modal with dropdown?)
// Add logic to stop case creation if license info is missing (or contact name for that matter? Give the choice to continue or not for both of these!
// Tick off the "Create Case" checkbox before leaving Planner so that the create case button does not appear next load.
