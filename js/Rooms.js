$(document).ready(function() {
    $('.additional-room').hide();
    
    $('#viewAllRoomsBtn').click(function(e) {
        e.preventDefault();
        
        $('.additional-room').slideToggle(400, function() {
            var $btn = $('#viewAllRoomsBtn');
            $btn.text($('.additional-room').is(':visible') ? "Show Less Rooms" : "View All Rooms");
        });
    });
    
    $('#viewAllRoomsBtn').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });
});