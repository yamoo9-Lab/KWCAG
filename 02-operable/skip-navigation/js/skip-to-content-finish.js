if (!('bind' in Function.prototype)) {
    Function.prototype.bind= function(owner) {
        var that= this;
        if (arguments.length<=1) {
            return function() { return that.apply(owner, arguments); };
        } else {
            var args= Array.prototype.slice.call(arguments, 1);
            return function() {
                return that.apply(owner, arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments)));
            };
        }
    };
};

(function(global, $){

    /**
     * 스킵 내비게이션
     */
    $('#skip-to-contents').on('click', 'a', function(e) {
        // 브라우저 기본 동작 차단
        e.preventDefault();
        // DOM 객체(this)의 href 속성 값을 ID로 하여 목적지 대상 탐색(캐싱)
        // tabindex 설정 후, 포커싱
        var hash = this.getAttribute('href'),
            $target = $.data(this, 'target') ? $.data(this, 'target') : $.data(this, 'target', $( hash ));
        $target.attr('tabindex','0').focus();
        $target.on('blur', removeTabindex.bind($target) );
        // 뒤로가기 버튼(히스토리 기록)
        global.location.hash = hash;
    });

    // tabindex 속성 제거 함수
    function removeTabindex() { this.removeAttr('tabindex') }

})(window, window.jQuery);