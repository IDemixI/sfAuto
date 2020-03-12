// ==UserScript==
// @name     sfAuto GM Loader
// @version  1.0
// @grant    none
// @match https://eu12.salesforce.com/500*
// ==/UserScript==

function loadsfAuto(){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://cdn.jsdelivr.net/gh/IDemixI/sfAutoRefresh@master/sfAuto.js';
	document.getElementsByTagName('head')[0].appendChild(script);
};

setTimeout(loadsfAuto, 1000);

console.log("sfAuto Loaded...");
