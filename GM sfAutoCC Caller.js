// ==UserScript==
// @name     sfAutoCC GM Loader
// @version  1.0
// @grant    none
// ==/UserScript==

function loadsfAutoCC(){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://cdn.jsdelivr.net/gh/IDemixI/sfAutoRefresh@master/sfAutoCC.js';
	document.getElementsByTagName('head')[0].appendChild(script);
};

setTimeout(loadsfAutoCC, 1000);
