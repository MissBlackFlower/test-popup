function HideShow(allBl, blActive, allTab, tabActive) {
		allBl.hide();
		blActive.fadeIn();
		allTab.removeClass('is-active');
		tabActive.addClass('is-active');
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
