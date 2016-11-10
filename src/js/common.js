$(document).ready(function() {

	var tab = $('.js-tab'),
			tabBl = $('.js-bl'),
			slide = $('.js-slide'),
			btnMore = $('.js-btn-more'),
			btnClose = $('.js-close'),
			popup = $('.js-popup-more'),
			popupSlider = $('.js-popup-slider'),
			popupSlide = $('.js-popup-slide'),
			count = $('.js-count');
	var index = 1;

	HideShow(tabBl, tabBl.first(), tab, tab.first() );
	OnSlick(tabBl.first(), 2 , 0);
	tabBl.first().attr('status', 'clicked');

	tab.on('click', function(e, slick) {
		var blActive = tabBl.filter('[data-number="' + $(this).data("tab") + '"]');

		if ( $(this).attr('status') != 'clicked') {
			if (popupSlider.hasClass('slick-initialized')) {

					popupSlider.slick('unslick');
					popupSlider.empty();
			}
			tab.removeAttr( "status" );
			$(this).attr('status', 'clicked');

			HideShow(tabBl, blActive, tab, $(this) );
			OnSlick(blActive, 2 , (0));
		}
		else {
			// tabBl.slick('unslick');
			OnSlick(blActive, 2 , (index-1));
		};
		e.preventDefault();
	});

	btnMore.on('mousedown', function(e, slick) {
		var currentTabBl = $(this).closest(tabBl);

		if (!(popupSlider.hasClass('slick-initialized'))) {

			$.getJSON('data.json', function(data) {
				$.each(data, function(i, obj) {
					if ( currentTabBl.data("number") == obj.tab) {

						var ul = [];
						var list = obj.list;

						for (var txt in list) {
							var li = ("<li>"+ list[txt] +"</li>");
									ul.push(li);
						};

						popupSlider.append( "<div class='popup-slider__item .js-popup-slide'>"+
																"<div class='popup-slider__txt'>"+
																"<h4>"+ obj.title +"</h4>"+
																"<ul>"+ ul.join('') +"</ul>"+
																"<p>"+ obj.paragraph +"</p>"+
																"<span>"+ obj.date +" "+ obj.author +"</span>"+
																"</div><div class='popup-slider__img'>"+
																"<img src='"+ obj.url +"' alt='"+ obj.alt +"'"+
																"width='300' height='375'/></div>"+
																"</div>");
					};
				});
			});
		} else { popupSlider.slick('unslick') };
	});

	popupSlider.on('init reInit afterChange', function(event, slick){
		var i = popupSlider.find('.slick-current').data('slick-index')
		count.text((i+1) + ' / ' + slick.slideCount);
	});

	btnMore.on('click', function(e) {
		index = $(this).closest(slide).data('slide');
		popup.addClass('is-open');
		OnSlick(popupSlider, 1 , (index-1));
		OffScroll ();
		e.preventDefault();
	});

	popup.on('click', function(e) {
		if ($(e.target).closest(popupSlider).length === 0) {
			ClosePopup(popup);
		}
	});

	btnClose.on('click', function() {
		ClosePopup(popup);
	});

// =include all-fun.js

});
