$(document).ready(function () {
	$('.mCustomScrollBar').mCustomScrollbar({ 
	    theme:"dark-3"        
	});
    
	$('.chat-contacts').height($(window).height()-$('header').height()-35);
	
    $('.chat-group').height($(window).height()-$('footer').height()-$('header').height()-75);

	
	$('body').on('click', '.channel-list', function (e) {
		if($(e.target).closest('.leftmenu').length == -1 || !$(e.target).hasClass('glyphicon-menu-hamburger'))
			$('.leftmenu').addClass('hidden-xs');
	});
	$('body').on('click', '.main header .groups-link', function () {
		$('.chat-contacts').toggleClass('hidden-xs');
	});
	$('body').on('click', '.main', function (e) {
		if($(e.target).closest('.chat-contacts').length == -1 || !$(e.target).hasClass('glyphicon-user'))
			$('.chat-contacts').addClass('hidden-xs');
	});
	$('body').on('click', '.channel-list .user-item li:not(".header")', function() {
		$('.sidebar').toggleClass('hidden-xs hidden-sm');
		$('.main').toggleClass('hidden-xs hidden-sm');
		$('.mCustomScrollBar').mCustomScrollbar({ 
		    theme:"dark-3"        
		});
	});

    $('body').on('click', '.user-info .menu-hamburger', function () {
        $( 'body' ).toggleClass( 'show-master-nav' );
    });

    //show chat-panel on click of the chat message
    $( 'body' ).on('click', '.chat-lists-wrapper .chat-message', function  (argument) {
        $( 'body' ).addClass( 'show-chat-panel' );
    });
    $('body').click('click','.goback-icon' function() {
        $( 'body' ).removeClass( 'show-chat-panel' );
    } );

	$('body').on('click', '.main header .glyphicon-circle-arrow-left', function() {
		$('.sidebar').toggleClass('hidden-xs hidden-sm');
		$('.main').toggleClass('hidden-xs hidden-sm');
	});
	// Bug fix for mCustomScrollbar as its updateOnBrowserResize isnt working as expected
	$(window).resize(function() {
		$('.mCustomScrollBar').removeAttr("style").mCustomScrollbar({ 
	    theme:"dark-3"        
		});
	});
    /*$('img[src$=".svg"]').each(function() {
        var $img = jQuery(this);
        var imgURL = $img.attr('src');
        var attributes = $img.prop("attributes");

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Remove any invalid XML tags
            $svg = $svg.removeAttr('xmlns:a');

            // Loop through IMG attributes and apply on SVG
            $.each(attributes, function() {
                $svg.attr(this.name, this.value);
            });

            // Replace IMG with SVG
            $img.replaceWith($svg);
        }, 'xml');
    });*/
});