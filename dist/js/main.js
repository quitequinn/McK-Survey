/**
 * Kraken v5.6.0
 * A lightweight front-end boilerplate, by Chris Ferdinandi.
 * http://github.com/cferdinandi/kraken
 * 
 * Free to use under the MIT License.
 * http://gomakethings.com/mit/
 */

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
		$(hyphens).each(function(){
			var noBS = $(this).html().replace(/&shy;/g,'');
			$(this).html(noBS);
			$(this).hyphenate('en-us');
		})

	}
	fixType();

////////////////////////////////////////////////
	//JS SPECIFIC LAYOUT ADJ
	function forwidth(){
		var winH = '.winH{ min-height:' + $(window).height() + 'px;}';
		var winHalf = '.winHalf{ top:' + ($(window).height()/2) + 'px;}';
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
	function iphone() {
		if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
			return true; } else { return false; }
	}

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

//Side Nav
$('.hamburger-wrap').click(function(){
	$("body, .sideNav, .permNav").toggleClass('active');
});

//Audio
$('.audClick:not(view-on)').click(function(){
	var click = new Audio('click.mp3');
	click.play();
});
$('.audSwipe:not(view-on)').click(function(){
	var swipe = new Audio('swipe.mp3');
	swipe.play();
});



////////////////////////////////////////////////
//////////////////             /////////////////
//////////////////    PATHS    /////////////////
//////////////////             /////////////////
////////////////////////////////////////////////


///App ROUTES via PATH.js
function path(path){
	var url = path.replace(/[_]/g, '/');

	Path.map("#!/" + url).enter(function(){
		$('.view-on').removeClass('view-on');
		$("footer a").attr("onclick","");
	}).to(function(){
		$('#'+path).addClass('view-on').parent().addClass('view-on');
		$("main")
			.attr("cur-slide", path)
			.attr("cur-chapter", path.replace(/([_])\w+/g, ''))
			.attr("cur-page", path.replace(/\w+([_])/g, ''));
		$('footer a[href$="#!/'+url+'"]').addClass('view-on').attr("onclick","return false");
		setCarrots();
	});
}
$(".page").each(function(){
	path($(this).attr("id"));
});

// HOME AND ROOT
Path.map("#!/").enter(function(){
	$('.view-on').removeClass('view-on');
	$("footer a").attr("onclick","");
}).to(function(){
	$('#home').addClass('view-on').parent().addClass('view-on');
	$("main")
		.attr("cur-slide", "intro")
		.attr("cur-chapter", "intro")
		.attr("cur-page", 'intro');
	$('footer a[href$="#!/"]').addClass('view-on').attr("onclick","return false");
	setCarrots();
});
Path.root("#!/");


Path.listen();

//Set Arrow Routs

function setCarrots(){
	if ( $(".page.view-on").next(".page") == 'appendix') {
		var prevpage = "#!/";
	} else {
		var next = $(".page.view-on").next(".page");
		if( next.length == 0){
			var nextpage = "#!/" + $(".page.view-on").parent().next().children().first(".page").attr("id").replace(/[_]/g, '/');
 		} else {
			var nextpage = "#!/" + $(".page.view-on").next(".page").attr("id").replace(/[_]/g, '/');
		}
	}
	if ( $(".page.view-on").attr("id") == 'home') {
		var prevpage = "#!/";
	} else {
		var prev = $(".page.view-on").prev(".page");
		if( prev.length == 0){
			var prevpage = "#!/" + $(".page.view-on").parent().prev().children().next(".page:last-of-type").attr("id").replace(/[_]/g, '/');
 		} else {
			var prevpage = "#!/" + $(".page.view-on").prev(".page").attr("id").replace(/[_]/g, '/');
		}
	}
	$(".pageNav .fa-chevron-circle-right").attr("href", nextpage);
	$(".pageNav .fa-chevron-circle-left").attr("href", prevpage);
}
setCarrots();

// Arrow Keys
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
		$(".pageNav .fa-chevron-circle-left").get(0).click();
		setCarrots();
    }
    else if (e.keyCode == '39') {
        $(".pageNav .fa-chevron-circle-right").get(0).click();
		setCarrots();
    }

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
	}, 500);
	window.addEventListener("resize", updateLayout, false);

////////////////////////////////////////////////
	//ON scroll
	var scroll = _.throttle(function(e) {

	}, 500);
	window.addEventListener("scroll", scroll, false);

});

$(window).load(function() {

    $(".loader").css("display", "none")

}); // `~*# The end.


