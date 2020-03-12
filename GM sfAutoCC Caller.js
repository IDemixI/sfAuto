// ==UserScript==
// @name     sfAutoCC GM Loader
// @version  1.0
// @grant    none
// @match https://eu12.salesforce.com/500/e?retURL=%2F500%2Fo&RecordType=012200000000Ovb&ent=Case&FME*
// @match https://tasks.office.com/1spatial.com/en-GB/Home/Planner#/plantaskboard?groupId=aa41d79b-7cbb-4b64-b094-4ea3b6a3091a&planId=l2pbPkT0JkShbOl7FHfvFpYAAFjs
// ==/UserScript==

function loadsfAutoCC(){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://cdn.jsdelivr.net/gh/IDemixI/sfAutoRefresh@master/sfAutoCC.js';
	document.getElementsByTagName('head')[0].appendChild(script);
};

setTimeout(loadsfAutoCC, 2500);

console.log("sfAutoCC Loaded...");
