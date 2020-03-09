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
	this.select = false;
	this.x = 20;
	this.y = 20;
	this.oro = 0;
	this.exp = 0;
	this.nivel = 1;
	this.nombre = 'pending';
	this.personaje = 'pending';
	this.color =  tipo?"#818181":'red'; //ingles
	this.jugador = tipo;
	this.raza = {};
	this.clase = {};
	this.habilidades = JSON.parse(JSON.stringify(publictHabilidades)); //publictHabilidades;
	this.datos = JSON.parse(JSON.stringify(publictDatos)); //publictDatos;
	this.armas = [/*id, nombe, cantidad, puntos, tipo(armas, equipmiento, talentos)*/];
	this.transfondos =  '';
	this.mapa =  '';
};

Jugador.prototype.eliminar = function(){
	if (confirm(`Seguro quiere eliminar a ${this.personaje}`)) {
		this.live = false;
	} else {
	}
}

Jugador.prototype.ficha = function(lugar, show){
	var per = this;
	document.getElementById(lugar).innerHTML = '';
	document.getElementById(show).innerHTML = '';
	var divsupremo = document.createElement('div');
	divsupremo.style.display = 'flex';
	divsupremo.style.flexFlow = 'row wrap';
	var div = document.createElement('div');
	div.appendChild( this.createInput(`ti${per.id}`, `<h2>${this.personaje}</h2>`, `${lugar}`, 'personaje' ) );
	div.appendChild( this.createInput(`no${per.id}`, `${this.nombre}`, `${lugar}`, 'nombre' ) );
	div.appendChild( document.createElement('br') );
	div.appendChild( this.createInput(`go${per.id}`, ` Gold: <b>${this.oro}</b> `, `${lugar}`, 'gold' ) );
	div.appendChild( this.createInput(`nv${per.id}`, ` Level: <b>${this.nivel}</b> `, `${lugar}`, 'nivel' ) );
	div.appendChild( this.createInput(`exp${per.id}`, ` Exp: <b>${this.exp}</b> `, `${lugar}`, 'exp' ) );
	div.appendChild( document.createElement('br') );
	div.appendChild( this.createInput(`color${per.id}`, ` <b>Color</b> `, `${lugar}`, 'color' ) );
	div.appendChild( document.createElement('br') );
	
	var tClase = document.createElement('span');
	tClase.setAttribute('id', `cl${per.id}`);
	if(!this.clase.nombre){
		tClase.innerHTML = `Class: `;
	}else{
		tClase.innerHTML = `Class: <b>${per.clase.nombre} ${per.clase.icon}</b> `;
	}
	div.appendChild(tClase);
	var tRaza = document.createElement('span');
	tRaza.setAttribute('id', `rc${per.id}`);
	if(this.raza.hasOwnProperty('nombre')){
		tRaza.innerHTML = `Race: <b>${per.raza.nombre}</b> `;
	}else{
		tRaza.innerHTML = `Race: `;
	}
	div.appendChild(tRaza);
	if(this.clase.hasOwnProperty('id')){
		publictTablaClasesNivel.map(tabla=>{
			if(tabla.clase == this.clase.id && tabla.nivel == this.nivel){
				var pm = document.createElement('p');
				pm.innerHTML = `ATQ: <b>${tabla.atq}</b> POD: <b>${tabla.pod}</b> INS: <b>${tabla.ins}</b>`;
				div.appendChild(pm);
			}
		});
		var arayDatos = [];
		this.datos.map(ha=>{
			arayDatos[ha.pref] = ha.puntos;
		});
		var ol = document.createElement('div');
		ol.innerHTML = `
		<ul id="detallesDatos">
			<li><b>PV</b> ${(this.clase.da + arayDatos['CON'])} (${this.clase.da}DA + ${arayDatos['CON']}CON)</li>
			<li><b>DEF</b> armadura + escudo + 10</li>
			<li><b>MOV</b> ${arayDatos['DES']}DES x metro o pies</li>
			<li><b>ATQ (cuerpo)</b> t. nivel + bono clase + ${arayDatos['FUE']}FUE</li>
			<li><b>ATQ (proyectil)</b> t. nivel + bono clase + ${arayDatos['DES']}DES</li>
			<li><b>INST</b> t. nivel + bono clase</li>
			<li><b>POD</b> t. nivel + ${arayDatos['INT']}INT</li>
		</ul>`;
		div.appendChild(ol);
	}

	div.appendChild( document.createElement('br') );
	div.appendChild( document.createElement('br') );
	var addClase = document.createElement('button');
	addClase.className = 'button1';
	addClase.innerHTML = 'Add Class';
	addClase.onclick = function(){ per.createselectClases(lugar, `cl${per.id}`); };
	div.appendChild(addClase);
	var addRaza = document.createElement('button');
	addRaza.className = 'button1';
	addRaza.innerHTML = 'Add Race';
	addRaza.onclick = function(){ per.createselectRace(lugar, `rc${per.id}`); };
	div.appendChild(addRaza);
	div.appendChild( document.createElement('br') );
	div.appendChild( document.createElement('br') );
	var btnEliminar = document.createElement('button');
	btnEliminar.className = 'button3';
	btnEliminar.innerHTML = '&#x2671 Remove';
	btnEliminar.onclick = function(){ per.eliminar(); };
	div.appendChild(btnEliminar);
	var fot = document.createElement('p');
	fot.innerHTML = `${this.id}`;
	div.appendChild(fot);
	divsupremo.appendChild(div);
	//----------------------------------
	var divda = document.createElement('div');
	divda.className = 'cudro';
	var titulo = document.createElement('p');
	titulo.innerHTML = `<h3>Data</h3>`
	divda.appendChild(titulo);
	per.datos.map(a=>{
		var temp = document.createElement('span');
		temp.innerHTML = `${a.pref}: <b>${a.puntos}</b>  `;
		divda.appendChild(temp);
		var sum = document.createElement('button');
		sum.className = 'button1';
		sum.innerHTML = '+';
		sum.onclick = function(){
			per.datos.map(ida=>{  
				if(ida.pref == a.pref){
					ida.puntos = ida.puntos + 1;
					//temp.innerHTML = `${a.pref}: <b>${a.puntos}</b>  `;
					per.ficha(lugar, show);
				}
			});
		};
		divda.appendChild(sum);
		var men = document.createElement('button');
		men.className = 'button2';
		men.innerHTML = '-';
		men.onclick = function(){
			per.datos.map(ida=>{  
				if(ida.pref == a.pref){
					ida.puntos = ida.puntos - 1;
					//temp.innerHTML = `${a.pref}: <b>${a.puntos}</b>  `;
					per.ficha(lugar, show);
				}
			});
		};
		divda.appendChild(men);
		divda.appendChild( document.createElement('br') );
	});
	divsupremo.appendChild(divda);
	//----------------------------------
	var divha = document.createElement('div');
	divha.className = 'cudro';
	var titulo = document.createElement('p');
	titulo.innerHTML = `<h3>Skills</h3>`
	divha.appendChild(titulo);
	per.habilidades.map(a=>{
		var temp = document.createElement('span');
		temp.setAttribute('id', `${a.nombre}${per.id}`);
		temp.innerHTML = `${a.nombre}: <b>${a.puntos}</b>  `;
		divha.appendChild(temp);
		var sum = document.createElement('button');
		sum.className = 'button1';
		sum.innerHTML = '+';
		sum.onclick = function(){
			per.habilidades.some(ida=>{  
				if(ida.nombre == a.nombre){
					ida.puntos = ida.puntos + 1;
					//temp = `${a.nombre}: <b>${a.puntos}</b>  `;
					per.ficha(lugar, show);
				}
			});
		};
		divha.appendChild(sum);
		var men = document.createElement('button');
		men.className = 'button2';
		men.innerHTML = '-';
		men.onclick = function(){
			per.habilidades.some(ida=>{  
				if(ida.nombre == a.nombre){
					ida.puntos = ida.puntos - 1;
					//document.getElementById(`${a.nombre}${per.id}`).innerHTML = `${a.nombre}: <b>${a.puntos}</b>  `;
					per.ficha(lugar, show);
				}
			});
		};
		divha.appendChild(men);
		divha.appendChild( document.createElement('br') );
	});
	divsupremo.appendChild(divha);
	//----------------------------------
	var divar = document.createElement('div');
	divar.className = 'cudro';
	var titulo = document.createElement('p');
	titulo.innerHTML = `<h3>Armor</h3>`;
	divar.appendChild(titulo);
	divar.appendChild( per.pintarList(per.armas, 'armas') );
	divar.appendChild( per.pintarBtnSave('armas', 'armas', lugar, show) );
	divsupremo.appendChild(divar);
	//----------------------------------
	var divit = document.createElement('div');
	divit.className = 'cudro';
	var titulo = document.createElement('p');
	titulo.innerHTML = `<h3>Items</h3>`
	divit.appendChild(titulo);
	divit.appendChild( per.pintarList(per.armas, 'equipamiento') );
	divit.appendChild( per.pintarBtnSave('equipamiento', 'equipamiento', lugar, show) );
	divsupremo.appendChild(divit);
	//----------------------------------
	var diveq = document.createElement('div');
	diveq.className = 'cudro';
	var titulo = document.createElement('p');
	titulo.innerHTML = `<h3>Talents</h3>`
	diveq.appendChild(titulo);
	diveq.appendChild( per.pintarList(per.armas, 'talents') );
	diveq.appendChild( per.pintarBtnSave('talents', 'talents', lugar, show) );
	divsupremo.appendChild(diveq);
	//----------------------------------
	var text = document.createElement('textarea');
	text.rows = "4";
	text.cols = "50";
	text.value = this.transfondos;
	text.onchange = function(){
		per.transfondos = text.value;
	};
	divsupremo.appendChild(text);
	//----------------------------------
	var fin = document.getElementById(show);
	fin.appendChild(divsupremo);
}

