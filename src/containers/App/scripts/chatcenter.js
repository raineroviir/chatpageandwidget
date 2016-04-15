$(document).ready(function () {
	$('.mCustomScrollBar').mCustomScrollbar({ 
	    theme:"dark-3"        
	});
	$('.chat-contacts').height($(window).height()-$('header').height()-35);
	$('.chat-group').height($(window).height()-$('footer').height()-$('header').height()-75);
	$('.user-detail').on('click', '.glyphicon-menu-hamburger', function () {
		$('.leftmenu').toggleClass('hidden-xs');
	});
	$('.channel-list').on('click', function (e) {
		if($(e.target).closest('.leftmenu').length == -1 || !$(e.target).hasClass('glyphicon-menu-hamburger'))
			$('.leftmenu').addClass('hidden-xs');
	});
	$('.main header').on('click', '.glyphicon-user', function () {
		$('.chat-contacts').toggleClass('hidden-xs');
	});
	$('.main').on('click', function (e) {
		if($(e.target).closest('.chat-contacts').length == -1 || !$(e.target).hasClass('glyphicon-user'))
			$('.chat-contacts').addClass('hidden-xs');
	});
	$('.channel-list').on('click', '.user-item li:not(".header")', function() {
		$('.sidebar').toggleClass('hidden-xs hidden-sm');
		$('.main').toggleClass('hidden-xs hidden-sm');
		$('.mCustomScrollBar').mCustomScrollbar({ 
		    theme:"dark-3"        
		});
	});
	$('.main header').on('click', '.glyphicon-circle-arrow-left', function() {
		$('.sidebar').toggleClass('hidden-xs hidden-sm');
		$('.main').toggleClass('hidden-xs hidden-sm');
	});
})