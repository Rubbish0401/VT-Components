import articleList from "/data/article-list.json" with { type: "json" };
import { Card } from "./Card.js";

document.addEventListener("DOMContentLoaded", function(root_event){
	//
	mainSection = document.getElementById("main");
	
	//
	for(let sectionInfo of articleList){
		let hDiv = document.createElement("div");
		let h = document.createElement("h1");
		let itemHolder = document.createElement("div");

		hDiv.classList.add("main-section", "block");
		h.innerText = sectionInfo.title;
		itemHolder.classList.add("main-section", "block", "article-card", "card-holder");

		hDiv.append(h);
		itemHolder.append(...(function*(){
			for(let item of sectionInfo.items){
				let card = new Card(item);
				yield card.get();
			}
		})());

		mainSection.append(hDiv, itemHolder);
	}
});

window.addEventListener("load", function(root_event){

});