
/**
 * sistema base para personajes o NPC
 * @description Solo busca crear una instancia facil de editar
 * @param {string} nombre
 * @param {string} personaje
 * @param {string} tipo (true = jugador | false = NPC)
 */
var Jugador = function(nombre, personaje, tipo){
	this.x = 20;
	this.y = 20;
	this.color = "#F25252";
	this.jugador = tipo;
	this.nombre = nombre;
	this.personaje = personaje;
	this.experiencia = 0;
	this.raza = '';
	this.clase = '';
	this.talentos = [];
	this.transfondos = [];
	this.habilidades = [
		{nombre:'lerta', puntos: 0},
		{nombre:'comunicacion', puntos: 0},
		{nombre:'manipulacion', puntos: 0},
		{nombre:'erudicion', puntos: 0},
		{nombre:'subterfugio', puntos: 0},
		{nombre:'supervivencia', puntos: 0},
	];
	this.datos = [
		{nombre:'fuerza', pref:'FU', puntos: 0},
		{nombre:'destreZa', pref:'DES', puntos: 0},
		{nombre:'constitucion', pref:'CON', puntos: 0},
		{nombre:'inteligencia', pref:'INT', puntos: 0},
		{nombre:'sabiduria', pref:'SAB', puntos: 0},
		{nombre:'carisma', pref:'CAR', puntos: 0},
	];
};

/**
 * @description Miestra html de sus atributos in to div html
 * @param {string} nombre
 */
Jugador.prototype.paint = function(id){
	let obj = this;
	const div = document.getElementById(id);
	/*
	var tabla = document.createElement("table");
	var hilera = document.createElement("tr");
	var celda = document.createElement("td");
	celda.appendChild( document.createTextNode("texto") );
	hilera.appendChild(celda);
	tabla.appendChild(hilera);*/
	div.innerHTML = `
	<table>
		<tr>
			<td><b>Nombre</b></td>
			<td>${obj.personaje} (${obj.nombre})</td>
		</tr>
		<tr>
			<td><b>Raza</b></td>
			<td>${obj.raza}</td>
		</tr>
		<tr>
			<td><b>Clase</b></td>
			<td>${obj.clase}</td>
		</tr>
	</table>`;
};
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