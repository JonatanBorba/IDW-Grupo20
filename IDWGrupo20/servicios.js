//Seccion del Loguin
document.addEventListener("DOMContentLoaded",() => {

    if(!sessionStorage.getItem("usuario")){
                alert("Usted debe iniciar sesión para acceder a esta página")
                window.location.href = "login.html"; 
                return    
            } 

    const salir = document.querySelector(".btn-danger");

    if(salir){
        salir.addEventListener("click", ()=>{
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = "index.html";
        });
        }
});

/* Defino un array que va a tener Servicios por defecto */
let serviciosDefecto = [
    {nombre: "Catering Profesional", descripcion: "Nos encargamos de realizar todo el catering de tu evento de forma profesional, para que vos disfrutes.", imagen: "img/servicio-catering.jpg"},
    {nombre: "Barra de tragos", descripcion: "Realizamos tragos durante el evento con nuestra barra de tragos. Hacé tu evento inolvidable.", imagen: "img/servicios-barrat.jpg"},
    {nombre: "Decoración", descripcion: "¿Estás sin tiempo? Nos encargamos de decorar el salón a tu gusto haciendo todavía más especial ese evento.", imagen: "img/servicio-decoracion.jpg"},
    {nombre: "Disc Jockey", descripcion: "Reproducción de música durante todo el evento. Animación.", imagen: "img/servicio-disckjock.jpg"},
    {nombre: "Iluminación", descripcion: "Puesta escenográfica. Proyector de video con pantalla retráctil.", imagen: "img/servicio-iluminacion.jpg"},
    {nombre: "Centros de Mesa", descripcion: "Centros de mesa personalizados acordes a la temática del cumpleaños, celebración o evento.", imagen: "img/servicio-centrom.jpg"},
];

//**************************************************************************************//
//                              ADMINISTRACION DE SERVICIOS                             //
//**************************************************************************************//
//El usuario hizo click en el botón "Guardar"
document.getElementById("guardar_srv").addEventListener("click", function() {
    const nombre = document.getElementById("servicio").value;
    const descripcion = document.getElementById("descripcion_srv").value;
    const urlimagen = document.getElementById("urlimagen_srv").value;
    
    //validamos que los campos no estén vacíos
    if (nombre === "" || descripcion === "" || urlimagen === "") {
        alert("Por favor, complete todos los campos.");
        return;
    };
    
    let nuevoServicio = [
    {nombre: nombre, descripcion: descripcion, imagen: urlimagen }];
    
    const Servicios_local = localStorage.getItem("servicios");
    const servicios = JSON.parse(Servicios_local);
    //Si hay Servicios en el localStorage, concatenamos el nuevo servicio con los existentes
    nuevoServicio = servicios.concat(nuevoServicio);

    localStorage.setItem("servicios", JSON.stringify(nuevoServicio));
    alert(`Datos del Servicio ${nombre} almacenados correctamente`);

    //Limpiamos los campos del formulario
    document.getElementById("servicio").value = "";
    document.getElementById("descripcion_srv").value = "";
    document.getElementById("urlimagen_srv").value = "";
    
    //Llamamos a la función para listar los servicios
    listarServicios();
});

//El usuario hizo click en el botón "Listar"
document.getElementById("listar_srv").addEventListener("click", function() {
    //Si el usuario solo quiere ver los Servicios, mostramos los que hay por defecto (si no cargo ningúno).
    let nuevoServicio = [];

    const servicios_local = localStorage.getItem("servicios");
    const servicios = JSON.parse(servicios_local);
    if (servicios) {
        //Si hay Servicios en el localStorage, les cargamos los Servicios por defecto
        nuevoServicio = servicios.concat(serviciosDefecto);
    } else {
        //Si no hay Servicios en el localStorage, los cargamos con los servicios por defecto
        nuevoServicio = serviciosDefecto;
    }

    //Eliminamos los Servicios que tienen el mismo nombre
    let serviciosSinRepetidos = nuevoServicio.filter((obj, indice, self) =>
    indice === self.findIndex((el) => el.nombre === obj.nombre) );

    //Guardamos los servicios en el localStorage
    localStorage.setItem("servicios", JSON.stringify(serviciosSinRepetidos));
    listarServicios();
});

/*Función para Listar los Servicios */
function listarServicios(){
    const tablaBody = document.querySelector("#tablaServicios tbody");
    
    tablaBody.innerHTML = "";
    const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
    for (let i = 0; i < servicios.length; i++) {
        const servicio = servicios[i];
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td contenteditable="true">${servicio.nombre}</td>
            <td contenteditable="true">${servicio.descripcion}</td>
            <td contenteditable="true">
                <img src="${servicio.imagen}" alt="${servicio.nombre}" width="50px"></td>
            <td>
                <button id="btnEliminar${i}" type="button" class="btn btn-sm btn-danger btn-eliminar">
                Eliminar </button>
                <button id="btnModificar${i}" type="button" class="btn btn-sm btn-primary btn-success">
                Guardar </button>
            </td>
        `;
        tablaBody.appendChild(fila);
    }
}

// Event delegation para eliminar la fila al hacer clic en el botón Eliminar
document.getElementById("tablaServiciosBody").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-eliminar")) {
        event.target.closest("tr").remove(); // Elimino la fila
    }
});