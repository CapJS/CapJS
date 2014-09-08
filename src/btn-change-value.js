!$(document).delegate("[data-changer]",'click',function(e){
	var elm            = $(this);
	var remoteObjet    = elm.data('changer');
	var value          = elm.data('value');
	var type_get_value = elm.data('type');
	if (value && type_get_value && remoteObjet) {
		switch(type_get_value) {
			case 'text':
				$(remoteObjet).text(value);
				break;
			case 'html':
				$(remoteObjet).html(value);
				break;
			case 'value':
				$(remoteObjet).val(value);
				break;
		}
	}
})
