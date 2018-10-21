
/*
 * This is main.js which is referenced directly from within
 * a <script> node in index.html
 */

// "use strict" means that some strange JavaScript things are forbidden
"use strict";

// this shall be the function that generates a new path object
var makePath = function(x) {
	var a = "";
	var i = 0;
	return function(y) {
		if (y == undefined) {
			return a
		} else {
			i = i+1;
			if (i < 3) {
				a = a + y + x;
			} else {
				if (i < 4) {
					a = a + y;
				};
			};
			return a;	
		};
	};
}

var aver = function(z) {
	return z;
};

// the main() function is called when the HTML document is loaded
var main = function() {

    ////////////////////////////////////////////////////////////
    //create a path, add a few points on the path, and print it
    var path1 = makePath("/");

    path1("A"); 
    path1("B"); 
    path1("C");

    var path2 = makePath("-->");
    path2("Berlin"); 
    path2("San Francisco"); 
    path2("Vancouver");

    var path3 = makePath(",");

    path3("A");
    path3("B");
    path3("C");

    window.console.log("path 1 is " + path1() );
    window.console.log("path 2 is " + path2() );
    window.console.log("path 3 is " + path3() );

    ////////////////////////////////////////////////////////////
    // second example
    window.console.log('This is the start.');

    // sets a timeout and calls the callbackFunction
    // after the timeout. 
    // The specified callback is 0!!! milliseconds
    setTimeout(function callbackFunction() {
        window.console.log('This is a msg from call back.');
    }, 0);

    window.console.log('This is just a message.');


};
