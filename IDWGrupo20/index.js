/* Defino un array que va a tener salones por defecto */
let salonesDefecto = [
    { nombre: "El Bosque", capacidad: 50, direccion: "San Juan 425", descripcion: "Salon amplio y luminoso", imagen: "img/salon1.jpg" },
    { nombre: "En Sueños", capacidad: 35, direccion: "Av. Eva Perón 2995", descripcion: "Salon con juegos y espacios blandos", imagen: "img/salon2.jpg" },
    { nombre: "Bambino Park", capacidad: 80, direccion: "San Lorenzo (O) 677", descripcion: "Salon ideal para eventos de chicos", imagen: "img/salon3.jpg" },
    { nombre: "Trampolin Park", capacidad: 70, direccion: "San Lorenzo (O) 621", descripcion: "Salon con camas elasticas", imagen: "img/salon4.jpg" },
    { nombre: "EME Multiespacio", capacidad: 100, direccion: "Salto Uruguayo 1600", descripcion: "Salon para fiestas", imagen: "img/salon5.jpg" },
    { nombre: "El Quincho", capacidad: 20, direccion: "Av. Eva Perón 2995", descripcion: "Salon con piscina y parrila", imagen: "img/salon6.jpg" },
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