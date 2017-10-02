

(function ($) {
    'use strict';

    jQuery(document).ready(function () {


        $(window).load(function () {


            $('.preloader').fadeOut();
            $('.preloader-area').delay(350).fadeOut('slow');

            $(".menu-area").sticky({
                topSpacing: 0,
            });


            $('.work .work-posts').isotope({
                itemSelector: '.col-md-4'
            });


            $(function () {
                // init Isotope
                var $container = $('.work-posts').isotope({
                    itemSelector: '.item'
                });
                // filter functions
                var filterFns = {
                    // show if number is greater than 50
                    numberGreaterThan50: function () {
                        var number = $(this).find('.number').text();
                        return parseInt(number, 10) > 50;
                    },
                    // show if name ends with -ium
                    ium: function () {
                        var name = $(this).find('.name').text();
                        return name.match(/ium$/);
                    }
                };
                // bind filter button click
                $('#filters').on('click', 'li', function () {
                    var filterValue = $(this).attr('data-filter');
                    // use filterFn if matches value
                    filterValue = filterFns[filterValue] || filterValue;
                    $container.isotope({
                        filter: filterValue
                    });
                });
                // change is-checked class on buttons
                $('.filters').each(function (i, buttonGroup) {
                    var $buttonGroup = $(buttonGroup);
                    $buttonGroup.on('click', 'li', function () {
                        $buttonGroup.find('.active').removeClass('active');
                        $(this).addClass('active');
                    });
                });
            });


            $(document).on('click', '.navbar-collapse.in', function (e) {
                if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                    $(this).collapse('hide');
                }
            });



        });
        $(".testimonial-list").owlCarousel({
            items: 1,
            autoPlay: 15000,
            navigation: false,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsTablet: [768, 1],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            pagination: false,
            autoHeight: true,
        });




        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 200) {
                $('.header-top-area').addClass('menu-bg');
            } else {
                $('.header-top-area').removeClass('menu-bg');
            }
        });


        $('a.smoth-scroll').on("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 0
            }, 1000);
            e.preventDefault();
        });



        $(function() {
          var size = $("#name").css("font-size");
          $(window).scroll(function() {
            var x = $(window).scrollTop();
            if (x >= 200) {
              $("#name").css("font-size",0)
              $("#nameIsSticky").css("font-size", 30) ;
            } else {
              $("#name").css("font-size",size)
              $("#nameIsSticky").css("font-size",0) ;
            }

          });

        });




        var timerInit = false;
        $(".timer").each(function () {
            $(this).bind("inview", function (isInView) {
                var dataCount = parseInt($(this).attr("data-count"));
                if (isInView && timerInit == false) {
                    $(this).countTo({
                        from: 0,
                        to: dataCount,
                        speed: 2500,
                        refreshInterval: 50,
                        formatter: function (value, options) {
                            return value.toFixed(options.decimals);
                        },
                        onUpdate: function (value) {
                            // console.debug(this);
                        },
                        onComplete: function (value) {
                            timerInit = true;
                        }
                    });
                }
            });
        });



    });

})(jQuery);
