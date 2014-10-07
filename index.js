var mark = 'Search here';
var edited = false;
var selectedOption = 0;
var numberOfOptions = 0;

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


$.expr[":"].containsIns = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});


function getRelevantOptions(words)
{
    var searchString = "";
    
    for(var i = 0; i < words.length; i++)
    {
        searchString = searchString + ".project-container:containsIns(" + words[i].trim() + ") ";
    }
    
    var relevantOptions = $(searchString);
    
	return relevantOptions;
}

function fullOptionString( relevantOptions )
{
    return relevantOptions;
}

function getOptions(e)
{
	if( e.which != 40 && e.which != 38 )
	{
		$("#search-results").removeClass("hidden");
		
		var typedText = $("#search-bar").text();
		
		var relevantWords =  typedText.split(' ');
		
		$("#search-results").html( fullOptionString( getRelevantOptions(relevantWords) ));
	}
}

$('#search-bar').on( 'keydown', function( e ) {
    if( e.which == 9 || e.which == 13) {
    	e.preventDefault();
    	
        // Do Something on enter and tab
        
    }
} )
.keyup(function(e) {
    if( e.which == 40 ){
    	selectedOption = (selectedOption + 1) % numberOfOptions;
    	$(".search-result").removeClass("selected");
    	$("#sr" + selectedOption).addClass("selected");
    }
    else if( e.which == 38 ){
    	selectedOption = (selectedOption + numberOfOptions - 1) % numberOfOptions;
    	$(".search-result").removeClass("selected");
    	$("#sr" + selectedOption).addClass("selected");
    }
    else{
    	getOptions(e);
    }
    return false;
});
