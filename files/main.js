// gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
// const panelslast = gsap.utils.toArray("#panels-container #section05");
// tween = gsap.to(panelslast, {
// 	xPercent: -100 * ( panelslast.length - 1 ),
// 	ease: "none",
// 	scrollTrigger: {
// 		trigger: "#panels-container",
// 		pin: true,
// 		start: "top top",
// 		scrub: 1,
// 		snap: {
// 			snapTo: 1 / (panpanelslastels.length - 1),
// 			inertia: false,
// 			duration: {min: 0.1, max: 0.1}
// 		},
// 		end: () =>  "+=" + (panelsContainer.offsetWidth - innerWidth)
// 	}
// });


$(function () {

  var main = undefined

  function mainfullpage() { //메인 가로 풀페이지

    var bullet = ['Home', 'MDAN', 'MODA', 'Omics', 'News', 'Contact us'],
      href = ["#section01", "#section02", "#section02.5",'#section027', "#section04", '#section05'],
      header = $("#header"),
      logo = $("#logo img"),
      mainNavi = $("#masthead")

    setTimeout(function () {
      var main = $("#panels > .swiper-wrapper > .swiper-slide-active"),
        bullet = $("#masthead .anchor-nav .swiper-pagination-bullet")

      if (main.hasClass("black")) {
        // header.removeClass("white")
        header.addClass('black')
        // logo.attr("src", "/html/images/layout/logo-bk.svg")
        mainNavi.addClass("black")
      } else {
        header.removeClass('black')
        // header.addClass('white')
        // logo.attr("src", "/html/images/layout/logo.svg")
        mainNavi.removeClass("black")
      }

      bullet.click(function() {
        $(".hd-wrap").css("margin-left", "0");
        $("#masthead").css("margin-left", "0");
      })

    }, 350)


    var ww = $(window).width()

    if (ww > 1280 && main == undefined) {
      main = new Swiper("#panels", {
        touchRatio: 0,//드래그 금지
        mousewheel: true, 
        slidesPerView: "auto",
        speed: 800,
        autoplay: false,
        pagination: {
          el: ".anchor-nav",
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class= "${className} bullet${index + 1}"><a data-tag-index="main" data-tag-cate="admin_use" href="${href[index]}"><span>${bullet[index]}</span></a></span>`;
          }
        },
        on: {
          slideChange: function () {
            setTimeout(function () {
              var mainS = $("#panels > .swiper-wrapper > .swiper-slide-active"),
                bullet = $("#masthead .anchor-nav .swiper-pagination-bullet"),
                bulletLast = $("#masthead .anchor-nav .swiper-pagination-bullet.bullet5")

              if (mainS.hasClass("black")) {
                // header.removeClass("white")
                header.addClass('black')
                // logo.attr("src", "/html/images/layout/logo-bk.svg")
                mainNavi.addClass("black")
              } else {
                header.removeClass('black')
                // header.addClass('white')
                // logo.attr("src", "/html/images/layout/logo.svg")
                mainNavi.removeClass("black")
              }

              var mainpage = $("#section04, #section05")

              mainpage.on("mousewheel", function(e) {
                var wheel = e.originalEvent.wheelDelta 
                
                if(wheel > 0) {
                  $(".hd-wrap").css("margin-left", "0");
                  $("#masthead").css("margin-left", "0");
                }
              })

              var btn = $("#section05 .home-btn")
              btn.click(function() {
                main.slideTo(0, 2000, false)

                $(".hd-wrap").css("margin-left", "0");
                $("#masthead").css("margin-left", "0");
              })
            }, 50)
          },
          reachEnd: function() {
            setTimeout(() => {
              $(".hd-wrap").css("margin-left", "-52rem");
              $("#masthead").css("margin-left", "-52rem");
            }, 50);
          },
        }
      })

    } else if (ww <= 1280 && main != undefined) {
      main.destroy()
      main = undefined
    }
  }
  mainfullpage()

  $(window).on("resize", function () {
    mainfullpage()
  });


  function visual() { // 메인비주얼

    var visualSlider = new Swiper(".visual-slide.swiper", {
      loop: true,
      effect: "fade",
      slidesPerView: 1,
      speed: 1000,
      //autoplay: {
      //  delay: 5000,
       // disableOnInteraction: false,
      //},
      pagination: {
        el: ".visual-controller .swiper-pagination",
        type: "bullets",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + '0' + (index + 1) + "</span>";
        },
      },
    })

    const $wrapper = $('.visual .arrow'),
      $start = $wrapper.find('.play'),
      $stop = $wrapper.find('.pause')

    $stop.click(function () {
      visualSlider.autoplay.stop()
      $(this).removeClass("active")
      $start.addClass("active")
      $('.swiper-pagination-bullet-active').addClass('pause')
    });

    $start.click(function () {
      visualSlider.autoplay.start()
      $(this).removeClass("active")
      $stop.addClass("active")
      $('.swiper-pagination-bullet-active').removeClass('pause')
    });
  }
  visual()


  function conference() { //섹션3 슬라이드 
    var conferenceSlider = new Swiper(".conferences-slide.swiper", {
      slidesPerView: 2,
      spaceBetween: 20,
      speed: 600,
      navigation: {
        nextEl: ".conferences-slide-arrow.next",
        prevEl: ".conferences-slide-arrow.prev",
      },
      breakpoints: {
        1024 : {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        640 : {
          slidesPerView: 3,
          spaceBetween: 30,
        }

      }
    })
  }
  conference()


  function headerSroll() { //모바일 헤더 고정
    $(window).on("scroll", function () {

      var ww = $(window).width(),
        height = $("#header").height(),
        scroll = $(window).scrollTop(),
        logo = $("#logo img")

      if (ww <= 1280) {
        if (scroll >= height) {
          $("#header").addClass("scroll")
        } else {
          $("#header").removeClass("scroll")
        }
      } else if (ww > 1280) {
        $("#header").removeClass("scroll")
      }
    })
  }
  headerSroll()
  $(window).resize(function () {
    headerSroll()
  })

})


/* Main navigation */
// let panelsSection = document.querySelector("#panels"),
//   panelsContainer = document.querySelector("#panels-container"),
//   tween;

// document.querySelectorAll(".anchor").forEach(anchor => {
//   anchor.addEventListener("click", function (e) {
//     e.preventDefault();

//     let targetElem = document.querySelector(e.target.getAttribute("href")),
//       y = targetElem,
//       index = $(this).index(),
//       sectionWidth = document.querySelector(".panel").offsetWidth,
//       footer = document.querySelector(".footer").offsetWidth

//     if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
//       let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
//         totalMovement = (panels.length - 1) * targetElem.offsetWidth;
//       y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
//     }

//     gsap.to(window, {
//       scrollTo: {
//         y: (sectionWidth * index) + (index * footer),
//         // y: y,
//         autoKill: false
//       },
//       duration: 1
//     });
//   });

// });

// /* Panels */
// const fullscreen = gsap.utils.toArray("#panels-container .full-screen")
// const section05 = document.querySelector("#section05")
// const footer = document.querySelector(".footer")
// const footerWidthRatio = (section05.offsetWidth - footer.offsetWidth) / window.innerWidth * 100

// const panels = gsap.utils.toArray("#panels-container .panel")
// tween = gsap.to(panels, {
//   xPercent: -100 * (fullscreen.length - 1) - (100 - footerWidthRatio),
//   ease: "none",
//   scrollTrigger: {
//     trigger: "#panels-container",
//     pin: true,
//     // pinSpacing:false,
//     start: "top top",
//     scrub: 1,
//     // snap: {
//     // 	snapTo: 1 / (panels.length - 1),
//     // 	inertia: false,
//     // 	duration: {min: 0.1, max: 0.1}
//     // },
//     ease: "none",
//     end: () => "+=" + (panelsContainer.offsetWidth - window.innerWidth)

//   },
//   // onComplete : () => {
//   //   window.addEventListener('wheel', e=>{
//   //     console.log(e.wheelDelta)
//   //     const item  = document.querySelector('#section05');
//   //     if(e.wheelDelta < 0) {
//   //       console.log(item)
//   //       item.style.transform = `translateX(-300%)`
//   //     }
//   //   })
//   // }
// });