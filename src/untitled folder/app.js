//==================================================================//
// QUINN: Once you'd added the path.js script to your Index file
// you can map some routes, setup a root route, a 404 page
// catch, and then start everything with a Path.listen()
// call inside of your $(document).ready();
//==================================================================//

$(document).ready(function() {
	Path.listen();
});

//==================================================================//
// QUINN: Here, Each route maps to the respective view function:
//==================================================================//

///App ROUTES via PATH.js:
//The 2 key functions to call here are Path.map().to();
// If you'd like, you can use enter(); to cleanup your states/views
// before entering into the routed state/view.

Path.map("#!/home").enter(function(){
	resetView();
}).to(function(){
	homeView();
});

Path.map("#!/view-one").enter(function(){
	resetView();
}).to(function(){
    firstView();
});

Path.map("#!/view-two").enter(function(){
	resetView();
}).to(function(){
    secondView();
});

Path.map("#!/view-three").enter(function(){
	resetView();
}).to(function(){
    thirdView();
});

//=======================================================//
// QUINN: Default/home route called:
//=======================================================//

Path.root("#/home");

//optional reset function to pass into the optional enter() function up in the routes:
var resetView = function(){
	$('div.sub-element').removeClass('view-on');
}

var homeView = function(){
	//$('div.sub-element').removeClass('view-on');
	$('div.home').addClass('view-on');
}
var firstView = function(){
	//$('div.sub-element').removeClass('view-on');
	$('div.view-1').addClass('view-on');
}
var secondView = function(){
	//$('div.sub-element').removeClass('view-on');
	$('div.view-2').addClass('view-on');
}
var thirdView = function(){
	//$('div.sub-element').removeClass('view-on');
	$('div.view-3').addClass('view-on');
}

