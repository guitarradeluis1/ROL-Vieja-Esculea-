/*
Credo por Luis Bernal (guitarradeluis@gmail.com)
Si modificar el codigo fuente no borres mi nombre agrega el tuyo y compartelo
*/
window.onload = function() {
	console.log('Credo por Luis Bernal (guitarradeluis@gmail.com)');
	console.log('Si modificar el codigo fuente no borres mi nombre agrega el tuyo y compartelo');
	document.getElementById('btn_new').onclick = function(){ obj.newJugador(); };
	document.getElementById('btn_ene').onclick = function(){ obj.newEnemigo(); };
	document.getElementById('btn_size').onclick = function(){ obj.chaengeSizeGamers(); };
	document.getElementById('btn_tiempo').onclick = function(){ obj.setTiempo(); };
	document.getElementById('btn_cotexto').onclick = function(){ obj.setColorTexto(); };
	document.getElementById('btn_cuadros').onclick = function(){ obj.chaengeCuadricula(); };
	document.getElementById('btn_contador').onclick = function(){ obj.contador(); };
	document.getElementById('btn_mapa').onclick = function(){ obj.toogleMapa(); };
	document.getElementById('btn_tablas').onclick = function(){ obj.toogleTabla(); };
	document.getElementById('calculadora').onkeyup = function(){ obj.calculadora(); };
	obj.start();
};
var obj = {
	show: true,
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
	intervalo: setInterval( function(){ obj.paintTime(); }, 1000),
	dia: {desc: '', numero: 0, play: false, minutos: 0, division: false, noche: false, seg: 0, mint: 0},
	color: 'black',
	cuadricula: {separacion: 40, color: 'white', grosor: 2},
	calculadora: ()=>{
		try{
			var text = document.getElementById('calculadora').value;
			document.getElementById('resultado').innerHTML = eval(text);
		} catch(error){
		}
	},
	toogleMapa:()=>{
		var { show, sizeWidth, sizeHeight } = obj;
		var divCanvas = document.getElementById('divCanvas');
		var canvas = document.getElementById('canvas');
		if(show){
			divCanvas.style.display = 'none';
			divCanvas.style.width = '0px';
			divCanvas.style.height = '0px';
			obj.show = false;
		}else{
			divCanvas.style.display = '';
			divCanvas.style.width = `${sizeWidth}px`;
			divCanvas.style.height = `${sizeHeight}px`;
			obj.show = true; 
		}
		obj.reload();
	},
	toogleTabla: ()=>{
		document.getElementById('divTablas').classList.toggle('esconder');
	},
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
	setColorTexto: ()=>{
		var { reload } = obj;
		obj.color = document.getElementById('color').value;
		reload();
	},
	imagen: ()=>{
		const { sizeWidth, sizeHeight } = obj;
		var fondo = new Image();        
		fondo.src = './mapa1.jpg'; 
		canvas.ctx.drawImage(fondo, 0, 0, sizeWidth, sizeHeight);
	},
	placeMap: ()=>{
		const { sizeGamers, sizeText, jugadores, color } = obj;
		jugadores.map(j=>{
			canvas.ctx.fillStyle = `${color}`;
			canvas.ctx.font = `${sizeText}px Arial`;
			canvas.ctx.fillText(`${j.personaje}`, j.x, j.y -2);
			canvas.ctx.fillStyle = `${j.color}`;
			canvas.ctx.fillRect(j.x, j.y, sizeGamers, sizeGamers);
			canvas.ctx.beginPath();
		});
	},
	paintCuadricula: ()=>{
		const { cuadricula } = obj;
		for (i = 0; i < 9000; i += cuadricula.separacion){
			canvas.ctx.beginPath();
			canvas.ctx.strokeStyle = `${cuadricula.color}`;
			canvas.ctx.lineWidth = cuadricula.grosor;
			canvas.ctx.moveTo(0, i);
			canvas.ctx.lineTo(canvas.width, i);
			canvas.ctx.stroke();
		}
		for (i = 0; i < 9000; i += cuadricula.separacion){
			canvas.ctx.beginPath();
			canvas.ctx.strokeStyle = `${cuadricula.color}`;
			canvas.ctx.lineWidth = cuadricula.grosor;
			canvas.ctx.moveTo(i, 0);
			canvas.ctx.lineTo(i, canvas.width);
			canvas.ctx.stroke();
		}
	},
	reload: ()=>{
		const { imagen, placeMap, paintCuadricula } = obj;
		imagen();
		paintCuadricula();
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
	chaengeCuadricula: ()=>{
		var { cuadricula, reload } = obj;
		var newColor = document.getElementById('color').value;
		if (confirm(`Cambiar al color selecionado ${newColor}?`)){
			cuadricula.color = newColor;
		}
		var tmp = prompt("Grosor de lineas (1, 2....):", `${cuadricula.grosor}`);
		cuadricula.grosor = parseInt(tmp);
		var tmp = prompt("Separación de lineas (30, 40....):", `${cuadricula.separacion}`);
		cuadricula.separacion = parseInt(tmp);
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
						mo:<b>${j.oro}</b><br/>
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
						mo:<b>${j.oro}</b> Oro<br/>
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
		const { jugadores, painData, list, listNpc,  reload, tempPosicion } = obj;
		var div = document.getElementById('datosJugador');
		var data = jugadores.filter(j=> j.id == id);
		data = data[0];
		var arayDatos = [];
		data.datos.map(ha=>{
			arayDatos[ha.pref] = ha.puntos;
		});
		var html = `
		<table>
			<tr>
				<td>
					Nombre: <b>${data.personaje}</b> (${data.nombre})</b><br/>`;
		if(tipo){
			html += `
					Raza: <b>${data.raza.nombre} (MOV ${data.raza.mov})</b><br/>
					Clase: <b>${data.clase.nombre} (DA ${data.clase.da})</b><br/>`;
		}else{
			html += `PV: <b>${data.vida})</b><br/>`;

		}
			html += `
					<div id="detalleJugador"></div>
				</td>
				<td>
					<b>Habilidades:</b><br/><ol id="detallesHabilidad"></ol>
				</td>
				<td>
					<b>Datos:</b><br/><ol id="detallesDatos"></ol>
				</td>
				<td>
					<b>Puntos:</b><br/>
					<ol id="detallesDatos">
						<li><b>PV</b> ${(data.clase.da + arayDatos['CON'])} (${data.clase.da}DA + ${arayDatos['CON']}CON)</li>
						<li><b>DEF</b> armadura + escudo + 10</li>
						<li><b>MOV</b> DES x metro o pies</li>
						<li><b>ATQ (cuerpo)</b> t. nivel + bono clase + ${arayDatos['FUE']}FUE</li>
						<li><b>ATQ (proyectil)</b> t. nivel + bono clase + ${arayDatos['DES']}DES</li>
						<li><b>INST</b> t. nivel + bono clase</li>
						<li><b>POD</b> t. nivel + ${arayDatos['INT']}INT</li>
					</ol>
				</td>
				<td>
					<b>Armas:</b><br/><ul id="detallesArmas"></ul>
				</td>
		</tr>
		<tr>
			<td colspan="5" ><b>Transfondo:</b> ${data.transfondos}</td>
		</tr>`;
		html += `</table>`;
		div.innerHTML = html;
		var detalleJugador = document.getElementById('detalleJugador');
		var oro = document.createElement('span');
		oro.innerHTML = "<b>mo</b> oro |";
		oro.style.cursor = "pointer";
		oro.onclick = function(){
			data.setOro();
			painData(id);
			list();
			listNpc();
		};
		detalleJugador.appendChild(oro);
		var exp = document.createElement('span');
		exp.innerHTML = "<b>Exp</b> |";
		exp.style.cursor = "pointer";
		exp.onclick = function(){
			data.setExp();
			reload();
			list();
			listNpc();
		};
		detalleJugador.appendChild(exp);
		var del = document.createElement('span');
		del.innerHTML = "<b>Posicion</b> |";
		del.style.cursor = "pointer";
		del.onclick = function(){
			data.setPosition(tempPosicion.x, tempPosicion.y);
			painData(id);
			list();
			listNpc();
		};
		detalleJugador.appendChild(del);
		detalleJugador.appendChild(document.createElement('br'));
		var vida = document.createElement('span');
		vida.innerHTML = "<b>Vida</b> |";
		vida.style.cursor = "pointer";
		vida.onclick = function(){
			data.setVida();
			painData(id);
			list();
			listNpc();
		};
		detalleJugador.appendChild(vida);
		var editTransfondo = document.createElement('span');
		editTransfondo.innerHTML = "<b>Transfondos</b> |";
		editTransfondo.style.cursor = "pointer";
		editTransfondo.onclick = function(){
			data.setTransfondos();
			painData(id);
			list();
			listNpc();
		};
		detalleJugador.appendChild(editTransfondo);
		var arma = document.createElement('span');
		arma.innerHTML = "<b>+Arma</b> |";
		arma.style.cursor = "pointer";
		arma.onclick = function(){
			data.addArma();
			painData(id);
			list();
			listNpc();
		};
		detalleJugador.appendChild(arma);
		detalleJugador.appendChild(document.createElement('br'));
		var editColor = document.createElement('span');
		editColor.innerHTML = "<b>Color</b> |";
		editColor.style.cursor = "pointer";
		editColor.onclick = function(){
			data.setColor( document.getElementById('color').value );
			painData(id);
			reload();
			list();
			listNpc();
		};
		detalleJugador.appendChild(editColor);
		var del = document.createElement('span');
		del.innerHTML = "<b>Eliminar</b> |";
		del.style.cursor = "pointer";
		del.onclick = function(){
			data.eliminar();
			painData(id);
			list();
			listNpc();
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
				reload();
				list();
				listNpc();
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
				reload();
				list();
				listNpc();
			};
			detalles.appendChild(li);
		});
		var PesoTotal = 0;
		var detalles = document.getElementById('detallesArmas');
		data.armas.map(ha=>{
			var editarma = document.createElement('span');
			editarma.innerHTML = " <b>Edit</b>";
			editarma.style.cursor = "pointer";
			editarma.onclick = function(){
				data.editArma(ha.id);
				painData(id);
				list();
				listNpc();
			}
			var delarma = document.createElement('span');
			delarma.innerHTML = " <b>Deleted</b>";
			delarma.style.cursor = "pointer";
			delarma.onclick = function(){
				data.deleteArma(ha.id);
				painData(id);
				reload();
				list();
				listNpc();
			}
			var li = document.createElement('li');
			li.style.cursor = "pointer";
			li.innerHTML = `${ha.nombre} (+${ha.puntos}) (-${ha.peso} Kg)`;
			li.appendChild(editarma);
			li.appendChild(delarma);
			detalles.appendChild(li);
			PesoTotal = PesoTotal + ha.peso;
		});
		var li = document.createElement('li');
		li.innerHTML = `Peso Total: ${PesoTotal} Kg`;
		detalles.appendChild(li);
	},
	//generar timepo
	// intervalo
	//dia: {desc: '', numero: 0, play: false, minutos: 0, division: false, noche: false, seg: 0, mint: 0},
	setTiempo: ()=>{
		var { dia, initDia, stopTime } =obj;
		var contenedor = document.getElementById('divData');
		dia.desc = prompt("Descripción del día:", ``);
		dia.minutos = parseInt(prompt("Cantidad enminutos de duración (Día) :", `${dia.minutos}`));
		if (confirm(`Quieres dividir el dia de la noche (Cada dia durara ${dia.minutos} minutos y la noche ${dia.minutos} minutos)`)){
			dia.division = true;
		} else {
			dia.division = false;
		}
		dia.numero = prompt("Comenzar desde el día:", `${dia.numero}`);
		var text =  document.createElement('span');
		text.setAttribute('id', 'tiempoText');
		var estDia = "";
		if(dia.division){
			estDia = dia.noche? 'Noche': 'Día';
		}
		text.innerHTML = `<b>(${estDia}) :: ${dia.desc};</b> Dia: ${dia.numero}; (MINT ${dia.secuencia}) <br/>`;
		contenedor.appendChild(text);
		var start = document.createElement('span');
		start.innerHTML = "<b>Comenzar</b> |";
		start.style.cursor = "pointer";
		start.onclick = function(){
			initDia();
		};
		contenedor.appendChild(start);
		var stop = document.createElement('span');
		stop.innerHTML = "<b>Detener</b> |";
		stop.style.cursor = "pointer";
		stop.onclick = function(){
			stopTime();
		};
		contenedor.appendChild(stop);
	},
	initDia: ()=>{
		var { dia } = obj;
		if (confirm(`Seguro quiere comenzar lacuenia de día?`)){
			dia.play = true;
		} 
	},
	stopTime: ()=>{ clearInterval(obj.intervalo); },
	paintTime: ()=>{
		var { dia } = obj;
		if(dia.play){
			var contenedor = document.getElementById('tiempoText');
			dia.seg = parseInt(dia.seg) + 1;
			if(dia.seg >= 60){
				dia.seg = 0;
				dia.mint = parseInt(dia.mint) + 1;
			}
			if( parseInt(dia.mint) >= parseInt(dia.minutos) ){
				if(dia.division){
					if(dia.noche){
						dia.numero = parseInt(dia.numero) + 1;
						dia.mint = 0;
						dia.noche = false;
					}else{
						dia.noche = true;
						dia.mint = 0;
					}
				}else{
					dia.numero = parseInt(dia.numero) + 1;
					dia.mint = 0;
				}
			}
			var estDia = dia.noche? 'Noche': 'Día';
			contenedor.innerHTML = `<b>(${estDia}) :: ${dia.desc};</b> Dia: ${dia.numero}; (Min ${dia.mint} Seg ${dia.seg}) <br/>`;
		}
	},
	contador: ()=>{
		var listContador = document.getElementById('listContador');
		idTemp = ((new Date()).getTime() * parseInt((Math.random()*1000)));
		var div = document.createElement('div');
		div.setAttribute('id', idTemp);
		listContador.appendChild(div);
		var co = new Contador();
		co.new(`${idTemp}`);
	},
};