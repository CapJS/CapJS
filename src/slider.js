// Permite la creacion de objetos Slider
// Requiere jQuery
(function(window,$) {

	$(function(){

		var EventSicle = function(obj, type){

			var slider = $(obj);

			var slides = $("[cap-slide]",slider);

			if (slides.length) {

				var timer = slider.data("timer");
				var control = slider.data("control") || "css";
				var activeSlide = slider.data("activeSlide") || 0;

				if (type == "prev") {
					var nextSlide = activeSlide - 1;
				} else if (type == "next") {
					var nextSlide = activeSlide + 1;
				}

				if (timer > 0) {
					if (!slider.data('loop')) {
						setInterval(function(){
							if (type == "prev") {
								slider.trigger("slide.prev");
							};
							if (type == "next") {
								slider.trigger("slide.next");
							}
						}, timer);
						slider.data('loop',true);
					};
				};

				if (nextSlide >= slides.length) {
					nextSlide = 0;
				};

				if (nextSlide < 0) {
					nextSlide = slides.length - 1;
				};

				if (control == "css" || control == "styles" || control == "class") {
					slides.each(function(index,slide){
						slide = $(slide);

						var css_in = slide.data("class-in") || "in";
						var css_out = slide.data("class-out") || "out";

						if (nextSlide == index) {
							slide.addClass(css_in);
							slide.removeClass(css_out);
							slide.trigger("slide.in");
						} else {
							slide.addClass(css_out);
							slide.removeClass(css_in);
							slide.trigger("slide.out");
						}

						slider.data("activeSlide",nextSlide);

					});
				} else if (control == "js" || control == "javascript") {
					slides.each(function(index,slide){
						slide = $(slide);

						var css_in = slide.data("class-in") || "in";
						var css_out = slide.data("class-out") || "out";

						if (nextSlide == index) {
							slide.show(0);
							slide.trigger("slide.in");
						} else {
							slide.hide(0);
							slide.trigger("slide.out");
						}

						slider.data("activeSlide",nextSlide);
					});
				}

			};

		};

		var capSlider = $("[cap-slider]");

		capSlider.on('slide.run',function(){

			var slider = $(this);

			var slides = $("[cap-slide]",slider);
			var direction = slider.data("direction") || 'next';
			if (direction == "next") {
				slider.trigger("slide.next");
			} else if (direction == "prev") {
				slider.trigger("slide.prev");
			};


		});

		capSlider.on('slide.next',function(){
			EventSicle(this,"next");
		});

		capSlider.on('slide.prev',function(){
			EventSicle(this,"prev");
		});

		$("[cap-slide-next]",capSlider).on("click",function(){
			$(this).parents("[cap-slider]").trigger("slide.next");
		})

		$("[cap-slide-prev]",capSlider).on("click",function(){
			$(this).parents("[cap-slider]").trigger("slide.prev");
		})

		capSlider.trigger('slide.run');

	});

})(window,jQuery);
