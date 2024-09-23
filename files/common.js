$(function () {
  // xeicon 접근성
  $("[class*='xi-']").attr("aria-hidden", "true");
  // a link 새 창으로 열림 자동 타이틀	
  $("a[target='_blank']").attr("title", "새 창으로 열림");

  $("#wrap").prepend("<div class='blind'></div>");

  // 사파리 100vh 해결
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');

  $(window).on('resize', function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  })


  function blind_on() {
    $(".blind").addClass("active")
  }

  function blind_off() {
    $(".blind").removeClass("active")
  }


  // function gnbBg() {
  //   var maxHeight = 0;

  //   $("#header #gnb .sub").each(function () {
  //     maxHeight = Math.max(maxHeight, $(this).outerHeight())
  //   });

  //   $("#header .gnb-bg, #header #gnb .sub").css("height", maxHeight)
  // }
  // gnbBg()

  // $(window).resize(function() {
  //   gnbBg()
  // })



  function gnb() { //헤더 네비게이션 
    var gnb = $("#gnb"),
      dep1 = $("#gnb > ul > li"),
      dep2 = gnb.find(".sub"),
      bg = $(".gnb-bg"),
      hd = $("#header")

/*    dep1.on("mouseover focusin", function () {
      blind_on()
      bg.addClass("active")
      dep1.removeClass("active")
      $(this).addClass("active")
      hd.addClass("active")
      gnb.addClass("active")
    })

    dep1.on("mouseout focusout", function () {
      blind_off()
      bg.removeClass("active")
      dep1.removeClass("active")
      hd.removeClass("active")
      gnb.removeClass("active")
    })
    */
  }
  gnb()


  function search() { //검색창
    var btn = $("#header .search"),
      close = $(".search-box-close"),
      searchBox = $("#header .search-box")

    btn.click(function () {
      blind_on()
      $("html").addClass("active")
      $("#header").addClass("active")
      $("#gnb").addClass("active2")
      $(this).hide()
      searchBox.fadeIn(200)
    })

    close.click(function () {
      blind_off()
      $("html").removeClass("active")
      $("#header").removeClass("active")
      $("#gnb").removeClass("active2")
      btn.show()
      searchBox.fadeOut(200)
    })

    $(".blind").click(function () {
      blind_off()
      $("html").removeClass("active")
      $("#header").removeClass("active")
      $("#gnb").removeClass("active2")
      btn.show()
      searchBox.fadeOut(200)
      // $(".allmenu ").fadeOut(200)
      // $("#header .menu").show()
      // $("#header .menu-wrap .close").hide()
    })
  }
  search()


  function allmenu() {
    var btn = $("#header .menu"),
      close = $("#header .menu-wrap .close"),
      menu = $(".allmenu")

    btn.click(function () {
      $(this).hide()
      close.show()
      menu.fadeIn(200)
      blind_on()
      $("html").addClass("active")

      $("#gnb").hide()
      $("#header").removeClass("active2")
      $("#gnb").removeClass("active2")
      $("#header .search").hide()
      $("#header .search-box").fadeOut(200)
      // $(".hd-wrap").css("margin-left", "0")
    })

    close.click(function () {
      $(this).hide()
      btn.show()
      menu.fadeOut(200)
      blind_off()

      $("html").removeClass("active")
      $("#header").removeClass("active2")
      // $("#header").addClass("scroll")
      $("#gnb").removeClass("active2")
      $("#header .search").show()
      $("#header .search-box").hide()
    })

    $(".blind").click(function () {
      $(".allmenu ").fadeOut(200)
      $("#header .menu").show()
      $("#header .menu-wrap .close").hide()
    })

    close.click(function() {
      var scrollTop = $(window).scrollTop()
    
      if (scrollTop > 0) {
        $("#header").addClass('scroll')
      }
    })
    close.click(function() {
      var scrollTop = $(window).scrollTop()
    
      if (scrollTop > 0) {
        $("#header").addClass('scroll')
      }
    })

    if ($(window).width() < 1024) { //작을때

      btn.click(function () {
        $("#header").addClass("active")
        $("#header").removeClass("active2")
      })

      if (menu.is(":visible")) {
        $("#header").addClass("active")
        $("#header").removeClass("scroll active2")
      }

      close.click(function () {
        $(this).hide()
        btn.show()
        menu.fadeOut(200)
        blind_off()

        $("html").removeClass("active")
        $("#header").removeClass("active")
        $("#gnb").removeClass("active2")
        $("#header .search").show()
        $("#header .search-box").hide()
      })

      var dep1 = $(".allmenu nav > ul > li > a"),
        sub = $(".allmenu nav .sub"),
        speed = 300

      dep1.each(function () {
        if (!$(this).next().find("ul").length) {
          $(this).addClass("empty");
        }
      })

      dep1.off().on("click", function () {
        if ($(this).next("div").is(":hidden")) {
          sub.slideUp(speed);
          dep1.removeClass("active")
          $(this).next("div").slideDown(speed);
          $(this).addClass("active")
        } else {
          $(this).next("div").slideUp(speed);
          dep1.removeClass("active")
        }

        if ($(this).next("div").find("ul").length) { //하위메뉴가 있을 경우에만 버튼효과 무시
          return false;
        }
      })

    } else { //넓을때 

      btn.click(function () {
        $("#header").removeClass("active scroll")

        if($("#header").hasClass("black")){
          $("#header").removeClass("black")
          $("#header").addClass("white")
        }
      })

    

      if (menu.is(":hidden")) {
        $("#gnb").show()
      } else if (menu.is(":visible")) {
        $("#header").removeClass("active")
      }

      close.click(function () {
        $("#gnb").show()

        if($("#section03, #section04").hasClass("swiper-slide-active")){
          $("#header").removeClass("white")
          $("#header").addClass("black")
        }
      })
    }
  }
  allmenu()

  $(window).resize(function () {
    allmenu()
  })


  function topBtn() { //탑버튼
    var btn = $("#footer .home-btn")

    btn.click(function (e) {
      e.preventDefault()
      
      $("html, body").animate({
        scrollTop: 0
      }, 600)
    })
  }
  topBtn()

});