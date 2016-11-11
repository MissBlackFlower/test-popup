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
			OnSlick(blActive, 2 , 0);
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
			})
			// .fail(function() {
			// 	var htmlSlides = $('.js-html-slides').find('.js-popup-slide');
			// 			htmlSlides.each(function() {
			// 				if ( currentTabBl.data("number") == $(this).data("tab-num")) {
			// 					$(this).appendTo(popupSlider);
			// 					console.log( $(this) );
			// 				}
			// 			});
			// });
		} else { popupSlider.slick('unslick') };
	});

console.log($('.js-html-slides'));

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

function HideShow(allBl, blActive, allTab, tabActive) {

		allTab.removeClass('is-active');

		allBl.hide();

		tabActive.addClass('is-active');

		blActive.fadeIn();

};



function OnSlick(slider_bl, toShow,i){

	if (!(slider_bl.hasClass('slick-initialized'))) {



				slider_bl.slick({

					slidesToShow: toShow,

					slidesToScroll: 1,

					arrows: true,

					dots: false,

					autoplay: false,

					infinite: false,

					initialSlide: i

				});

	}

};



function OffScroll(){

	var winScrollTop = $(window).scrollTop();



	$(window).on('scroll',function () {

		$(window).scrollTop(winScrollTop);

	});

};



function ClosePopup(popup_bl){

	popup_bl.removeClass('is-open');

	$(window).unbind('scroll'); //Выключить отмену прокрутки

};



});
