window.onload = function() {
	document.getElementById('btn_new').onclick = function(){ obj.newJugador(); };
	document.getElementById('btn_ene').onclick = function(){ obj.newEnemigo(); };
	document.getElementById('btn_size').onclick = function(){ obj.chaengeSizeGamers(); };
	obj.start();
};
var obj = {
	canvas: 0,
	ctx: 0,
	sizeWidth: 600,
	sizeHeight: 400,
	sizeGamers: 20,
	sizeText: 25,
	centerx: 0,
	centery: 0,
	jugadores: [],
	npc: [],
	selecion: 0,
	tempPosicion: {x:20 , y:20},
	start: ()=>{
		const { sizeWidth, sizeHeight, getMousePos, tempPosicion } = obj;
		var divCanvas = document.getElementById("divCanvas");
		divCanvas.style.width = `${sizeWidth}px`;
		divCanvas.style.height = `${sizeHeight}px`;
		var canvasHtml = `<canvas id="canvas" width="${sizeWidth}" height="${sizeHeight}">Tu navegador no soporta html5...</canvas>`;
		divCanvas.innerHTML = canvasHtml;
		obj.canvas = document.getElementById("canvas");
		canvas.ctx = obj.canvas.getContext("2d");
		canvas.addEventListener('click', function(evt) {
			var mousePos = getMousePos(canvas, evt);
			tempPosicion.x = mousePos.x;
			tempPosicion.y = mousePos.y;
			document.getElementById("posicionEjemplo").innerHTML = `${mousePos.x}, ${mousePos.y}`;
			/*
			var uno = true;
			jugadores.map(j=>{
				if(j.id = obj.selecion){
					if(uno){
						j.setPosition(mousePos.x, mousePos.y);
						console.log(j.id);
						uno = false;
						reload();
					}
				}
			});*/
		}, false);
		obj.reload();
	},
	getMousePos: (canvas, evt)=>{
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	},
	imagen: ()=>{
		const { sizeWidth, sizeHeight } = obj;
		var fondo = new Image();        
		fondo.src = './mapa1.jpg'; 
		canvas.ctx.drawImage(fondo, 0, 0, sizeWidth, sizeHeight);
	},
	placeMap: ()=>{
		const { sizeGamers, sizeText, jugadores } = obj;
		jugadores.map(j=>{
			canvas.ctx.fillStyle = `black`;
			canvas.ctx.font = `${sizeText}px Arial`;
			canvas.ctx.fillText(`${j.personaje}`, j.x, j.y -2);
			canvas.ctx.fillStyle = `${j.color}`;
			canvas.ctx.fillRect(j.x, j.y, sizeGamers, sizeGamers);
			canvas.ctx.beginPath();
		});
	},
	reload: ()=>{
		const { imagen, placeMap } = obj;
		imagen();
		placeMap();
	},
	chaengeSizeGamers:()=>{
		const { reload } = obj;
		var tmp = prompt("Tamaño de personajes en el mapa (10, 20....):", "");
		obj.sizeGamers = parseInt(tmp);
		var tmp = prompt("Tamaño del texto (10, 20....):", "");
		obj.sizeText = parseInt(tmp);
		reload();
	},
	newJugador: ()=>{
		var { jugadores, list }= obj;
		var jugador = new Jugador(true);
		jugador.color = document.getElementById('color').value;
		jugadores.push(jugador);
		list();
	},
	newEnemigo: ()=>{
		var { jugadores, listNpc }= obj;
		var jugador = new Jugador(false);
		jugador.color = document.getElementById('color').value;
		jugadores.push(jugador);
		listNpc();
	},
	list: ()=>{
		const { jugadores, reload, painData } = obj;
		var lista = document.getElementById('lista');
		lista.innerHTML = "";
		var ol = document.createElement("ol");
		jugadores.map(j=>{
			if(j.live){
				if(j.jugador){
					var li = document.createElement("li");
					li.setAttribute("id", j.id);
					li.innerHTML = `
						<b>${j.personaje}</b> ${j.nombre}<br/>
						PV:<b>${j.pv()}</b><br/>
						ORO:<b>${j.oro}</b><br/>
						NV:<b>${j.nivel} (${j.experiencia} Exp)</b><br/>
					`;
					li.onclick = function(){ 
						obj.selecion = j.id;
						painData(j.id, true); 
					}
					li.style.cursor = "pointer";
					li.style.color = `${j.color}`;
					ol.appendChild(li);
				}
			}
		});
		lista.appendChild(ol);
		reload();
	},
	listNpc: ()=>{
		const { jugadores, reload, painData } = obj;
		var lista = document.getElementById('listaNpc');
		lista.innerHTML = "";
		var ol = document.createElement("ol");
		jugadores.map(j=>{
			if(j.live){
				if(j.jugador == false){
					var li = document.createElement("li");
					li.setAttribute("id", j.id);
					li.innerHTML = `
						<b>${j.personaje}</b> ${j.nombre}<br/>
						PV:<b>${j.pv()}</b><br/>
						ORO:<b>${j.oro}</b><br/>
						NV:<b>${j.nivel} (${j.experiencia} Exp)</b><br/>
					`;
					li.onclick = function(){ 
						obj.selecion = j.id;
						painData(j.id, false); 
					}
					li.style.cursor = "pointer";
					li.style.color = `${j.color}`;
					ol.appendChild(li);
				}
			}
		});
		lista.appendChild(ol);
		reload();
	},
	painData: (id, tipo)=>{
		const { jugadores, painData, list, reload, tempPosicion } = obj;
		var div = document.getElementById('datosJugador');
		var data = jugadores.filter(j=> j.id == id);
		data = data[0];
		if(tipo){
			var nombreRaza = data.raza.filter(ra => ra.id == data.razaId);
			var nombreClase = data.clase.filter(cl => cl.id == data.claseId);
		}
		var html = `
		<table>
			<tr>
				<td>
					Nombre: <b>${data.personaje}</b> (${data.nombre})</b><br/>`;
		if(tipo){
			html += `
					Raza: <b>${nombreRaza[0].nombre} (MOV ${nombreRaza[0].mov})</b><br/>
					Clase: <b>${nombreClase[0].nombre} (DA ${nombreClase[0].da})</b><br/>`;
		}else{
			html += `PV: <b>${data.vida})</b><br/>`;

		}
			html += `
					<div id="detalleJugador"></div>
				</td>
				<td>
					<b>Datos:</b><br/><ol id="detallesDatos"></ol>
				</td>
				<td>
					<b>Habilidades:</b><br/><ol id="detallesHabilidad"></ol>
				</td>
		</tr>`;
		html += `</table>`;
		div.innerHTML = html;
		var detalleJugador = document.getElementById('detalleJugador');
		var oro = document.createElement('span');
		oro.innerHTML = "<b>Oro</b> |";
		oro.style.cursor = "pointer";
		oro.onclick = function(){
			data.setOro();
			painData(id);
			list();
		};
		detalleJugador.appendChild(oro);
		var exp = document.createElement('span');
		exp.innerHTML = "<b>Exp</b> |";
		exp.style.cursor = "pointer";
		exp.onclick = function(){
			data.setExp();
			reload();
			list();
		};
		detalleJugador.appendChild(exp);
		var del = document.createElement('span');
		del.innerHTML = "<b>Posicion</b> |";
		del.style.cursor = "pointer";
		del.onclick = function(){
			data.setPosition(tempPosicion.x, tempPosicion.y);
			painData(id);
			list();
		};
		detalleJugador.appendChild(del);
		var del = document.createElement('span');
		del.innerHTML = "<b>Eliminar</b> |";
		del.style.cursor = "pointer";
		del.onclick = function(){
			data.eliminar();
			painData(id);
			list();
		};
		detalleJugador.appendChild(del);
		var detalles = document.getElementById('detallesDatos');
		data.datos.map(ha=>{
			var li = document.createElement('li');
			li.style.cursor = "pointer";
			li.innerHTML = `${ha.pref} (+${ha.puntos})`;
			li.onclick = function(){ 
				data.setDatos(`${ha.nombre}`);
				painData(id);
			};
			detalles.appendChild(li);
		});
		var detalles = document.getElementById('detallesHabilidad');
		data.habilidades.map(ha=>{
			var li = document.createElement('li');
			li.style.cursor = "pointer";
			li.innerHTML = `${ha.nombre} (+${ha.puntos})`;
			li.onclick = function(){ 
				data.setHabilidades(`${ha.nombre}`);
				painData(id);
			};
			detalles.appendChild(li);
		});
	}
};