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

/**
 * --------------------------------
 * 스킵 내비게이션
 * --------------------------------
 */
(function(global, $){

})(window, window.jQuery);