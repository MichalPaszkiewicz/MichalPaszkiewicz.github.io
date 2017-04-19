var p = document.querySelector(".panel-content >p:first-child")

var pText = p.innerText;
var firstLetter = pText.substr(0,1);
pText = pText.substr(1, pText.length - 1)

p.innerHTML = "<span style='height: 53px;font-size: 80px;line-height: 80px;box-sizing: border-box;margin: 0 5px 2px 0;display: inline-block;vertical-align: baseline;float: left;font-family: michalFont;'>"
	+ firstLetter
	+ "</span>"
	+ pText;
