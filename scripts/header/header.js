import BUTTON_INFO from "/data/header-buttons.json" with { type: "json" };

document.addEventListener("DOMContentLoaded", root_event => {
	// Load Stylesheet files
	document.head.append(...(function*(){
		for(let path of HEADER_STYLESHEET_PATH){
			let link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = path;

			yield link;
		}
	})());

	//
	header = createHeader();
	backToTopBtn = createScrollBtn(header);

	//
	if(document.body.children.length > 0) document.body.insertBefore(header, document.body.children[0]);
	else document.body.append(header);

	header.after(backToTopBtn);
});

window.addEventListener("scroll", root_event => {
	let pos = document.body.scrollTop;

	if(pos > WH / 4){
		backToTopBtn.classList.add("show");
		setTimeout(() => {
			backToTopBtn.classList.add("visible");
		}, 0);
	}else{
		backToTopBtn.classList.remove("visible");
	}
});

//

function createHeader(){
	// Create Elements
	let back = document.createElement("div");

	let logo_holder = document.createElement("div");
	let logo_anchor = document.createElement("a");
	let mark = document.createElement("img");
	let logo = document.createElement("span");

	let btnRail = document.createElement("div");
	let btns = [...(function*(){
		for(let btn_info of BUTTON_INFO){
			let btn = document.createElement("div");
			let anchor = document.createElement("a");

			btn.innerText = btn_info.label
			btn.classList.add("header-bar", "nav-btn");

			anchor.href = btn_info.url;
			if(btn_info.newWindow) anchor.target = "_blank";

			anchor.append(btn);

			yield anchor;
		}
	})()];

	// Set Classes and ID
	back.classList.add("header-bar", "back");

	logo_holder.classList.add("header-bar", "logo-holder")
	mark.classList.add("header-bar", "mark");
	logo.classList.add("header-bar", "logo");

	btnRail.classList.add("header-bar","rail");

	// Custom Properties
	back.style.setProperty("--main-colour", `hsl(${MAIN_COLOUR_HUES[Math.floor(((new Date()).getHours() + 20) % 24 / 8)]}, 90%, 70%)`);

	logo_anchor.href = "/";
	mark.src = "/src/images/svg/vtcomp_mark.svg";
	logo.innerText = "VT-Comp";

	// Add Event Listeners

	// Append
	back.append(logo_anchor, btnRail);
	logo_anchor.append(logo_holder);
	logo_holder.append(mark, logo);
	btnRail.append(...btns);

	// Others
	return back;
}

function createScrollBtn(target){
	// Create Elements
	let back = document.createElement("div");
	let icon = document.createElement("img");
	let label = document.createElement("span");

	// Set Classes and ID
	back.classList.add("scroll-btn", "back");
	icon.classList.add("scroll-btn", "icon");
	label.classList.add("scroll-btn", "label");

	// Custom Properties
	icon.src = "/src/images/svg/keyboard_arrow_up_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
	label.innerText = "TOP";

	// Add Event Listeners
	back.addEventListener("click", event => {
		target.scrollIntoView({
			"behavior": "smooth",
			"block": "start",
			"inline": "nearest"
		});
	});

	back.addEventListener("transitionend", event => {
		if(event.propertyName == "opacity" && !back.classList.contains("visible")) back.classList.remove("show");
	})

	// Append
	back.append(icon, label);

	// Others
	return back;
}