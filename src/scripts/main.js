/* global $ */

function scrollToTop(target) {
	$offset = target ? target.offset().top : 0;
	$('html,body').animate({
		scrollTop: $offset
	}, 1000);
}

function handleButton(button, value) {
	if (value !== '') {
		$(button).attr('href', value).removeClass('invisible');
	} else {
		$(button).addClass('invisible');
	}
}

function loadProject(project) {
	$('#work-title').html(project.name);
	$('#work-description').html(project.description);
	$('#work-role').html(project.role);

	$('#work-skills').empty();
	$(project.skills.forEach(function(el){
		$('#work-skills').append('<img class="work-skill" src="/assets/images/skills/' + el + '.svg" alt="'+el+'" title="'+el+'">');
	}));
	handleButton('#work-site', project.link);
	handleButton('#work-git', project.git);
	$('#work-img').attr('src', '/assets/images/projects/' + project.img).attr('alt', project.name).attr('title', project.name);
}



//Barre de navigation
	$('.open-menu').click(function(){
		$('.navigation').addClass('navigation-slim');
		$('.menu-mobile').slideToggle('slow');
	});
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1){
			$('.navigation').addClass('navigation-slim');
			$('#back-to-top').fadeIn();
		} else{
			$('.navigation').removeClass('navigation-slim');
			$('#back-to-top').fadeOut();
		}
	});

//Smooth scrolling
	$('.menu-item').click(function(e) {
		e.preventDefault();
		scrollToTop($(this.hash));
	});
	$('.menu-mobile-item').click(function(e) {
		e.preventDefault();
		$('.menu-mobile').slideToggle();
		scrollToTop($(this.hash));
	});
	$('#back-to-top').click(function(e) {
		e.preventDefault();
		scrollToTop();
	})


//Classe skill
	$('.skill').click(function(){
		$(this).toggleClass('rectangle');
	});

//Affichage d'un projet
	$('.btn-project').click(function(){
		var id = $(this).closest('.project').data('id');
		$('#work-img').fadeOut('fast', function(){
			loadProject(proj[id]);
		});
		$('#work').slideDown();
		scrollToTop($('#work'));
		$('#work-img').fadeIn();
	});

	$('.back').click(function(e) {
		e.preventDefault();
		$('.touched').removeClass('touched');
		scrollToTop($(this.hash));
	});

$('img').not('#work-img').unveil({offset:200});
