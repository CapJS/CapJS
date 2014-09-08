// Muestra un contenido tras ser activado por un click
!$(document).delegate('[data-show-tell-arun]','click',function(e){
	e.preventDefault();

	var prt = $(this).parent('[data-show-tell]');

	var fnd  = $(prt).data("show-tell");
	var clss = $(prt).data("show-tell-rmclass");

	var elms = $(fnd,prt);

	if (clss) {
		$(elms).removeClass(clss);
		$(elms).show();
	} else {
		$(elms).show();
	}

	$(elms).attr('show-tell-active',true);

	$(prt).trigger('showTell.focus');
});
!$(document).delegate('[data-show-tell-reverse]','click',function(e){
	e.preventDefault();
	
	var prt = $(this).parent('[data-show-tell]');

	var fnd  = $(prt).data("show-tell");
	var clss = $(prt).data("show-tell-rmclass");

	var elms = $('[show-tell-active]',prt);

	if (clss) {
		elms.addClass(clss);
		elms.hide();
	} else {
		elms.hide();
	}

	elms.removeAttr('show-tell-active');

	$(prt).trigger('showTell.close');
});