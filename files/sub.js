gsap.registerPlugin(ScrollTrigger)

document.querySelectorAll(".history-list-txt").forEach(list => {
  gsap.to(
    list, {
      scrollTrigger: {
        // markers: true,
        trigger: list,
        start: `center center+=250`,
        end: `bottom center+=150`,
        toggleClass: 'active2',
        onEnter: () => {
          list.classList.add("active");
        },
        onLeaveBack: () => {
          list.classList.remove("active");
        },
      },
    }
  );
})

gsap.to(
  '.history-topbox', {
    scrollTrigger: {
      // markers: true,
      trigger: '.history-topbox',
      start: `center top+=220`,
      end: `bottom+=7000`,
      pin: true,
      pinSpacing: false,
      toggleActions: "play complete reverse reset",
      invalidateOnRefresh: true,
    },
  }
)

if ($(window).width() <= 1024) {
  gsap.to('.history-topbox', {
    scrollTrigger: {
      trigger: '.history-topbox',
      start: 'center top+=220',
      end: 'bottom+=7000',
      pin: false,
      pinSpacing: false,
      toggleActions: 'play none reverse none',
      invalidateOnRefresh: true,
    },
  });
}




$(function () {

  function blind_on() {
    $(".blind").addClass("active")
  }

  function blind_off() {
    $(".blind").removeClass("active")
  }

  function headerSroll() { //헤더 고정
    $(window).on("scroll", function () {
      var height = $("#header").height(),
        scroll = $(window).scrollTop()


      if (scroll >= height) {
        $("#header").addClass("scroll")
        $(".menu-wrap").addClass("active")
      } else {
        $("#header").removeClass("scroll")
        $(".menu-wrap").removeClass("active")
      }
    })
  }
  headerSroll()


  function subvisual() {
    $(window).on("mousewheel scroll load", function () {
      var viewTop = $(this).scrollTop(),
        viewHeight = $(this).outerHeight(true),
        viewBottom = viewTop + viewHeight;

      $(".subvisual").each(function () {
        var elementTop = $(this).offset().top + 400,
          elementHeight = $(this).outerHeight(),
          elementBottom = elementTop + elementHeight;

        if (((elementTop <= viewBottom) && (elementBottom >= viewTop))) {
          $(".subvisual-img img, .subvisual-title").addClass("active")
        } else {
          //do
        }
      });
    });
  }
  subvisual()


  function subVisualNavi() { //서브비주얼 fixed

    if ($(window).width() > 768) {
      const $subvisualNavi = $('.subvisual-navi')

      if ($subvisualNavi.length > 0) {
        const nt = $subvisualNavi.offset().top,
          ht = $('#header').height()

        $(window).scroll(function () {
          const sct = $(this).scrollTop()
          const ot = nt - ht;

          if (sct >= ot) {
            $subvisualNavi.addClass("fixed")
          } else {
            $subvisualNavi.removeClass("fixed")
          }
        });
      }
    }
  }
  subVisualNavi()

  $(window).resize(function () {
    subVisualNavi()
  })


  function subVisualNavi_Tab() { //서브비주얼 네비게이션 모바일 탭버튼 활성화 
    var tab = $(".subvisual-navi")
    var tab_li = tab.find("ul>li")
    var text = ""

    tab_li.each(function () {
      if ($(this).hasClass("active")) {
        text = $(this).find(">a").text()
      }
    })

    tab.prepend("<button class='mlinktab_btn'>" + text + "</button>")

    $(document).on("click", ".mlinktab_btn", function () {
      if ($(this).next("div").find(">ul").is(":hidden")) {
        $(this).addClass("active")
        $(this).next("div").find(">ul").stop().slideDown("fast")
      } else {
        $(this).removeClass("active")
        $(this).next("div").find(">ul").stop().slideUp("fast")
      }
      return false;
    });
  }
  subVisualNavi_Tab()


  function snsBtn() { //컨텐츠 타이틀 sns공유버튼
    var btn = $(".contents-title .sns > a"),
      snsWrap = $(".contents-title .sns-wrap")

    btn.click(function (e) {
      e.preventDefault()
      snsWrap.slideToggle(300)
    })
  }
  snsBtn()


  function historyScroll() {  //히스토리 원형 활성화 
    var isClickEvent = false;
    $(window).on("load scroll", function () {
      if (!isClickEvent) {
        if ($(".history-list").length) {
          item = $(".history-list-txt, .history-list-year"),
            t = $(this),
            scrTop = t.scrollTop() + (t.outerHeight() / 1.5),
            itemPos = new Array(),
            itemH = new Array();

          item.each(function (index) {
            var t = $(this);
            itemPos.push(t.offset().top);
            itemH.push(t.outerHeight());

            if (scrTop >= itemPos[index]) {
              t.addClass("active");
              var targetId = t.closest('.history-list-wrap').attr('id');
              $('a[href="#' + targetId + '"]').closest('li').addClass('active').siblings().removeClass('active');
            } else {
              t.removeClass("active");
            }
          });
          var hasActiveYear = $(".history-list-year.active").length > 0;
          if (!hasActiveYear) {
            $(".history-topbox ul li").removeClass("active");
          }
        }
      }
    })

    var $navi = $('.history-topbox ul'),
      $naviEl = $navi.find('li'),
      $naviLink = $naviEl.find('a');

    var $naviLink = $naviEl.find('a');

    $naviLink.on('click', function () {
      isClickEvent = true;
      var target = $($(this).attr('href'));
      var targetOffset = target.offset().top;

      $naviEl.removeClass('active');
      $(this).parent().addClass('active');

      $('html,body').animate({
        scrollTop: targetOffset - 400
      }, 700, function () {
        isClickEvent = false;
      });
      return false;
    });

    $(window).on('mousewheel resize load', function () {
      var $this = $(this),
        sct = $this.scrollTop(),
        ht = 400,
        cont = $(".history-list-wrap");

      cont.each(function () {
        var $this = $(this),
          bdex = $this.index(),
          ot = $this.offset().top - ht,
          oh = $this.height();

        if (sct >= ot - 1 && sct <= ot + oh) {
          $naviEl.eq(bdex).addClass('active').siblings().removeClass('active');
        }

        if (sct == $(document).height() - $(window).height()) {
          $naviEllast.siblings().removeClass('active');
          $naviEllast.addClass('active');
        }
      });
    });
  }

  historyScroll();


  function historyBubble() { 
    var btn = $(".history-list-txt-list > li > span")
    // bubble = $(".history-list-txt-list > li .bubble")

    if ($(window).width() < 768) {
      btn.click(function () {
        $(this).toggleClass("active")
        $(this).find(".bubble").toggleClass("active")
      })
    }
  }
  historyBubble()

  $(window).resize(function() {
    historyBubble()
  })
  
  // var timer;
  // $(window).resize(function () {
  //   if (timer) {
  //     clearTimeout(timer);
  //   }
  //   timer = setTimeout(historyBubble, 200);
  // })


  function memberlist_popup() {
    var moreBtn = $(".memberlist-more"),
      close = $(".memberlist-close"),
      item = $(".memberlist > li > div")

    moreBtn.click(function (e) {
      e.preventDefault()

      // $("html").addClass("active")
      $(this).parent().addClass("active")
      $(".hd-wrap").css("z-index", "5")
      blind_on()
    })

    close.click(function (e) {
      e.preventDefault()

      // $("html").removeClass("active")
      $(this).parent().removeClass("active")
      $(".hd-wrap").css("z-index", "15")
      blind_off()
    })

    $(".blind").click(function (e) {
      e.preventDefault()

      // $("html").removeClass("active")
      $(".memberlist > li > div").removeClass("active")
      $(".hd-wrap").css("z-index", "15")
      blind_off()
    })
  }
  memberlist_popup()


  function contentsMove() { //로드될때 트렌지션 적용 
    $(window).on("mousewheel scroll load", function () {
      var wrapper = $(".research > li")

      var viewTop = $(this).scrollTop(),
        viewHeight = $(this).outerHeight(true),
        viewBottom = viewTop + viewHeight

      wrapper.each(function () {
        var elementTop = $(this).offset().top + 500,
          elementHeight = $(this).outerHeight(),
          elementBottom = elementTop + elementHeight

        if (((elementTop <= viewBottom) && (elementBottom >= viewTop))) {
          $(this).find(">div").addClass("active")
        } else {
          //do
        }
      });
    });
  }
  contentsMove()

});