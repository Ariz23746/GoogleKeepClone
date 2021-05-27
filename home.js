const hamBurger = document.querySelector(".header__hamBox");
const container = document.querySelector(".container");
const inputOpenViewCloseBtn = document.querySelector(".container__inputOpenViewIconContainer > p");
let Cards = document.querySelectorAll(".container__notesNoteAndIcon");
let lastCard = Cards[Cards.length - 1];
let flag = true;
hamBurger.addEventListener("click",() => {
	
	container.classList.toggle("short");
	hamBurger.firstElementChild.classList.toggle("active");

})


// for opening Input
function openInputView() {
	console.log("ell")
	document.querySelector(".container__inputDefaultView").classList.add("hide");
	document.querySelector(".container__inputOpenView").classList.add("activate");
}

// close Btn function
inputOpenViewCloseBtn.addEventListener("click",() => {
	document.querySelector(".container__inputDefaultView").classList.remove("hide");
	document.querySelector(".container__inputOpenView").classList.remove("activate");
	cardContainer.style.backgroundColor = "#202124";
})

// color Pallete

function colorPallete(colorGrids,cardContainer,input1=null,input2=null,icon1=null,icon2=null) {
	

	let prevSelectedGrid = colorGrids[0];
	console.log(colorGrids);
	colorGrids.forEach(color => {
		color.addEventListener("click",() => {
			console.log("clicked")
			console.log(getComputedStyle(color));
			cardContainer.style.backgroundColor = getComputedStyle(color).backgroundColor;

			if(color.classList.contains("default")) {
				
				cardContainer.style.border = "1px solid #5F6368";
				if(icon1 && icon2) {
					icon1.forEach(icon => {
						icon.addEventListener("mouseenter",() => {
							icon.style.backgroundColor = "#2d2e30";
						})
						
					})
					icon1.forEach(icon => {
						icon.addEventListener("mouseleave",() => {
							icon.style.backgroundColor = "transparent";
						})
						
					})
					icon2.addEventListener("mouseenter",() => {
						icon2.style.backgroundColor = "#2d2e30";
					})
					icon2.addEventListener("mouseleave",() => {
						icon2.style.backgroundColor = "unset";
					})
				}
			}
			else {

				cardContainer.style.border = "1px solid transparent";
				if(icon1 && icon2) {
					icon1.forEach(icon => {
						icon.addEventListener("mouseenter",() => {
							icon.style.backgroundColor = "rgba(233,233,233,0.2)";
						})
						
					})
					icon1.forEach(icon => {
						icon.addEventListener("mouseleave",() => {
							
							icon.style.backgroundColor = "transparent";
						})
						
					})
					icon2.addEventListener("mouseenter",() => {
						icon2.style.backgroundColor = "rgba(233,233,233,0.2)";
					})
					icon2.addEventListener("mouseleave",() => {
						icon2.style.backgroundColor = "unset";
					})
				}

			}
			if(prevSelectedGrid.classList.contains("selected")) {
				prevSelectedGrid.classList.remove("selected");
				prevSelectedGrid = color;
				color.classList.add("selected");
			}
			

		})
	})
	
}


const colorGrids = document.querySelectorAll("#clr .colorPallete__color");
const cardContainer = document.querySelector(".container__input");
const cardContainer2 = document.querySelectorAll(".container__notesNoteAndIcon");
let input1 = document.querySelector(".i1");
let input2 = document.querySelector(".i2");
const icon1 = document.querySelectorAll(".container__inputOpenViewIconContainer .icon1 .fas");
const icon2 = document.querySelector(".container__inputOpenViewIconContainer > p");


colorPallete(colorGrids,cardContainer,input1,input2,icon1,icon2);


//Color pallete

function changeColor(grid) {
	// console.log("clll")
	const parent = grid.parentElement.parentElement;
	const colorGrids = grid.firstElementChild.childNodes;

	colorGrids.forEach(color => {
		color.addEventListener("click", () => {
			parent.style.backgroundColor = getComputedStyle(color).backgroundColor;
		})
	})
}

// Adding card functionality
const addCardBtn = document.querySelector(".fa-check-circle");
addCardBtn.addEventListener("click",() => {
	
	let value1 = input1.value;
	let value2 = input2.value;

	const parentDiv = document.createElement("div");
	const childDiv1 = document.createElement("div");
	const childDiv2 = document.createElement("div");
	const span = document.createElement("span");
	const p = document.createElement("p");
	parentDiv.classList.add("container__notesNoteAndIcon");
	childDiv1.classList.add("container__notesNote");
	childDiv2.classList.add("container__notesIconContainer");
	span.innerText = value1;
	p.innerText = value2;
	childDiv1.appendChild(span);
	childDiv1.appendChild(p);
	parentDiv.appendChild(childDiv1);
	let OldChildDiv2 = cardContainer2[0].lastElementChild;
	childDiv2.innerHTML = OldChildDiv2.innerHTML;
	parentDiv.appendChild(childDiv2);
	document.querySelector(".container__notes").appendChild(parentDiv);
	// console.log(container.style.backgroundColor);
	input1.innerHTML = "";
	input2.innerHTML = "";
	parentDiv.style.backgroundColor = cardContainer.style.backgroundColor;
	if(cardContainer.style.backgroundColor !== "") {
		parentDiv.style.border = "1px solid transparent"
	}
	document.querySelector(".container__inputDefaultView").classList.remove("hide");
	document.querySelector(".container__inputOpenView").classList.remove("activate");
	cardContainer.style.backgroundColor = "#202124";
	localStorage.setItem("card")
})

