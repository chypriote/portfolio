$(document).ready(function() {
	$('header').height($(window).height());
	$('#content').attr('style', 'top:' + $(window).height() + 'px');

	$('.open-menu').click(function(){
		$('.mobile-menu ul').slideToggle('slow');
	});

	//Empeche le click random dans les skills
	$('.skills-description a').bind('click', function(e){e.preventDefault();});
	$('.skills li').click(function(){
		$(this).toggleClass('rectangle');
		$(this).find('a').unbind('click');
	});

	//Affichage d'un projet
	$('.closeicon').click(function(){
		$('#work').slideUp();
	});
	$('.ih-item').click(function(){
		$('#work').fadeIn();
		$('#work .work-img').attr('src', $(this).attr('data-img'));
		$('#work .work-title').html($(this).attr('data-title'));
		$('#work .work-description').html($(this).attr('data-description'));
		$('#work .work-skills').html($(this).find('.project-skills').html());
		if ($(this).attr('data-link')) {
			$('#work .work-site').attr('href', $(this).attr('data-link')).show();
		} else {
			$('#work .work-site').hide();
		}
		if ($(this).attr('data-git')) {
			$('#work .work-git').attr('href', $(this).attr('data-git')).show();
		} else {
			$('#work .work-git').hide();
		}
	});
	$('.project-slider').slick({
		prevArrow: '',
		nextArrow: '<a class="project-next">Voir plus</a>',
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 992,
				settings: {slidesToShow: 2}
			},
			{
				breakpoint: 768,
				settings: {slidesToShow: 1}
			}
		]
	});

	//Sticky header
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1){  
    	$('.navigation').addClass("navigation-slim");
  	} else{
    	$('.navigation').removeClass("navigation-slim");
  	}
	});
	$(function() {
	  $('nav a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});
});