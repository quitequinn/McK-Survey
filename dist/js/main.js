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
	//Render Logo
	var $window = $(window),
		radius = 4,
		editColor = 'rgb(254, 1, 57)',
		type = /(canvas|webgl)/.test(url.type) ? url.type : 'svg',
		svglocation = "svg";

	function checksize() {
		/*
		if ($(window).width() > 0) {
			svglocation = ".assets .XS svg";
		}
		if ($(window).width() > 610) {
			svglocation = ".assets .S svg";
		}
		if ($(window).width() > 910) {
			svglocation = ".assets .M svg";
		}
		if ($(window).width() > 1110) {
			svglocation = ".assets .L svg";
		}
		if ($(window).width() > 1410) { stuff
			svglocation = ".assets .XLvar  svg";
		}
		*/
		render();
	}

	function render() {
		var two = new Two({
			autostart: true
		}).appendTo(document.getElementById('displayspace'));

		var letter = two.interpret(document.querySelector(svglocation));
		letter.stroke = 'rgb(254, 1, 57)';
		letter.fill = 'rgba(254, 1, 57,.3)';

		_.each(letter.children, function (polygon) {
			_.each(polygon.vertices, function (anchor) {

				var p = two.makeCircle(0, 0, 3);
				var l = two.makeRectangle(0, 0, 3, 3);
				var r = two.makeRectangle(0, 0, 3, 3);

				p.translation.copy(anchor);
				if (p.translation != l.translation) {
					l.translation.copy(anchor.controls.left).addSelf(anchor);
				};

				if (p.translation != r.translation) {
					r.translation.copy(anchor.controls.right).addSelf(anchor);
				};

				p.noStroke().fill = l.noStroke().fill = r.noStroke().fill = editColor;

				var ll = new Two.Polygon([
					new Two.Anchor().copy(p.translation),
					new Two.Anchor().copy(l.translation)
				]);
				var rl = new Two.Polygon([
					new Two.Anchor().copy(p.translation),
					new Two.Anchor().copy(r.translation)
				]);
				rl.noFill().stroke = ll.noFill().stroke = editColor;

				letter.add(rl, ll, p, l, r);
				p.translation.bind(Two.Events.change, function () {
					anchor.copy(this);
					l.translation.copy(anchor.controls.left).addSelf(this);
					r.translation.copy(anchor.controls.right).addSelf(this);
					ll.vertices[0].copy(this);
					rl.vertices[0].copy(this);
					ll.vertices[1].copy(l.translation);
					rl.vertices[1].copy(r.translation);
				});
				l.translation.bind(Two.Events.change, function () {
					anchor.controls.left.copy(this).subSelf(anchor);
					ll.vertices[1].copy(this);
				});
				r.translation.bind(Two.Events.change, function () {
					anchor.controls.right.copy(this).subSelf(anchor);
					rl.vertices[1].copy(this);
				});

			// Update the renderer in order to generate the actual elements.
			two.update();

			// Add Interactivity
			addInteractivity(p);
			addInteractivity(l);
			addInteractivity(r);

			});
		});
	}

	function addInteractivity(shape) {

		var offset = shape.parent.translation;

		var drag = function (e) {
			e.preventDefault();
			var x = e.clientX - offset.x;
			var y = e.clientY - offset.y;
			shape.translation.set(x, y);
		};
		var touchDrag = function (e) {
			e.preventDefault();
			var touch = e.originalEvent.changedTouches[0];
			drag({
				preventDefault: _.identity,
				clientX: touch.pageX,
				clientY: touch.pageY
			});
			return false;
		};
		var dragEnd = function (e) {
			e.preventDefault();
			$window
				.unbind('mousemove', drag)
				.unbind('mouseup', dragEnd);
		};
		var touchEnd = function (e) {
			e.preventDefault();
			$(window)
				.unbind('touchmove', touchDrag)
				.unbind('touchend', touchEnd);
			return false;
		};

		$(shape._renderer.elem)
			.css({
				cursor: 'pointer'
			})
			.bind('mousedown', function (e) {
				e.preventDefault();
				$window
					.bind('mousemove', drag)
					.bind('mouseup', dragEnd);
			})
			.bind('touchstart', function (e) {
				e.preventDefault();
				$(window)
					.bind('touchmove', touchDrag)
					.bind('touchend', touchEnd);
				return false;
			})
		;
	}
	checksize();

////////////////////////////////////////////////
////////////////                 ///////////////
////////////////    LISTENERS    ///////////////
////////////////                 ///////////////
////////////////////////////////////////////////

////////////////////////////////////////////////
	//ON RESIZE
	var updateLayout = _.debounce(function(e) {
		forwidth();
		if ($('.tag').length > 0) {checkTags()};
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


