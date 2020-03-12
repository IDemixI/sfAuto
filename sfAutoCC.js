let sfURL = 'https://eu12.salesforce.com/500/e?retURL=%2F500%2Fo&RecordType=012200000000Ovb&ent=Case';
let mpURL = 'https://tasks.office.com/1spatial.com/en-GB/Home/Planner#/plantaskboard?groupId=aa41d79b-7cbb-4b64-b094-4ea3b6a3091a&planId=l2pbPkT0JkShbOl7FHfvFpYAAFjs'

//if(this.document.location.href == sfURL) { // Are we on the Salesforce page? 
if (getUrlParam('FME','Empty') = true) {
	
	if (document.readyState === "complete") { // Wait for the page to finish loading
	
		// Fill Contact Name
		function fillContactName(){
			let input = document.getElementById("cas3");
			input.value = `${customer}`;
		}

		// Fill Case Type
		function fillCaseType(){
			let input = document.getElementById("cas5");
			input.selectedIndex = 5;
		}

		// Fill Application
		function fillApplication(){
			let input = document.getElementById("00N20000000smEB");
			input.selectedIndex = 27;
		}

		// Fill Status
		function fillStatus(){
			let input = document.getElementById("cas7");
			input.selectedIndex = 1;
		}

		// Fill Subject
		function fillSubject(){
			let input = document.getElementById("cas14");
			input.value = `FME License Request - ${customer}`;
		}

		// Fill Description
		function fillDescription(){
			let input = document.getElementById("cas15");
			input.value = `Generation of FME License for ${customer}\n\n${license}`;
		}

		function getUrlParam(parameter, defaultvalue){
			var urlparameter = defaultvalue;
			if(window.location.href.indexOf(parameter) > -1){
				urlparameter = getUrlVars()[parameter];
			}
			return urlparameter;
		}

		function autoCase() {

			fillContactName();
			fillCaseType();
			fillStatus();
			fillApplication();
			fillSubject();
			fillDescription();

			// Click the button to create the case.
			//document.getElementsByName("save")[0].click();

		}

		let customer = getUrlParam('Customer','Empty');
		//let license = `Product:  FME Database Edition - Fixed\nLicensed to:  ${customer}\nSerial #:  ABCD-1234-EFGH\nLicence Use:  Production\nQuantity:  3.0`;
		let license = getUrlParam('Description', 'Empty');
		
		autoCase();
	
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
				caseButton.onclick = function() {setTimeout(function(){getLic(cName)},1000)};
				caseButton.classList.add("caseButton");
				caseDiv.appendChild(caseButton);

				try {
					urlID[i].prepend(caseDiv);
				} catch(err) {
					console.log("Error: " + err.message);
				}

			}

		}

		function getLic(cName) {

			// Grab License Information from the relevant Task via Planner.
			let licenseInfo = '';
			if (document.getElementsByClassName("ms-TextField-field")[3].placeholder != "Add an item") {
				licenseInfo = document.getElementsByClassName("ms-TextField-field")[3].value;
				console.log(cName);
				console.log(licenseInfo.indexOf('Product:') > 1 ? licenseInfo.substring(licenseInfo.indexOf('Product:')) : 'No License Information Available');
				//alert(cName + "\n" + (licenseInfo.indexOf('Product:') > 1 ? licenseInfo.substring(licenseInfo.indexOf('Product:')) : 'No License Information Available'));
				let description = licenseInfo.substring(licenseInfo.indexOf('Product:'));
				this.document.location.href = sfURL + "&FME=true" + "&Customer=" + encodeURIComponent(cName) + "&Description=" + encodeURIComponent(description);
			} else {
				licenseInfo = document.getElementsByClassName("description-hyperlinks isDialogStyle")[0].innerText;
				console.log(cName);
				console.log(licenseInfo.indexOf('Product:') > 1 ? licenseInfo.substring(licenseInfo.indexOf('Product:')) : 'No License Information Available');
				//alert(cName + "\n" + (licenseInfo.indexOf('Product:') > 1 ? licenseInfo.substring(licenseInfo.indexOf('Product:')) : 'No License Information Available'));
				let description = licenseInfo.substring(licenseInfo.indexOf('Product:'));
				this.document.location.href = sfURL + "&FME=true" + "&Customer=" + encodeURIComponent(cName) + "&Description=" + encodeURIComponent(description);
			}
		}
	}
} 


// Notes & such.

//window.location.href = 'https://eu12.salesforce.com/500/e?retURL=%2F500%2Fo&RecordType=012200000000Ovb&ent=Case'; - URL to open New UK Support Case
//this.document.location.href = URL;
//https://www.koskila.net/form-links-planner-tasks/
//https://tasks.office.com/1spatial.com/en-GB/Home/Planner#/plantaskboard?groupId=aa41d79b-7cbb-4b64-b094-4ea3b6a3091a&planId=l2pbPkT0JkShbOl7FHfvFpYAAFjs - URL to FME Planner

//Logic will be... On planner, click create case button if there is a case to create. It looks to see if License info exists.. if not it will stop.
//If license info exists it will grab the relevant info (Customer Name & License Details) and redirect to Salesforce UK Case Creation Page
//This info will be pulled into the relevant fields and the case opened. This means GM needs to be running on the new case URL with "&FME" as part of the url, so it only reads from that point!
//Need to create a new git repo for this and upload the completed scrip there.
