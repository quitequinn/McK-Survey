$( document ).ready(function() {
////////////////////////////////////////////////
////////////////                 ///////////////
////////////////    FUNCTIONS    ///////////////
////////////////                 ///////////////
////////////////////////////////////////////////

////////////////////////////////////////////////
	//Fix Widows
	function fixType(){
		var widows = 'p';
		var hyphens = 'p:not(.tx-center)';

		// Fix widows
		$(widows).each(function(){
			var noBS = $(this).html().replace(/&nbsp;/g,' ');
			$(this).html(noBS);
		}).widowFix();

		// Add Hyphens
		// $(hyphens).each(function(){
		// 	var noBS = $(this).html().replace(/&shy;/g,'');
		// 	$(this).html(noBS);
		// 	$(this).hyphenate('en-us');
		// 	var unHyph = $(this).html().slice(-60).replace(/\u00AD/g,'');
		// 	console.log(unHyph);

		// 	var hyph = $(this).html().slice(0, -60);

		// 	$(this).html(hyph.concat(unHyph));
		// 	// $(this).replace(/\u00AD/g,'');
		// })

	}
	fixType();

////////////////////////////////////////////////
	//JS SPECIFIC LAYOUT ADJ
	function forwidth(){
		var winH = '.winH{ min-height:' + $(window).height() + 'px;} .moz .winH{ height:' + $(window).height() + 'px;}';
		var winHalf = '.winHalf{ top:' + ($(window).height()/2) + 'px;} ';
		var styling = '<style>'+winH+winHalf+'</style>'
		$('.jsdump').html(styling);
	}
	forwidth();


////////////////////////////////////////////////
	//IF MOBILE
	function isMobile() {
		if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/IEMobile/i)){
			return true; } else { return false; }
	}
	if (isMobile()) { $("html").addClass("ismobile")};
	function iphone() {
		if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
			return true; } else { return false; }
	}
	if (iphone()) { $("html").addClass("iphone")};

////////////////////////////////////////////////
	//GET VENDOR PREFIXES
	var prefix = (function () {
		var styles = window.getComputedStyle(document.documentElement, ''),
			pre = (Array.prototype.slice
				.call(styles)
				.join('')
				.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			)[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		};
	})();
	$('body').addClass(prefix.lowercase);
	if (navigator.userAgent.indexOf('Safari') != -1){
		if (navigator.userAgent.indexOf('Chrome') == -1){
			$('body').addClass('safari');
		} else {
			$('body').addClass('chrome');
			$('.scene').addClass('noshadow');
		}
	}

