function wifi_load_effect() {
 /********** wifi effect on features page *********/
 setTimeout(function() {
  jQuery('.win-sensor').css("opacity", "1");
 }, 100);
 setTimeout(function() {
  jQuery('.hmotion-sensor').css("opacity", "1");
 }, 250);
 setTimeout(function() {
  jQuery('.door-sensor').css("opacity", "1");
 }, 350);
 setTimeout(function() {
  jQuery('.box-sensor').css("opacity", "1");
 }, 450);


 if (jQuery('.win-sensor').css('visibility') == 'visible') {
  setTimeout(function() {
   jQuery('.sensor-window-wifi').addClass('wifi-device-active');
   setTimeout(function() {
    jQuery('.window-dash').fadeIn(1000);
   }, 1500);

   setTimeout(function() {
    jQuery('.sensor-window-wifi').css("opacity", "1");
   }, 1000);


  }, 500);
 }

 if (jQuery('.hmotion-sensor').css('visibility') == 'visible') {
  setTimeout(function() {
   jQuery('.hmotion-sensor-wifi').css("opacity", "1");
  }, 4000);

  setTimeout(function() {
   jQuery('.hmotion-sensor-wifi').addClass('wifi-device-active');
  }, 1200);
 }

 if (jQuery('.sensor-door').css('visibility') == 'visible') {
  setTimeout(function() {
   jQuery('.sensor-door-wifi').css("opacity", "1");
  }, 5000);

  setTimeout(function() {
   jQuery('.sensor-door-wifi').addClass('wifi-device-active');
  }, 5000);

  setTimeout(function() {
   jQuery('.door-dash').fadeIn(1000);
  }, 6000);

 }

 setTimeout(function() {
  jQuery('.sensor-box-wifi').addClass('wifi-device-active');
 }, 6500);

 setTimeout(function() {
  jQuery('.sensor-box-wifi').css("opacity", "1");
 }, 6500);
}

