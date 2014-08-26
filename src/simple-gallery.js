
$(document).delegate('[data-gallery-miniature]','click',function(e){

	var min = $(this);
	var src = min.data('href');
	var gGallery  = min.parents("[data-gallery]")[0];
	var cover = $('[data-gallery-cover]',gGallery);

	if (gGallery) {
		$(cover).attr('src',src);
		$(cover).trigger('changeCover');

		return false;
	};
});

$(document).delegate('[data-gallery]','onNext',function(e){
	var gGallery = $(this);
	var listMiniature = $('[data-gallery-list]',gGallery);
	var cover = $('[data-gallery-cover]',gGallery);
	var srcThisCover = cover.attr('src');
	var miniatureThisCover = $('[data-gallery-miniature][data-href="'+srcThisCover+'"]',listMiniature);
	var nextListMiniature = miniatureThisCover.parents('[data-gallery-list]').next();
	var nextMiniature = $("[data-gallery-miniature]",nextListMiniature);

	if (nextMiniature.length >= 1) {
		nextMiniature.trigger( "click" );
	} else {
		$('[data-gallery-miniature]',listMiniature[0]).trigger( "click" );
	}
});

$(document).delegate('[data-gallery]','onPrev',function(e){
	var gGallery = $(this);
	var listMiniature = $('[data-gallery-list]',gGallery);
	var cover = $('[data-gallery-cover]',gGallery);
	var srcThisCover = cover.attr('src');
	var miniatureThisCover = $('[data-gallery-miniature][data-href="'+srcThisCover+'"]',listMiniature);
	var prevListMiniature = miniatureThisCover.parents('[data-gallery-list]').prev();
	var prevMiniature = $("[data-gallery-miniature]",prevListMiniature);

	if (prevMiniature.length >= 1) {
		prevMiniature.trigger( "click" );
	} else {
		$('[data-gallery-miniature]',listMiniature[listMiniature.length-1]).trigger( "click" );
	}
});

$(document).delegate("[data-gallery-next]",'click',function(e){
	var min = $(this);
	var gGallery  = min.parents("[data-gallery]")[0];
	if (gGallery) {
		$(gGallery).trigger('onNext');
	}
});

$(document).delegate("[data-gallery-prev]",'click',function(e){
	var min = $(this);
	var gGallery  = min.parents("[data-gallery]")[0];
	if (gGallery) {
		$(gGallery).trigger('onPrev');
	}
});