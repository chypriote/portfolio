//Barre de navigation
	$('.open-menu').click(function(){
		$('.navigation').removeClass('navigation-slim');
		$('.sub-bar').slideToggle('slow');
	});
	$('.mobile.menu a').click(function(){
		$('.sub-bar').slideToggle('slow');
	});

//Smooth scrolling
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1){
			$('.navigation').addClass("navigation-slim");
		} else{
			$('.navigation').removeClass("navigation-slim");
		}
	});
	$('nav a, .back').click(function(e) {
		e.preventDefault();
		scrollTo($(this.hash));
	});

//Classe skill
	$('.skill').click(function(){
		$(this).toggleClass('rectangle');
	});

function scrollTo(target) {
	$('html,body').animate({
		scrollTop: target.offset().top
	}, 1000);
}

function loadProject(project) {
	$('#work-title').html(project.name);
	$('#work-description').html(project.description);
	$('#work-role').html(project.role);

	$('#work-skills').empty();
	$(project.skills.forEach(function(el){
		$('#work-skills').append('<img class="work-skill" src="assets/images/skills/' + el + '.svg" alt="'+el+'">');
	}));
	if (project.link != '') {
		$('#work-site').attr('href', project.link).removeClass('invisible')
	} else {
		$('#work-site').addClass('invisible');
	}
	if (project.git != '') {
		$('#work-git').attr('href', project.git).removeClass('invisible');
	} else {
		$('#work-git').addClass('invisible');
	}
	$('#work-img').attr('src', 'assets/images/projects/' + project.img).attr('alt', project.name);
}

//Affichage d'un projet
	$('.btn-project').click(function(){
		$id = $(this).closest('.project').data('id');
		loadProject(proj[$id]);
		$('#work').slideDown();
		scrollTo($('#work'));
	});

$('img').not('#work-img').unveil({offset:200});
