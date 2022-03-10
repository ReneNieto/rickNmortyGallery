import ky from "https://cdn.skypack.dev/ky?dts";
let id = 1;
/* const apiURL = `https://rickandmortyapi.com/api/character?page=${id}`; */
const apiURL = "https://rickandmortyapi.com/api/character?page=3";
const listResult = document.querySelector(".search-result");

function newURL(oldid) {
	let newId = oldid + 1;
	return newId;
}

function removeChild() {
	const removeitem = document.querySelectorAll("li");
	removeitem.forEach((e) => {
		listResult.removeChild(e);
	});
}
function createSeatchResult(character) {
	const itemEl = document.createElement("li");
	itemEl.classList.add("search-item");
	const searchImg = document.createElement("img");
	searchImg.classList.add("seach-img");
	const searchName = document.createElement("h3");
	searchName.classList.add("search-name");
	const searchPlanet = document.createElement("h3");
	searchPlanet.classList.add("search-planet");

	searchImg.src = character.image;
	searchName.textContent = character.name;
	searchPlanet.textContent = "- " + character.origin.name;

	searchResultContainer.appendChild(itemEl);
	itemEl.appendChild(searchImg);
	itemEl.appendChild(searchName);
	itemEl.appendChild(searchPlanet);

	return itemEl;
}
const mainGaleryContainer = document.querySelector(".main--galery-container");
const searchResultContainer = document.querySelector(".search-result");

function createImage(character) {
	const itemContainer = document.createElement("div");
	itemContainer.classList.add("galery--item-container");
	const imageEl = document.createElement("img");
	imageEl.classList.add("galery--img");
	imageEl.src = character.image;
	itemContainer.appendChild(imageEl);
	/* 	itemContainer.setAttribute("id", `${Date.now}`); */
	itemContainer.setAttribute("id", "gridContianer");

	return itemContainer;
}

function createInfo(character) {
	const containerInfo = document.createElement("div");
	const infoName = document.createElement("h1");
	const infoSpecies = document.createElement("h1");
	const infoPlanet = document.createElement("h1");
	const infoStatus = document.createElement("h1");
	const infoBio = document.createElement("p");

	containerInfo.classList.add("info-container");
	infoName.classList.add("info-name");
	infoSpecies.classList.add("info-species");
	infoPlanet.classList.add("info-planet");
	infoStatus.classList.add("info-status");
	infoBio.classList.add("info-bio");

	infoName.textContent = character.name;
	infoSpecies.textContent = "Species: " + character.species;
	infoPlanet.textContent = "Planet: " + character.origin.name;
	infoStatus.textContent = "Status: " + character.status;

	containerInfo.appendChild(infoName);
	containerInfo.appendChild(infoSpecies);
	containerInfo.appendChild(infoPlanet);
	containerInfo.appendChild(infoStatus);
	containerInfo.appendChild(infoBio);

	return containerInfo;
}

(async () => {
	const data = await ky.get(apiURL).json();
	data.results.forEach(function (element) {
		const itemContainer = createImage(element);
		const infoContainer = createInfo(element);

		mainGaleryContainer.appendChild(itemContainer);
		itemContainer.appendChild(infoContainer);

		itemContainer.addEventListener("mouseenter", () => {
			infoContainer.classList.add("displayActive");
			itemContainer.classList.add("z-index--top");
			document.getElementById("overlay").style.display = "block";
		});

		itemContainer.addEventListener("mouseleave", () => {
			infoContainer.classList.remove("displayActive");
			itemContainer.classList.remove("z-index--top");

			document.getElementById("overlay").style.display = "none";
		});
	});
})();

const searchBar = document.getElementById("headerSearchbar");
const getCharacter = async () => {
	const response = await fetch(apiURL);
	const resJSON = await response.json();

	const { results } = resJSON;
	return results;
};

const searchTerm = async (name) => {
	const characters = await getCharacter();
	const result = await characters.filter((character) => {
		const regex = new RegExp(name, "gi");
		return character.name.match(regex);
	});
	return result;
};
searchBar.addEventListener("input", (e) => {
	searchTerm(e.target.value).then((res) => {
		let match = res;
		listResult.style.display = "block";
		removeChild();
		match.forEach((character) => {
			const url = createSeatchResult(character);
		});
		if (e.target.value === "") {
			listResult.style.display = "none";
			document.getElementById("overlay").style.display = "none";
		}
	});
	document.getElementById("overlay").style.display = "block";
});

const nextBtn = document.querySelector("#nextBtn");

nextBtn.addEventListener("click", () => {
	id = newURL(id);
	console.log(id);
});
