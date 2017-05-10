var p = document.querySelector(".panel-content > p:first-of-type")

if(p != null){

	var pText = p.innerText;
	var firstLetter = pText.substr(0,1);
	pText = pText.substr(1, pText.length - 1)

	p.innerHTML = "<span class='illuminated-letter'>"
		+ firstLetter
		+ "</span>"
		+ pText;

}

