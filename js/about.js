$(document).ready(function() {
    $('#moreContent').hide();
    
    $('#readMoreBtn').click(function(e) {
        e.preventDefault();
        
        $('#moreContent').slideToggle(400, function() {
            $('#readMoreBtn').text(function(i, text) {
                return text === "Read More" ? "Read Less" : "Read More";
            });
            
            if ($('#moreContent').is(':visible')) {
                var elementTop = $('#moreContent').offset().top;
                var viewportBottom = $(window).scrollTop() + $(window).height();
                
                if (elementTop > viewportBottom) {
                    $('html, body').animate({
                        scrollTop: elementTop - 20
                    }, 500);
                }
            }
        });
    });
    
    $('#readMoreBtn').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });
});