Jugador.prototype.createInput = function(id, texto, lugar, campo){
	var per = this;
	var general = document.createElement('span');
	general.innerHTML = texto;
	general.setAttribute( 'id', id);
	general.onclick = function(){ per.edicion(`${lugar}`, campo, id) };
	general.style.cursor = "pointer";
	if(campo == 'color'){
		general.style.color = per.color;
	}
	return general;
}

Jugador.prototype.edicion = function(lugar, atributo, idChange){
	var per = this;
	var div = document.getElementById(`${lugar}`);
	div.innerHTML = ``;
	switch(atributo){
		case 'personaje':
			var input = document.createElement('input');
			input.setAttribute('type', 'search');
			input.value = this.personaje;
			input.onkeyup = function(){ 
				per.personaje = input.value; 
				document.getElementById(idChange).innerHTML = `<h2>${input.value}</h2>`;
			};
			div.appendChild(input);
		break;
		case 'nombre':
			var input = document.createElement('input');
			input.setAttribute('type', 'search');
			input.value = this.nombre;
			input.onkeyup = function(){ 
				per.nombre = input.value; 
				document.getElementById(idChange).innerHTML = `${input.value}`;
			};
			div.appendChild(input);
		break;
		case 'gold':
			var input = document.createElement('input');
			input.value = this.oro;
			input.setAttribute('type', 'number');
			input.onkeyup = function(){
				per.oro = input.value; 
				document.getElementById(idChange).innerHTML = `Gold: <b>${input.value}</b> `;
			};
			div.appendChild(input);
		break;
		case 'exp':
			var input = document.createElement('input');
			input.value = this.exp;
			input.setAttribute('type', 'number');
			input.onkeyup = function(){
				per.exp = input.value; 
				document.getElementById(idChange).innerHTML = `Exp: <b>${input.value}</b> `;
			};
			div.appendChild(input);
		break;
		case 'nivel':
			var input = document.createElement('input');
			input.value = this.nivel;
			input.setAttribute('type', 'number');
			input.onkeyup = function(){
				per.nivel = input.value; 
				document.getElementById(idChange).innerHTML = `Level: <b>${input.value}</b> `;
			};
			div.appendChild(input);
		break;
		case 'color':
			var input = document.createElement('input');
			input.value = this.color;
			input.setAttribute('type', 'color');
			input.onchange = function(){
				per.color = input.value; 
				document.getElementById(idChange).innerHTML = `<b>Color</b>`;
				document.getElementById(idChange).style.color = input.value;
			};
			div.appendChild(input);
		break;
		default:
			var p = document.createElement('span');
			p.innerHTML = `Error 0.1`;
			div.appendChild(p);
	}
	var cancel = document.createElement('button');
	cancel.className = 'button3';
	cancel.innerHTML = 'Cancel';
	cancel.onclick = function(){ per.cancelEdicion(lugar); };
	div.appendChild(cancel);
}

