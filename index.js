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
        return $(elem).html().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});


function getRelevantOptions(words)
{
    var searchString = "";
    
    for(var i = 0; i < words.length; i++)
    {
    	if(i > 0){ searchString = searchString + ","; }
        searchString = searchString + " .project-container:containsIns(" + words[i].trim() + ")";
    }
    
    var relevantOptions = $(searchString);
    
    selectedOption = 0;
    numberOfOptions = relevantOptions.length;
    
    return relevantOptions;
}

function fullOptionString( relevantOptions )
{
    var htmlString = "";
    var classText = "";
    
    for(var i = 0; i < relevantOptions.length; i++)
    {
    	if(i == 0){ classText = " selected"; } else{ classText = ""; }
    	var relevantOption = relevantOptions[i];
    	htmlString = htmlString + '<a href="' + $(relevantOption).find("a:first").attr("href") + '" class="search-result' + classText + '" id="sr' + i + '">'
    		+ $(relevantOption).find("a:first").text() + '</a>';
    }
    
    return htmlString;
}

function getOptions(e)
{
	if( e.which != 40 && e.which != 38 )
	{
		$("#search-results").removeClass("hidden");
		
		var typedText = $("#search-bar").text();
		
		var testList = [];
		
		testList.push(typedText);
		
		var relevantOptions = getRelevantOptions(testList);
		if(relevantOptions.length < 1){
			var relevantWords =  typedText.split(' ');
			var htmlString = fullOptionString( relevantOptions );
			var relevantOptions = getRelevantOptions(relevantWords);
		}
		
		var htmlString = fullOptionString( relevantOptions );
		
		
		$("#search-results").html( htmlString );
	}
}

$('#search-bar').on( 'keydown', function( e ) {
    if( e.which == 13) {
    	e.preventDefault();
    	
    	var href = $(".search-result.selected").attr("href");
    	
    	if(href != null && href != undefined)
    	{
    		window.location.href = href;
    	}
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


$(".show-sub").click(function(){
	$(this).parent().find(".sub-contents").slideDown();
});

$(".close-sub").click(function(){
	$(this).parent().slideUp();
});
