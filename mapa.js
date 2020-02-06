window.onload = function() {
	obj.start();
};
var obj = {
	canvas: 0,
	ctx: 0,
	sizeWidth: 850,
	sizeHeight: 400,
	centerx: 0,
	centery: 0,
	jugadores: [],
	npc: [],
	start: ()=>{
		var { jugadores }= obj;
		obj.canvas = document.getElementById("canvas");
		canvas.ctx = obj.canvas.getContext("2d");
		obj.reload();
		/*
		document.getElementById('btnNewP').click = function(){
			var jugador = new Jugador('luis', 'Amudiel', true);
			jugadores.push(jugador);
			jugador.paint('datosJugador');
			jugador.paint('datosNpc');
		};*/
	},
	imagen: ()=>{
		const { sizeWidth, sizeHeight } = obj;
		var fondo = new Image();        
		fondo.src = './mapa1.jpg'; 
		canvas.ctx.drawImage(fondo, 0, 0, sizeWidth, sizeHeight);
	},
	reload: ()=>{
	const { line, origin, destiny, sizeIcon, imagen } = obj;
		imagen();
	}
};