Jugador.prototype.cancelEdicion = function(lugar){
	var del = document.getElementById(lugar);
	del.innerHTML = '';
	//del.parentNode.removeChild(del);
}

Jugador.prototype.createselectClases = function(lugar, id){
	var per = this;
	var div = document.getElementById(`${lugar}`);
	div.innerHTML = ``;
	var select = document.createElement('select');
	var opt = document.createElement('option');
	opt.setAttribute('value', '');
	opt.setAttribute('selected', 'selected');
	select.appendChild(opt);
	publictClases.map(cla=>{
		var opt = document.createElement('option');
		opt.setAttribute('value', cla.id);
		//opt.setAttribute('selected', 'selected');
		opt.appendChild( document.createTextNode( cla.nombre ) );
		select.appendChild(opt);
	});
	select.onchange = function(){
		var claseSelecion = publictClases.filter(se=>se.id == select.value);
		per.clase = claseSelecion[0];
		if(per.clase.hasOwnProperty('talents')){
			per.clase.talents.map(ta =>{ per.armas.push(ta); });
		}
		var show = document.getElementById(id);
		show.innerHTML = `Class : <b>${per.clase.nombre}</b> `
	};
	div.appendChild(select);
	var cancel = document.createElement('button');
	cancel.className = 'button3';
	cancel.innerHTML = 'Cancel';
	cancel.onclick = function(){ per.cancelEdicion(lugar); };
	div.appendChild(cancel);
}

