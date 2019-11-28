## sfAutoRefresh

Welcome to the sfAutoRefresh!

This is a simple script to automatically refresh Case View within Salesforce.

I'm considering renaming this to sfHelper as it is no longer specific to refreshing the case view.

Save the link below as a bookmark in order to be able to quickly access the Case Reference & Email Subject. You can click this bookmark when viewing any case.

<a href="javascript:(function(){alert('test');})">test</a>

[Grab Case Reference & Email Subject Bookmarklet](javascript:(function(){var%20x=window.location.pathname.substring(1,window.location.pathname.length);x=x.slice(0,5)+x.slice(9);var%20refID="ref:_"+"00D201JWt"+"._"+x+":ref";var%20caseNum=document.getElementById("cas2_ileinner").innerText;var%20caseDesc=document.getElementById("cas14_ileinner").innerText;alert("Case Reference:\n\n"+refID+"\n\n"+"Email Subject:\n\n"+"Case "+caseNum+": "+caseDesc+" - "+refID)})())

Save the link below as a bookmark in order to activate the automatic refresh functionality. You can click this bookmark from any Case View in order to access the additional functionality.

[Auto Refresh Cases](javascript:(function(){ var%20script=document.createElement('script'); script.type='text/javascript'; script.src='https://cdn.jsdelivr.net/gh/IDemixI/sfAutoRefresh@master/sfAuto.js'; document.getElementsByTagName('head')[0].appendChild(script); })();)