jQuery(document).ready(function(e) {

 /*how it works*/
 jQuery('.iphone-frame-box #home-bg').css("opacity", "1");
 jQuery('.right-phone #home-bg').css("opacity", "1");
 jQuery('.link').click(function(e) {
  var ss = jQuery(this).data('image');
  jQuery('.right-phone .bg').css("opacity", "0");
  jQuery('.iphone-frame-box .bg').css("opacity", "0");
  jQuery('#' + ss).css("opacity", "1");


  jQuery('.layer-p').css("opacity", "0");
  if (jQuery(this).data('image') == "pluse-bg") {

   jQuery('.layer-p-pluse').css("opacity", "1");
   jQuery('.app-demo .panel-cell-style').addClass('plus-enable');
   jQuery('.app-demo .panel-cell-style').removeClass('armed-enable');
   jQuery('.app-demo .panel-cell-style').removeClass('home-enable');
   jQuery('.app-demo .panel-cell-style').removeClass('disarmed-enable');

  }
  if (jQuery(this).data('image') == "lock-bg") {
   jQuery('.layer-p-lock').css("opacity", "1");
   jQuery('.app-demo .panel-cell-style').addClass('armed-enable');
   jQuery('.app-demo .panel-cell-style').removeClass('plus-enable');
   jQuery('.app-demo .panel-cell-style').removeClass('home-enable');
   jQuery('.app-demo .panel-cell-style').removeClass('disarmed-enable');
  }
  if (jQuery(this).data('image') == "home-bg") {
   jQuery('.layer-p-home').css("opacity", "1");
   jQuery('.app-demo .panel-cell-style').addClass('home-enable');
   jQuery('.app-demo .panel-cell-style').removeClass('plus-enable');
   jQuery('.app-demo .panel-cell-style').removeClass('armed-enable');
   jQuery('.app-demo .panel-cell-style').removeClass('disarmed-enable');
  }
  if (jQuery(this).data('image') == "unlock-bg") {
   jQuery('.layer-p-unlock').css("opacity", "1");
   jQuery('.app-demo .panel-cell-style').addClass('disarmed-enable');
   jQuery('.app-demo .panel-cell-style').removeClass('plus-enable');
   jQuery('.app-demo .panel-cell-style').removeClass('armed-enable');
   jQuery('.app-demo .panel-cell-style').removeClass('home-enable');
  }
  jQuery('.mobile-block ul li').click(function() {
   jQuery('.mobile-block ul li').removeClass('active');
   jQuery(this).addClass('active');
  });
  jQuery('.iphone-frame-box').mouseover(function(e) {
   jQuery('.iphone-popup').fadeOut();
  });
 });
 /*how it works App end*/

 jQuery('.vc-listing li a').click(function(e) {
  var vidUrl = jQuery(this).attr("data-src");
  jQuery("#iphone-screen").find("iframe").attr("src", vidUrl);
 });

 var el = jQuery('.control-tabs .su-tabs-panes').children().eq(0).addClass('current');
 jQuery('.phone-screen .home-screen').fadeTo(10, 1, function() {});


 jQuery('.control-tabs .su-tabs-nav span').click(function(e) {
  jQuery('.control-tabs .su-tabs-pane').removeClass('current');

  var tabindex = jQuery(this).index();

  if (jQuery(window).width() > 767) {
   jQuery('.control-tabs .su-tabs-pane .phone-screen > div').fadeTo(10, 0, function() {});
  }
  jQuery('.control-tabs .su-tabs-panes').children().eq(tabindex).addClass('current');
  if (jQuery(window).width() > 767) {
   jQuery('.control-tabs .su-tabs-pane.current .phone-screen > div').fadeTo(200, 1, function() {});
  }

 });


 //jQuery('.control-tabs .su-tabs-panes .su-tabs-pane').removeClass('fadeIn');
 //jQuery('.control-tabs .su-tabs-panes .su-tabs-pane').removeClass('wow');
 var dur = 400;
 var delay = 300;
 jQuery('.control-tabs .su-tabs-nav span').each(function() {
  jQuery(this).attr('data-wow-delay', delay + 'ms');
  jQuery(this).attr('data-wow-duration', dur + 'ms');
  jQuery(this).addClass('wow fadeIn');
  delay = delay + 100;
  dur = dur + 200;
 });

 /********* tab section - how it work page ******/
 jQuery('.how-work-tab-sec .tabs .tab-links a').on('click', function(e) {
  var currentAttrValue = jQuery(this).attr('href');

  // Show/Hide Tabs
  jQuery('.how-work-tab-sec .tab-content').removeClass('animation-effect');
  jQuery('.how-work-tab-sec .tab-content .tab').removeClass('active-tab');

  jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
  setTimeout(function() {
   jQuery('.tabs ' + currentAttrValue).addClass('active-tab');
  }, 50);
  // Change/remove current tab to active
  jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
  e.preventDefault();
  return false;
 });
 /***** app demo - kk *****/
 jQuery('.iphone-frame-box').hover(function(e) {
  jQuery('.iphone-popup').fadeOut();
 });

 if (jQuery(window).width() <= 767) {
  jQuery('#myNavbar1 ul li a').click(function(e) {
   e.preventDefault();
   jQuery("#myNavbar1").removeClass("in");
   jQuery(document).off("scroll");
  });
 }

 var vid = document.getElementById("phone-vid");
 jQuery('.tab-left-section ul.nav li.third a').click(function(e) {
  //vid.autoplay = true;
  //vid.load();
 });

 jQuery('.tab-left-section li a').on('click', function() {
  jQuery('video').trigger('pause');
 });
 jQuery('.tab-left-section li.third a').on('click', function() {
  jQuery('video').trigger('play');
 });


});

(function(e) {
 e.fn.visible = function(t, n, r) {
  var i = e(this).eq(0),
      s = i.get(0),
      o = e(window),
      u = o.scrollTop(),
      a = u + o.height(),
      f = o.scrollLeft(),
      l = f + o.width(),
      c = i.offset().top,
      h = c + i.height(),
      p = i.offset().left,
      d = p + i.width(),
      v = t === true ? h : c,
      m = t === true ? c : h,
      g = t === true ? d : p,
      y = t === true ? p : d,
      b = n === true ? s.offsetWidth * s.offsetHeight : true,
      r = r ? r : "both";
  if (r === "both") return !!b && m <= a && v >= u && y <= l && g >= f;
  else if (r === "vertical") return !!b && m <= a && v >= u;
  else if (r === "horizontal") return !!b && y <= l && g >= f
 }
})(jQuery)
var win = jQuery(window);
var allMods5 = jQuery(".box-sensor");

