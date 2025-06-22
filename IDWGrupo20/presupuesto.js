/* Defino un array que va a tener salones por defecto */
let salonesDefecto = [
    { nombre: "El Bosque", capacidad: 50, direccion: "San Juan 425", descripcion: "Salon amplio y luminoso", imagen: "img/salon1.jpg" },
    { nombre: "En Sueños", capacidad: 35, direccion: "Av. Eva Perón 2995", descripcion: "Salon con juegos y espacios blandos", imagen: "img/salon2.jpg" },
    { nombre: "Bambino Park", capacidad: 80, direccion: "San Lorenzo (O) 677", descripcion: "Salon ideal para eventos de chicos", imagen: "img/salon3.jpg" },
    { nombre: "Trampolin Park", capacidad: 70, direccion: "San Lorenzo (O) 621", descripcion: "Salon con camas elasticas", imagen: "img/salon4.jpg" },
    { nombre: "EME Multiespacio", capacidad: 100, direccion: "Salto Uruguayo 1600", descripcion: "Salon para fiestas", imagen: "img/salon5.jpg" },
    { nombre: "El Quincho", capacidad: 20, direccion: "Av. Eva Perón 2995", descripcion: "Salon con piscina y parrila", imagen: "img/salon6.jpg" },
];

function cargarSalonesSelect() {
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


    const salonesSelect = document.getElementById("salonPresupuesto");
    salonesSelect.innerHTML = "";
    // Este bucle evita duplicados porque usa un array previamente filtrado
    for (let i = 0; i < salonesSinRepetidos.length; i++) {
        const salon = salonesSinRepetidos[i];
        const salonSel = document.createElement("option");
        salonSel.innerHTML = `
                <option class="form-control" value="${salon.nombre}">${salon.nombre}</option>
        `;
        salonesSelect.appendChild(salonSel);
    };
};

function cargarServicios(){
// Obtiene los servicios actuales del localStorage
    let servicios = JSON.parse(localStorage.getItem("servicios")) || [];
    const divServicios = document.getElementById("serviciosPresupuesto");
    divServicios.innerHTML="";
    servicios.forEach((servicio, i) => {
        const divServicio = document.createElement("div");
        divServicio.className="form-check";
        divServicio.innerHTML = `
                <label class="form-check-label" for="${servicio.nombre}">${servicio.nombre}</label>
                <input type="checkbox" class="form-check-input" id="${servicio.nombre}" value="${servicio.nombre}">
       `;
        divServicios.appendChild(divServicio);
    });
};


function calcularPresupuesto() {
const salones = {
  salonA: 50000,
  salonB: 75000
};

const servicios = {
  catering: 20000,
  sonido: 10000,
  iluminacion: 15000,
  decoracion: 12000
};

const salonSeleccionado = document.getElementById("salonPresupuesto").value;
let total = salones[salonSeleccionado];

const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
checkboxes.forEach(cb => total += servicios[cb.value]);

document.getElementById("resultadoPresupuesto").innerText = `Total estimado: $${total}`;
}



cargarSalonesSelect();

cargarServicios();
