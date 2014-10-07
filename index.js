var mark = 'Watermark',
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
