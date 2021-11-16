'use strict';

var inalumSidenav = function(){
    var location = window.location.href;

    var setSideNav = function(){
        var a = $('a[href="'+location+'"]');
        a.parent('li').addClass('menu-item-active')
        a.parent('li').parents('li').addClass('menu-item-open')
    }

    return {
        init : function(){
            setSideNav();
        }
    };
}();

jQuery(document).ready(function() {
	inalumSidenav.init();
});