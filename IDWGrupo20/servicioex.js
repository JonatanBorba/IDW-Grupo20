/* Defino un array que va a tener Servicios por defecto */
let serviciosDefecto = [
    {nombre: "Catering Profesional", descripcion: "Nos encargamos de realizar todo el catering de tu evento de forma profesional, para que vos disfrutes.", imagen: "img/servicio-catering.jpg"},
    {nombre: "Barra de tragos", descripcion: "Realizamos tragos durante el evento con nuestra barra de tragos. Hacé tu evento inolvidable.", imagen: "img/servicios-barrat.jpg"},
    {nombre: "Decoración", descripcion: "¿Estás sin tiempo? Nos encargamos de decorar el salón a tu gusto haciendo todavía más especial ese evento.", imagen: "img/servicio-decoracion.jpg"},
    {nombre: "Disc Jockey", descripcion: "Reproducción de música durante todo el evento. Animación.", imagen: "img/servicio-disckjock.jpg"},
    {nombre: "Iluminación", descripcion: "Puesta escenográfica. Proyector de video con pantalla retráctil.", imagen: "img/servicio-iluminacion.jpg"},
    {nombre: "Centros de Mesa", descripcion: "Centros de mesa personalizados acordes a la temática del cumpleaños, celebración o evento.", imagen: "img/servicio-centrom.jpg"},
];


function cargarServicios() {
    let serviciosInicio = [];

    const servicios_local = localStorage.getItem("servicios");
    const servicios_lcl = JSON.parse(servicios_local);
    if (servicios_lcl) {
        serviciosInicio = servicios_lcl;
    } else {
        localStorage.setItem("servicios", JSON.stringify(serviciosDefecto));
        serviciosInicio = serviciosDefecto;
    }

    //Eliminamos los servicios que tienen el mismo nombre
    let serviciosSinRepetidos = serviciosInicio.filter((obj, indice, self) =>
        indice === self.findIndex((el) => el.nombre === obj.nombre));


    const divServiciosInicio = document.getElementById("serviciosInicio");
    divServiciosInicio.innerHTML = "";
    // Este bucle evita duplicados porque usa un array previamente filtrado
    for (let i = 0; i < serviciosSinRepetidos.length; i++) {
        const servicio = serviciosSinRepetidos[i];
        const divServicio = document.createElement("div");
        divServicio.className = "col-12 col-sm-6 col-lg-4";
        divServicio.innerHTML = `
            <div class="card">
                <img src="${servicio.imagen}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Servicio: ${servicio.nombre}</h5>
                    <p class="card-text">Descripcion: ${servicio.descripcion}</p>
                </div>
            </div>
        `;
        divServiciosInicio.appendChild(divServicio);
    };
};

cargarServicios();