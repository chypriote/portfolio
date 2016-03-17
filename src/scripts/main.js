$('.open-menu').click(function(){
	$('.navigation').removeClass('navigation-slim');
	$('.sub-bar').slideToggle('slow');
});
$('.mobile.menu a').click(function(){
	$('.sub-bar').slideToggle('slow');
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
		$('nav a').click(function() {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		});
	});

//Empeche le click random dans les skills
	$('.skill').click(function(){
		$(this).toggleClass('rectangle');
	});

//Affichage d'un projet
	$('.closeicon').click(function(){
		$('#work').slideUp();
	});
	$('.project').click(function(){
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

//Masquer skills
	$('.skill-hide').click(function(){
		$('.not-yet').toggle();
	});

$('img').unveil({offset:200});
