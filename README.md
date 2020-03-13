## sfAuto

Welcome to sfAuto!

This is a small script which started as a very simple automatic refresh for Case Views within Salesforce.

I'm considering renaming this to sfHelper as it is no longer specific to refreshing the case view and to automation.

<br /><br />
<strong>Case View Refresh Functionality bookmarklet:</strong>

Save the link below as a bookmark in order to activate the automatic refresh functionality. You can click this bookmark from any Case View in order to access the additional functionality.

<a href="javascript:(function(){ var%20script=document.createElement('script'); script.type='text/javascript'; script.src='https://cdn.jsdelivr.net/gh/IDemixI/sfAutoRefresh@master/sfAuto.js'; document.getElementsByTagName('head')[0].appendChild(script); })();">Auto Refresh</a>

<br /><br />
<strong>Grab Case Reference & Email Subject Bookmarklet:</strong>

Save the link below as a bookmark in order to be able to quickly access the Case Reference & Email Subject. You can click this bookmark when viewing any case.

<a href="javascript:(function(){var%20x=window.location.pathname.substring(1,window.location.pathname.length);x=x.slice(0,5)+x.slice(9);var%20refID='ref:_'+'00D201JWt'+'._'+x+':ref';var%20caseNum=document.getElementById('cas2_ileinner').innerText.substring(0,8);var%20caseDesc=document.getElementById('cas14_ileinner').innerText;alert('Case Reference:\n\n'+refID+'\n\n'+'Email Subject:\n\n'+'Case '+caseNum+': '+caseDesc+' - '+refID)})()">Case Reference</a>

<br /><br />
<strong>sfAuto Case Creation Bookmarklet:</strong>

Save the link below as a bookmark in order to be able to quickly create a new Salesforce 'License Request' case via the FME License Planner. This will add a button to create a new case on any task which hasn't been marked as 'Case Created'. You can click this bookmark when viewing the Microsoft Planner - FME Licenses.

<a href="#">sfAutoCC</a>

<br /><br />
If you have any additional requirements or suggestions, please let me know!
