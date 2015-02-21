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
var click = new Audio('click.mp3');
var swipe = new Audio('swipe.mp3');

$('.audClick').click(function(){ click.play(); });
$('.audSwipe').click(function(){ swipe.play(); });

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


}); // `~*# The end.


