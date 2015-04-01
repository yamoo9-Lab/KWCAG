/**
 * --------------------------------
 * 셀렉트박스 접근성
 * --------------------------------
 */
(function($){
	$('.opt .link_relation').on('click', function(e) {
		e.preventDefault();
		var $this = $(this);
		if($this.is('.open')) {
			$this.find('.toggle_btn').attr('aria-label', '열기');
			$this.removeClass('open');
		} else {
			$this.find('.toggle_btn').attr('aria-label', '닫기');
			$this.addClass('open');
		}

	});
})(window.jQuery);