Jugador.prototype.createselectRace = function(lugar, id){
	var per = this;
	var div = document.getElementById(`${lugar}`);
	div.innerHTML = ``;
	var select = document.createElement('select');
	var opt = document.createElement('option');
	opt.setAttribute('value', '');
	opt.setAttribute('selected', 'selected');
	select.appendChild(opt);
	publictRaza.map(cla=>{
		var opt = document.createElement('option');
		opt.setAttribute('value', cla.id);
		//opt.setAttribute('selected', 'selected');
		opt.appendChild( document.createTextNode( cla.nombre ) );
		select.appendChild(opt);
	});
	select.onchange = function(){
		var raceSelecion = publictRaza.filter(se=>se.id == select.value);
		per.raza = raceSelecion[0];
		if(per.raza.hasOwnProperty('talents')){
			per.raza.talents.map(ta =>{ per.armas.push(ta); });
		}
		var show = document.getElementById(id);
		show.innerHTML = `Race : <b>${per.raza.nombre}</b> `
	};
	div.appendChild(select);
	var cancel = document.createElement('button');
	cancel.className = 'button3';
	cancel.innerHTML = 'Cancel';
	cancel.onclick = function(){ per.cancelEdicion(lugar); };
	div.appendChild(cancel);
}

Jugador.prototype.fromObjetos = function(){
	//id, nombe, cantidad, puntos
	var div = document.createElement('div');
	var t1 = document.createElement('span');
	t1.appendChild( document.createTextNode('Name: ') );
	div.appendChild(t1);
	var i1 = document.createElement('input');
	i1.setAttribute('id', 'i1');
	div.appendChild(i1);
	var t2 = document.createElement('span');
	t2.appendChild( document.createTextNode('Quantity: ') );
	div.appendChild(t2);
	var i2 = document.createElement('input');
	i2.setAttribute('id', 'i2');
	i2.setAttribute('type', 'number');
	div.appendChild(i2);
	div.appendChild( document.createElement('br') );
	var t3 = document.createElement('span');
	t3.appendChild( document.createTextNode('Points: ') );
	div.appendChild(t3);
	var i3 = document.createElement('input');
	i3.setAttribute('id', 'i3');
	i3.setAttribute('type', 'text');
	div.appendChild(i3);
	return div;
}

