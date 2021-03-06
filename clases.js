//Editable
var publictClases = [
    {id: 0, nombre:'Guerrero', da: 8, icon: '&#x269C;',
        talents: [
            { id: 1, nombre: 'Lucha con X', cantidad: 0, puntos: 0, tipo: 'talents' },
            { id: 2, nombre: 'Ataque Multiple', cantidad: 0, puntos: 0, tipo: 'talents' },
        ]
    },
    {id: 1, nombre:'Hechicero', da: 4, icon: '&#x2606;',
        talents: [
            { id: 3, nombre: 'Sensibilidad Magica', cantidad: 0, puntos: 0, tipo: 'talents' },
            { id: 4, nombre: 'Transferir Energia', cantidad: 0, puntos: 0, tipo: 'talents' },
        ]
    },
    {id: 2, nombre:'Bribon', da: 6, icon: '&#x2618;',
        talents: [
            { id: 5, nombre: 'Emboscada', cantidad: 0, puntos: 0, tipo: 'talents' },
            { id: 6, nombre: 'Dedos Agiles', cantidad: 0, puntos: 0, tipo: 'talents' },
        ]
    },
];
var publictTablaClasesNivel = [
    //Guerrero
    {clase: 0, nivel: 1, atq: 0, pod: 0, ins: 1},
    {clase: 0, nivel: 2, atq: 1, pod: 0, ins: 2},
    {clase: 0, nivel: 3, atq: 1, pod: 0, ins: 3},
    {clase: 0, nivel: 4, atq: 2, pod: 0, ins: 4},
    {clase: 0, nivel: 5, atq: 2, pod: 0, ins: 5},
    {clase: 0, nivel: 6, atq: 3, pod: 0, ins: 6},
    {clase: 0, nivel: 7, atq: 4, pod: 0, ins: 7},
    {clase: 0, nivel: 8, atq: 5, pod: 0, ins: 8},
    {clase: 0, nivel: 9, atq: 6, pod: 0, ins: 9},
    {clase: 0, nivel: 10, atq: 7, pod: 0, ins: 10},
    {clase: 0, nivel: 11, atq: 7, pod: 0, ins: 11},
    {clase: 0, nivel: 12, atq: 8, pod: 0, ins: 11},
    {clase: 0, nivel: 13, atq: 9, pod: 0, ins: 11},
    {clase: 0, nivel: 14, atq: 9, pod: 0, ins: 11},
    //Hechicero
    {clase: 1, nivel: 1, atq: 0, pod: 1, ins: 0},
    {clase: 1, nivel: 2, atq: 0, pod: 2, ins: 1},
    {clase: 1, nivel: 3, atq: 0, pod: 4, ins: 2},
    {clase: 1, nivel: 4, atq: 1, pod: 5, ins: 3},
    {clase: 1, nivel: 5, atq: 1, pod: 7, ins: 4},
    {clase: 1, nivel: 6, atq: 2, pod: 8, ins: 5},
    {clase: 1, nivel: 7, atq: 2, pod: 10, ins: 6},
    {clase: 1, nivel: 8, atq: 3, pod: 12, ins: 7},
    {clase: 1, nivel: 9, atq: 3, pod: 14, ins: 8},
    {clase: 1, nivel: 10, atq: 3, pod: 15, ins: 9},
    {clase: 1, nivel: 11, atq: 4, pod: 17, ins: 10},
    {clase: 1, nivel: 12, atq: 4, pod: 19, ins: 10},
    {clase: 1, nivel: 13, atq: 4, pod: 20, ins: 10},
    {clase: 1, nivel: 14, atq: 5, pod: 22, ins: 10},
    //Bribon
    {clase: 2, nivel: 1, atq: 0, pod: 0, ins: 0},
    {clase: 2, nivel: 2, atq: 0, pod: 0, ins: 1},
    {clase: 2, nivel: 3, atq: 1, pod: 0, ins: 2},
    {clase: 2, nivel: 4, atq: 1, pod: 0, ins: 3},
    {clase: 2, nivel: 5, atq: 2, pod: 0, ins: 4},
    {clase: 2, nivel: 6, atq: 2, pod: 0, ins: 5},
    {clase: 2, nivel: 7, atq: 3, pod: 0, ins: 6},
    {clase: 2, nivel: 8, atq: 3, pod: 0, ins: 7},
    {clase: 2, nivel: 9, atq: 4, pod: 0, ins: 8},
    {clase: 2, nivel: 10, atq: 5, pod: 0, ins: 9},
    {clase: 2, nivel: 11, atq: 5, pod: 0, ins: 10},
    {clase: 2, nivel: 12, atq: 6, pod: 0, ins: 11},
    {clase: 2, nivel: 13, atq: 7, pod: 0, ins: 11},
    {clase: 2, nivel: 14, atq: 7, pod: 0, ins: 11},
];
//Editable
var publictRaza = [
    {id: 0, nombre:'Enano', mov: 9,
        talents: [
            { id: 7, nombre: 'Afinidad a la piedra', cantidad: 0, puntos: 0, tipo: 'talents' },
            { id: 8, nombre: 'Infravisión', cantidad: 0, puntos: 0, tipo: 'talents' },
        ]
    },
	{id: 1, nombre:'Mediano', mov: 9,
        talents: [
            { id: 9, nombre: 'Escurridizo', cantidad: 0, puntos: 0, tipo: 'talents' },
            { id: 10, nombre: 'Certero', cantidad: 0, puntos: 0, tipo: 'talents' },
        ]
    },
	{id: 2, nombre:'Humano', mov: 12,
        talents: [
            { id: 11, nombre: 'Impetu Emprendedor', cantidad: 0, puntos: 0, tipo: 'talents' },
            { id: 12, nombre: 'Adaptable', cantidad: 0, puntos: 0, tipo: 'talents' },
        ]
    },
	{id: 3, nombre:'Elfo', mov: 12,
        talents: [
            { id: 13, nombre: 'Vista aguda', cantidad: 0, puntos: 0, tipo: 'talents' },
            { id: 14, nombre: 'Infravision', cantidad: 0, puntos: 0, tipo: 'talents' },
        ]
    },
];
//Carga en constructor
var publictDatos = [
    {nombre:'Fuerza', pref:'FUE', puntos: 0},
    {nombre:'Destreza', pref:'DES', puntos: 0},
    {nombre:'Constitucion', pref:'CON', puntos: 0},
    {nombre:'Inteligencia', pref:'INT', puntos: 0},
    {nombre:'Sabiduria', pref:'SAB', puntos: 3},
    {nombre:'Carisma', pref:'CAR', puntos: 0},
];
var publictPuntos = [
    {nombre: 'PV', puntos: 0},
    {nombre: 'DEF', puntos: 0},
    {nombre: 'MOV', puntos: 0},
    {nombre: 'ATQ', puntos: 0},
    {nombre: 'INST', puntos: 0},
    {nombre: 'POD', puntos: 0},
];
//Carga en constructor // NOTA: el nombre no se puede repetir!!!!
var publictHabilidades = [
    {nombre:'Alerta', puntos: 0},
    {nombre:'Comunicacion', puntos: 0},
    {nombre:'Manipulacion', puntos: 0},
    {nombre:'Erudicion', puntos: 0},
    {nombre:'Subterfugio', puntos: 0},
    {nombre:'Supervivencia', puntos: 0},
];