////////////////////////////////////////////////
// Share
function setShareLinks(){
	if (iphone()) {
		$(".fa-twitter").attr('href', "twitter://post?message=" + encodeURIComponent(document.URL));
		$(".fa-facebook").attr('href', "https://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + encodeURIComponent(document.URL));
	}else{
		$(".fa-twitter").attr('href', "https://twitter.com/home?status=" + encodeURIComponent(document.URL));
		$(".fa-facebook").attr('href', "https://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + encodeURIComponent(document.URL));
	}
}
setShareLinks();

$(".social > a").click(function(){
	var width = 400;
	var height = 300;
	var leftPosition, topPosition;
	leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
	topPosition = (window.screen.height / 2) - ((height / 2) + 50);

	window.open(this.href, 'newwindow', 'width='+ width +', height='+ height +', resizable=yes, left=' + ((window.screen.width / 2) - ((width / 2) + 10)) + ', top=' + ((window.screen.height / 2) - ((height / 2) + 50)) + ', screenX=' + ((window.screen.width / 2) - ((width / 2) + 10)) + ', screenY=300');
	return false;
});

////////////////////////////////////////////////
//Side Nav
$('.hamburger-wrap').click(function(){
	$("body, .sideNav, .permNav").toggleClass('active');
});

////////////////////////////////////////////////
//Profile Interaction
$(".profile-link, section").click(function(){
	if ($("body, .sideNav, .permNav").hasClass('active')) {
		var click = new Audio('click.mp3');
		click.play();
	};
	$("body, .sideNav, .permNav").removeClass('active');
});

////////////////////////////////////////////////
//Expando interaction
$('.initial').click(function(){
	$(this).parent().toggleClass('active');
});
$('.fa-close').click(function(){
	$(this).parent().parent().toggleClass('active');
});

////////////////////////////////////////////////
//Audio
$('.audClick:not(view-on), input, .initial, .fa-close').click(function(){
	var click = new Audio('click.mp3');
	click.play();
});

// $('.audSwipe:not(view-on)').click(function(){
// 	var swipe = new Audio('swipe.mp3');
// 	swipe.play();
// });

////////////////////////////////////////////////
//square
function fullImg(){
	$(".fullImg").each( function(){
		$(this).css("height",$(this).width());
	});
}
fullImg();

function fullHeight(){
	$(".fullHeight").each( function(){
		$(this).css("height", $(this).parent().prev().height());
	});
}
fullHeight();

////////////////////////////////////////////////
//////////////////             /////////////////
//////////////////    PATHS    /////////////////
//////////////////             /////////////////
////////////////////////////////////////////////


///App ROUTES via PATH.js
function path(path){
	var url = path.replace(/[_]/g, '/');
	var index = path;
	var profile;

	if (path == "home") {
		url = '';
		index = "intro";
	}
	Path.map("#!/" + url).enter(function(){
		$('.view-on').removeClass('view-on');
		$("footer a").attr("onclick","");
	}).to(function(){
		var swipe = new Audio('swipe.mp3');
		swipe.play();
		$('#'+path).addClass('view-on').parent().addClass('view-on');

		if($(".page.view-on").hasClass("profile")) {
			profile = "true";
		} else {
			profile = "false";
		};
		$("main")
			.attr("cur-slide", index)
			.attr("cur-chapter", index.replace(/([_])\w+/g, ''))
			.attr("cur-chapter", index.replace(/([_])\w+/g, ''))
			.attr("profile", profile);

		$('footer a[href$="#!/'+url+'"]').addClass('view-on').attr("onclick","return false");
		setCarrots();
		checkNav();
		fullImg();
		fullHeight();
		expandoCheck();
		animateCheck();
		removeMapinfo();
	});
}
$(".page").each(function(){
	path($(this).attr("id"));
});

Path.root("#!/");

Path.listen();

////////////////////////////////////////////////
//Set Arrow Routs
function setCarrots(){
	if ( $(".page.view-on").attr("id") == 'connect-on-energy') {
		var nextpage = "#!/";
	} else {
		var next = $(".page.view-on").next(".page:not(.profile)");
		if( next.length == 0){
			var nextpage = "#!/" + $(".page.view-on").parent().next().children().first(".page:not(.profile)").attr("id").replace(/[_]/g, '/');
 		} else {
			var nextpage = "#!/" + $(".page.view-on").next(".page").attr("id").replace(/[_]/g, '/');
		}
	}
	if ( $(".page.view-on").attr("id") == 'home') {
		var prevpage = "#!/connect-on-energy";
	} else if ( $(".page.view-on").prev(".page").attr("id") == 'home') {
		var prevpage = "#!/";
	} else {
		var prev = $(".page.view-on").prev(".page:not(.profile)");
		if( prev.length == 0){
			var prevpage = "#!/" + $(".page.view-on").parent().prev().children().next(".page:not(.profile)").last().attr("id").replace(/[_]/g, '/');
 		} else {
			var prevpage = "#!/" + $(".page.view-on").prev(".page").attr("id").replace(/[_]/g, '/');
		}
	}
	$(".pageNav .icon-right").attr("href", nextpage);
	$(".pageNav .icon-left").attr("href", prevpage);
}
setCarrots();

////////////////////////////////////////////////
// Set Progress Nav
function checkNav(){
	$(".complete").removeClass("complete")
	$( ".first-pageLink" ).nextUntil( ".view-on" ).addClass("complete");
};

////////////////////////////////////////////////
// Arrow Keys
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
		$(".pageNav .icon-left").get(0).click();
		setCarrots();
    }
    else if (e.keyCode == '39') {
        $(".pageNav .icon-right").get(0).click();
		setCarrots();
    }
}

////////////////////////////////////////////////
// img scroll hack
var n_scHack=1;
function scHack(){
	if (n_scHack==1) {
		n_scHack = 2;
		$(".page.view-on .profile-img").css("background-color", "white");
	} else {
		n_scHack = 1;
		$(".page.view-on .profile-img").css("background-color", "black");
	}
}

////////////////////////////////////////////////
// Swipe Events
$("main").hammer().bind("swiperight", function(event) {
	$(".pageNav .icon-left").get(0).click();
	setCarrots();
});

$("main").hammer().bind("swipeleft", function(event) {
    $(".pageNav .icon-right").get(0).click();
	setCarrots();
});

////////////////////////////////////////////////
//expando
function expandoCheck(){
	$(".expando, .page").removeClass('expando-fixed');
	$(".container").removeClass('oversize');
	if ($(".page.view-on").height() <= $(window).height()) {
		$(".page.view-on .expando, .page.view-on").addClass('expando-fixed');
	} else{
		$(".page.view-on .container").addClass("oversize");
	}
}
expandoCheck();

////////////////////////////////////////////////
//animations
function removeMapinfo(){
	$(".mapinfo").remove();
}