Jugador.prototype.pintarList = function(data, armas){
	//id, nombe, cantidad, puntos, tipo
	var per = this;
	var container = document.createElement('div');
	container.setAttribute('id', `${armas}`);
	if(data.length >= 0){
		container.innerHTML = '';
		var total = 0;
		data.map( da=>{
			if(da.tipo == armas){
				var tmp = document.createElement('span');
				tmp.innerHTML = `${da.nombre} (${da.cantidad}): <b>${da.puntos}</b>  `;
				tmp.style.cursor = "pointer";
				tmp.onclick = function(){
					var form = per.fromObjetos();
					document.getElementById(lugar).appendChild(form);
					//document.getElementById('i1').setAttribute('disable', 'disable');
					document.getElementById('i1').value = da.nombre;
					document.getElementById('i2').value = da.cantidad;
					document.getElementById('i3').value = da.puntos;
					var btnadd = document.createElement('button');
					btnadd.className = 'button1';
					btnadd.innerHTML = 'save';
					btnadd.onclick = function(){
						per.armas.map(ar=>{
							if(ar.id == da.id){
								ar.nombre = document.getElementById('i1').value;
								ar.cantidad = document.getElementById('i2').value;
								ar.puntos = document.getElementById('i3').value;
							}
						});
						document.getElementById(lugar).innerHTML = '';
						per.pintarList(lugar, per.armas, armas);
					}
					document.getElementById(lugar).appendChild(btnadd);
				};
				container.appendChild(tmp);
				var cancel = document.createElement('button');
				cancel.className = 'button3';
				cancel.innerHTML = '&#x2671';
				cancel.onclick = function(){ 
					per.armas = per.armas.filter(ar=> ar.id !== da.id);
					per.pintarList(lugar, per.armas, armas);
				};
				container.appendChild(cancel);
				container.appendChild( document.createElement('br') );
				total = total + parseInt(da.cantidad);
			}
		});
		var tmp = document.createElement('p');
		tmp.innerHTML = `<b>Total: ${total}</b>`;
		container.appendChild(tmp);
	}
	return container;
}

Jugador.prototype.pintarBtnSave= function(text, lugar, l, s){
	var per = this;
	var btnadd = document.createElement('button');
	btnadd.className = 'button1';
	btnadd.innerHTML = 'add';
	btnadd.onclick = function(){
		var place = document.getElementById(lugar);
		var form = per.fromObjetos();
		place.appendChild(form);
		var btn = document.createElement('button');
		btn.className = 'button1';
		btn.innerHTML = 'save';
		btn.onclick = function(){
			per.armas.push({
				id: ((new Date()).getTime() * parseInt((Math.random()*1000))),
				nombre: document.getElementById('i1').value,
				cantidad: document.getElementById('i2').value,
				puntos: document.getElementById('i3').value,
				tipo: text
			});
			place.innerHTML = '';
			per.pintarList(per.armas, text);
			per.ficha(l,s);
		};
		place.appendChild(btn);
	};
	return btnadd;
}