/*
Credo por Luis Bernal (guitarradeluis@gmail.com)
Si modificar el codigo fuente no borres mi nombre agrega el tuyo y compartelo
*/

/**
 * sistema base para personajes o NPC
 * @description Solo busca crear una instancia facil de editar
 * @param {string} tipo (true = jugador | false = NPC)
 */
var Jugador = function(tipo){
	this.id = ((new Date()).getTime() * parseInt((Math.random()*1000)));
	this.live = true;
	this.x = 20;
	this.y = 20;
	this.oro = 0;
	this.jugador = tipo;
	this.nombre = tipo? prompt("Personaje:", ""): '';
	this.personaje = prompt("Nombre:", "");
	this.nivel = 0;
	this.experiencia = 0;
	this.razaId = tipo? prompt("Raza [0: Enano, 1: Mediano, 2: Humano, 3: Elfo]", ""): null;
	this.raza = [
		{id: 0, nombre:'Enano', mov: 9},
		{id: 1, nombre:'Mediano', mov: 9},
		{id: 2, nombre:'Humano', mov: 12},
		{id: 3, nombre:'Elfo', mov: 12},
	];
	this.claseId = tipo? prompt("Clase [0: Guerrero, 1: Hechicero, 2: Bribon]", ""): null;
	this.clase = [
		{id: 0, nombre:'Guerrero', da: 8},
		{id: 1, nombre:'Hechicero', da: 4},
		{id: 2, nombre:'Bribon', da: 6},
	];
	this.talentos = [];
	this.transfondos = [];
	this.armas = [];
	this.habilidades = [
		{nombre:'Alerta', puntos: 0},
		{nombre:'Comunicacion', puntos: 0},
		{nombre:'Manipulacion', puntos: 0},
		{nombre:'Erudicion', puntos: 0},
		{nombre:'Subterfugio', puntos: 0},
		{nombre:'Supervivencia', puntos: 0},
	];
	this.datos = [
		{nombre:'Fuerza', pref:'FU', puntos: 0},
		{nombre:'Destreza', pref:'DES', puntos: 0},
		{nombre:'Constitucion', pref:'CON', puntos: 0},
		{nombre:'Inteligencia', pref:'INT', puntos: 0},
		{nombre:'Sabiduria', pref:'SAB', puntos: 0},
		{nombre:'Carisma', pref:'CAR', puntos: 0},
	];
	//this.imagen = prompt("Imagen:", "");
	this.color =  "";//prompt("Color (ingles):", "");
	this.vida = tipo? '':prompt("Vida :", "");
};

/**
 * @description Desavilitar personaje
 */
Jugador.prototype.eliminar = function(){
	if (confirm(`Seguro quiere eliminar a ${this.personaje}`)) {
		this.live = false;
	} else {
	}
}

/**
 * @description Cambia cantidad de oro
 */
Jugador.prototype.setOro = function(){
	var tmp = prompt(`Oro (${this.oro})`, `${this.oro}`);
	this.oro = parseInt(tmp);
}

/**
 * @description Cambia color
 */
Jugador.prototype.setcolor = function(co){
	this.color = co;
}

/**
 * @description Cambia color
 */
Jugador.prototype.setVida = function(){
	var tmp = prompt(`Vida (${this.vida})`, `${this.vida}`);
	this.vida = parseInt(tmp);
}

/**
 * @description Cambia cantidad de experiencia y suvida de niles (10 = + 1NV)
 */
Jugador.prototype.setExp = function(){
	var tmp = prompt(`NV/Exp (${this.nivel}/${this.experiencia})`, ``);
	this.experiencia = this.experiencia + parseInt(tmp);
	if(this.experiencia >= 10){
		this.experiencia = this.experiencia - 10;
		this.nivel = this.nivel + 1;
		alert(`<b>${this.personaje}</b> subió al nivel ${this.nivel}`);
	}
}

/**
 * @description Cambia la posicion que ubica (canvas)
 * @param {float} x
 * @param {float} y
 */
Jugador.prototype.setPosition = function(x, y){
	//var tmp = prompt(`X:`, `${this.x}`);
	this.x = parseFloat(x);
	//var tmp = prompt(`Y:`, `${this.y}`);
	this.y = parseFloat(y);
}

/**
 * @description Cambia datos acorde a su nombre
 * @param {string} nombre
 */
Jugador.prototype.setDatos = function(nombre){
	this.datos.map(ha=>{
		if(ha.nombre == nombre){
			var tmp = prompt(`${ha.nombre}`, `${ha.puntos}`);
			ha.puntos = parseInt(tmp);
		}
	});
}

/**
 * @description Cambia habilidad acorde a su nombre
 * @param {string} nombre
 */
Jugador.prototype.setHabilidades = function(nombre){
	this.habilidades.map(ha=>{
		if(ha.nombre == nombre){
			var tmp = prompt(`${ha.nombre}`, `${ha.puntos}`);
			ha.puntos = parseInt(tmp);
		}
	});
}

/**
 * @returns {number} vida PV
 */
Jugador.prototype.pv = function(id){
	//let obj = this;
	if(this.tipo){
		var nombreClase = this.clase.filter(cl => cl.id == this.claseId);
		var cont = this.datos.filter(da => da.pref == 'CON');
		//console.log(`${(nombreClase[0].da + cont[0].puntos)} (${nombreClase[0].da}DA + ${cont[0].puntos}CON)`);
		//return `${(nombreClase[0].da + cont[0].puntos)} (${nombreClase[0].da}DA + ${cont[0].puntos}CON)`;
		return (nombreClase[0].da + cont[0].puntos);
	}else{
		return this.vida;
	}
}

/**
 * @returns {number} movimiento MOV
 */
Jugador.prototype.mov = function(id){
	//let obj = this;
	return this.id;
}

/**
 * @returns {number} defensa DEF
 */
Jugador.prototype.def = function(id){
	//let obj = this;
	return this.id;
}

/**
 * @returns {number} ataque ATQ
 */
Jugador.prototype.atq = function(id){
	//let obj = this;
	return this.id;
}

/**
 * @returns {number} instinto INS
 */
Jugador.prototype.ins = function(id){
	//let obj = this;
	return this.id;
}

/**
 * @returns {number} poder POD
 */
Jugador.prototype.pod = function(id){
	//let obj = this;
	return this.id;
}

Jugador.prototype.addArma = function(){
	var nombre = prompt(`Nombre de la nueva Arma`, ``);
	var puntos = prompt(`Puntaje (3, 2....)`, ``);
	puntos = parseInt(puntos);
	var peso = prompt(`Peso (3, 2....)`, ``);
	peso = parseInt(peso);
	var id = ((new Date()).getTime() * parseInt((Math.random()*1000)));
	this.armas.push({id, nombre, puntos, peso});
}

Jugador.prototype.editArma = function(id){
	var puntos = prompt(`Puntaje (3, 2....)`, ``);
	puntos = parseInt(puntos);
	var peso = prompt(`Peso (3, 2....)`, ``);
	peso = parseInt(peso);
	this.armas.filter(ar=>{
		if(ar.id == id){
			ar.puntos = puntos;
			ar.peso = peso;
		}
	});
}

Jugador.prototype.deleteArma = function(id){
	if (confirm("Seguro quieres eliminar el arma?")) {
		this.armas = this.armas.filter(ar => ar.id !== id);
	}
}


//var opcion = prompt("Introduzca su nombre:", "Aner Barrena")
/*
var txt;
  if (confirm("Press a button!")) {
    txt = "You pressed OK!";
  } else {
    txt = "You pressed Cancel!";
  }
  document.getElementById("demo").innerHTML = txt;
}*/