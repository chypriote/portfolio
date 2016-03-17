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

function handleButton(button, value) {
	if (value != '')
		$(button).attr('href', value).removeClass('invisible');
	else
		$(button).addClass('invisible');
}

function loadProject(project) {
	$('#work-title').html(project.name);
	$('#work-description').html(project.description);
	$('#work-role').html(project.role);

	$('#work-skills').empty();
	$(project.skills.forEach(function(el){
		$('#work-skills').append('<img class="work-skill" src="assets/images/skills/' + el + '.svg" alt="'+el+'">');
	}));
	handleButton('#work-site', project.link);
	handleButton('#work-git', project.git);
	$('#work-img').attr('src', 'assets/images/projects/' + project.img).attr('alt', project.name);
}

//Affichage d'un projet
	$('.btn-project').click(function(){
		$id = $(this).closest('.project').data('id');
		$('#work-img').fadeOut('fast', function(){
		loadProject(proj[$id]);
		});
		$('#work').slideDown();
		scrollTo($('#work'));
		$('#work-img').fadeIn();
	});

$('img').not('#work-img').unveil({offset:200});
