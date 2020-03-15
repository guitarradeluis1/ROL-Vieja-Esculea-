/*
Credo por Luis Bernal (guitarradeluis@gmail.com)
Si modificar el codigo fuente no borres mi nombre agrega el tuyo y compartelo
*/
window.onload = function() {
    console.log('Credo por Luis Bernal (guitarradeluis@gmail.com)');
    console.log('Si modificar el codigo fuente no borres mi nombre agrega el tuyo y compartelo');
    document.getElementById('calculadora').onkeyup = function() { obj.calculadora(); };
    document.getElementById('mapSizeWidth').value = obj.sizeWidth;
    document.getElementById('mapSizeWidth').onkeyup = function() {
        obj.sizeWidth = this.value;
        obj.paintMap();
    };
    document.getElementById('mapSizeHeight').value = obj.sizeHeight;
    document.getElementById('mapSizeHeight').onkeyup = function() {
        obj.sizeHeight = this.value;
        obj.paintMap();
    };
    document.getElementById('mapSizeGamers').value = obj.sizeGamers;
    document.getElementById('mapSizeGamers').onkeyup = function() {
        obj.sizeGamers = this.value;
        obj.paintMap();
    };
    document.getElementById('mapcolor').value = obj.cuadricula.color;
    document.getElementById('mapcolor').onchange = function() {
        obj.cuadricula.color = this.value;
        obj.paintMap();
    };
    document.getElementById('mapSeparacion').value = obj.cuadricula.separacion;
    document.getElementById('mapSeparacion').onkeyup = function() {
        obj.cuadricula.separacion = this.value;
        obj.paintMap();
    };
    document.getElementById('mapGlosorn').value = obj.cuadricula.grosor;
    document.getElementById('mapGlosorn').onkeyup = function() {
        obj.cuadricula.grosor = this.value;
        obj.paintMap();
    };
    document.getElementById('mapText').value = obj.sizeText;
    document.getElementById('mapText').onkeyup = function() {
        obj.sizeText = this.value;
        obj.paintMap();
    };
    document.getElementById('mapImagen').onchange = function() { obj.paintMap(); };
    document.getElementById('loarParty').addEventListener('change', obj.loadParty, false);
    document.getElementById('loadEnemi').addEventListener('change', obj.loadEnemi, false);
    document.getElementById('mapMultiple').onchange = function() {
        var valor = parseInt(this.value);
        if(valor){
            obj.mapaseparado = true;
        }else{
            obj.mapaseparado = false;
        }
        obj.paintMap();
    };
    openNav();
};

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
var obj = {
    notas: [],
    mapaseparado: false, 
    jugadores: [],
    enemigos: [],
    sizeWidth: 600,
    sizeHeight: 400,
    sizeGamers: 20,
    cuadricula: { separacion: 40, color: 'white', grosor: 2 },
    selectorMap: 0,
    sizeText: 30,
    dia: { desc: '', numero: 0, play: false, minutos: 2, division: false, noche: false, seg: 0, mint: 0 },
    intervalo: setInterval(function() { obj.paintTime(); }, 1000),
    intervaloReload: setInterval(function() {
        var edi1 = document.getElementById('changeCharacter');
        var edi2 = document.getElementById('changeCharacterEnemy');
        if (edi1.innerHTML.length == 0) {
            obj.listcharacters();
        }
        if (edi2.innerHTML.length == 0) {
            obj.listcharactersEnemy();
        }
    }, 4000),
    calculadora: () => {
        try {
            var text = document.getElementById('calculadora').value;
            document.getElementById('resultado').innerHTML = "<b> = " + eval(text) + "</b>";
        } catch (error) {}
    },
    showDiv: show => {
        var clases = document.getElementsByClassName('cuadro');
        for (var i = 0; i < clases.length; i++) {
            clases[i].classList.remove("esconder");
            clases[i].classList.add("esconder");
        }
        document.getElementById(`${show}`).classList.toggle('esconder');
        document.getElementById('changeCharacterEnemy').innerHTML = '';
        document.getElementById('detailSheetEnemy').innerHTML = '';
        document.getElementById('changeCharacter').innerHTML = '';
        document.getElementById('detailSheet').innerHTML = '';
    },
    showDivData: show => {
        var clases = document.getElementsByClassName('cuadroData');
        for (var i = 0; i < clases.length; i++) {
            clases[i].classList.remove("esconder");
            clases[i].classList.add("esconder");
        }
        document.getElementById(`${show}`).classList.toggle('esconder');
    },
    newCharacter: () => {
        var { jugadores, listcharacters } = obj;
        var jugador = new Jugador(true);
        jugadores.push(jugador);
        listcharacters();
        openNav();
    },
    listcharacters: () => {
        var { jugadores, seleccion, listWorldGamers } = obj;
        var container = document.getElementById('lischaracters');
        container.innerHTML = "";
        document.getElementById('changeCharacter').innerHTML = '';
        jugadores.map(j => {
            if (j.live) {
                if (j.jugador) {
                    var a = document.createElement("button");
                    a.onclick = function() { seleccion(j.id); };
                    a.className = `button1`;
                    if (j.select) {
                        a.innerHTML = `&#x265B; ${j.personaje}`;
                    } else {
                        a.innerHTML = `${j.personaje}`;
                    }
                    a.style.color = `${j.color}`;
                    a.style.cursor = "pointer";
                    container.appendChild(a);
                }
            }
        });
        listWorldGamers();
    },
    seleccion: id => {
        var { jugadores, listcharacters } = obj;
        var container = document.getElementById('detailSheet');
        container.innerHTML = '';
        jugadores.map(j => {
            j.select = false;
            if (j.id == id) {
                j.select = true;
                j.ficha('changeCharacter', 'detailSheet');
            }
        });
        listcharacters();
    },
    reload: () => {
        var { listcharacters } = obj;
        listcharacters();
    },
    newCharacterEnemy: () => {
        var { enemigos, listcharactersEnemy } = obj;
        var jugador = new Jugador(false);
        enemigos.push(jugador);
        listcharactersEnemy();
    },
    listcharactersEnemy: () => {
        var { enemigos, seleccionEnemy, listWorldGamers } = obj;
        var container = document.getElementById('lischaractersEnemy');
        container.innerHTML = "";
        document.getElementById('changeCharacterEnemy').innerHTML = '';
        enemigos.map(j => {
            if (j.live) {
                if (!j.jugador) {
                    var a = document.createElement("button");
                    a.onclick = function() { seleccionEnemy(j.id); };
                    a.className = `button1`;
                    if (j.select) {
                        a.innerHTML = `&#x265B; ${j.personaje}`;
                    } else {
                        a.innerHTML = `${j.personaje}`;
                    }
                    a.style.color = `${j.color}`;
                    a.style.cursor = "pointer";
                    container.appendChild(a);
                    container.appendChild(document.createElement('hr'));
                }
            }
        });
        listWorldGamers();
    },
    seleccionEnemy: id => {
        var { enemigos, listcharactersEnemy } = obj;
        var container = document.getElementById('detailSheetEnemy');
        container.innerHTML = '';
        enemigos.map(j => {
            j.select = false;
            if (j.id == id) {
                j.select = true;
                j.ficha('changeCharacterEnemy', 'detailSheetEnemy');
            }
        });
        listcharactersEnemy();
    },
    paintMap: () => {
        const { sizeWidth, sizeHeight, getMousePos, jugadores, enemigos, cuadricula, sizeGamers, sizeText } = obj;
        var divCanvas = document.getElementById("world");
        divCanvas.style.width = `${sizeWidth}px`;
        divCanvas.style.height = `${sizeHeight}px`;
        var canvasHtml = `<canvas id="canvas" width="${sizeWidth}" height="${sizeHeight}">Tu navegador no soporta html5...</canvas>`;
        divCanvas.innerHTML = canvasHtml;
        obj.canvas = document.getElementById("canvas");
        canvas.ctx = obj.canvas.getContext("2d");
        canvas.addEventListener('click', function(evt) {
            var mousePos = getMousePos(canvas, evt);
            document.getElementById("posicionEjemplo").innerHTML = `${mousePos.x}, ${mousePos.y}`;
            //console.log(`${mousePos.x}, ${mousePos.y}`);
            obj.changePlace(mousePos.x, mousePos.y);
            obj.listWorldGamers();
            obj.paintMap();
        }, false);
        var fondo = new Image();
        fondo.src = document.getElementById('mapImagen').value;
        canvas.ctx.drawImage(fondo, 0, 0, sizeWidth, sizeHeight);
        var separacion = cuadricula.separacion ? parseInt(cuadricula.separacion) : 40;
        for (i = 0; i < 9000; i += separacion) {
            canvas.ctx.beginPath();
            canvas.ctx.strokeStyle = `${cuadricula.color}`;
            canvas.ctx.lineWidth = cuadricula.grosor;
            canvas.ctx.moveTo(0, i);
            canvas.ctx.lineTo(canvas.width, i);
            canvas.ctx.stroke();
        }
        for (i = 0; i < 9000; i += separacion) {
            canvas.ctx.beginPath();
            canvas.ctx.strokeStyle = `${cuadricula.color}`;
            canvas.ctx.lineWidth = cuadricula.grosor;
            canvas.ctx.moveTo(i, 0);
            canvas.ctx.lineTo(i, canvas.width);
            canvas.ctx.stroke();
        }
        jugadores.map(j => {
            if (j.live) {
                if (j.jugador) {
                    if(obj.mapaseparado == false || j.mapa == document.getElementById('mapImagen').value)
                    {
                        canvas.ctx.fillStyle = `${j.color}`;
                        canvas.ctx.font = `${sizeText}px Arial`;
                        canvas.ctx.fillText(`${j.personaje}`, j.x, j.y - 2);
                        canvas.ctx.fillStyle = `${j.color}`;
                        canvas.ctx.fillRect(j.x, j.y, sizeGamers, sizeGamers);
                        canvas.ctx.beginPath();
                    }
                }
            }
        });
        enemigos.map(j => {
            if (j.live) {
                if (!j.jugador) {
                    if(obj.mapaseparado == false || j.mapa == document.getElementById('mapImagen').value)
                    {
                        canvas.ctx.fillStyle = `${j.color}`;
                        canvas.ctx.font = `${sizeText}px Arial`;
                        canvas.ctx.fillText(`${j.personaje}`, j.x, j.y - 2);
                        canvas.ctx.fillStyle = `${j.color}`;
                        canvas.ctx.fillRect(j.x, j.y, sizeGamers, sizeGamers);
                        canvas.ctx.beginPath();
                    }
                }
            }
        });
    },
    getMousePos: (canvas, evt) => {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    },
    listWorldGamers: () => {
        var { jugadores, enemigos, selectorMap } = obj;
        var container = document.getElementById('worldGamers');
        container.innerHTML = "";
        var tabla = document.createElement("table");
        var hilera = document.createElement("tr");
        var celda = document.createElement("th");
        celda.innerHTML = `<b>Mapa</b>`;
        hilera.appendChild(celda);
        var celda = document.createElement("th");
        celda.innerHTML = `<b>Jugador</b>`;
        hilera.appendChild(celda);
        var celda = document.createElement("th");
        celda.innerHTML = `<b>PV</b>`;
        hilera.appendChild(celda);
        var celda = document.createElement("th");
        celda.innerHTML = `<b>MOV</b>`;
        hilera.appendChild(celda);
        tabla.appendChild(hilera);
        jugadores.map(j => {
            if (j.live) {
                if (j.jugador) {
                    var hilera = document.createElement("tr");
                    var celda = document.createElement("td");
                    var selectMaps = obj.createSelecImagenesMap(j.mapa);
                    selectMaps.onchange = function(){
                        j.mapa = selectMaps.value;
                    };
                    celda.appendChild(selectMaps);
                    hilera.appendChild(celda);
                    var celda = document.createElement("td");
                    celda.onclick = function() {
                        obj.selectorMap = j.id;
                        obj.listWorldGamers();
                    };
                    celda.style.cursor = "pointer";
                    var icon = j.clase.icon ? `${j.clase.icon} ${j.clase.nombre} - ${j.raza.nombre}` : '<b>NA</b>';
                    if (j.id == selectorMap) {
                        celda.innerHTML = `&#x265B; ${j.personaje} <span style="color: ${j.color};">${icon}<span>`;
                    } else {
                        celda.innerHTML = `${j.personaje} <span style="color: ${j.color};">${icon}<span>`;
                    }
                    hilera.appendChild(celda);
                    var arayDatos = [];
                    j.datos.map(ha => {
                        arayDatos[ha.pref] = ha.puntos;
                    });
                    if (j.clase.da) {
                        var celda = document.createElement("td");
                        celda.innerHTML = ` ${(j.clase.da + arayDatos['CON'])} (${j.clase.da}DA + ${arayDatos['CON']}CON)`;
                        hilera.appendChild(celda);
                        var celda = document.createElement("td");
                        celda.innerHTML = `${arayDatos['DES']}DES x metro o pies`;
                        hilera.appendChild(celda);
                    }
                    tabla.appendChild(hilera);
                }
            }
        });
        container.appendChild(tabla);
        var tabla = document.createElement("table");
        var hilera = document.createElement("tr");
        var celda = document.createElement("th");
        celda.innerHTML = `<b>Mapa</b>`;
        hilera.appendChild(celda);
        var celda = document.createElement("th");
        celda.innerHTML = `<b>Enemigo</b>`;
        hilera.appendChild(celda);
        var celda = document.createElement("th");
        celda.innerHTML = `<b>NIVEL</b>`;
        hilera.appendChild(celda);
        var celda = document.createElement("th");
        celda.innerHTML = `<b>INT</b>`;
        hilera.appendChild(celda);
        var celda = document.createElement("th");
        celda.innerHTML = `<b>FUE</b>`;
        hilera.appendChild(celda);
        var celda = document.createElement("th");
        celda.innerHTML = `<b>MOV</b>`;
        hilera.appendChild(celda);
        var celda = document.createElement("th");
        celda.innerHTML = `<b>CON / VIDA</b>`;
        hilera.appendChild(celda);
        tabla.appendChild(hilera);
        enemigos.map(j => {
            if (j.live) {
                if (!j.jugador) {
                    var hilera = document.createElement("tr");
                    var celda = document.createElement("td");
                    var selectMaps = obj.createSelecImagenesMap(j.mapa);
                    selectMaps.onchange = function(){
                        j.mapa = selectMaps.value;
                    };
                    celda.appendChild(selectMaps);
                    hilera.appendChild(celda);
                    var celda = document.createElement("td");
                    celda.onclick = function() {
                        obj.selectorMap = j.id;
                        obj.listWorldGamers();
                    };
                    celda.style.cursor = "pointer";
                    if (j.id == selectorMap) {
                        celda.innerHTML = `&#x265B; ${j.personaje} <span style="color: ${j.color};">&#x2620;<span>`;
                    } else {
                        celda.innerHTML = `${j.personaje} <span style="color: ${j.color};">&#x2620;<span>`;
                    }
                    hilera.appendChild(celda);
                    var arayDatos = [];
                    j.datos.map(ha => {
                        arayDatos[ha.pref] = ha.puntos;
                    });
                    var celda = document.createElement("td");
                    celda.innerHTML = `${j.nivel}`;
                    hilera.appendChild(celda);
                    var celda = document.createElement("td");
                    celda.innerHTML = `${arayDatos['INT']}`;
                    hilera.appendChild(celda);
                    var celda = document.createElement("td");
                    celda.innerHTML = `${arayDatos['FUE']}`;
                    hilera.appendChild(celda);
                    var celda = document.createElement("td");
                    celda.innerHTML = `${arayDatos['DES']}DES x metro o pies`;
                    hilera.appendChild(celda);
                    var celda = document.createElement("td");
                    celda.innerHTML = `${arayDatos['CON']}`;
                    hilera.appendChild(celda);
                    tabla.appendChild(hilera);
                }
            }
        });
        container.appendChild(tabla);
    },
    createSelecImagenesMap: show=>{
        var select = document.createElement('select');
        var opt = document.createElement('option');
        opt.value = `${show}`;
        opt.text = `${show}`;
        opt.setAttribute("selected","true");
        select.appendChild(opt);
        for (var i = 1; i <= 10; i++){
            var opt = document.createElement('option');
            opt.value = `mapas/${i}.jpg`;
            opt.text = `Mapa ${i}`;
            select.appendChild(opt);
        }
        return select;
    },
    changePlace: (x, y) => {
        var { jugadores, enemigos, selectorMap } = obj;
        jugadores.map(j => {
            if (j.live) {
                if (j.jugador) {
                    if (j.id == selectorMap) {
                        j.x = x;
                        j.y = y;
                    }
                }
            }
        });
        enemigos.map(j => {
            if (j.live) {
                if (!j.jugador) {
                    if (j.id == selectorMap) {
                        j.x = x;
                        j.y = y;
                    }
                }
            }
        });
    },
    contador: () => {
        var listContador = document.getElementById('listContador');
        idTemp = ((new Date()).getTime() * parseInt((Math.random() * 1000)));
        var div = document.createElement('div');
        div.setAttribute('id', idTemp);
        listContador.appendChild(div);
        var co = new Contador();
        co.new(`${idTemp}`);
    },
    //generar timepo
    // intervalo
    //dia: {desc: '', numero: 0, play: false, minutos: 0, division: false, noche: false, seg: 0, mint: 0},
    setTiempo: () => {
        var { dia } = obj;
        dia.seg = 0;
        dia.mint = 0;
        dia.noche = false;
        dia.desc = prompt("Descripcion del dia:", ``);
        dia.minutos = parseInt(prompt("Cantidad enminutos de duracion (Dia) :", `${dia.minutos}`));
        if (confirm(`Quieres dividir el dia de la noche (Cada dia durara ${dia.minutos} minutos y la noche ${dia.minutos} minutos)`)) {
            dia.division = true;
        } else {
            dia.division = false;
        }
        dia.numero = prompt("Comenzar desde el dia:", `${dia.numero}`);
    },
    initDia: () => {
        var { dia } = obj;
        if (confirm(`Seguro quiere comenzar lacuenia de dia?`)) {
            dia.play = true;
        }
    },
    stopTime: () => { obj.dia.play = false; },
    paintTime: () => {
        var { dia } = obj;
        if (dia.play) {
            var contenedor = document.getElementById('showTime');
            dia.seg = parseInt(dia.seg) + 1;
            if (dia.seg >= 60) {
                dia.seg = 0;
                dia.mint = parseInt(dia.mint) + 1;
            }
            if (parseInt(dia.mint) >= parseInt(dia.minutos)) {
                if (dia.division) {
                    if (dia.noche) {
                        dia.numero = parseInt(dia.numero) + 1;
                        dia.mint = 0;
                        dia.noche = false;
                        document.body.style.backgroundColor = "#FFFFFF";
                    } else {
                        dia.noche = true;
                        dia.mint = 0;
                        document.body.style.backgroundColor = "#CDCDCD";
                    }
                } else {
                    dia.numero = parseInt(dia.numero) + 1;
                    dia.mint = 0;
                }
            }
            var estDia = dia.noche ? '&#x263D; Night' : '&#x26C5; Day';
            contenedor.innerHTML = `${estDia} Time:: Day ${dia.numero} (Min ${dia.mint} Seg ${dia.seg}) <i>${dia.desc}</i><br/>`;
        }
    },
    nuevNota: () => {
        var { notas } = obj;
        var container = document.getElementById('divNotas');
        container .innerHTML = '';
        var div = document.createElement('div');
        var input = document.createElement('textarea');
        input.setAttribute('id',  'nota');
        var btn = document.createElement('button');
        btn.className = 'button2';
        btn.innerHTML = 'Save';
        btn.onclick = function(){
            notas.push({
                id: ((new Date()).getTime() * parseInt((Math.random()*1000))),
                nota: document.getElementById('nota').value
            });
            document.getElementById('divNotas').innerHTML = '';
            obj.paintNotas();
        };
        div.appendChild(input);
        div.appendChild(btn);
        container.appendChild(div);
    },
    paintNotas: ()=>{
        var { notas } = obj;
        var container = document.getElementById('divNotas');
        container .innerHTML = '';
        var tabla = document.createElement("table");
        var hilera = document.createElement("tr");
        var celda = document.createElement("th");
        celda.innerHTML = `<b>Notas</b>`;
        hilera.appendChild(celda);
        tabla.appendChild(hilera);
        notas.map(nota=>{
            var hilera = document.createElement("tr");
            var p = document.createElement('td');
            p.innerHTML = nota.nota;
            p.style.cursor = "pointer"
            p.onclick = function(){
                container .innerHTML = '';
                var input = document.createElement('textarea');
                input.setAttribute('id',  'nota');
                input.value = nota.nota;
                var btn = document.createElement('button');
                btn.className = 'button2';
                btn.innerHTML = 'Save';
                btn.onclick = function(){
                    notas.map(n=>{
                        if(n.id == nota.id){
                            nota.nota = document.getElementById('nota').value;
                        }
                    });
                    obj.paintNotas();
                };
                container.appendChild(input);
                container.appendChild(btn);
            };
            hilera.appendChild(p);
            tabla.appendChild(hilera);
        });
        container.appendChild(tabla);
    },
    fichaImagen: ()=>{
        var { jugadores } = obj;
        let sizeWidth = 500;
        let sizeHeight = 650;
        var divCanvas = document.getElementById('fichaImagen');
        jugadores.map(j => {
            if (j.live) {
                if (j.jugador) {
                    if (j.select){
                        if(j.hasOwnProperty('clase')){
                            if(j.hasOwnProperty('raza')){
                                divCanvas.innerHTML = '';
                                divCanvas.style.width = `${sizeWidth}px`;
                                divCanvas.style.height = `${sizeHeight}px`;
                                var canvasHtml = `<canvas id="canvasFicha" width="${sizeWidth}" height="${sizeHeight}">Tu navegador no soporta html5...</canvas>`;
                                divCanvas.innerHTML = canvasHtml;
                                canvas = document.getElementById("canvasFicha");
                                canvas.ctx = canvas.getContext("2d");
                                var fondo = new Image();
                                fondo.src ='hojas/hv1.png';
                                canvas.ctx.drawImage(fondo, 0, 0, sizeWidth, sizeHeight);
                                canvas.ctx.fillStyle = `#0046FF`;
                                canvas.ctx.font = "20px Arial Black";
                                canvas.ctx.fillText(`${j.personaje}`, 160, 50);
                                canvas.ctx.fillText(`${j.raza.nombre}`, 270, 50);
                                canvas.ctx.fillText(`${j.clase.nombre}`, 390, 50);
                                canvas.ctx.fillText(`${j.nivel}`, 45, 144);
                                canvas.ctx.fillText(`${j.exp}`, 99, 144);
                                var salto = 29;
                                var tempy = 223;
                                var tempCount = 0;
                                j.habilidades.map(da=>{
                                    canvas.ctx.fillText(`${da.puntos}`, 125, tempy);
                                    tempy = tempy + salto;
                                });
                                var arayDatos = [];
                                j.datos.map(ha=>{
                                    arayDatos[ha.pref] = ha.puntos;
                                });
                                canvas.ctx.fillText(`${arayDatos['FUE']}`, 250, 200);
                                canvas.ctx.fillText(`${arayDatos['DES']}`, 250, 245);
                                canvas.ctx.fillText(`${arayDatos['CON']}`, 250, 290);
                                canvas.ctx.fillText(`${arayDatos['INT']}`, 250, 340);
                                canvas.ctx.fillText(`${arayDatos['SAB']}`, 250, 385);
                                canvas.ctx.fillText(`${arayDatos['CAR']}`, 250, 435);
                                canvas.ctx.font = "10px Arial Black";                                
                                var salto = 20;
                                var tempy = 105;
                                var tempCount = 0;
                                j.armas.map(da=>{
                                    if(da.tipo == 'talents'){
                                        if(tempCount < 4){
                                            canvas.ctx.fillText(`${da.nombre} (${da.cantidad}) puntos:${da.puntos}`, 160, tempy);
                                            tempy = tempy + salto;
                                            tempCount++;
                                        }
                                    }
                                });
                                var salto = 20;
                                var tempy = 500;
                                var tempCount = 0;
                                j.armas.map(da=>{
                                    if(da.tipo == 'armas'){
                                        if(tempCount < 7){
                                            canvas.ctx.fillText(`${da.nombre} (${da.cantidad}) puntos:${da.puntos}`, 30, tempy);
                                            tempy = tempy + salto;
                                            tempCount++;
                                        }
                                    }
                                });
                                var salto = 20;
                                var tempy = 500;
                                var tempCount = 0;
                                j.armas.map(da=>{
                                    if(da.tipo == 'equipamiento'){
                                        if(tempCount < 7){
                                            canvas.ctx.fillText(`${da.nombre} (${da.cantidad}) puntos:${da.puntos}`, 260, tempy);
                                            tempy = tempy + salto;
                                            tempCount++;
                                        }
                                    }
                                });
                                if(j.imagen != ''){
                                    var image = new Image();
                                    image.onload = function() {
                                        canvas.ctx.drawImage(image, 0, 0, 50, 100);
                                    };
                                    image.src = j.imagen;
                                }
                            }
                        }
                    }
                }
            }
        });
    },
    //----------------------------Save/load Enemi------------------------------------------------------
    saveEnemi: ()=>{
        var { enemigos } = obj;
        enemigos.map(j => {
            if (j.live) {
                if (!j.jugador) {
                    if (j.select) {
                        var elem = document.getElementById('descargarEnemigo');
                        elem.download = `${j.personaje}.txt`;
                        elem.href = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(j));
                        elem.click();
                    }
                }
            }
        });
    },
    loadEnemi: e =>{
        try {
            var { enemigos, listcharactersEnemy, listcharacters, listWorldGamers, paintMap } = obj;
            var archivo = e.target.files[0];
            if (!archivo) {
                throw "Error:: Carga de archivo!";
            }
            var lector = new FileReader();
            lector.onload = function(e) {
                var contenido = e.target.result;
                var load = JSON.parse(contenido);
                console.log(load);
                if (load.hasOwnProperty('id')) {
                    var jugador = new Jugador(false);
                    jugador.id = ((new Date()).getTime() * parseInt((Math.random() * 1000)));
                    jugador.live = true;
                    jugador.select = false;
                    jugador.x = load.x;
                    jugador.y = load.y;
                    jugador.oro = load.oro;
                    jugador.exp = load.exp;
                    jugador.nivel = load.nivel;
                    jugador.nombre = load.nombre;
                    jugador.personaje = load.personaje;
                    jugador.color = load.color;
                    jugador.raza = load.raza;
                    jugador.clase = load.clase;
                    jugador.habilidades = load.habilidades;
                    jugador.datos = load.datos;
                    jugador.armas = load.armas;
                    jugador.transfondos = load.transfondos;
                    jugador.mapa = load.mapa;
                    jugador.imagen = load.imagen;
                    enemigos.push(jugador);
                } else {
                    throw "Error:: Carga nodo de Jugadores!";
                }
            };
            lector.readAsText(archivo);
            listcharactersEnemy();
            listWorldGamers();
            listcharacters();
            paintMap();
            alert(`Enemigo cargado con exito!!`);
        } catch (error) {
            alert(`${error}`);
        }
        document.getElementById('loadEnemi').value = '';
    },
    //----------------------------Save/load------------------------------------------------------------
    saveParty: () => {
        try {
            var save = { jugadores: [], enemigos: [], mapa: {}, dia: {}, notas: [] };
            var nombreParty = document.getElementById('nombreParty');
            if (nombreParty.value.length == 0) {
                throw "Error:: Ingresa el nombre de la partida!";
            }
            obj.jugadores.map(v => { if (v.live) { save.jugadores.push(v); } });
            obj.enemigos.map(v => { if (v.live) { save.enemigos.push(v); } });
            save.mapa = {
                sizeWidth: obj.sizeWidth,
                sizeHeight: obj.sizeHeight,
                sizeGamers: obj.sizeGamers,
                cuadricula: obj.cuadricula,
                selectorMap: obj.selectorMap,
                sizeText: obj.sizeText,
                image: document.getElementById('mapImagen').value
            };
            save.dia = obj.dia;
            save.dia.play = false; //Este punto es al momento de cargar la partid este en pusa pero mantenga os valors creados
            save.notas = obj.notas;
            var elem = document.getElementById('descargar');
            elem.download = `${nombreParty.value}.txt`;
            elem.href = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(save));
            elem.click();
        } catch (error) {
            alert(`${error}`);
        }
    },
    loadParty: e => {
        try {
            var { jugadores, enemigos, listcharactersEnemy, listcharacters, listWorldGamers, paintMap } = obj;
            var archivo = e.target.files[0];
            if (!archivo) {
                throw "Error:: Carga de archivo!";
            }
            var lector = new FileReader();
            lector.onload = function(e) {
                var contenido = e.target.result;
                var load = JSON.parse(contenido);
                if (load.hasOwnProperty('jugadores')) {
                    load.jugadores.map(j => {
                        var jugador = new Jugador(true);
                        jugador.id = ((new Date()).getTime() * parseInt((Math.random() * 1000)));
                        jugador.live = true;
                        jugador.select = j.select;
                        jugador.x = j.x;
                        jugador.y = j.y;
                        jugador.oro = j.oro;
                        jugador.exp = j.exp;
                        jugador.nivel = j.nivel;
                        jugador.nombre = j.nombre;
                        jugador.personaje = j.personaje;
                        jugador.color = j.color;
                        jugador.raza = j.raza;
                        jugador.clase = j.clase;
                        jugador.habilidades = j.habilidades;
                        jugador.datos = j.datos;
                        jugador.armas = j.armas;
                        jugador.transfondos = j.transfondos;
                        jugador.mapa = j.mapa;
                        jugador.imagen = j.imagen;
                        jugadores.push(jugador);
                    });
                } else {
                    throw "Error:: Carga nodo de Jugadores!";
                }
                if (load.hasOwnProperty('enemigos')) {
                    load.enemigos.map(j => {
                        var jugador = new Jugador(false);
                        jugador.id = ((new Date()).getTime() * parseInt((Math.random() * 1000)));
                        jugador.live = true;
                        jugador.select = j.select;
                        jugador.x = j.x;
                        jugador.y = j.y;
                        jugador.oro = j.oro;
                        jugador.exp = j.exp;
                        jugador.nivel = j.nivel;
                        jugador.nombre = j.nombre;
                        jugador.personaje = j.personaje;
                        jugador.color = j.color;
                        jugador.raza = j.raza;
                        jugador.clase = j.clase;
                        jugador.habilidades = j.habilidades;
                        jugador.datos = j.datos;
                        jugador.armas = j.armas;
                        jugador.transfondos = j.transfondos;
                        jugador.mapa = j.mapa;
                        jugador.imagen = j.imagen;
                        enemigos.push(jugador);
                    });
                } else {
                    throw "Error:: Carga nodo de Enemigos!";
                }
                if (load.hasOwnProperty('mapa')) {
                    obj.sizeWidth = load.mapa.sizeWidth;
                    obj.sizeHeight = load.mapa.sizeHeight;
                    obj.sizeGamers = load.mapa.sizeGamers;
                    obj.cuadricula = load.mapa.cuadricula;
                    obj.selectorMap = load.mapa.selectorMap;
                    obj.sizeText = load.mapa.sizeText;
                    document.getElementById('mapImagen').value = load.mapa.image;
                    document.getElementById('mapSizeWidth').value = obj.sizeWidth;
                    document.getElementById('mapSizeHeight').value = obj.sizeHeight;
                    document.getElementById('mapSizeGamers').value = obj.sizeGamers;
                    document.getElementById('mapcolor').value = obj.cuadricula.color;
                    document.getElementById('mapSeparacion').value = obj.cuadricula.separacion;
                    document.getElementById('mapGlosorn').value = obj.cuadricula.grosor;
                    document.getElementById('mapText').value = obj.sizeText;
                } else {
                    throw "Error:: Carga nodo de Mapa!";
                }
                if (load.hasOwnProperty('dia')) {
                    obj.dia = load.dia;
                    if (obj.dia.division) {
                        if (obj.dia.noche) {
                            document.body.style.backgroundColor = "#CDCDCD";
                        } else {
                            document.body.style.backgroundColor = "#FFFFFF";
                        }
                    }
                } else {
                    throw "Error:: Carga nodo de Dia!";
                }
                if (load.hasOwnProperty('notas')) {
                    obj.notas = load.notas;
                    obj.paintNotas();
                } else {
                    throw "Error:: Carga nodo de Dia!";
                }
            };
            lector.readAsText(archivo);
            listcharactersEnemy();
            listWorldGamers();
            listcharacters();
            paintMap();
            alert(`Partida cargada con exito!!`);
        } catch (error) {
            alert(`${error}`);
        }
        document.getElementById('loarParty').value = '';
    },
};