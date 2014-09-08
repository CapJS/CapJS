// Activa evento según posición de scroll
(function(window) {
	win = $(window);

	win.scroll(function(){
		// $(window).scrollTop()
		scrollTop = win.scrollTop();
		$("[scroll-style]").each(function(index,elem){
			elm = $(elem);
			classAdd = elm.attr('scroll-style');
			compareValue = elm.data('scroll-position');
			if (classAdd && compareValue) {
				// console.log(scrollTop + compareValue);
				if (eval(scrollTop + compareValue)) {
					elm.addClass(classAdd);
				} else {
					elm.removeClass(classAdd);
				}
			};
		});
	});
})(window)
