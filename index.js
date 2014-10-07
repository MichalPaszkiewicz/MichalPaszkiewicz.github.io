var mark = 'Search here',
    edited = false;

$('[contenteditable]').focus(function() {
    if(!edited) {
        $(this).empty();
    }
}).blur(function() {
    if(!$(this).html()) {
        $(this).html(mark);
    }
}).keyup(function() {
    edited = true;
}).text(mark);