// Delete Card

const deltBtn = document.querySelectorAll(".fa-trash");
function deleteCard(btn) {
	const parent = btn.parentElement.parentElement;
	parent.remove();
}

// Edit card
var parentEdit
function editCard(btn) {

	document.body.classList.add("active");
	const parent = btn.parentElement.parentElement;
	const popup = document.querySelector(".popup");
	popup.classList.add("active")

	popup.firstElementChild.firstElementChild.value = parent.firstElementChild.firstElementChild.innerText;
	popup.firstElementChild.lastElementChild.value = parent.firstElementChild.lastElementChild.innerText;
	parentEdit = parent;
	popup.style.backgroundColor = parent.style.backgroundColor;

}
let editSpan,editPara;
function closeEditBox() {
	document.body.classList.remove("active");
	const popup = document.querySelector(".popup");
	popup.classList.remove("active")
}

function onEditColorChange(parent) {

	const colorGrids = parent.firstElementChild.childNodes;
	colorGrids.forEach(color => {
		color.addEventListener("click", () => {
			parent.parentElement.parentElement.parentElement.style.backgroundColor = getComputedStyle(color).backgroundColor;
			return getComputedStyle(color).backgroundColor;
		})
		
	})


}
function editSubmit(btn) {
	
	let parent = btn.parentElement.parentElement.parentElement.parentElement;
	parentEdit.firstElementChild.firstElementChild.textContent = parent.firstElementChild.children[0].value;
	parentEdit.firstElementChild.lastElementChild.textContent = parent.firstElementChild.children[1].value;
	console.log(btn);
	closeEditBox();
	parentEdit.style.backgroundColor = parent.style.backgroundColor;	
}

localStorage.setItem("card",Cards);


function addLabel() {
	document.body.classList.add("active");
	const addLabelContainer =  document.querySelector(".popup-addLabel")
	addLabelContainer.classList.add('active');
}
var labelList = [];
function addLabelBtn(btn) {

	let inputVal = btn.parentElement.children[1].value;
	console.log(inputVal)
	const label = document.createElement("div");
	const label2 = document.createElement("div");
	label.classList.add("button");
	label2.classList.add("button");
	let span = document.createElement("span");
	
	span.textContent = inputVal;

	label.innerHTML = `<i class="fas fa-tag"></i>`;
	label2.innerHTML = `<i class="fas fa-tag"></i>`;
	console.log(document.querySelector(".container__sideNav2").lastElementChild);
	document.querySelector(".container__sideNav2").lastElementChild.after(label2);
	label.appendChild(span);
	document.querySelector(".container__sideNav").lastElementChild.after(label);
	let diving = document.createElement("div");

	diving.innerHTML += `<i class="fas fa-tag"></i>`
	console.log(span);
	
	let span2 = document.createElement("span");
	span2.textContent = inputVal;
	diving.appendChild(span2);

	document.querySelector(".searchResult").appendChild(diving);
	
	
	
	labelList.push(label);

	closeAddLabel();
}
function closeAddLabel() {
	document.body.classList.remove("active");
	const addLabelContainer =  document.querySelector(".popup-addLabel")
	addLabelContainer.classList.remove('active');
}

const searchContainer = document.querySelector("#search");
searchContainer.addEventListener("keyup",(e) => {
	if(e.code === 13 || e.key === "Enter") {
		let searchterm = e.target.value.toLowerCase();
		let labels = "";
		labelList.forEach(label => {
			// console.log("hellp")
			labels = label.lastElementChild.innerText.toLowerCase();
			
		})
		if(labels.indexOf(searchterm) != -1) {
			document.body.classList.add("active");
			const searchingLabel =  document.querySelector(".searchResult");
			searchingLabel.classList.add("active");

			
		}
		else {
			alert("nothing named as such in label")
			document.body.classList.remove("active");
			const searchingLabel =  document.querySelector(".searchResult");
			searchingLabel.classList.remove("active");
		}
	}
	
})

function closeSearchLabel(parent) {
	document.body.classList.remove("active");
	parent.parentElement.classList.remove('active');
}

window.addEventListener("load",() => {
	const parent = document.querySelector(".register");
	document.body.classList.add("active");
	parent.classList.add("active");


})
function registerMe(btn) {
	const parent = btn.parentElement;
	console.log(parent.children[2]);
	localStorage.setItem(parent.children[1].id,parent.children[1].value)
	localStorage.setItem(parent.children[2].id,parent.children[2].value);

	openSignIn();
}
function openSignIn() {
	const parent1 = document.querySelector(".register");
	parent1.classList.remove("active");
	const parent = document.querySelector(".signin");
	document.body.classList.add("active");
	parent.classList.add("active");


}
function signIn(btn) {
	const parent = btn.parentElement;
	
	const name = localStorage.getItem("name");
	const pass = localStorage.getItem("pass");

	if(parent.children[1].value === name && parent.children[2].value === pass) {
		document.body.classList.remove("active");
		parent.classList.remove("active");
	}
	else {
		alert("incorrect credentials")
	}
}