jQuery(function($){

	var iframe = $('#bg_video')[0];
  var player = $f(iframe);

  window.player = player;

  var showSeconds = 0;
  var hideSeconds = 4;
  var isShowing = false;
  var showed = false;

	$(".tcycle").show();
	player.addEvent('ready', function() {
		
		setTimeout(function(){
			showLogo();
			showed=true;
		},500);

	  player.addEvent('playProgress', function(data){
	  		if( data.seconds >= showSeconds && data.seconds < hideSeconds && !showed ){
	  			showLogo();
	  			showed = true;
	  		}
	  		if(data.seconds > hideSeconds){
	  			showed = false;
	  		}
		});
	});

	// window.mc.ajaxOptions.success = function(resp){
	// 	if (resp.result == "success"){
	//     $('#mc_embed_signup').hide();
	//     $('#thank_you').fadeIn(1000);
	// 	}else{
	// 		mc.mce_success_cb( resp );
	// 	}
	// }
	function showLogo(){		
		player.api('pause');
		showText();
		setTimeout(function(){
			setTimeout(function(){
				hideText();
			},2000);
			player.api('play');
		},2000);
	}


	function showText(){
		isShowing = true;
		$("#hero-text").show().animate({opacity:1}, 500);
	}
	function hideText(){
		isShowing = false;
		$("#hero-text").animate({opacity:0}, 500, function(){
			$("#hero-text").hide();
		});
	}


	var bgVideo = $(".inzdr-bg");
	var container = $(".video");
	$(window).on('resize' , function(){
		var p1 = container.width() / container.height();
		var p2 = 303 / 171;
		var w, h;

		if( p1 > p2 ){
			w = container.width();
			h = container.width() / p2;
		}else{
			h = container.height();
			w = container.height() * p2;
		}

		bgVideo.css({
			width: w+2,
			height: h+2
		});

	}).resize();

	$(window).on('scroll', function(e){
		$(".scroll-arrow").toggleClass('hide-arrow', $(window).scrollTop() != 0 );
	});
	$(".scroll-arrow").click(function() {
			$("body").animate({scrollTop: $("#main").offset().top }, 1000);
	});	

	if(getCookie ("cookieShowed") == "") {
		$(".cookies").removeClass("hidden");
	}

	$('.cookies .btn').on('click', function(e){
		e.preventDefault();
		setCookie("cookieShowed", 1, 365);
		$('.cookies').hide();	
	})


});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}