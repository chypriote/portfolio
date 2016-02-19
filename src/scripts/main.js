$(document).ready(function() {
	$('.open-menu').click(function(){
		$('.mobile-menu ul').slideToggle('slow');
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

	//Empeche le click random dans les skills
		$('.skills-description a').bind('click', function(e){e.preventDefault();});
		$('.skill').click(function(){
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

	//Masquer skills
		$('.skill-hide').click(function(){
			$('.not-yet').toggle();
		});

	//Hexagons
		function hex_initial_animation() {
			$(".hex-wrap,.hover-notify").velocity("transition.expandIn", {
				stagger: 150
			});
			$(".hex-wrap").velocity("callout.pulse");
			$(".hoverblock").velocity("fadeOut", {
				delay: 3000,
				duration: 0
			});
		}
		hex_initial_animation();

		$(".hex-init").click(function() {
			if ($(this).parent().hasClass('hexactive')) {
				$(this).parent().velocity('stop').velocity('reverse').removeClass('hexactive');
				return;
			}

			$('.hexactive').velocity('stop', true).velocity('reverse').removeClass('hexactive');

			var title_color = $(this).parent().attr("data-color");
			var title_name = $(this).parent().attr("data-title");
			var desc_name = $(this).parent().attr("data-content");
			var link_name = $(this).parent().attr("data-link");
			var link_short = $(this).parent().attr("data-short");
			var background = $(this).parent().attr("data-img");

			function hex_description() {
				$('.code-description').velocity('stop', true).velocity("transition.slideRightBigIn");
				$('.' + desc_name).siblings().removeClass('desc-active');
				setTimeout(function() {
					$('.' + desc_name).addClass('desc-active');
					$('.code-descriptopn > div, .desc-active').children().velocity('stop', true).velocity("transition.slideRightBigIn", {
						stagger: 300
					});
					$('.code-title, .desc-active span').velocity({
						color: title_color
					}, {
						queue: false
					});
					$('.code-title').text(title_name);
					$('.code-desc').text(desc_name);
					$('.code-link').text(link_short);
					$('.code-link').attr('href', link_name);
					$('.code-background').attr('style', 'background-image: url(assets/images/skills/'+background+')');
				}, 0);
			}
			hex_description();

			$(this).parent().addClass('hexactive');
			$('.hexactive').velocity({scaleX: "1.08",scaleY: "1.08"}, {duration: 200});
		});
});