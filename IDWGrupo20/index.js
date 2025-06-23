/* Defino un array que va a tener salones por defecto */
let salonesDefecto = [
    { nombre: "El Bosque", capacidad: 50, direccion: "San Juan 425", descripcion: "Salón amplio y luminoso", imagen: "img/salon1.jpg", precio: 350000 },
    { nombre: "En Sueños", capacidad: 35, direccion: "Av. Eva Perón 2995", descripcion: "Salón con juegos y espacios blandos", imagen: "img/salon2.jpg", precio: 250000 },
    { nombre: "Bambino Park", capacidad: 80, direccion: "San Lorenzo (O) 677", descripcion: "Salón ideal para eventos de chicos", imagen: "img/salon3.jpg", precio: 480000 },
    { nombre: "Trampolín Park", capacidad: 70, direccion: "San Lorenzo (O) 621", descripcion: "Salón con camas elásticas", imagen: "img/salon4.jpg", precio: 400000 },
    { nombre: "EME Multiespacio", capacidad: 100, direccion: "Salto Uruguayo 1600", descripcion: "Salón para fiestas", imagen: "img/salon5.jpg", precio: 600000 },
    { nombre: "El Quincho", capacidad: 20, direccion: "Av. Eva Perón 2995", descripcion: "Salón con piscina y parrilla", imagen: "img/salon6.jpg", precio: 150000 },
];

function cargarSalones() {
    let salonesInicio = [];

    const salones_local = localStorage.getItem("salones");
    const salones_lcl = JSON.parse(salones_local);
    if (salones_lcl) {
        salonesInicio = salones_lcl;
    } else {
        localStorage.setItem("salones", JSON.stringify(salonesDefecto));
        salonesInicio = salonesDefecto;
    }

    //Eliminamos los salones que tienen el mismo nombre
    let salonesSinRepetidos = salonesInicio.filter((obj, indice, self) =>
        indice === self.findIndex((el) => el.nombre === obj.nombre));


    const divSalonesInicio = document.getElementById("salonesInicio");
    divSalonesInicio.innerHTML = "";
    // Este bucle evita duplicados porque usa un array previamente filtrado
    for (let i = 0; i < salonesSinRepetidos.length; i++) {
        const salon = salonesSinRepetidos[i];
        const divSalon = document.createElement("div");
        divSalon.className = "col-12 col-sm-6 col-lg-4";
        divSalon.innerHTML = `
            <div class="card">
                <img src="${salon.imagen}" class="card-img-top" alt="${salon.nombre}">
                <div class="card-body">
                    <h5 class="card-title">Salon: ${salon.nombre}</h5>
                    <p class="card-text">Capacidad: ${salon.capacidad}</p>
                    <p class="card-text">Dirección: ${salon.direccion}</p>
                    <p class="card-text">Detalles: ${salon.descripcion}</p>
        `;
        divSalonesInicio.appendChild(divSalon);
    };
};

cargarSalones();