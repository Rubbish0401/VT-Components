document.addEventListener("DOMContentLoaded", root_event => {
	// Load Stylesheet files
	document.head.append(...(function*(){
		for(let path of FOOTER_STYLESHEET_PATH){
			let link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = path;

			yield link;
		}
	})());

	//
	document.body.append(createFooter());
});

//
function createFooter(){
	// Create Elements
	let back = document.createElement("div");
	let links = document.createElement("div");

	let link = [...(function*(){
		for(let info of FOOTER_LINK){
			let anchor = document.createElement("a");
			anchor.href = info.url;
			anchor.innerText = info.label;
			anchor.classList.add("footer", "link");

			yield anchor;
		}
	})()];

	// Set Classes and ID
	back.classList.add("footer", "back");
	links.classList.add("footer", "block", "link-rail");
 
	// Optimise Properties

	// Add Event Listeners

	// Append
	back.append(
		links
	);
	links.append(...link);

	// Others
	return back;
}