function animateCheck(){
	var n_ball = 0;
	var interval;
	function aniball(){
		n_ball += 1;
		$(".ball").css("left", n_ball + "0%");
		$("font.value").text(Math.round(20-(12*(n_ball/10))));
		if (n_ball == 10) {
			n_ball = 0;
			clearInterval(interval);
		}
	}
	if ($("#innovation_1").hasClass("view-on")) {
		interval = setInterval(aniball, 500);
	}

	function mapinfo(place, stats){
		$("body").append("<div class='mapinfo'><h6 class='no-space'>"+stats+" jobs</h6><h6 class='no-space thin'>"+place+"</h6></div>");
	}
	if ($("#economy_3").hasClass("view-on")) {
		$( "#energymap path.1" )
		  .mouseover(function(){ mapinfo("Central Region", "1,393"); })
		  .mouseout(function(){ removeMapinfo(); });
		$( "#energymap path.2" )
		  .mouseover(function(){ mapinfo("Northeast","317"); })
		  .mouseout(function(){ removeMapinfo(); });
		$( "#energymap g.3" )
		  .mouseover(function(){ mapinfo("Northwest and West Central","357"); })
		  .mouseout(function(){ removeMapinfo(); });
		$( "#energymap path.5" )
		  .mouseover(function(){ mapinfo("Southwest", "1,312"); })
		  .mouseout(function(){ removeMapinfo(); });
		$( "#energymap path.6" )
		  .mouseover(function(){ mapinfo("Southern Region", "2,234"); })
		  .mouseout(function(){ removeMapinfo(); });
		$( "#energymap path.7" )
		  .mouseover(function(){ mapinfo("Twin Cities Metro","9,752"); })
		  .mouseout(function(){ removeMapinfo(); });

		$(document).on('mousemove', function(e){
		    $('.mapinfo').css("left", e.pageX );
		    $('.mapinfo').css("top", e.pageY );
		});
	} else {
		$( "#energymap path" ).unbind( "mouseover" ).unbind( "mouseout" );
	}



	function resetMapInfo(){
		$(".countercircle .target").html("Total Clean<br/>Energy Employees");
		$(".countercircle .value").text("15,338");
	}
	function mapinfo2(target, jobs, percent){
		$("body").append("<div class='mapinfo'><h6 class='no-space'>"+percent+"%</h6></div>");
		$(".countercircle .target").text(target);
		$(".countercircle .value").text(jobs);
	}
	if ($("#economy_1").hasClass("view-on")) {
		$( "#energyCircle path.1" )
		  .mouseover(function(){ mapinfo2("Smart Grid", "967", "6.3"); })
		  .mouseout(function(){ removeMapinfo(); resetMapInfo();});
		$( "#energyCircle path.2" )
		  .mouseover(function(){ mapinfo2("Solar Energy", "1,230", "8"); })
		  .mouseout(function(){ removeMapinfo(); resetMapInfo();});
		$( "#energyCircle path.3" )
		  .mouseover(function(){ mapinfo2("Bioenergy", "1,823", "11.9"); })
		  .mouseout(function(){ removeMapinfo(); resetMapInfo();});
		$( "#energyCircle path.4" )
		  .mouseover(function(){ mapinfo2("Wind Power", "1,713", "11.2" ); })
		  .mouseout(function(){ removeMapinfo(); resetMapInfo();});
		$( "#energyCircle path.5" )
		  .mouseover(function(){ mapinfo2("Energy Efficiency", "9,604", "62.6"); })
		  .mouseout(function(){ removeMapinfo(); resetMapInfo();});

		$(document).on('mousemove', function(e){
		    $('.mapinfo').css("left", e.pageX );
		    $('.mapinfo').css("top", e.pageY );
		});
	} else {
		$( "#energyCircle path" ).unbind( "mouseover" ).unbind( "mouseout" );
	}
}


////////////////////////////////////////////////
//footer animations
function footerInfoMargin(){
	$("#footerNav > a").each(function(){
		if ($(this).hasClass("chapterLink")) {
			$(this).find(".footerInfo").css("margin-left", ($(this).find(".footerInfo").width()-14)/-2);
		}else if ($(this).hasClass("homeLink")) {
			$(this).find(".footerInfo").css("margin-left", ($(this).find(".footerInfo").width()-14)/-2);
		}else{
			$(this).find(".footerInfo").css("margin-left", $(this).find(".footerInfo").width()/-2);
		};
	});
}

////////////////////////////////////////////////
////////////////                 ///////////////
////////////////    LISTENERS    ///////////////
////////////////                 ///////////////
////////////////////////////////////////////////

////////////////////////////////////////////////
	//ON RESIZE
	var updateLayout = _.debounce(function(e) {
		forwidth();
		fixType();
		fullImg();
		fullHeight();
		expandoCheck();
		footerInfoMargin();
	}, 500);
	window.addEventListener("resize", updateLayout, false);

////////////////////////////////////////////////
	//ON scroll
	// var scroll = _.throttle(function(e) {
	// }, 500);
	// window.addEventListener("scroll", scroll, false);

	$( ".page").scroll(function() {
		scHack();
	});

	$(window).load(function() {

	    $(".loader").css("display", "none");
		forwidth();
		fixType();
		fullImg();
		fullHeight();
		expandoCheck();
		animateCheck();
		footerInfoMargin();
	}); // `~*# The end.

});

