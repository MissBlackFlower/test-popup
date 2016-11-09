$(document).ready(function() {


	var tab = $('.js-tab'),
			tabBl = $('.js-bl'),
			slide = $('.js-slide'),
			btnMore = $('.js-btn-more'),
			btnClose = $('.js-close'),
			popup = $('.js-popup-more'),
			popupSlider = $('.js-popup-slider'),
			popupSlide = $('.js-popup-slider');

	function hideShow(allBl, blActive, allTab, tabActive) {
			allBl.hide();
			blActive.fadeIn();
			allTab.removeClass('is-active');
			tabActive.addClass('is-active');
	};


	tab.on('click', function() {
		var blActive = tabBl.filter('[data-number="' + $(this).data("tab") + '"]');

				hideShow(tabBl, blActive, tab, $(this) );

				if (!(blActive.hasClass('slick-initialized'))) {
					blActive.slick({
						slidesToShow: 2,
						slidesToScroll: 1,
						arrows: true,
						dots: false,
						autoplay: false,
					});
				}
	});

	btnMore.on('mousedown', function() {
		var currentTab = tabBl.has($(this));
		// console.log(currentTab);

		$.getJSON('data.json', function(data) {
			$.each(data, function(i, obj) {
				if ( (tabBl.data("number") == obj.tab) && (popupSlider.has(popupSlide)) ) {
					console.log((popupSlider.has(popupSlide)));
					var ul = [];
					var list = obj.list;

					for (var txt in list) {
						var li = ("<li>"+ list[txt] +"</li>");
						console.log(li);
						ul.push(li);
					};
					console.log(i);
					popupSlider.append("<div class='popup-slider__item .js-slide'><div class='popup-slider__txt'><h4>"+ obj.title +"</h4><ul>"+ ul.join('') +"</ul><p>"+ obj.paragraph +"</p><span>"+ obj.date +" "+ obj.author +"</span></div><div class='popup-slider__img'><img src='"+ obj.url +"' alt='"+ obj.alt +"' width='300' height='375'/></div></div>");
				};
			});
		});
	});

	btnMore.on('click', function() {
		popup.addClass('is-open');
		OffScroll ();
		if (!(popupSlider.hasClass('slick-initialized'))) {
			popupSlider.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
				autoplay: false
			});
		}

	});



	popup.on('click', function(e) {
		if ($(e.target).closest(popupSlider).length === 0) {
			popup.removeClass('is-open');
			$(window).unbind('scroll'); //Выключить отмену прокрутки
			popupSlide.remove();
		}
	});

	function OffScroll () {
		var winScrollTop = $(window).scrollTop();
		$(window).on('scroll',function () {
			$(window).scrollTop(winScrollTop);
	});}


});
