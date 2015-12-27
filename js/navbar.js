;
(function($, window, document) {
    'use strict';
    if ($(document).scrollTop() !== 0) {
        $("#header").css("background-color", "rgba(0, 0, 0, 255)");
    }
    var fadeDist = $("#large-header").height();
    $(document).scroll(function() {
        var scrolledDist = $(document).scrollTop();
        if (scrolledDist <= fadeDist) {
            var fractionFade = scrolledDist / fadeDist;
            var scaledFade = 2 * fractionFade;
            var newColor = "rgba(0, 0, 0, " + scaledFade + ")";
            $("#header").css("background-color", newColor);
        }
    });
    $.fn.stickyNavbar = function(prop) {
        var options = $.extend({
                activeClass: 'active',
                sectionSelector: 'scrollto',
                animDuration: 350,
                startAt: 0,
                easing: 'swing',
                animateCSS: true,
                animateCSSRepeat: false,
                cssAnimation: 'fadeInDown',
                jqueryEffects: false,
                jqueryAnim: 'slideDown',
                selector: 'a',
                mobile: false,
                mobileWidth: 480,
                zindex: 9999,
                stickyModeClass: 'sticky',
                unstickyModeClass: 'unsticky'
            }, prop),
            sections = $('.' + options.sectionSelector);
        return this.each(function() {
            var $self = $(this),
                $selfPosition = $self.css('position'),
                $selfZindex = $self.css('zIndex'),
                thisHeight = $self.outerHeight(true),
                $selfScrollTop = $self.offset().top,
                $topOffset = $self.css('top') === 'auto' ? 0 : $self.css('top'),
                menuItems = options.selector === 'a' ? $self.find('li a') : $self.find('li'),
                menuItemsHref = $self.find('li a[href*=#]'),
                windowPosition = $(window).scrollTop();
            var mainFunc = function() {
                var win = $(window),
                    windowPosition = win.scrollTop(),
                    windowWidth = win.width(),
                    windowHeight = win.height();
                if (!options.mobile && windowWidth < options.mobileWidth) {
                    $self.css('position', $selfPosition);
                    return;
                }
                menuItems.removeClass(options.activeClass);
                sections.each(function() {
                    var top = $(this).offset().top - thisHeight,
                        bottom = $(this).outerHeight(true) + top;
                    if ((windowPosition >= top) && (windowPosition <= bottom)) {
                        if (options.selector === 'a') {
                            $self.find('li a[href~="#' + this.id + '"]').addClass(options.activeClass);
                        }
                        else {
                            $self.find('li a[href~="#' + this.id + '"]').parent().addClass(options.activeClass);
                        }
                    }
                });
                if (windowPosition >= $selfScrollTop + options.startAt) {
                    $self.removeClass(options.unstickyModeClass).addClass(' ' + options.stickyModeClass);
                    if (options.jqueryEffects) {
                        if (!options.animateCSSRepeat) {
                            $self.hide().stop()[options.jqueryAnim](options.animDuration, options.easing);
                        }
                        $self.hide().stop()[options.jqueryAnim](options.animDuration, options.easing);
                    }
                    else if (options.animateCSS) {
                        if (options.animateCSSRepeat) {
                            $self.addClass(options.cssAnimation + ' animated').one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(e) {
                                $self.removeClass(options.cssAnimation + ' animated');
                            });
                        }
                        else {
                            $self.addClass(options.cssAnimation + ' animated').one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd');
                        }
                    }
                    else {
                        $self.stop();
                    }
                }
                else {
                    $self.css({
                        'position': options.$selfPosition,
                        'zIndex': $selfZindex
                    }).removeClass(options.stickyModeClass).addClass(' ' + options.unstickyModeClass);
                }
                if (win.scrollTop() + windowHeight >= $(document).height()) {
                    menuItems.removeClass(options.activeClass).last().addClass(options.activeClass);
                }
                if (windowPosition <= $selfScrollTop - 2) {
                    $self.removeClass(options.cssAnimation + ' animated');
                    if (options.jqueryEffects) {
                        if (windowPosition === 0) {
                            menuItems.removeClass(options.activeClass);
                        }
                        if (windowPosition >= $selfScrollTop) {
                            $self.css({
                                'position': 'fixed',
                                'zIndex': options.zindex
                            }).hide().stop()[options.jqueryAnim](options.animDuration, options.easing);
                        }
                        else {
                            $self.css({
                                'position': $selfPosition,
                                'zIndex': options.zindex
                            });
                        }
                    }
                    else {
                        if (windowPosition === 0) {
                            menuItems.removeClass(options.activeClass);
                        }
                        $self.css({
                            'position': $selfPosition,
                            'top': $topOffset
                        }).stop().animate({
                            top: $topOffset
                        }, options.animDuration, options.easing);
                    }
                }
            };
            $(window).scroll(mainFunc);
            $(window).ready(mainFunc);
            $(window).resize(mainFunc);
            $(window).load(mainFunc);
        });
    };
    $(function() {
        $('.header').stickyNavbar({
            activeClass: "active",
            sectionSelector: "scrollto",
            animDuration: 250,
            startAt: 0,
            easing: "linear",
            animateCSS: true,
            animateCSSRepeat: false,
            cssAnimation: "fadeInDown",
            jqueryEffects: false,
            jqueryAnim: "slideDown",
            selector: "a",
            mobile: true,
            mobileWidth: 768,
            zindex: 9999,
            stickyModeClass: "sticky",
            unstickyModeClass: "unsticky"
        });
    });
    $('.nav a').on('click', function() {
        $(".navbar-collapse").collapse('hide');
    });
    $('body').bind('click', function(e) {
        if ($(e.target).closest('.navbar').length == 0) {
            var opened = $('.navbar-collapse').hasClass('collapse in');
            if (opened === true) {
                $('.navbar-collapse').collapse('hide');
            }
        }
    });
})(jQuery, window, document);