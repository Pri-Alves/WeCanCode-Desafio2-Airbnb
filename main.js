var casas = null;
var google_maps_key = 'AIzaSyB91BVvucRe15DEtzgeYHEnjn5ALZQMkG4';


document.addEventListener('DOMContentLoaded', function(event) {
	loadCasas();
})

function loadCasas() {
	let url = 'https://api.sheety.co/ccf1d0d14b8bf2b0467a51258bf89d80/casas/casas';
	fetch(url)
	.then((response) => response.json())
	.then(json => {
		this.casas = json.casas;
		selectCasa(this.casas[0].id);
	});
}

function loadCasasFiltro(estado) {
	let url = 'https://api.sheety.co/ccf1d0d14b8bf2b0467a51258bf89d80/casas/casas';
	fetch(url)
	.then((response) => response.json())
	.then(json => {
		this.casas = json.casas;
		this.casas = this.casas.filter(casa => {
			return casa.estado == estado;
		});
		selectCasa(this.casas[0].id);
	});
}

function drawCasas(casas) {
	var template = Handlebars.compile(document.getElementById("list-template").innerHTML);
	document.getElementById('list-container').innerHTML = template(casas);
}

function selectCasa(casaId) {
	this.casas.forEach(casa => {
		casa.isSelected = false;
	});
	var casa = this.casas.find(casa => {
		return casa.id == casaId;
	});
	casa.isSelected = true;
	drawCasas(this.casas);
	drawMap(casa);
}

function drawMap(casa) {
	var query = encodeURIComponent(casa.endereco);
	var template = Handlebars.compile(document.getElementById("map-template").innerHTML);
	document.getElementById('map-container').innerHTML = template({
		query: query,
		key: this.google_maps_key
	});
}