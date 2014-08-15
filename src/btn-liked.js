$.ckeckStatusBTN = function(btn,method) {
	var btn = $(btn)
	if (!btn.data('running')) {

		if (!btn.data('default-text')) {
			btn.data('default-text',btn.html())
		}
		var href = (method && method == "status") ? btn.data('href-status') : btn.data('href')
		var textDefault = btn.data('default-text')
		var textLoading = btn.data('loading-text')
		var textSuccess = btn.data('success-text')
		var textError = btn.data('error-text')
		var textCount = btn.data('count-text')

		btn.data('running',true)
		btn.html(textLoading)
		$.ajax(href)
			.success(function(data){
				var r = false
				if (data.length && data.length == 1) {
					r = data[0]
				} else if (data.liked) {
					r = data.liked
				}

				if (data.nLiked) {
					if (textCount) {
						btn.attr('title',textCount.replace('%',data.nLiked))
					} else {
						btn.attr('title',data.nLiked)
					}
				}

				if (r) {
					btn.html(textSuccess || textDefault)
				} else {
					btn.html(textDefault)
				}
			})
			.error(function(){
				btn.html(textError || textDefault)
			})
			.always(function(){
				btn.data('running',false)
			})
	}
    return false
}
!$(document).delegate('[data-liked]','click',function(e){
	$.ckeckStatusBTN(this,null)
})
!$(document).ready(function(){
	$("[data-liked='preload']").each(function(index,elm){
		$.ckeckStatusBTN(elm,"status")
	})
})