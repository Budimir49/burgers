$(function () {

    var moveSlide = function (container, slideNum) {

        var items = container.find('.slider__item'),
            sliderWrapper = container.find('.slider__wrapper'),
            nextItem = items.eq(slideNum),
            nextItemIndex = nextItem.index(),
            activeSlide = items.filter('.active'),
            duration = 500;



        if (nextItem.length)
        {
            sliderWrapper.animate({
                'left' : -nextItemIndex * 100 + '%'
            }, duration, function () {
                activeSlide.removeClass('active');
                nextItem.addClass('active');
            });
        }
    };

    var wrapper = $('.wrapper'),
        sections = $('.section'),
        display = $('.main-content'),
        inScroll = false;

    sections.first().addClass('active');


    function setWidhtSlidaer() {
        var container = $('.slider__container'),
            items = $('.slider__item');

        items.width(container.width());
    }

    setWidhtSlidaer();

    var performTransition = function (sectionEq)
    {
        if (inScroll) return;

        inScroll = true;
        var position = (sectionEq * -100) + '%';

        display.css({
            'transform' : 'translateY(' + position + ')'
        });

        $('.fixed-menu__item').eq(sectionEq).addClass('active')
            .siblings().removeClass('active');

        sections.eq(sectionEq).addClass('active')
            .siblings().removeClass('active');

        setTimeout(function () {
            inScroll = false;
        }, 100)

    };

    var defineSections = function (sections) {
        activeSection = sections.filter('.active');
        return {
            activeSection : activeSection,
            nextSection   : activeSection.next(),
            prevSection   : activeSection.prev()
        }
    };



    var scrollToSection = function (direction) {
        var section = defineSections(sections),
            container = $('.slider__container'),
            items = container.find('.slider__item'),
            activeSlide = items.filter('.active'),
            nextSlide = activeSlide.next(),
            prevSlide = activeSlide.prev();

        if ((direction == 'down') && (section.prevSection.length))
        {
            performTransition(section.prevSection.index());
        }

        if ((direction == 'up') && (section.nextSection.length))
        {
            performTransition(section.nextSection.index());
        }

        if ((direction == 'left'))
        {
            if (nextSlide.length)
            {
                moveSlide(container, nextSlide.index());
            }
            else
            {
                moveSlide(container, items.first().index());

            }
        }

        if ((direction == 'right'))
        {
            if (prevSlide.length)
            {
                moveSlide(container, prevSlide.index());
            }
            else
            {
                moveSlide(container, items.last().index());
            }
        }

    };

    $(wrapper).on({

        wheel: function (e) {
            var deltaY = e.originalEvent.deltaY,
                direction = deltaY > 0 ? 'up' : 'down';

            scrollToSection(direction);

        },
        touchmove: function (e) {
            // e.preventDefault();
        }
    });
    
    $(document).on('keydown', function (e) {
        var section = defineSections(sections);


        switch (e.keyCode)
        {
            case 38:
                if (section.prevSection.length)
                {
                    performTransition(section.prevSection.index());
                }
                break;
            case 40:
                if (section.nextSection.length)
                {
                    performTransition(section.nextSection.index());
                }
                break;
        }
    });

    $('[data-goto]').on('click', function (e) {
        e.preventDefault();

        var elem = $(e.target),
            sectionNum = parseInt(elem.data('goto'));

        performTransition(sectionNum);



        var menu = $('.burger-nav'),
            burgerBtn = $('.hamburger-menu-link'),
            closeBtn = $('.btn-close');

        var height = $(window).height();

        burgerBtn.show();
        closeBtn.hide();

        menu.animate({
            'top' : height * -1
        }, 500)

    });


    $(window).swipe({
        swipe:function(event, direction) {
            scrollToSection(direction);
        },
        fallbackToMouseEvents:false
    });



    $('.hamburger-menu-link').on('click', function (e) {
        e.preventDefault();

        var menu = $('.burger-nav'),
            burgerBtn = $('.hamburger-menu-link'),
            closeBtn = $('.btn-close');

        var height = $(window).height();

        menu.css('top', height * -1);
        menu.css('height', height);

        menu.animate({
            'top' : '0'
        }, 500, function () {
            burgerBtn.hide();
            closeBtn.show();
        });
    });



    $('.btn-close').on('click', function (e) {
        e.preventDefault();

        var menu = $('.burger-nav'),
            burgerBtn = $('.hamburger-menu-link'),
            closeBtn = $('.btn-close');

        var height = $(window).height();

        burgerBtn.show();
        closeBtn.hide();

        menu.animate({
            'top' : height * -1
        }, 500)
    });


    $(window).on('resize', function(){
        setWidhtSlidaer();


        if ($(window).height() < 330)
        {
            $('#form-name').attr('placeholder', 'Имя');
            $('#form-phone').attr('placeholder', 'Телефон');
            $('#form-street').attr('placeholder', 'Улица');
            $('#form-house').attr('placeholder', 'Дом');
            $('#form-housing').attr('placeholder', 'Корпус');
            $('#form-flat').attr('placeholder', 'Квартира');
            $('#form-floor').attr('placeholder', 'Этаж');
            $('#form-comment').attr('placeholder', 'Комментарий');

        }
        else
        {
            $('#form-name').attr('placeholder', '');
            $('#form-phone').attr('placeholder', '');
            $('#form-street').attr('placeholder', '');
            $('#form-house').attr('placeholder', '');
            $('#form-housing').attr('placeholder', '');
            $('#form-flat').attr('placeholder', '');
            $('#form-floor').attr('placeholder', '');
            $('#form-comment').attr('placeholder', '');
        }


    });


    $('.arrow-scroll').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            container = $('.slider__container'),
            items = container.find('.slider__item'),
            activeSlide = items.filter('.active'),
            nextSlide = activeSlide.next(),
            prevSlide = activeSlide.prev();


        if ($this.hasClass('arrow-scroll_right'))
        {

            if (nextSlide.length)
            {
                moveSlide(container, nextSlide.index());
            }
            else
            {
                moveSlide(container, items.first().index());

            }
        }


        if ($this.hasClass('arrow-scroll_left'))
        {

            if (prevSlide.length)
            {
                moveSlide(container, prevSlide.index());
            }
            else
            {
                moveSlide(container, items.last().index());
            }
        }
    });


    $('.team-acco__item').on('click', function (e) {
        e.preventDefault();

        var $this = $(e.target),
            parent = $this.closest('.team-acco__item'),
            item = parent.find('.team-acco__content'),
            avatar = parent.find('.team-acco__avatar'),
            occ = parent.find('.team-acco__desc-occ'),
            text = parent.find('.team-acco__desc-text'),
            otherItems = parent.siblings(),
            height = 0;


        $(window).width() < 769
            ? height = avatar.outerHeight() + occ.outerHeight() + text.outerHeight() + 20
            : height = avatar.outerHeight();


        if (parent.hasClass('active'))
        {
            parent.removeClass('active');
            item.animate({
                'height' : '0'
            }, 300, function () {
                parent.removeClass('active');
            });
        }
        else
        {
            parent.addClass('active');
            otherItems.removeClass('active');
            item.animate({
                'height' : height + 'px'
            }, 300, function () {
                otherItems.removeClass('active');
                parent.addClass('active');
            });

            otherItems.find('.team-acco__content').animate({
                'height' : '0'
            }, 300);
        }

    });







    $('.menu-list__item').on('click', function (e) {
        e.preventDefault();

        var $this = $(e.target),
            parent = $this.closest('.menu-list__item'),
            parentTitle = parent.find('.menu-list__title'),
            item = parent.find('.menu-list__text'),
            otherItems = parent.siblings(),
            otherItemsTitle = otherItems.find('.menu-list__title'),
            otherItemsText = otherItems.find('.menu-list__text'),
            width = 0;

        otherItemsTitle.each(function (elem, i) {
            width = width + $(i).outerWidth();
        });

        width = $(window).width() - (width + parentTitle.outerWidth());

        if (width >= 540) width = 540;

        if (parent.hasClass('active'))
        {
            item.animate({
                'width' : '0'
            }, 300, function () {
                parent.removeClass('active');
            });
        }
        else
        {


            item.animate({
                'width' : width + 'px'
            }, 300, function () {
                otherItems.removeClass('active');
                parent.addClass('active');
            });

            otherItemsText.animate({
                'width' : '0'
            }, 300);

        }

    });




    $('.modal__close').on('click', function () {
       var modal = $('.modal__content'),
           modalWrapper = $('.modal__wrapper');

        modal.fadeOut(300);
        modalWrapper.fadeOut(300);

    });


    $('.review__btn').on('click', function (e) {
        e.preventDefault();

        var $this = $(e.target),
            parent = $this.closest('.reviews__hover-content'),
            title = parent.find('.reviews__title'),
            text = parent.find('.reviews__text-long'),
            modal = $('.modal__content'),
            modalWrapper = $('.modal__wrapper'),
            modalTitle = modal.find('.modal__title'),
            modalText = modal.find('.modal__text');


        modalTitle.text(title.text().trim());
        modalText.text(text.text().trim());

        modalWrapper.fadeIn(500);
        modal.fadeIn(500);

        modal.css('display', 'flex');
    });




    $(function(){
        var mapZoom = 0;
        $(window).width() < 769
            ? $(window).width() < 480 ? mapZoom = 12 : mapZoom = 13
            : mapZoom = 14;

        ymaps.ready(init);
        var myMap,
            myPlacemark,
            myPlacemarks = [{
                latitude: 59.915038,
                longitude: 30.486096,
                hintContent: 'Mr.Burger на Товарищеском',
                balloonContent: 'Товарищеский проспект, 20/27'
                },
                {
                    latitude: 44.044528,
                    longitude: 43.064310,
                    hintContent: 'Mr.Burger на проспекте',
                    balloonContent: 'проспект 40 лет Октября 57'
                },
                {
                    latitude: 44.043372,
                    longitude: 43.023357,
                    hintContent: 'Mr.Burger на Ермолова',
                    balloonContent: 'улица Ермолова 14/1'
                }];

        function init(){
            myMap = new ymaps.Map("YMapsID", {
                center: [44.042610, 43.049522],
                zoom: mapZoom
            });


            myPlacemarks.forEach(function(obj) {
                myPlacemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
                    hintContent: obj.hintContent,
                    hintContent: obj.balloonContent
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: 'img/map-marker.svg',
                    iconImageSize: [46, 57],
                    iconImageOffset: [-15, -50]
                });

                myMap.geoObjects.add(myPlacemark);
            });

            myMap.behaviors
                .disable('scrollZoom')
                .disable('drag')
        }

    });


    jQuery(function($){
        $('#form-phone').mask("+7(999) 999-9999");
    });


    $('#order-form').validate({

        rules: {
            name: {
                required: true
            },
            street: {
                required: true
            },
            phone: {
                required: true
            },
            house: {
                required: true
            }
        },
        focusCleanup: true,
        focusInvalid: false,
        errorPlacement: function(error, element) {
            return true;
        },
        submitHandler: function(form) {
            $.ajax({
                url: form.action,
                type: form.method,
                data: $(form).serialize(),
                success: function(response) {

                    if (response == '1')
                    {
                        var blur = $('.blur');
                        blur.css('filter', 'blur(50px)');

                        setTimeout(function() {

                            var orderSuccess = $('.order__success');

                            orderSuccess.fadeIn(500);
                            orderSuccess.css('display', 'flex');

                            setTimeout(function() {
                                form.reset();
                                orderSuccess.fadeOut(300);
                                blur.css('filter', 'none');

                            }, 4000);
                        }, 1000);

                    }

                }
            });
        },
        errorClass: "form-input_error"
    });

});