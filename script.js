/* 헤더 스크립트 시작 */
function logoShowAndHide() {
  $(window).scroll(function() {
    let $this = $(this);
    let scTop = $this.scrollTop(); // 스크롤 위치

    if ( scTop > 0 ) {
      $(".logo_wrap").addClass('is_scroll');
    } else {
      $(".logo_wrap").removeClass('is_scroll');
    }
  });
}

logoShowAndHide();

$(".dropBtn").click(function () {
    var dropdownContent = $(".dropdown_content");
    var $this = $(this);

    if (dropdownContent.hasClass("is_active")) {
        dropdownContent.removeClass("is_active");
        $this.removeClass("rotate");
    } else {
        dropdownContent.addClass("is_active");
        $this.addClass("rotate");
    }
});
/* 헤더 스크립트 끝 */

/* 슬릭 슬라이더 시작 */
function SliderBox1__init() {
    $(".slider_box > .slick").slick({
        dots: false,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: 0,
        arrows: true,
        prevArrow: ".slider_box > .arrows > .btn_arrow_left",
        nextArrow: ".slider_box > .arrows > .btn_arrow_right"
    });
}

SliderBox1__init();
/* 슬릭 슬라이더 끝 */

$(window).click(function (event) {
    if (!$(event.target).closest(".dropBtn").length) {
        $(".dropdown_content").removeClass("is_active");
        $(".dropBtn").removeClass("rotate");
    }
});
/* 헤더 스크립트 끝 */

/* 발견되면 활성화시키는 라이브러리 시작 */
function ActiveOnVisible__init() {
    $(".active-on-visible").each(function (index, node) {
        var $node = $(node);

        var onFuncName = $node.attr("data-active-on-visible-on-func-name");
        var offFuncName = $node.attr("data-active-on-visible-off-func-name");

        $node.data("data-active-on-visible-on-func-name", onFuncName);
        $node.data("data-active-on-visible-off-func-name", offFuncName);
    });

    $(window).resize(_.debounce(ActiveOnVisible__initOffset, 500));
    ActiveOnVisible__initOffset();

    $(window).scroll(_.debounce(ActiveOnVisible__checkAndActive, 50));
    ActiveOnVisible__checkAndActive();
}

function ActiveOnVisible__initOffset() {
    var windowHeight = $(window).height();

    $(".active-on-visible:not(.actived)").each(function (index, node) {
        var $node = $(node);

        var offsetTop = $node.offset().top;

        var matrix = $node
            .css("transform")
            .replace(/[^0-9\-.,]/g, "")
            .split(",");
        var translateX = matrix[12] || matrix[4];
        var translateY = matrix[13] || matrix[5];

        if (translateY) {
            offsetTop -= translateY;
        }

        $node.attr("data-active-on-visible-offsetTop", offsetTop);
        $node.data("data-active-on-visible-offsetTop", offsetTop);

        if (!$node.attr("data-active-on-visible-diff-y")) {
            $node.attr("data-active-on-visible-diff-y", "0");
        }

        if (!$node.attr("data-active-on-visible-delay")) {
            $node.attr("data-active-on-visible-delay", "0");
        }

        var diffY = $node.attr("data-active-on-visible-diff-y");
        var delay = $node.attr("data-active-on-visible-delay");

        if (diffY.substr(-2, 2) == "vh") {
            diffY = parseInt(diffY);

            diffY = windowHeight * (diffY / 100);
        } else if (diffY.substr(-1, 1) == "%") {
            diffY = parseInt(diffY);

            diffY = $node.height() * (diffY / 100);
        } else {
            diffY = parseInt(diffY);
        }

        $node.attr("data-active-on-visible-diff-y-real", diffY);
        $node.data("data-active-on-visible-diff-y", diffY);
        $node.data("data-active-on-visible-delay", delay);
    });

    ActiveOnVisible__checkAndActive();
}

function ActiveOnVisible__checkAndActive() {
    $(".active-on-visible:not(.actived)").each(function (index, node) {
        var $node = $(node);

        var offsetTop = $node.data("data-active-on-visible-offsetTop") * 1;
        var diffY = parseInt($node.data("data-active-on-visible-diff-y"));
        var delay = parseInt($node.data("data-active-on-visible-delay"));

        var onFuncName = $node.data("data-active-on-visible-on-func-name");
        var offFuncName = $node.data("data-active-on-visible-off-func-name");

        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var nodeHeight = $node.height();

        if (scrollTop + windowHeight + diffY > offsetTop) {
            setTimeout(function () {
                if ($node.hasClass("active") == false) {
                    $node.addClass("active");

                    if ($node.hasClass("can-active-once")) {
                        $node.addClass("actived");
                    }

                    if (window[onFuncName]) {
                        window[onFuncName]($node);
                    }
                }
            }, delay);
        } else {
            if ($node.hasClass("active")) {
                $node.removeClass("active");

                if (window[offFuncName]) {
                    window[offFuncName]($node);
                }
            }
        }
    });
}

$(function () {
    ActiveOnVisible__init();
});
/* 발견되면 활성화시키는 라이브러리 끝 */
