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
		var hyphens = 'p';

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