allMods5.each(function(i, el) {
 if (jQuery(el).visible(true)) {
  jQuery(el).addClass("animation-effect");
  wifi_load_effect();
 }
});
win.scroll(function(event) {
 allMods5.each(function(i, el) {
  var el = jQuery(el);

  if (el.visible(true)) {
   wifi_load_effect();
  } else {}
 });
});

var allModst = jQuery(".how-work-tab-sec .tab-content");

allModst.each(function(i, el) {
 if (jQuery(el).visible(true)) {
  jQuery(el).addClass("animation-effect");
 }
});
win.scroll(function(event) {
 allModst.each(function(i, el) {
  var el = jQuery(el);

  if (el.visible(true)) {
   el.addClass("animation-effect");
  } else {}
 });
});


// Scroll Active CSS
var sections = jQuery('.sea-sections'),
    nav = jQuery('.header-block'),
    nav_height = nav.outerHeight()

jQuery(window).on('scroll', function() {

 var cur_pos = jQuery(this).scrollTop() + 20;

 sections.each(function() {
  var top = jQuery(this).offset().top - nav_height,
      bottom = top + jQuery(this).outerHeight();

  if (cur_pos >= top && cur_pos <= bottom) {
   nav.find('a').removeClass('active');
   sections.removeClass('active');

   jQuery(this).addClass('active');
   nav.find('a[href="#' + jQuery(this).parent().attr('id') + '"]').addClass('active');
  } else {
   //jQuery('.travel-crm-menu a').removeClass('active');
  }
 });
});

jQuery(document).ready(function() {


 /*Bot videos active*/
 jQuery('.video-list li').click(function() {
  jQuery('.video-list li').removeClass('active');
  jQuery(this).addClass('active');

 });

});


jQuery(document).ready(function($) {


 /*** Apped main Menu URL ***/
 /****** Smooth Scroll ****/
 var hedHeight = jQuery('.header-block').height();
 jQuery(".header-block li:first-child a").addClass("active");
 jQuery(".header-block li a").on('click', function(event) {
  jQuery(".header-block li a").removeClass("active");
  jQuery(".header-block li").removeClass("li-active");
  jQuery(this).addClass("active");
  jQuery(this).parent().addClass("li-active");
  if (this.hash !== "") {
   event.preventDefault();
   var hash = this.hash;

   jQuery('html, body').animate({
    scrollTop: jQuery(hash).offset().top - hedHeight
   }, 1000, function(hash) {

   });
  }
 });

});
/***************/

jQuery(document).ready(function() {
 jQuery('.addId').attr("id", "y-plus");

 jQuery('.new-cul-menu .navbar-nav li a').click(function() {
  jQuery(this).parent().addClass('active');
  jQuery(this).parent().siblings().removeClass('active');
 });

 function headHeight() {
  var hedHeight = jQuery('.header-block').height();
  jQuery('.pg-new').css('margin-top', hedHeight);
 }
 headHeight();
 jQuery(window).resize(function() {
  setTimeout(function() {
   headHeight();
  }, 300);
 });
 jQuery(window).load(function() {
  setTimeout(function() {
   headHeight();
  }, 300);
 });

 jQuery('.how-work-tab-sec').find(".collapse").on('shown.bs.collapse', function() {
  jQuery('.active-tab').find('.vid-collapse').each(function() {
   var thisDisplayed = jQuery(this).attr('aria-expanded');
   if (thisDisplayed === 'true') {
    var scrollElem = jQuery(this).find(".techspecs-area");
    var hedHeightnew = jQuery('.header-block').height();
    jQuery('html,body').animate({
     scrollTop: jQuery(scrollElem).offset().top - hedHeightnew
    }, 800);
   }
  });
 });

 jQuery('.h-cam-plus').find(".collapse").on('shown.bs.collapse', function() {
  var thisDisplayed1 = jQuery('#y-plus').attr('aria-expanded');
  if (thisDisplayed1 === 'true') {
   var scrollElem1 = jQuery('#y-plus');
   var hedHeightnew1 = jQuery('.header-block').height();
   jQuery('html,body').animate({
    scrollTop: jQuery(scrollElem1).offset().top - hedHeightnew1
   }, 800);
  }
 });


});

