function illuminate(selector){
	var p = document.querySelector(selector)

	if(p != null){

		var pText = p.innerHTML;
		var firstLetter = pText.substr(0,1);
		pText = pText.substr(1, pText.length - 1)

		p.innerHTML = "<span class='illuminated-letter'>"
			+ firstLetter
			+ "</span>"
			+ pText;

	}
}

illuminate(".panel-content > p:first-of-type");

illuminate("p.illuminate");

