/* **************************************************

Name: script.js

Description: Common Settings

Copyright 2025 Hitachi, Ltd.

***************************************************** */
(function ($) {
    'use strict';

    var isMobile = function () {
        return $(window).width() < 1025;
    };

    jQuery(document).ready(function ($) {

        // -----------------------------------------------
        // Scroll to top button
        // -----------------------------------------------
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 20) {
                $('#myBtn').show();
            } else {
                $('#myBtn').hide();
            }
        });

        window.topFunction = function () {
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        };

        $(document).on('click', '#back-to-top', function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 700);
        });

        // -----------------------------------------------
        // Tabs
        // -----------------------------------------------
        $('.tab-menu a').on('click', function (e) {
            e.preventDefault();
            var $tabs = $(this).parents('.tabs');
            $tabs.find('.tab-menu a').removeClass('active');
            $tabs.find('.tab-item').removeClass('active');
            $(this).addClass('active');
            var tabId = $(this).attr('data').replace('tab-', 'item-');
            $tabs.find('.tab-item[data="' + tabId + '"]').addClass('active');
            $tabs.find('.text').text($(this).text());
            $tabs.find('.mb-toggle-tab-wraper').removeClass('active');
        });

        if ($('.tabs')[0]) {
            $('.tabs').each(function () {
                var tab_heading = $(this).find('a.active').text();
                var toggle = '<div class="mb-toggle-tab">' +
                    '<span class="text">' + tab_heading + '</span>' +
                    '<span class="icon"><img src="images/global/arrow-red-down.png"></span>' +
                    '</div>';
                $(this).find('.tab-menu').wrap('<div class="mb-toggle-tab-wraper"></div>');
                $(this).find('.mb-toggle-tab-wraper').prepend(toggle);
            });
        }

        $(document).on('click', '.mb-toggle-tab', function (e) {
            e.preventDefault();
            $(this).parent().toggleClass('active');
        });

        // -----------------------------------------------
        // Equalize title heights
        // -----------------------------------------------
        function equalizeTitleHeights() {
            $('.articles').each(function () {
                var maxHeight = 0;
                var $titles = $(this).find('.wrap-content h3');
                $titles.css('height', 'auto');
                $titles.each(function () {
                    var h = $(this).outerHeight();
                    if (h > maxHeight) maxHeight = h;
                });
                $titles.height(maxHeight);
            });
        }

        // -----------------------------------------------
        // Slick Sliders
        // -----------------------------------------------
        $('.slider').each(function () {
            var $slider = $(this);
            var $counter = $slider.parent().find('.custom-counter');
            var $prev = $slider.parent().find('.custom-prev');
            var $next = $slider.parent().find('.custom-next');

            function updateCounter(event, slick, currentSlide) {
                var currentIndex = (currentSlide || 0) + 1;
                var totalDisplay = (slick.slideCount + 1) - slick.options.slidesToShow;
                $counter.text(currentIndex + '/' + totalDisplay);
            }

            function equalizeSlideHeights() {
                var maxHeight = 0;
                $slider.find('.slick-slide .article-inner').css('height', 'auto').each(function () {
                    var h = $(this).outerHeight();
                    if (h > maxHeight) maxHeight = h;
                });
                $slider.find('.slick-slide .article-inner').height(maxHeight);
            }

            $slider.on('init reInit afterChange', updateCounter);
            $slider.on('setPosition', function () {
                equalizeSlideHeights();
                equalizeTitleHeights();
            });

            $slider.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                arrows: true,
                dots: false,
                adaptiveHeight: false,
                prevArrow: $prev,
                nextArrow: $next,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: false
                        }
                    },
                    {
                        breakpoint: 768.98,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: false
                        }
                    }
                ]
            });
        });

        equalizeTitleHeights();

        // -----------------------------------------------
        // Mega menu & Mobile menu - append overlay
        // -----------------------------------------------
        $('.mega-menu-panel').append('<div class="mash-layout"></div>');
        $('.mobile-menu').append('<div class="mash-layout"></div>');

        // -----------------------------------------------
        // Helper: close search
        // -----------------------------------------------
        function closeSearch() {
            $('.search-toggle a').removeClass('active');
            if (isMobile()) {
                $('.search-wrap').removeClass('active');
            } else {
                $('.search-wrap').slideUp();
            }
        }

        // Helper: close mobile menu
        function closeMobileMenu() {
            $('.mobile-menu-toggle').removeClass('active');
            $('.mobile-menu').removeClass('active');
            // Reset toàn bộ submenu khi đóng menu
            $('.mobile-menu li.has-chilrent').removeClass('active');
        }

        // -----------------------------------------------
        // Search toggle
        // -----------------------------------------------
        $(document).on('click', '.search-toggle, .close-search', function (e) {
            e.preventDefault();
            $('.search-toggle a').toggleClass('active');

            if (isMobile()) {
                $('.search-wrap').toggleClass('active');
            } else {
                $('.search-wrap').slideToggle();
            }

            closeMobileMenu();
        });

        // -----------------------------------------------
        // Mega menu
        // -----------------------------------------------
        $(document).on('click', '.mega-menu a', function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('.mega-menu-panel').toggleClass('active');
        });

        $(document).on('click', '.tab-content a', function () {
            $('.mega-menu a').toggleClass('active');
            $('.mega-menu-panel').toggleClass('active');
        });

        // -----------------------------------------------
        // Overlay (mash-layout) click
        // -----------------------------------------------
        $(document).on('click', '.mash-layout', function (e) {
            e.preventDefault();

            // Close mega menu
            $('.mega-menu a').removeClass('active');
            $('.mega-menu-panel').removeClass('active');

            // Close mobile menu
            closeMobileMenu();

            // Close search
            closeSearch();
        });

        // -----------------------------------------------
        // Mobile menu toggle
        // -----------------------------------------------
        $(document).on('click', '.mobile-menu-toggle', function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('.mobile-menu').toggleClass('active');

            // Đóng search theo đúng mode (không dùng slideUp trên mobile)
            closeSearch();
        });

        // Mobile submenu - tự đóng các item khác cùng cấp khi mở item mới
        $(document).on('click', '.mobile-menu li.has-chilrent > a, .mobile-menu li.has-chilrent > .sub-arrow', function (e) {
            e.preventDefault();
            var $thisItem = $(this).parent();
            var isActive = $thisItem.hasClass('active');

            // Toggle item hiện tại
            $thisItem.toggleClass('active', !isActive);
            $('.mobile-menu-toggle').addClass('opened-submenu');
        });

        // -----------------------------------------------
        // Sticky header
        // -----------------------------------------------
        var $header = $('header');
        var sticky = 0;

        if (!isMobile()) {
            sticky = $('header .header-top').offset().top + $('header .header-top').height();
        }

        $(window).on('scroll', function () {
            if (window.pageYOffset > sticky) {
                $header.addClass('sticky-effects');
            } else {
                $header.removeClass('sticky-effects');
            }
        });

        // -----------------------------------------------
        // Language dropdown
        // -----------------------------------------------
        $(document).on('click', '.header-action .languages', function () {
            $(this).toggleClass('active');
            $(this).find('.sub-menu').slideToggle();
        });

    });

})(jQuery);