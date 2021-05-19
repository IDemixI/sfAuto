// ==UserScript==
// @name     sfAutoCC GM Loader
// @version  1.0
// @grant    none
// @match https://1spatial.my.salesforce.com/500/e?retURL=%2F500%2Fo&RecordType=012200000000Ovb&ent=Case&FME*
// @match https://tasks.office.com/*
// ==/UserScript==

function loadsfAutoCC(){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://cdn.jsdelivr.net/gh/IDemixI/sfAutoRefresh@master/sfAutoCC.js';
	document.getElementsByTagName('head')[0].appendChild(script);
};

setTimeout(loadsfAutoCC, 2500);

console.log("sfAutoCC Loaded...");
