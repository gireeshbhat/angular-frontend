$(function () {
    var ink, d, x, y;
    $navigation = $('.mainmenu')
    $navigation.find('>li>a').click(function (e) {
        if ($(this).find(".ink").length === 0) {
            $(this).prepend("<span class='ink'></span>");
        }

        ink = $(this).find(".ink");
        ink.removeClass("animate");

        if (!ink.height() && !ink.width()) {
            d = Math.max($(this).outerWidth(), $(this).outerHeight());
            ink.css({ height: d, width: d });
        }

        x = e.pageX - $(this).offset().left - ink.width() / 2;
        y = e.pageY - $(this).offset().top - ink.height() / 2;

        ink.css({ top: y + 'px', left: x + 'px' }).addClass("animate");
        setTimeout(function () {
            $('.ink').remove();
        }, 600);
    });
});
$(function () {
    var navMain = $("#nav-main");
    navMain.on("click", "a", null, function () {
        //navMain.collapse('hide');
    });

});
$(document).ready(function (e) {
    "use strict";
    footfixed();
    equalheight();

    $(document).on('click', '.dropdown-menu.nav-pills li a', function () {
        $(this).parent('li').siblings('li').removeClass('active');
    });
    $(document).on('click', '.kyb_person .nav-tabs a', function () {
        equalheight();
    });
});
$(window).scroll(function (e) {
    if ($(window).scrollTop() > 30) {
        $('body').addClass('scrolled');
    }
    else {
        $('body').removeClass('scrolled');
    }
});
$(window).resize(function () {
    //$("html").scrollTop(0);
  //  $('body').removeClass('scrolled');
    "use strict";
    footfixed();
    equalheight();
});


function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return (w1 - w2);
};



function footfixed() {

    "use strict";
    var wndhgt = $(window).height();
    var headerhgt = $('header').height();
    wndhgt = wndhgt-30;
    $(".wrapper").css("min-height", wndhgt);
   // var foothgt = $("footer").outerHeight();
  //  $("footer").css("margin-top", -foothgt);
   // $(".main").css("padding-bottom", (foothgt));
}

function equalheight() {
    $(".equalheight .equaldiv").css("min-height", "");
    $(".equalheight").each(function () {
        var maxheight = 0;
        $($(this).find('.equaldiv')).each(function () {
            if (maxheight < ($(this).innerHeight())) {
                maxheight = $(this).innerHeight();
            }
        });
        $(this).find('.equaldiv').css("min-height", maxheight);
    });

    if ($('.equalheight1').length) {
        $(".equalheight1 .equaldiv1").css("min-height", "");
        $(".equalheight1").each(function () {
            var maxheight = 0;
            $($(this).find('.equaldiv1')).each(function () {
                if (maxheight < ($(this).innerHeight())) {
                    maxheight = $(this).innerHeight();
                }
            });
            $(this).find('.equaldiv1').css("min-height", maxheight);
        });
    }

    if ($('.equalheightmain').length) {
        $(".equalheightmain .equaldivmain").css("min-height", "");
        $(".equalheightmain").each(function () {
            var maxheight = 0;
            $($(this).find('.equaldivmain')).each(function () {
                if (maxheight < ($(this).innerHeight())) {
                    maxheight = $(this).innerHeight();
                }
            });
            $(this).find('.equaldivmain').css("min-height", maxheight);
        });
    }
}