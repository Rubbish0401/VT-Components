export class Card{
	#back;

	constructor(obj){
		// Create Elements
		let back = document.createElement("div");
		let anchor = document.createElement("a");

		let thumbnail = document.createElement("img");
		let title = document.createElement("span");
		let descriptions = document.createElement("div");

		// Set Classes
		back.classList.add("article-card", "card-back");
		
		thumbnail.classList.add("article-card", "card-thumbnail");
		title.classList.add("article-card", "card-title");
		descriptions.classList.add("article-card", "card-descriptions");

		// Custom Properties
		anchor.href = obj.url;
		anchor.target = "_blank";
		
		thumbnail.src = obj.thumbnail;
		title.innerText = obj.title;
		title.title = obj.title;
		descriptions.innerText = obj.descriptions;
		descriptions.title = obj.descriptions;

		// Add Event Listener
		thumbnail.addEventListener("error", event => {
			thumbnail.src = "/src/images/png/error.png";
		});

		// Append
		back.append(anchor);
		anchor.append(thumbnail, title, descriptions);

		// Others
		this.#back = back;
	}

	get(){ return this.#back; }
}