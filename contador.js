/*
Credo por Luis Bernal (guitarradeluis@gmail.com)
Si modificar el codigo fuente no borres mi nombre agrega el tuyo y compartelo
*/

/**
 * Objeto constador simple
 * @description Objeto que mantendra un conteo numero sencillo
 */
var Contador = function(tipo){
	this.id = ((new Date()).getTime() * parseInt((Math.random()*1000)));
	this.live = true;
	this.contador = 0;
	this.nombre = prompt("Nombre :", "");
	this.maximo = 0;
	this.minimo = 0;
	this.limite = false;
	if (confirm(`El contador se limitar a un maximo y un minimo`)) {
		this.limite	= true;
		var tmp = prompt(`Maximo`, ``);
		this.maximo = parseInt(tmp);
		var tmp = prompt(`Minimo`, ``);
		this.minimo = parseInt(tmp);
		this.contador = this.minimo;
	}
	this.place = '';
};

/**
 * @description Creación de vista y control
 */
Contador.prototype.new = function(place){
	let obj = this;
	if(this.place != ""){
		this.place = place;
		obj.paint(true);
	}else{
		this.place = place;
		obj.paint(true);
	}
}

/**
 * @description Pintado de control
 * * @param {boolean} nuevo (true = new | false = old)
 */
Contador.prototype.paint = function(nuevo){
	var place = document.getElementById(`${this.place}`);
	let obj = this;
	if(!nuevo){
		var del = document.getElementById(`${this.id}`);
		del.parentNode.removeChild(del);
	}
	var div = document.createElement('div');
	div.setAttribute('id', this.id);
	var span = document.createElement('span');
	if(this.limite){
		span.innerHTML = `${this.nombre} : <b>${this.contador} / ${this.maximo}</b> `;
	}else{
		span.innerHTML = `${this.nombre} : <b>${this.contador}</b> `;
	}
	div.appendChild(span);
	var bm = document.createElement('span');
	bm.innerHTML = `| + `
	bm.style.cursor = 'pointer';
	bm.onclick = function(){ obj.mas(); }
	div.appendChild(bm);
	var bme = document.createElement('span');
	bme.innerHTML = `| - `
	bme.style.cursor = 'pointer';
	bme.onclick = function(){ obj.menos(); }
	div.appendChild(bme);
	var elim = document.createElement('span');
	elim.innerHTML = `| Eliminar `
	elim.style.cursor = 'pointer';
	elim.onclick = function(){ obj.eliminar(); }
	div.appendChild(elim);
	place.appendChild(div);
}

Contador.prototype.mas = function(){
	let obj = this;
	if(this.limite){
		if(this.contador < this.maximo){
			this.contador = this.contador + 1;
		}
	}else{
		this.contador = this.contador + 1;
	}
	obj.paint();
}

Contador.prototype.menos = function(){
	let obj = this;
	if(this.limite){
		if(this.contador > this.minimo){
			this.contador = this.contador - 1;
		}
	}else{
		this.contador = this.contador - 1;
	}
	obj.paint();
}

Contador.prototype.eliminar = function(){
	if (confirm(`Seguro quiere eliminar a ${this.nombre}`)) {
		var del = document.getElementById(`${this.id}`);
		del.parentNode.removeChild(del);
	}
}

