
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